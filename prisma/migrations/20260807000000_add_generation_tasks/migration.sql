CREATE TABLE "GenerationTask" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GenerationTask_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "GenerationTask_createdAt_idx" ON "GenerationTask"("createdAt");
