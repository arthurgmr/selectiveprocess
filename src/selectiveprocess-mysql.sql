CREATE DATABASE selectiveprocessdb;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `cpf` text NOT NULL,
  `birth_date` text NOT NULL,
  `deficient` text NOT NULL,
  `cep` text NOT NULL,
  `address` text NOT NULL,
  `address_number` text NOT NULL,
  `address_complement` text,
  `address_district` text NOT NULL,
  `course_id` int NOT NULL,
  `college_id` int NOT NULL,
  `period_course` text NOT NULL,
  `func` text NOT NULL,
  `specialization_regular` text NOT NULL,
  `specialization_especial` text NOT NULL,
  `email` text NOT NULL,
  `phone1` text NOT NULL,
  `phone2` text,
  `password` text NOT NULL,
  `reset_token` text,
  `reset_token_expires` text,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `admin` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `reset_token` text,
  `reset_token_expires` text,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `courses` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL
);

CREATE TABLE `colleges` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL
);

CREATE TABLE `configs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `process_name` text NOT NULL,
  `edict_number` int NOT NULL,
  `date_edict` text NOT NULL,
  `inicial_date` text NOT NULL,
  `final_date` text NOT NULL,
  `declaration` text NOT NULL,
  `warnings` text
);

CREATE TABLE `classification_final` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `bith_date` text NOT NULL,
  `deficent` text NOT NULL,
  `couse_name` text NOT NULL,
  `period_course` text NOT NULL,
  `specialization` text NOT NULL
);

CREATE TABLE `classification_partial` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` text NOT NULL,
  `bith_date` text NOT NULL,
  `deficent` text NOT NULL,
  `couse_name` text NOT NULL,
  `period_course` text NOT NULL,
  `specialization` text NOT NULL
);

ALTER TABLE `users` ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`);
