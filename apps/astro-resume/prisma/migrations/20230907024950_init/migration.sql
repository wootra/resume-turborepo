-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
