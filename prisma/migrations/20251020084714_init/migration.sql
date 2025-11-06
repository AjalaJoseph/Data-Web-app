/*
  Warnings:

  - A unique constraint covering the columns `[connectCode]` on the table `datasource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `datasource_connectCode_key` ON `datasource`(`connectCode`);
