/*
  Warnings:

  - You are about to drop the column `name` on the `NeedToEase` table. All the data in the column will be lost.
  - Added the required column `needName` to the `NeedToEase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NeedToEase" DROP COLUMN "name",
ADD COLUMN     "needName" TEXT NOT NULL;
