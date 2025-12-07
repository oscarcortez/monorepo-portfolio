/*
  Warnings:

  - You are about to drop the column `qr_code_path` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "qr_code_path",
ADD COLUMN     "has_qr_code" BOOLEAN NOT NULL DEFAULT false;
