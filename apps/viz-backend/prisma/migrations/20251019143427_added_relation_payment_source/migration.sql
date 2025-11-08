-- AlterTable
ALTER TABLE "public"."payments" ADD COLUMN     "payment_source_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "fk_payments_payment_source" FOREIGN KEY ("payment_source_id") REFERENCES "public"."payment_sources"("payment_source_id") ON DELETE SET NULL ON UPDATE CASCADE;
