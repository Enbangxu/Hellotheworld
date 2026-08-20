import type { Metadata } from "next";
import { CreativeLab } from "@/src/components/creative-lab/CreativeLab";

export const metadata: Metadata = { title: "DeepSeek 创意工作室", description: "把模糊想法完善成可行动的创意方案。" };

export default function IdeasPage() { return <CreativeLab />; }
