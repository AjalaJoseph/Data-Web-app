/*
  Warnings:

  - You are about to drop the column `apiprice` on the `datasource` table. All the data in the column will be lost.
  - You are about to drop the column `connectCode` on the `datasource` table. All the data in the column will be lost.
  - You are about to drop the column `planType` on the `datasource` table. All the data in the column will be lost.
  - You are about to drop the column `sellingPrice` on the `datasource` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `datasource` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `datasource` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planId]` on the table `Datasource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Datasource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Datasource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Datasource` table without a default value. This is not possible if the table is not empty.
  - Made the column `validity` on table `datasource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `datasource_connectCode_key` ON `datasource`;

-- AlterTable
ALTER TABLE `datasource` DROP COLUMN `apiprice`,
    DROP COLUMN `connectCode`,
    DROP COLUMN `planType`,
    DROP COLUMN `sellingPrice`,
    DROP COLUMN `size`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `planId` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `validity` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Datasource_planId_key` ON `Datasource`(`planId`);
