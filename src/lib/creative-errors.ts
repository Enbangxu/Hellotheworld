export type CreativeErrorCode = "INVALID_REQUEST"|"RATE_LIMITED"|"CONFIGURATION_REQUIRED"|"PROVIDER_UNAVAILABLE"|"TIMEOUT"|"INVALID_OUTPUT"|"CONTENT_FILTERED";
export class CreativeError extends Error { constructor(public code:CreativeErrorCode,public status=500){super(code)} }
export const isTransientStatus=(status:number)=>[429,500,503].includes(status);
export const safeMessage=(code:CreativeErrorCode,locale="zh")=> locale==="en" ? (code==="RATE_LIMITED"?"Ideas are flowing fast today. Please try again soon.":"The creative service is temporarily unavailable.") : locale==="ja" ? "AI創作サービスは一時的に利用できません。" : code==="RATE_LIMITED"?"今天的灵感太旺盛了，请稍后再试。":"AI 创造服务暂时不可用，其他网站功能仍可正常使用。";
