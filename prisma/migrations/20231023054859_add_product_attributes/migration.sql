/*
  Warnings:

  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weightUnit` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "weight",
DROP COLUMN "weightUnit",
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ProductAttribute" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "weightUnit" TEXT NOT NULL,
    "originPrice" INTEGER NOT NULL,
    "discountPercent" INTEGER NOT NULL,
    "discountPrice" INTEGER NOT NULL,
    "discountDueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAttribute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductAttribute" ADD CONSTRAINT "ProductAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
