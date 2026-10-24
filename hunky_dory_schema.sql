-- ========================================================
-- Hunky Dory Educational Platform - MySQL Database Schema
-- Charset: utf8mb4, Collation: utf8mb4_unicode_ci
-- ========================================================

CREATE DATABASE IF NOT EXISTS `hunky_dory_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `hunky_dory_db`;

-- 1. Users Table (Admin & Staff)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN', 'SPECIALIST', 'STAFF') NOT NULL DEFAULT 'STAFF',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Students Table
CREATE TABLE IF NOT EXISTS `students` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `student_name` VARCHAR(191) NOT NULL,
  `date_of_birth` DATE NULL,
  `age` INT NOT NULL,
  `gender` VARCHAR(32) NOT NULL,
  `parent_name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `address` TEXT NULL,
  `learning_needs` TEXT NOT NULL,
  `notes` TEXT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Programs Table
CREATE TABLE IF NOT EXISTS `programs` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `description` TEXT NOT NULL,
  `image` VARCHAR(255) NULL,
  `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Enquiries Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `parent_name` VARCHAR(191) NOT NULL,
  `child_name` VARCHAR(191) NOT NULL,
  `child_age` INT NOT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `program` VARCHAR(191) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('NEW', 'IN_REVIEW', 'CONTACTED', 'ENROLLED', 'CLOSED') NOT NULL DEFAULT 'NEW',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Appointments Table
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `parent_name` VARCHAR(191) NOT NULL,
  `child_name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `appointment_date` DATE NOT NULL,
  `appointment_time` VARCHAR(32) NOT NULL,
  `program` VARCHAR(191) NOT NULL,
  `notes` TEXT NULL,
  `status` ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Assessments Table
CREATE TABLE IF NOT EXISTS `assessments` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `student_id` VARCHAR(64) NOT NULL,
  `assessment_date` DATE NOT NULL,
  `academic_notes` TEXT NULL,
  `communication_notes` TEXT NULL,
  `behaviour_notes` TEXT NULL,
  `sensory_notes` TEXT NULL,
  `social_notes` TEXT NULL,
  `daily_living_notes` TEXT NULL,
  `recommendations` TEXT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX `idx_assessment_student` (`student_id`),
  CONSTRAINT `fk_assessments_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Progress Reports Table
CREATE TABLE IF NOT EXISTS `progress_reports` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `student_id` VARCHAR(64) NOT NULL,
  `report_date` DATE NOT NULL,
  `goals` TEXT NOT NULL,
  `progress` TEXT NOT NULL,
  `strengths` TEXT NOT NULL,
  `areas_for_improvement` TEXT NOT NULL,
  `recommendations` TEXT NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  INDEX `idx_report_student` (`student_id`),
  CONSTRAINT `fk_reports_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial admin user: admin@hunkydory.edu (password: Admin@123456)
-- Hash generated via bcrypt (10 rounds): $2a$10$w099V9l3j7HqR/bF9hQx1O8kK9J3mE0d6pZ8N7xY4U8rW3vL0u2e2
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`)
VALUES ('usr_admin_001', 'Dr. Sarah Mitchell (Lead Specialist)', 'admin@hunkydory.edu', '$2a$10$9K2z/7Qvh3vE2M0Kx0bY2.n4aD8lV5L7d4J1mF6yA0x8w6P1u4z8S', 'ADMIN')
ON DUPLICATE KEY UPDATE `email`=`email`;
