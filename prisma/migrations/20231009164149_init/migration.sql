/*
  Warnings:

  - Made the column `description` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;
