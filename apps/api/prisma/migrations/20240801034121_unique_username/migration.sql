/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `clients_username_key` ON `clients`(`username`);
