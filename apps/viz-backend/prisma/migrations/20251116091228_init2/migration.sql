-- CreateEnum
CREATE TYPE "public"."device_type" AS ENUM ('MOBILE', 'DESKTOP', 'TABLET', 'TV', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."contact_type" AS ENUM ('EMAIL', 'PHONE', 'LINKEDIN', 'GITHUB', 'TWITTER', 'INSTAGRAM', 'RESUME', 'WEBSITE', 'DISCORD', 'FACEBOOK', 'TIKTOK', 'YOUTUBE');

-- CreateEnum
CREATE TYPE "public"."language_code" AS ENUM ('ES', 'EN', 'FR', 'PT');

-- CreateEnum
CREATE TYPE "public"."hero_greeting_status" AS ENUM ('DRAFT', 'PREVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."payment_source_type" AS ENUM ('BANK', 'CRYPTO', 'PSP', 'WALLET', 'OTHER');

-- CreateTable
CREATE TABLE "public"."contacts" (
    "contact_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "link" VARCHAR(500) NOT NULL,
    "type" "public"."contact_type" NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "icon_path" VARCHAR(255),
    "display_text" VARCHAR(255),
    "class_name" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "public"."payment_sources" (
    "payment_source_id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "type" "public"."payment_source_type" NOT NULL DEFAULT 'OTHER',
    "code" VARCHAR(50),
    "logo_path" VARCHAR(255),
    "website" VARCHAR(255),
    "country_code" VARCHAR(100),
    "metadata" JSONB,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "payment_sources_pkey" PRIMARY KEY ("payment_source_id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "payment_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_source_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "link" VARCHAR(500),
    "title" VARCHAR(100) NOT NULL,
    "display_text" VARCHAR(255),
    "class_name" VARCHAR(255),
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "public"."hero_greetings" (
    "hero_greeting_id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "footer" TEXT NOT NULL,
    "language" "public"."language_code" NOT NULL,
    "device" "public"."device_type" NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hero_greetings_pkey" PRIMARY KEY ("hero_greeting_id")
);

-- CreateTable
CREATE TABLE "public"."nav_links" (
    "nav_link_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" VARCHAR(255) NOT NULL,
    "language" "public"."language_code" NOT NULL,
    "class_name" VARCHAR(255),
    "url" VARCHAR(70) NOT NULL DEFAULT '#',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nav_links_pkey" PRIMARY KEY ("nav_link_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_uuid_key" ON "public"."contacts"("uuid");

-- CreateIndex
CREATE INDEX "idx_contacts_deleted_at" ON "public"."contacts"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_contacts_sort_order" ON "public"."contacts"("sort_order");

-- CreateIndex
CREATE INDEX "idx_contacts_user_id" ON "public"."contacts"("user_id");

-- CreateIndex
CREATE INDEX "idx_contacts_uuid" ON "public"."contacts"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "payment_sources_uuid_key" ON "public"."payment_sources"("uuid");

-- CreateIndex
CREATE INDEX "idx_payment_sources_type" ON "public"."payment_sources"("type");

-- CreateIndex
CREATE INDEX "idx_payment_sources_deleted_at" ON "public"."payment_sources"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "payments_uuid_key" ON "public"."payments"("uuid");

-- CreateIndex
CREATE INDEX "idx_payments_deleted_at" ON "public"."payments"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_payments_sort_order" ON "public"."payments"("sort_order");

-- CreateIndex
CREATE INDEX "idx_payments_user_id" ON "public"."payments"("user_id");

-- CreateIndex
CREATE INDEX "idx_payments_uuid" ON "public"."payments"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "hero_greetings_uuid_key" ON "public"."hero_greetings"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "nav_links_uuid_key" ON "public"."nav_links"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "public"."users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."contacts" ADD CONSTRAINT "fk_contacts_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "fk_payments_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "fk_payments_payment_source" FOREIGN KEY ("payment_source_id") REFERENCES "public"."payment_sources"("payment_source_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hero_greetings" ADD CONSTRAINT "fk_hero_greeting_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nav_links" ADD CONSTRAINT "fk_nav_links_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
