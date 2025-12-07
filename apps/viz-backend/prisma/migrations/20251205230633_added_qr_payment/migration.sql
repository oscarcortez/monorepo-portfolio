/*
  Warnings:

  - You are about to drop the column `content` on the `template_sections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."payments" ADD COLUMN     "qr_code_path" VARCHAR(500);

-- AlterTable
ALTER TABLE "public"."template_sections" DROP COLUMN "content",
ADD COLUMN     "frontend_config" JSONB;
