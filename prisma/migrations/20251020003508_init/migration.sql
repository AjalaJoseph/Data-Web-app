-- CreateTable
CREATE TABLE `datasource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `network` VARCHAR(191) NOT NULL,
    `planType` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `validity` VARCHAR(191) NULL,
    `apiprice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `connectCode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
