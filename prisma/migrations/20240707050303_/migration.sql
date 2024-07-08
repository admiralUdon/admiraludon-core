/*
  Warnings:

  - You are about to drop the column `remarks` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `remarks` to the `UserSkill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "remarks";

-- AlterTable
ALTER TABLE "UserSkill" ADD COLUMN     "remarks" TEXT NOT NULL;
