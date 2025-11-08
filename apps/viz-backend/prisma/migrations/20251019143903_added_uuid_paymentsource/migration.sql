/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `payment_sources` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."payment_sources" ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "payment_sources_uuid_key" ON "public"."payment_sources"("uuid");
