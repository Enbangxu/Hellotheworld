import { NextRequest, NextResponse } from "next/server";
import { siteConfig, type Locale } from "@/src/config/site";
import { isLocale } from "@/src/lib/i18n";
function detectLocale(request: NextRequest): Locale { const languages = request.headers.get("accept-language")?.toLowerCase() ?? ""; if (languages.includes("zh")) return "zh"; if (languages.includes("ja") || languages.includes("jp")) return "ja"; return siteConfig.defaultLocale; }
export function middleware(request: NextRequest) { const { pathname } = request.nextUrl; const pathnameLocale = pathname.split("/")[1]; if (isLocale(pathnameLocale)) return NextResponse.next(); const locale = detectLocale(request); const url = request.nextUrl.clone(); url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`; return NextResponse.redirect(url); }
// Product pages without a locale segment and public/PWA assets must keep their
// canonical URL. Everything else continues through locale detection.
export const config = { matcher: ["/((?!api|create(?:/|$)|_next/static|_next/image|images|icons|manifest.json|favicon.ico|robots.txt|sitemap.xml).*)"] };
