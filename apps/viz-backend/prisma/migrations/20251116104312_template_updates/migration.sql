-- CreateEnum
CREATE TYPE "public"."template_type" AS ENUM ('BASIC', 'PROFESSIONAL', 'CREATIVE', 'MODERN', 'MINIMALIST');

-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED', 'PREVIEW', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "public"."sections" AS ENUM ('HERO_GREETING', 'ABOUT', 'CONTACTS', 'PORTFOLIO', 'TESTIMONIALS', 'BLOG', 'SERVICES', 'PRICING', 'FAQ', 'FOOTER', 'PAYMENTS');

-- CreateTable
CREATE TABLE "public"."templates" (
    "template_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "type" "public"."template_type" NOT NULL,
    "preview_image" VARCHAR(255),
    "description" VARCHAR(500),
    "status" "public"."status" NOT NULL,
    "theme_color" VARCHAR(30),
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("template_id")
);

-- CreateTable
CREATE TABLE "public"."template_sections" (
    "template_section_id" SERIAL NOT NULL,
    "template_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "section" "public"."sections" NOT NULL,
    "content" JSONB,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."status",

    CONSTRAINT "template_sections_pkey" PRIMARY KEY ("template_section_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "templates_uuid_key" ON "public"."templates"("uuid");

-- CreateIndex
CREATE INDEX "idx_templates_type" ON "public"."templates"("type");

-- CreateIndex
CREATE INDEX "idx_templates_deleted_at" ON "public"."templates"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "template_sections_uuid_key" ON "public"."template_sections"("uuid");

-- CreateIndex
CREATE INDEX "idx_template_sections_template_id" ON "public"."template_sections"("template_id");

-- AddForeignKey
ALTER TABLE "public"."templates" ADD CONSTRAINT "fk_templates_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."template_sections" ADD CONSTRAINT "fk_template_sections_template" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("template_id") ON DELETE RESTRICT ON UPDATE CASCADE;
