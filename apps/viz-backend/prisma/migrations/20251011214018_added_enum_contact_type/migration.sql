-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."contact_type" ADD VALUE 'RESUME';
ALTER TYPE "public"."contact_type" ADD VALUE 'WEBSITE';
ALTER TYPE "public"."contact_type" ADD VALUE 'DISCORD';
ALTER TYPE "public"."contact_type" ADD VALUE 'FACEBOOK';
ALTER TYPE "public"."contact_type" ADD VALUE 'TIKTOK';
ALTER TYPE "public"."contact_type" ADD VALUE 'YOUTUBE';
