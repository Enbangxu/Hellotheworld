import { NextResponse } from "next/server";
import { classifyGeminiError, enhancePrompt, fallbackPrompt, GeminiRequestError, googleAspectRatios, isImageSize, isImageStyle, type ImageErrorCode } from "@/src/lib/image-generation";
import { trimSessionGenerations } from "@/src/lib/generation-history";
import { prisma } from "@/src/lib/prisma";
import { newStudioSessionId, readStudioSession, studioSessionCookie } from "@/src/lib/studio-session";

export const runtime = "nodejs";
export const maxDuration = 60;
const MAX_BODY_BYTES = 8_192;
const WINDOW_MS = 60_000, LIMIT = 5;
const requests = new Map<string, { count: number; expiresAt: number }>();
const messages: Record<ImageErrorCode, string> = { INVALID_REQUEST: "请检查描述、风格和图片尺寸后重试。", CONFIGURATION_REQUIRED: "图片服务尚未正确配置，请联系管理员。", RATE_LIMITED: "请求过于频繁，请稍后再试。", CONTENT_FILTERED: "这段描述无法用于生成图片，请调整后重试。", PROVIDER_UNAVAILABLE: "图片服务暂时不可用，请稍后再试。", GENERATION_TIMEOUT: "生成等待时间过长，请稍后重试。", EMPTY_IMAGE_RESULT: "本次没有生成图片，请换个描述再试。" };
type GeminiImageResponse = { candidates?: Array<{ content?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> } }> };

function errorResponse(code: ImageErrorCode, status: number) { return NextResponse.json({ error: { code, message: messages[code] } }, { status }); }
function limited(request: Request) { const key=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"anonymous", now=Date.now(), entry=requests.get(key); if(!entry||entry.expiresAt<=now){requests.set(key,{count:1,expiresAt:now+WINDOW_MS});return false} return ++entry.count>LIMIT; }
function timeoutSignal(ms: number) { const controller=new AbortController(); const timer=globalThis.setTimeout(()=>controller.abort(),ms); return { signal: controller.signal, cancel: () => clearTimeout(timer) }; }
function statusFor(code: ImageErrorCode) { return code==="INVALID_REQUEST"?400:code==="RATE_LIMITED"?429:code==="CONFIGURATION_REQUIRED"?503:code==="GENERATION_TIMEOUT"?504:422; }

export async function POST(request: Request) {
  if (limited(request)) return errorResponse("RATE_LIMITED",429);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return errorResponse("INVALID_REQUEST",415);
  const declared=Number(request.headers.get("content-length")||0); if(declared>MAX_BODY_BYTES)return errorResponse("INVALID_REQUEST",413);
  let body: { prompt?: unknown; style?: unknown; size?: unknown };
  try { const raw=await request.text(); if(new TextEncoder().encode(raw).byteLength>MAX_BODY_BYTES)return errorResponse("INVALID_REQUEST",413); body=JSON.parse(raw) as typeof body; } catch { return errorResponse("INVALID_REQUEST",400); }
  const prompt=typeof body.prompt==="string"?body.prompt.trim():"";
  if(prompt.length<3||prompt.length>1500||!isImageStyle(body.style)||!isImageSize(body.size))return errorResponse("INVALID_REQUEST",400);
  const apiKey=process.env.GOOGLE_AI_API_KEY; if(!apiKey)return errorResponse("CONFIGURATION_REQUIRED",503);
  const sessionId=(await readStudioSession())||newStudioSessionId();
  let enhancedPrompt: string;
  const enhancement=timeoutSignal(12_000);
  try { enhancedPrompt=await enhancePrompt(prompt,body.style,body.size,apiKey,enhancement.signal); }
  catch(error) { const status=error instanceof GeminiRequestError?error.status:0, code=classifyGeminiError(status,error instanceof Error?error.message:""); if(["CONFIGURATION_REQUIRED","RATE_LIMITED","CONTENT_FILTERED"].includes(code))return errorResponse(code,statusFor(code)); enhancedPrompt=fallbackPrompt(prompt,body.style,body.size); }
  finally { enhancement.cancel(); }
  const generation=timeoutSignal(45_000);
  try {
    const model=process.env.GOOGLE_AI_IMAGE_MODEL||"gemini-2.5-flash-image";
    const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{method:"POST",signal:generation.signal,headers:{"Content-Type":"application/json","x-goog-api-key":apiKey},body:JSON.stringify({contents:[{role:"user",parts:[{text:enhancedPrompt}]}],generationConfig:{responseModalities:["IMAGE"],imageConfig:{aspectRatio:googleAspectRatios[body.size]}}})});
    if(!response.ok)throw new GeminiRequestError("Image provider rejected request",response.status);
    const result=await response.json() as GeminiImageResponse, image=result.candidates?.[0]?.content?.parts?.find(part=>part.inlineData?.data)?.inlineData;
    if(!image?.data)return errorResponse("EMPTY_IMAGE_RESULT",502);
    const imageUrl=`data:${image.mimeType||"image/png"};base64,${image.data}`, generatedAt=new Date();
    await prisma.generationTask.create({data:{prompt,enhancedPrompt,style:body.style,size:body.size,imageUrl,provider:"gemini",sessionId,createdAt:generatedAt}});
    await trimSessionGenerations(sessionId).catch(error=>console.error("generation_history_trim_failed",{sessionIdPresent:true,errorType:error instanceof Error?error.name:"unknown"}));
    const responseJson=NextResponse.json({imageUrl,enhancedPrompt,style:body.style,size:body.size,generatedAt:generatedAt.toISOString()});
    if(!(await readStudioSession())){const cookie=studioSessionCookie(sessionId);responseJson.cookies.set(cookie.name,cookie.value,cookie.options)}
    return responseJson;
  } catch(error) { const timedOut=error instanceof Error&&error.name==="AbortError", code=timedOut?"GENERATION_TIMEOUT":classifyGeminiError(error instanceof GeminiRequestError?error.status:0,error instanceof Error?error.message:""); console.error("gemini_image_failed",{code}); return errorResponse(code,statusFor(code)); }
  finally { generation.cancel(); }
}
