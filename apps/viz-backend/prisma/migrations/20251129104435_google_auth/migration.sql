/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "name",
ADD COLUMN     "first_name" VARCHAR(60),
ADD COLUMN     "last_name" VARCHAR(60),
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'google',
ADD COLUMN     "username" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");
