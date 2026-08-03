CREATE TABLE "KeywordExplanation" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "useCases" TEXT[] NOT NULL,
    "relatedKeywords" TEXT[] NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "KeywordExplanation_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "KeywordExplanation_word_key" ON "KeywordExplanation"("word");
CREATE INDEX "KeywordExplanation_category_idx" ON "KeywordExplanation"("category");
