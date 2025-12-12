-- CreateTable
CREATE TABLE "public"."sessions" (
    "session_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_agent" VARCHAR(500),
    "ip_address" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_uuid_key" ON "public"."sessions"("uuid");

-- CreateIndex
CREATE INDEX "idx_sessions_user_id" ON "public"."sessions"("user_id");

-- CreateIndex
CREATE INDEX "idx_sessions_expires_at" ON "public"."sessions"("expires_at");

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "fk_sessions_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
