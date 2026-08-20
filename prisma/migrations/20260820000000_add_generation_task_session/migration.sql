-- Nullable for compatibility with existing rows. Legacy unscoped records remain
-- stored, but are never shown to anonymous studio visitors.
ALTER TABLE "GenerationTask" ADD COLUMN "sessionId" TEXT;
CREATE INDEX "GenerationTask_sessionId_createdAt_idx"
  ON "GenerationTask"("sessionId", "createdAt");
