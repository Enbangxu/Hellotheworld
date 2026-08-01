"use client";

import { useState } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

export function InteractionActions({ onComment }: { onComment?: () => void }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-wrap gap-2" aria-label="内容互动">
      <button type="button" aria-pressed={liked} onClick={() => setLiked((value) => !value)} className={`v15-action ${liked ? "v15-action-active" : ""}`}><Heart size={17} fill={liked ? "currentColor" : "none"} />{liked ? "已赞" : "点赞"}</button>
      <button type="button" aria-pressed={saved} onClick={() => setSaved((value) => !value)} className={`v15-action ${saved ? "v15-action-active" : ""}`}><Bookmark size={17} fill={saved ? "currentColor" : "none"} />{saved ? "已收藏" : "收藏"}</button>
      <button type="button" onClick={onComment} className="v15-action"><MessageCircle size={17} />评论</button>
    </div>
  );
}
