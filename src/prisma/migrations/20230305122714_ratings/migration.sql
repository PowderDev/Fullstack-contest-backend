-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "facilityId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_facilityId_key" ON "Rating"("facilityId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "SportsFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
