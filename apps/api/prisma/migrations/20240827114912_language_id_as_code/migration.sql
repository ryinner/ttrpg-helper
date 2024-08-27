/*
  Warnings:

  - The primary key for the `languages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `code` on the `languages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cards_translates` MODIFY `language_id` VARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE `collections_translates` MODIFY `language_id` VARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE `languages` DROP PRIMARY KEY,
    DROP COLUMN `code`,
    MODIFY `id` VARCHAR(2) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `table_top_role_playing_games_translates` MODIFY `language_id` VARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE `tags_translates` MODIFY `language_id` VARCHAR(2) NOT NULL;
