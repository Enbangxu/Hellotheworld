#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- this standalone Node check runs as CommonJS */

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const requiredFiles = ["src/app/layout.tsx", "src/app/[locale]/page.tsx", "src/components/ExploreCard.tsx", "src/components/VersionBadge.tsx", "src/data/siteContent.ts", "public/manifest.json"];
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

if (errors.length) {
  console.error(`Build check failed with ${errors.length} error(s):\n${errors.map((error) => `  - ${error}`).join("\n")}`);
  process.exit(1);
}

console.log(`Build check passed: ${requiredFiles.length} required files and ${sourceFiles.length} source files verified.`);
