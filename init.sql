CREATE TABLE `admins` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` TEXT NOT NULL,
    `active` BOOLEAN DEFAULT true,
    PRIMARY KEY (`id`)
)