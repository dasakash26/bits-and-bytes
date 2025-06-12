/*
  Warnings:

  - Made the column `userId` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_userId_fkey";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
