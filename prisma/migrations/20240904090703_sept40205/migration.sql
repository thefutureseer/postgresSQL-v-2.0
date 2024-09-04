/*
  Warnings:

  - Added the required column `password` to the `spiritualleader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spiritualleader" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL;
