# V23 DeepSeek Grade 9 tutor

The active Grade 9 topic experience uses the server-only `/api/learning/deepseek-tutor` endpoint and DeepSeek V4 Flash. Configure `DEEPSEEK_API_KEY`, with optional `DEEPSEEK_BASE_URL` and `DEEPSEEK_MODEL`, in every Vercel environment and redeploy after changes.

Gemini remains responsible for image generation. The existing `GOOGLE_AI_API_KEY`, `GOOGLE_AI_TEXT_MODEL`, and `GOOGLE_AI_IMAGE_MODEL` settings must remain configured for that workflow. Without a DeepSeek key, static ten-second lessons, quizzes, and local progress continue to work.
