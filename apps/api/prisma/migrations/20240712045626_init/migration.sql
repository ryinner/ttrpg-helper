-- CreateTable
CREATE TABLE `languages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(2) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_top_role_playing_games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_top_role_playing_games_translates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_id` INTEGER NOT NULL,
    `table_top_role_playing_game_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `table_top_role_playing_games_translates_language_id_table_to_key`(`language_id`, `table_top_role_playing_game_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags_translates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `tags_translates_language_id_tag_id_key`(`language_id`, `tag_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards_collections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards_collections_translates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_id` INTEGER NOT NULL,
    `card_collection_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `cards_collections_translates_language_id_card_collection_id_key`(`language_id`, `card_collection_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `table_top_role_playing_games_translates` ADD CONSTRAINT `table_top_role_playing_games_translates_table_top_role_play_fkey` FOREIGN KEY (`table_top_role_playing_game_id`) REFERENCES `table_top_role_playing_games`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags_translates` ADD CONSTRAINT `tags_translates_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cards_collections_translates` ADD CONSTRAINT `cards_collections_translates_card_collection_id_fkey` FOREIGN KEY (`card_collection_id`) REFERENCES `cards_collections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
