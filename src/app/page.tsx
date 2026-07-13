import { redirect } from "next/navigation";
import { siteConfig } from "@/src/config/site";

export default function RootPage() {
  redirect(`/${siteConfig.defaultLocale}`);
}
