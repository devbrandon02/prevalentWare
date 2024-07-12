/*
  Warnings:

  - You are about to drop the `Movement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_userId_fkey";

-- DropTable
DROP TABLE "Movement";

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "concept" TEXT,
    "amount" DOUBLE PRECISION,
    "type" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
