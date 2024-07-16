/*
  Warnings:

  - You are about to drop the `card_translate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `card_translate` DROP FOREIGN KEY `card_translate_card_id_fkey`;

-- DropTable
DROP TABLE `card_translate`;

-- CreateTable
CREATE TABLE `cards_translates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_id` INTEGER NOT NULL,
    `card_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cards_translates` ADD CONSTRAINT `cards_translates_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
