import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { buildCreationFeed, isPublicCategory, parseFeedParams, type PublicCreationRow } from "@/src/lib/creation-feed";
import type { CreativeLocale } from "@/src/lib/creative-schema";

export const dynamic = "force-dynamic";

export async function GET(request:Request){
  const params=parseFeedParams(new URL(request.url).searchParams);
  const response=await buildCreationFeed(params,async({category,sort})=>{
    const rows=await prisma.creation.findMany({where:{isPublic:true,...(category?{category}:{})},select:{slug:true,input:true,title:true,tagline:true,category:true,locale:true,createdAt:true,viewCount:true,shareCount:true},orderBy:{createdAt:"desc"},take:sort==="trending"?60:24});
    return rows.filter(row=>isPublicCategory(row.category)).map((row):PublicCreationRow=>({slug:row.slug,input:row.input,title:row.title,tagline:row.tagline,category:row.category,locale:(["zh","en","ja"].includes(row.locale)?row.locale:"en") as CreativeLocale,createdAt:row.createdAt.toISOString(),viewCount:row.viewCount,shareCount:row.shareCount}));
  });
  return NextResponse.json(response,{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=300"}});
}
