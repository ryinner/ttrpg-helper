/*
  Warnings:

  - Added the required column `name_short` to the `table_top_role_playing_games_translates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `table_top_role_playing_games_translates` ADD COLUMN `name_short` VARCHAR(191) NOT NULL;
