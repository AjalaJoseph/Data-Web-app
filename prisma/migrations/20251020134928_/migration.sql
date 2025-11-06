/*
  Warnings:

  - Added the required column `sellingprice` to the `Datasource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `datasource` ADD COLUMN `sellingprice` DOUBLE NOT NULL;
