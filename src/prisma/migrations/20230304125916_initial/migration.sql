-- CreateEnum
CREATE TYPE "IsActiveFacility" AS ENUM ('Y', 'N');

-- CreateTable
CREATE TABLE "SportsFacility" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "active" "IsActiveFacility" NOT NULL,
    "briefDescription" TEXT,
    "fullDescription" TEXT,
    "federalSubject" TEXT,
    "facilityAction" TEXT,
    "actionStartDate" TIMESTAMP(3),
    "actionEndDate" TIMESTAMP(3),
    "budget" BIGINT,
    "type" TEXT,
    "coord_x" DECIMAL(65,30),
    "coord_y" DECIMAL(65,30),
    "address" TEXT,

    CONSTRAINT "SportsFacility_pkey" PRIMARY KEY ("id")
);
