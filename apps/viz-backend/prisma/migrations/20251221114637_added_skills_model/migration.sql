/*
  Warnings:

  - You are about to drop the column `accessToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeCode` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_expires_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `lastUsedAt` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."sessions_accessToken_idx";

-- DropIndex
DROP INDEX "public"."sessions_accessToken_key";

-- DropIndex
DROP INDEX "public"."sessions_exchangeCode_idx";

-- DropIndex
DROP INDEX "public"."sessions_exchangeCode_key";

-- DropIndex
DROP INDEX "public"."sessions_is_active_expires_at_idx";

-- AlterTable
ALTER TABLE "public"."sessions" DROP COLUMN "accessToken",
DROP COLUMN "exchangeCode",
DROP COLUMN "exchange_expires_at",
DROP COLUMN "lastUsedAt",
ADD COLUMN     "token" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "public"."skills" (
    "skill_id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "type" "public"."skill_type" NOT NULL,
    "description" VARCHAR(500),
    "icon_name" VARCHAR(100),
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "public"."skill_users" (
    "skill_user_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "level" "public"."skill_level" NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skill_users_pkey" PRIMARY KEY ("skill_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_uuid_key" ON "public"."skills"("uuid");

-- CreateIndex
CREATE INDEX "idx_skills_type" ON "public"."skills"("type");

-- CreateIndex
CREATE INDEX "idx_skills_deleted_at" ON "public"."skills"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "skill_users_uuid_key" ON "public"."skill_users"("uuid");

-- CreateIndex
CREATE INDEX "idx_skill_users_user_id" ON "public"."skill_users"("user_id");

-- CreateIndex
CREATE INDEX "idx_skill_users_skill_id" ON "public"."skill_users"("skill_id");

-- CreateIndex
CREATE INDEX "idx_skill_users_deleted_at" ON "public"."skill_users"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "unique_user_skill" ON "public"."skill_users"("user_id", "skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "public"."sessions"("token");

-- CreateIndex
CREATE INDEX "idx_sessions_expires_at" ON "public"."sessions"("expires_at");

-- AddForeignKey
ALTER TABLE "public"."skill_users" ADD CONSTRAINT "fk_skill_users_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."skill_users" ADD CONSTRAINT "fk_skill_users_skill" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("skill_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "public"."sessions_user_id_idx" RENAME TO "idx_sessions_user_id";
