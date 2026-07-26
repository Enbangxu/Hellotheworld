CREATE TABLE "Generation" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "type" TEXT NOT NULL, "prompt" TEXT NOT NULL,
  "title" TEXT NOT NULL, "content" TEXT NOT NULL, "seoDescription" TEXT NOT NULL, "imageUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Favorite" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "targetId" TEXT NOT NULL, "targetType" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "History" (
  "id" TEXT NOT NULL, "userId" TEXT NOT NULL, "action" TEXT NOT NULL, "query" TEXT, "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "Generation_userId_createdAt_idx" ON "Generation"("userId", "createdAt");
CREATE UNIQUE INDEX "Favorite_userId_targetId_targetType_key" ON "Favorite"("userId", "targetId", "targetType");
CREATE INDEX "History_userId_createdAt_idx" ON "History"("userId", "createdAt");
ALTER TABLE "Generation" ADD CONSTRAINT "Generation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
