import { feedCategories, type PublicCreationCard, v14Creations } from "@/src/data/v14Creations";
import type { CreativeCategory } from "@/src/lib/creative-schema";

export type FeedSort = "trending" | "newest";
export type FeedCategory = typeof feedCategories[number];
export type CreationFeedResponse = { items: PublicCreationCard[]; source:"database"|"demo"; generatedAt:string };
export type PublicCreationRow = Omit<PublicCreationCard,"dataSource">;
export type CreationReader = (options:{category:FeedCategory|null; limit:number; sort:FeedSort})=>Promise<PublicCreationRow[]>;

export function parseFeedParams(params: URLSearchParams) {
  const sort:FeedSort=params.get("sort")==="newest"?"newest":"trending";
  const raw=params.get("category");
  const category=feedCategories.includes(raw as FeedCategory)?raw as FeedCategory:null;
  const number=Number.parseInt(params.get("limit")||"12",10);
  const limit=Number.isFinite(number)?Math.min(24,Math.max(1,number)):12;
  return {sort,category,limit};
}
export function sortCreations(items:PublicCreationRow[],sort:FeedSort,now=Date.now()) {
  return [...items].sort((a,b)=>{
    if(sort==="newest") return b.createdAt.localeCompare(a.createdAt)||a.slug.localeCompare(b.slug);
    const score=(x:PublicCreationRow)=>x.shareCount*3+x.viewCount+Math.max(0,30-Math.floor((now-new Date(x.createdAt).getTime())/86400000));
    return score(b)-score(a)||b.createdAt.localeCompare(a.createdAt)||a.slug.localeCompare(b.slug);
  });
}
export async function buildCreationFeed(params:ReturnType<typeof parseFeedParams>,read:CreationReader):Promise<CreationFeedResponse>{
  try { const rows=await read(params); if(rows.length)return {items:sortCreations(rows,params.sort).slice(0,params.limit).map(x=>({...x,dataSource:"Community"})),source:"database",generatedAt:new Date().toISOString()}; } catch { /* safe demo fallback */ }
  const demo=v14Creations.filter(x=>!params.category||x.category===params.category);
  return {items:sortCreations(demo,params.sort).slice(0,params.limit).map(x=>({...x,dataSource:"Demo"})),source:"demo",generatedAt:new Date().toISOString()};
}
export function isPublicCategory(value:string):value is CreativeCategory{return feedCategories.includes(value as FeedCategory)}
