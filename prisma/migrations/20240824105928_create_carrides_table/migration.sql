/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CarRides" (
    "id" SERIAL NOT NULL,
    "needs" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CarRides_pkey" PRIMARY KEY ("id")
);
