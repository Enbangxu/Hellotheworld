import type { Metadata } from "next";
import { ImageGenerator } from "@/src/components/image-generation/ImageGenerator";

export const metadata: Metadata = {
  title: "AI 图片生成 · Hello the World",
  description: "把文字灵感变成独一无二的 AI 图片。",
};

export default function CreatePage() {
  return <ImageGenerator />;
}
