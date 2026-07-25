CREATE TABLE "content_images" (
    "id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "content_images_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "content_images_content_id_idx" ON "content_images"("content_id");
