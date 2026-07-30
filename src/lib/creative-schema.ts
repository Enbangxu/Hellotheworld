export const categories = ["world", "story", "game", "app", "product", "learning", "surprise"] as const;
export const locales = ["zh", "en", "ja"] as const;
export type CreativeCategory = typeof categories[number];
export type CreativeLocale = typeof locales[number];
export interface CreativeWork { schemaVersion: "1.0"; category: CreativeCategory; title: string; tagline: string; summary: string; emotionalHook: string; cover: { emoji: string; visualPrompt: string; artDirection: string }; keyElements: { label: string; value: string }[]; sections: { heading: string; body: string; highlights: string[] }[]; surprise: { title: string; content: string }; nextActions: { id: string; label: string; instruction: string }[]; remixSuggestions: string[]; share: { headline: string; description: string; caption: string } }
const text = (value: unknown, fallback: string, max = 2000) => typeof value === "string" && value.trim() ? value.trim().replace(/<\/?(?:script|iframe)[^>]*>/gi, "").slice(0, max) : fallback;
const array = (value: unknown) => Array.isArray(value) ? value : [];
export function normalizeCreativeWork(input: unknown, category: CreativeCategory = "surprise"): CreativeWork {
  const v = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const cover = v.cover && typeof v.cover === "object" ? v.cover as Record<string, unknown> : {};
  const surprise = v.surprise && typeof v.surprise === "object" ? v.surprise as Record<string, unknown> : {};
  const share = v.share && typeof v.share === "object" ? v.share as Record<string, unknown> : {};
  const elements = array(v.keyElements).slice(0,8).map((x) => { const o=x as Record<string,unknown>; return {label:text(o?.label,"核心要素"),value:text(o?.value,"等待继续探索")}; });
  while(elements.length<3) elements.push({label:`核心要素 ${elements.length+1}`,value:"一个可以继续发展的关键设定"});
  const sections = array(v.sections).slice(0,7).map((x) => { const o=x as Record<string,unknown>; return {heading:text(o?.heading,"创作章节"),body:text(o?.body,"这个部分将在下一次创作中继续展开。"),highlights:array(o?.highlights).slice(0,4).map(y=>text(y,"亮点"))}; });
  while(sections.length<3) sections.push({heading:`篇章 ${sections.length+1}`,body:"从清晰的规则、体验和行动出发，让这个想法成为可以继续生长的世界。",highlights:["具体体验","下一步行动"]});
  const actions = array(v.nextActions).slice(0,3).map((x,i) => { const o=x as Record<string,unknown>; return {id:text(o?.id,`action-${i+1}`,30).replace(/[^a-z0-9-]/gi,"-"),label:text(o?.label,"继续扩展"),instruction:text(o?.instruction,"扩展并返回完整作品")}; });
  while(actions.length<3) actions.push({id:`deepen-${actions.length+1}`,label:"继续扩展",instruction:"增加具体细节并返回完整作品"});
  const remixes=array(v.remixSuggestions).slice(0,3).map(x=>text(x,"换一种风格重新创作")); while(remixes.length<3) remixes.push("从不同受众和艺术方向重新设计");
  const selected = categories.includes(v.category as CreativeCategory) ? v.category as CreativeCategory : category;
  return {schemaVersion:"1.0",category:selected,title:text(v.title,"未命名世界",80).padEnd(2,"·"),tagline:text(v.tagline,"一个想法正在成为世界",140).padEnd(2,"·"),summary:text(v.summary,"这是一个由你的想法出发、拥有清晰规则、情绪与发展路径的创造。"),emotionalHook:text(v.emotionalHook,"当想法第一次拥有名字，世界便开始回应你。"),cover:{emoji:text(cover.emoji,"✨",8),visualPrompt:text(cover.visualPrompt,"用于未来视觉创作的氛围、构图与材质描述"),artDirection:text(cover.artDirection,"深邃蓝紫、柔和霓虹与电影感光线")},keyElements:elements,sections,surprise:{title:text(surprise.title,"意外亮点"),content:text(surprise.content,"世界会记住每一次选择，并在未来给出不同回应。")},nextActions:actions,remixSuggestions:remixes,share:{headline:text(share.headline,text(v.title,"我的新世界")),description:text(share.description,text(v.summary,"一个刚刚诞生的创意"),300),caption:text(share.caption,"我用 AI 创造了一个可以继续生长的世界。",500)}};
}
export function parseCreativeJSON(raw:string, category?:CreativeCategory){ let parsed:unknown; try{parsed=JSON.parse(raw)}catch{throw new Error("INVALID_JSON")}; return normalizeCreativeWork(parsed,category); }
export function isValidCreativeWork(work:CreativeWork){return work.title.length>=2&&work.title.length<=80&&work.tagline.length>=2&&work.tagline.length<=140&&work.summary.length>0&&work.keyElements.length>=3&&work.sections.length>=3&&work.sections.every(s=>s.body.length>0)&&work.nextActions.length===3&&work.remixSuggestions.length===3;}
export function demoCreativeWork(idea:string,category:CreativeCategory,locale:CreativeLocale):CreativeWork { const title=locale==="en"?"The World Behind the Spark":locale==="ja"?"ひらめきの向こうの世界":"灵光之城"; return normalizeCreativeWork({category,title,tagline:idea.slice(0,80),summary:`${idea}。这个方案把想法转化为可感知的规则、角色与行动，让它既有画面，也有能够真正开始的第一步。`,emotionalHook:"你不是在等待未来，而是在为它写下第一条规则。",keyElements:[{label:"核心体验",value:"每个选择都会留下温柔而明确的回声"},{label:"世界规则",value:"创造与反馈形成持续成长的循环"},{label:"第一步",value:"用一个最小场景验证最重要的感受"}],sections:[{heading:"世界观",body:"它从一个清晰的愿望开始，以真实的人和选择为中心。",highlights:["清晰规则","情绪价值"]},{heading:"体验路径",body:"用户先遇见一个可理解的入口，再通过行动逐层发现惊喜。",highlights:["低门槛","持续探索"]},{heading:"实现路线",body:"先制作最小可用原型，邀请少量真实反馈，再扩展系统。",highlights:["原型","验证"]}]},category); }
