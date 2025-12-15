/*
  Warnings:

  - You are about to drop the column `token` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessToken]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exchangeCode]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."idx_sessions_expires_at";

-- DropIndex
DROP INDEX "public"."sessions_token_key";

-- AlterTable
ALTER TABLE "public"."sessions" DROP COLUMN "token",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "exchangeCode" TEXT,
ADD COLUMN     "exchange_expires_at" TIMESTAMPTZ(6),
ADD COLUMN     "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_accessToken_key" ON "public"."sessions"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_exchangeCode_key" ON "public"."sessions"("exchangeCode");

-- CreateIndex
CREATE INDEX "sessions_accessToken_idx" ON "public"."sessions"("accessToken");

-- CreateIndex
CREATE INDEX "sessions_exchangeCode_idx" ON "public"."sessions"("exchangeCode");

-- CreateIndex
CREATE INDEX "sessions_is_active_expires_at_idx" ON "public"."sessions"("is_active", "expires_at");

-- RenameIndex
ALTER INDEX "public"."idx_sessions_user_id" RENAME TO "sessions_user_id_idx";
