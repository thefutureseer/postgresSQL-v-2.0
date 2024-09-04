/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `car_rides` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `need_to_ease` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "contactmethod" AS ENUM ('phone_call', 'text_message', 'video_call', 'in_person');

-- CreateEnum
CREATE TYPE "orderstatus" AS ENUM ('pending', 'completed', 'canceled', 'resumed_later');

-- CreateEnum
CREATE TYPE "role_type" AS ENUM ('user', 'spiritual_leader', 'spiritual_leader_admin', 'super_admin', 'moderator', 'support');

-- DropForeignKey
ALTER TABLE "car_rides" DROP CONSTRAINT "car_rides_need_id_fkey";

-- DropForeignKey
ALTER TABLE "car_rides" DROP CONSTRAINT "car_rides_user_id_fkey";

-- DropForeignKey
ALTER TABLE "need_to_ease" DROP CONSTRAINT "need_to_ease_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "created_at",
DROP COLUMN "password",
DROP COLUMN "updated_at",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "interactions" JSONB,
ADD COLUMN     "phonenumber" TEXT,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "profilepicture" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "role" "role_type" NOT NULL DEFAULT 'user',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- DropTable
DROP TABLE "car_rides";

-- DropTable
DROP TABLE "need_to_ease";

-- CreateTable
CREATE TABLE "spiritualleader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expertise" TEXT,
    "bio" TEXT,
    "profilepicture" TEXT,
    "contactinfo" TEXT,
    "rating" DOUBLE PRECISION,
    "tags" TEXT[],
    "interactions" JSONB,
    "role" "role_type" NOT NULL DEFAULT 'spiritual_leader',
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spiritualleader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "spiritualleaderid" TEXT NOT NULL,
    "problemtosolve" TEXT NOT NULL,
    "experiencewanted" TEXT NOT NULL,
    "tags" TEXT[],
    "contactvia" "contactmethod" NOT NULL,
    "status" "orderstatus" NOT NULL DEFAULT 'pending',
    "statushistory" JSONB,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "experienceid" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "spiritualleaderid" TEXT NOT NULL,
    "problemtosolve" TEXT NOT NULL,
    "experiencewanted" TEXT NOT NULL,
    "tags" TEXT[],
    "statushistory" JSONB,
    "contactvia" "contactmethod" NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback" JSONB,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_orderexperiences" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "order_experienceid_key" ON "order"("experienceid");

-- CreateIndex
CREATE UNIQUE INDEX "_orderexperiences_AB_unique" ON "_orderexperiences"("A", "B");

-- CreateIndex
CREATE INDEX "_orderexperiences_B_index" ON "_orderexperiences"("B");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_spiritualleaderid_fkey" FOREIGN KEY ("spiritualleaderid") REFERENCES "spiritualleader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_spiritualleaderid_fkey" FOREIGN KEY ("spiritualleaderid") REFERENCES "spiritualleader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orderexperiences" ADD CONSTRAINT "_orderexperiences_A_fkey" FOREIGN KEY ("A") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orderexperiences" ADD CONSTRAINT "_orderexperiences_B_fkey" FOREIGN KEY ("B") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
