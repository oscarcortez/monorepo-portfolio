/*
  Warnings:

  - You are about to drop the column `icon_path` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."contacts" DROP COLUMN "icon_path",
ADD COLUMN     "icon_name" VARCHAR(255);
