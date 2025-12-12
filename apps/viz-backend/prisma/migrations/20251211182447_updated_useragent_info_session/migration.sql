-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "browser" VARCHAR(100),
ADD COLUMN     "device" VARCHAR(100),
ADD COLUMN     "os" VARCHAR(100);
