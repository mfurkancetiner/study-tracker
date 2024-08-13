/*
  Warnings:

  - You are about to drop the column `breakEnds` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `breakStarts` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "breakEnds",
DROP COLUMN "breakStarts",
ADD COLUMN     "durationWithOvertime" INTEGER;
