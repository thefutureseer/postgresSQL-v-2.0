/*
  Warnings:

  - You are about to drop the column `needId` on the `car_rides` table. All the data in the column will be lost.
  - You are about to drop the `NeedToEase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `need_id` to the `car_rides` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NeedToEase" DROP CONSTRAINT "NeedToEase_user_id_fkey";

-- DropForeignKey
ALTER TABLE "car_rides" DROP CONSTRAINT "car_rides_needId_fkey";

-- DropForeignKey
ALTER TABLE "car_rides" DROP CONSTRAINT "car_rides_user_id_fkey";

-- AlterTable
ALTER TABLE "car_rides" DROP COLUMN "needId",
ADD COLUMN     "need_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "NeedToEase";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "need_to_ease" (
    "id" SERIAL NOT NULL,
    "need_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "need_to_ease_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "car_rides" ADD CONSTRAINT "car_rides_need_id_fkey" FOREIGN KEY ("need_id") REFERENCES "need_to_ease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_rides" ADD CONSTRAINT "car_rides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "need_to_ease" ADD CONSTRAINT "need_to_ease_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
