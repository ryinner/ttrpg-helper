/*
  Warnings:

  - A unique constraint covering the columns `[card_id,language_id]` on the table `cards_translates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cards_translates_card_id_language_id_key` ON `cards_translates`(`card_id`, `language_id`);
