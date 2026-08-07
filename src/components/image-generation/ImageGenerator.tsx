/* eslint-disable @next/next/no-img-element -- Provider image URLs are dynamic and may be data URLs. */
"use client";

import Link from "next/link";
import { Download, History, ImageIcon, LoaderCircle, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

const styles = [
  ["realistic", "写实摄影"], ["anime", "动漫插画"], ["3d", "3D 艺术"],
  ["watercolor", "水彩画"], ["cyberpunk", "赛博朋克"],
] as const;
const sizes = [["1:1", "方形"], ["16:9", "横向"], ["9:16", "竖向"]] as const;

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1:1");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) { setError("请先描述你想创作的画面。"); return; }
    setLoading(true); setError(""); setImageUrl("");
    try {
      const response = await fetch("/api/generate-image", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: prompt.trim(), style, size }) });
      const data = await response.json() as { imageUrl?: string; error?: string };
      if (!response.ok || !data.imageUrl) throw new Error(data.error || "图片生成失败，请稍后再试。");
      setImageUrl(data.imageUrl);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "网络开小差了，请稍后再试。"); }
    finally { setLoading(false); }
  }

  async function download() {
    if (!imageUrl) return;
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const localUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a"); anchor.href = localUrl; anchor.download = `hello-the-world-${Date.now()}.png`; anchor.click();
      URL.revokeObjectURL(localUrl);
    } catch { window.open(imageUrl, "_blank", "noopener,noreferrer"); }
  }

  return <main className="image-studio min-h-screen text-white">
    <div className="image-studio-glow" aria-hidden="true" />
    <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
      <Link href="/" className="font-black tracking-tight">Hello the World</Link>
      <Link href="/history" className="image-secondary"><History size={17} />历史记录</Link>
    </header>
    <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-8">
      <div className="mb-9 text-center"><span className="image-kicker"><Sparkles size={14} /> V20 CREATIVE ENGINE</span><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">AI 图片生成</h1><p className="mx-auto mt-4 max-w-xl text-slate-400">描述脑海中的画面，选择喜欢的风格，让 AI 把灵感变成作品。</p></div>
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <form onSubmit={generate} className="image-panel space-y-6 p-5 sm:p-7">
          <label className="block"><span className="image-label">画面描述</span><textarea value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={1500} rows={6} placeholder="例如：雨后的未来城市，霓虹灯倒映在街道上，一只橘猫撑着透明雨伞……" className="image-input mt-2 resize-none" /><small className="mt-2 block text-right text-slate-500">{prompt.length} / 1500</small></label>
          <fieldset><legend className="image-label">艺术风格</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{styles.map(([value,label]) => <button type="button" key={value} onClick={() => setStyle(value)} className={`image-choice ${style===value?"active":""}`} aria-pressed={style===value}>{label}</button>)}</div></fieldset>
          <fieldset><legend className="image-label">画面尺寸</legend><div className="mt-2 grid grid-cols-3 gap-2">{sizes.map(([value,label]) => <button type="button" key={value} onClick={() => setSize(value)} className={`image-choice ${size===value?"active":""}`} aria-pressed={size===value}><strong>{value}</strong><small>{label}</small></button>)}</div></fieldset>
          {error && <p role="alert" className="rounded-xl border border-rose-400/25 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
          <button disabled={loading || !prompt.trim()} className="image-primary w-full">{loading?<><LoaderCircle className="animate-spin" size={19}/>正在描绘你的灵感…</>:<><Sparkles size={19}/>生成图片</>}</button>
        </form>
        <div className="image-panel flex min-h-[430px] flex-col overflow-hidden p-4 sm:min-h-[580px]">
          {imageUrl ? <><div className="relative flex-1 overflow-hidden rounded-2xl bg-black/20"><img src={imageUrl} alt={`AI 生成图片：${prompt}`} className="h-full w-full object-contain" /></div><button onClick={download} className="image-secondary mt-4 self-end"><Download size={17}/>下载图片</button></> : <div className="flex flex-1 flex-col items-center justify-center px-6 text-center text-slate-500">{loading?<><div className="image-loading"><Sparkles size={28}/></div><p className="mt-6 font-bold text-slate-300">AI 正在创作中</p><p className="mt-2 text-sm">精彩画面需要一点时间，请不要离开</p></>:<><ImageIcon size={52} strokeWidth={1.2}/><p className="mt-5 font-bold text-slate-300">你的作品将在这里出现</p><p className="mt-2 text-sm">填写左侧创意，开启第一次生成</p></>}</div>}
        </div>
      </div>
    </section>
  </main>;
}
