/*
  Warnings:

  - Made the column `payment_source_id` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "fk_payments_payment_source";

-- AlterTable
ALTER TABLE "public"."payments" ALTER COLUMN "payment_source_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "fk_payments_payment_source" FOREIGN KEY ("payment_source_id") REFERENCES "public"."payment_sources"("payment_source_id") ON DELETE RESTRICT ON UPDATE CASCADE;
