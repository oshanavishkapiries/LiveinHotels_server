-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `user_type` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `date_of_birth` DATETIME(3) NULL,
    `login_with` VARCHAR(191) NULL,
    `facebook_id` VARCHAR(191) NULL,
    `twitter_id` VARCHAR(191) NULL,
    `google_id` VARCHAR(191) NULL,
    `about` VARCHAR(191) NULL,
    `status` ENUM('active', 'deleted') NOT NULL DEFAULT 'active',
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modified` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_facebook_id_key`(`facebook_id`),
    UNIQUE INDEX `users_twitter_id_key`(`twitter_id`),
    UNIQUE INDEX `users_google_id_key`(`google_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
