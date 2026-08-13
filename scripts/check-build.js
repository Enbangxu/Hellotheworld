#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- this standalone Node check runs as CommonJS */

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const requiredFiles = ["src/app/layout.tsx", "src/app/[locale]/page.tsx", "src/components/ExploreCard.tsx", "src/components/VersionBadge.tsx", "src/data/siteContent.ts", "public/manifest.json", "src/app/create/page.tsx", "src/components/creative-lab/CreativeLab.tsx", "src/lib/deepseek.ts", "src/lib/creative-schema.ts", "src/app/api/creative-lab/generate/route.ts", "src/app/api/creative-lab/refine/route.ts", "public/images/og-v13.svg", "src/lib/learning-progress.ts", "src/app/[locale]/knowledge/grade-9/progress/page.tsx", "src/components/learning/ProgressDashboard.tsx", "src/components/learning/LearningSearch.tsx", "src/lib/image-generation.ts", "src/app/api/generate-image/route.ts"];
const extensions = ["", ".ts", ".tsx", ".js", ".jsx", ".json", "/index.ts", "/index.tsx", "/index.js", "/index.jsx"];
const sourceFiles = [];
const errors = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (/\.(?:ts|tsx|js|jsx)$/.test(entry.name)) sourceFiles.push(fullPath);
  }
}

function resolves(candidate) {
  return extensions.some((extension) => fs.existsSync(`${candidate}${extension}`));
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing required file: ${file}`);
}

walk(path.join(root, "src"));
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  const relativeFile = path.relative(root, file);
  const importPattern = /(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g;
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    if (specifier.startsWith("@/")) {
      if (!resolves(path.join(root, specifier.slice(2)))) errors.push(`Invalid import in ${relativeFile}: ${specifier}`);
    } else if (specifier.startsWith(".")) {
      if (!resolves(path.resolve(path.dirname(file), specifier))) errors.push(`Invalid import in ${relativeFile}: ${specifier}`);
    }
  }

  const assetPattern = /["'`](\/(?:images|icons)\/[^"'`)\s?#]+)["'`)]/g;
  for (const match of source.matchAll(assetPattern)) {
    if (!fs.existsSync(path.join(root, "public", match[1]))) errors.push(`Missing public asset in ${relativeFile}: ${match[1]}`);
  }
}

const allText = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
// Build-time guard uses a split sentinel so the forbidden browser variable is
// not itself introduced into the repository by this validation script.
if (allText.includes("NEXT_PUBLIC_" + "DEEPSEEK")) errors.push("DeepSeek credentials must never use a browser-public environment variable");
if (/['"`]sk-[A-Za-z0-9_-]{16,}/.test(allText)) errors.push("Possible hard-coded provider key detected");
const middleware = fs.readFileSync(path.join(root, "middleware.ts"), "utf8");
for (const route of ["create", "creation", "works"]) {
  if (!middleware.includes(`${route}(?:/|$)`)) errors.push(`Middleware must exclude the ${route} route`);
}
const schema = fs.readFileSync(path.join(root, "prisma/schema.prisma"), "utf8");
if (!/model\s+Creation\s*\{/.test(schema)) errors.push("Prisma Creation model is missing");
const env = fs.readFileSync(path.join(root, ".env.example"), "utf8");
for (const name of ["DEEPSEEK_API_KEY", "DEEPSEEK_BASE_URL", "DEEPSEEK_MODEL"]) if (!env.includes(name)) errors.push(`.env.example is missing ${name}`);
const home = fs.readFileSync(path.join(root, "src/components/HomePage.tsx"), "utf8");
if (!home.includes("/create") || !home.includes("AI Studio")) errors.push("Homepage AI Studio entry is missing");

const tutorPanel = fs.readFileSync(path.join(root, "src/components/learning/TutorPanel.tsx"), "utf8");
const tutorRoute = fs.readFileSync(path.join(root, "src/app/api/learning/tutor/route.ts"), "utf8");
const learningFiles = sourceFiles.filter((file) => file.includes(`${path.sep}learning${path.sep}`)).map((file) => fs.readFileSync(file, "utf8")).join("\n");
if (!home.includes("初三 AI 学习")) errors.push("Grade 9 learning homepage entry is missing");
if (!home.includes("V23 · Adaptive Learning")) errors.push("Homepage V23 version label is missing");
if (!tutorPanel.includes('fetch("/api/learning/tutor"')) errors.push("TutorPanel must use the canonical learning tutor API");
if (!tutorRoute.includes('from "@/src/lib/deepseek-tutor"') || !tutorRoute.includes("askDeepSeek")) errors.push("Learning tutor route must use DeepSeek");
if (learningFiles.includes("askGemini") || tutorRoute.includes("askGemini")) errors.push("Learning components and APIs must not use the Gemini tutor");
if (fs.existsSync(path.join(root, "src/app/api/learning/deepseek-tutor/route.ts"))) errors.push("Duplicate DeepSeek tutor route must not exist");

if (errors.length) {
  console.error(`Build check failed with ${errors.length} error(s):\n${errors.map((error) => `  - ${error}`).join("\n")}`);
  process.exit(1);
}

console.log(`Build check passed: ${requiredFiles.length} required files and ${sourceFiles.length} source files verified.`);
