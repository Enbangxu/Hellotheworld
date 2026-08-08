# Hello the World

Hello the World 是一个基于 **Next.js 15、React 19、TypeScript、Tailwind CSS、Prisma**
构建的多语言 AI 创作与知识探索网站。当前版本为 **V20.1**，图片生成中心使用
Google Gemini 优化提示词并生成图片。

## 主要功能

- `/create`：AI 图片生成中心，支持 Prompt、风格、画幅、预览与下载。
- `/history`：从 PostgreSQL 读取并展示图片生成历史。
- `/api/generate-image`：仅在服务端调用 Google AI，先优化 Prompt，再生成图片。
- `/[locale]/assistant`：多语言 AI 助手入口，支持 `zh`、`en`、`ja`。
- `/studio`、`/[locale]/community`：AI Studio 与创作者社区。
- `/creation/[slug]`：已有 Creative Lab 作品的展示与分享页面。

## 技术结构

```text
src/
├── app/          # Next.js App Router 页面与服务端 API
├── components/   # 页面组件和交互组件
├── config/       # 站点及语言配置
├── data/         # 静态内容与展示数据
├── lib/          # Prisma、鉴权、AI 与共享逻辑
└── styles/       # Tailwind 与全局样式
prisma/
├── schema.prisma
└── migrations/
```

## 本地运行

要求：Node.js 22、npm，以及可访问的 PostgreSQL 数据库。

```bash
npm install
cp .env.example .env.local
npx prisma migrate dev
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。图片生成页位于
[http://localhost:3000/create](http://localhost:3000/create)。

### 图片生成配置

在 `.env.local` 中设置：

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
GOOGLE_AI_API_KEY="your-google-ai-api-key"
GOOGLE_AI_TEXT_MODEL="gemini-2.5-flash"
GOOGLE_AI_IMAGE_MODEL="gemini-2.5-flash-image"
```

`GOOGLE_AI_API_KEY` 只会由 `/api/generate-image` 服务端路由读取。不要使用
`NEXT_PUBLIC_` 前缀，也不要将真实密钥提交到 Git。

生成流程如下：

1. 校验 `prompt`、`style` 和 `size`。
2. 使用 `GOOGLE_AI_TEXT_MODEL` 扩展 Prompt，同时保留用户原始意图和约束。
3. 使用 `GOOGLE_AI_IMAGE_MODEL` 按所选画幅生成图片。
4. 将原始 Prompt、风格、尺寸、图片和创建时间写入 `GenerationTask`。
5. 返回保持兼容的 `{ "imageUrl": "..." }` 响应。

## 其他服务端配置

完整变量及安全占位值请参考 [`.env.example`](./.env.example)。现有模块还可能使用：

- `AUTH_SECRET`、`AUTH_GITHUB_ID`、`AUTH_GITHUB_SECRET`：登录与 GitHub OAuth。
- `DEEPSEEK_API_KEY`、`DEEPSEEK_BASE_URL`、`DEEPSEEK_MODEL`：Creative Lab 相关能力。
- `AI_API_URL`、`AI_API_KEY`、`AI_MODEL`：旧版聊天接口。
- `CREATION_SHARE_SECRET`：作品分享签名。
- `UNSPLASH_ACCESS_KEY`、`PEXELS_API_KEY`：内容图片服务。

所有密钥都必须保留在服务端环境变量中。

## 数据库

安装依赖后 `postinstall` 会生成 Prisma Client，也可以手动运行：

```bash
npx prisma generate
```

开发环境创建或应用迁移：

```bash
npx prisma migrate dev
```

生产环境只应用已经提交的迁移：

```bash
npx prisma migrate deploy
```

不要在 Vercel 构建过程中运行 `prisma migrate dev`，也不要让 Preview 部署误用生产数据库。

## 质量检查

提交代码前运行：

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

`npm run check-build` 可用于运行项目附带的额外构建检查。

## Vercel 部署

1. 将仓库导入 Vercel，并保留 Next.js Framework Preset。
2. 分别为 Development、Preview、Production 配置正确的 `DATABASE_URL`。
3. 配置 `GOOGLE_AI_API_KEY`；如需覆盖默认模型，再配置两个模型变量。
4. 根据启用的模块配置鉴权、DeepSeek 和第三方图片服务变量。
5. 使用目标生产数据库执行一次 `npx prisma migrate deploy`。
6. 以 `npm run build` 构建并部署。
7. 部署后检查 `/create`、`/history`、`/api/generate-image`、语言页面以及数据库连接。

图片生成路由声明了较长的执行时间，但最终上限取决于 Vercel 套餐和项目设置。
如果生成量较大，建议将图片转存到 Vercel Blob 或对象存储，而不是长期把 Base64 图片保存在
PostgreSQL 中。

## 安全注意事项

- 不要提交 `.env.local` 或任何真实 API Key。
- 不要在浏览器代码、日志、截图、README 或 Pull Request 中粘贴密钥。
- Prompt 和模型错误只记录必要信息，生产环境应配合速率限制和监控。
- 在对外开放前验证数据库迁移、函数时限、Google AI 配额和实际生成成本。
