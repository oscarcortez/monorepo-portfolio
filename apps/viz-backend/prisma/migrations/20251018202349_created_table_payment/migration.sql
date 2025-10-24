-- CreateTable
CREATE TABLE "public"."payments" (
    "payment_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(100) NOT NULL,
    "display_text" VARCHAR(255),
    "link" VARCHAR(500),
    "icon_path" VARCHAR(255),
    "class_name" VARCHAR(255),
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "deleted_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

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

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "fk_payments_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
