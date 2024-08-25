-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_rides" (
    "id" SERIAL NOT NULL,
    "needs" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "needId" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "car_rides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NeedToEase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "NeedToEase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "car_rides" ADD CONSTRAINT "car_rides_needId_fkey" FOREIGN KEY ("needId") REFERENCES "NeedToEase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_rides" ADD CONSTRAINT "car_rides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeedToEase" ADD CONSTRAINT "NeedToEase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
