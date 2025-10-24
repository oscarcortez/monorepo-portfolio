/*
  Warnings:

  - You are about to drop the column `icon_path` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `payments` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."payment_source_type" AS ENUM ('BANK', 'CRYPTO', 'PSP', 'WALLET', 'OTHER');

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "icon_path",
DROP COLUMN "link";

-- CreateTable
CREATE TABLE "public"."payment_sources" (
    "payment_source_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "public"."payment_source_type" NOT NULL DEFAULT 'OTHER',
    "code" VARCHAR(50),
    "logo_path" VARCHAR(255),
    "website" VARCHAR(255),
    "country_code" VARCHAR(100),
    "metadata" JSONB,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "payment_sources_pkey" PRIMARY KEY ("payment_source_id")
);

-- CreateIndex
CREATE INDEX "idx_payment_sources_type" ON "public"."payment_sources"("type");

-- CreateIndex
CREATE INDEX "idx_payment_sources_deleted_at" ON "public"."payment_sources"("deleted_at");
