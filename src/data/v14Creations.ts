import type { CreativeCategory, CreativeLocale } from "@/src/lib/creative-schema";

export type PublicCreationCard = {
  slug: string; input: string; title: string; tagline: string;
  category: CreativeCategory; locale: CreativeLocale; createdAt: string;
  viewCount: number; shareCount: number; dataSource: "Community" | "Demo";
};

export const feedCategories = ["world", "story", "game", "app", "product", "learning"] as const;

export const v14Creations: PublicCreationCard[] = [
  { slug:"demo-tidal-city", input:"一座会随着潮汐移动的未来城市", title:"潮汐之城", tagline:"街道追随月亮，居民每天醒在新的海岸。", category:"world", locale:"zh", createdAt:"2026-07-25T08:00:00.000Z", viewCount:0, shareCount:0, dataSource:"Demo" },
  { slug:"demo-library-stars", input:"A library that lends memories from distant stars", title:"The Library Between Stars", tagline:"Borrow a memory, return with a different future.", category:"story", locale:"en", createdAt:"2026-07-24T08:00:00.000Z", viewCount:0, shareCount:0, dataSource:"Demo" },
  { slug:"demo-changing-rules", input:"ルールが朝ごとに変わる探索ゲーム", title:"明日のルール", tagline:"昨日の攻略法を手放すことから冒険が始まる。", category:"game", locale:"ja", createdAt:"2026-07-23T08:00:00.000Z", viewCount:0, shareCount:0, dataSource:"Demo" },
  { slug:"demo-kind-habits", input:"A gentle app that helps friends build habits together", title:"Small Steps Club", tagline:"A calm place where progress feels shared, not scored.", category:"app", locale:"en", createdAt:"2026-07-22T08:00:00.000Z", viewCount:0, shareCount:0, dataSource:"Demo" },
  { slug:"demo-circular-studio", input:"用城市废料创造日用品的社区工作室", title:"再生街角", tagline:"让被丢弃的材料，成为一门邻里生意。", category:"product", locale:"zh", createdAt:"2026-07-21T08:00:00.000Z", viewCount:0, shareCount:0, dataSource:"Demo" },
  { slug:"demo-learning-map", input:"好奇心から自分だけの学習地図を作る", title:"好奇心コンパス", tagline:"点数ではなく、問いが次の道を照らす。", category:"learning", locale:"ja", createdAt:"2026-07-20T08:00:00.000Z", viewCount:0, shareCount:0, dataSource:"Demo" },
];
