-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2025 at 09:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `blood_tests`
--

-- --------------------------------------------------------

--
-- Table structure for table `hosts`
--

CREATE TABLE `hosts` (
                         `id` int(11) NOT NULL,
                         `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `hosts`
--

INSERT INTO `hosts` (`id`, `name`) VALUES
                                       (1, 'mohammad'),
                                       (2, 'soso'),
                                       (3, 'teto'),
                                       (4, 'belal'),
                                       (5, 'abolel');

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
                         `id` int(11) NOT NULL,
                         `host_id` int(11) NOT NULL,
                         `high_v` int(11) NOT NULL,
                         `low_v` int(11) NOT NULL,
                         `heart_r` int(11) NOT NULL,
                         `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `host_id`, `high_v`, `low_v`, `heart_r`, `date`) VALUES
                                                                                (9, 1, 600, 200, 115, '0000-00-00'),
                                                                                (10, 1, 600, 200, 115, '0000-00-00'),
                                                                                (11, 1, 600, 200, 115, '0000-00-00'),
                                                                                (12, 1, 600, 200, 115, '0000-00-00'),
                                                                                (13, 1, 600, 200, 115, '2025-02-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hosts`
--
ALTER TABLE `hosts`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
    ADD PRIMARY KEY (`id`),
  ADD KEY `tests_fk1` (`host_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hosts`
--
ALTER TABLE `hosts`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tests`
--
ALTER TABLE `tests`
    ADD CONSTRAINT `tests_fk1` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`id`);
COMMIT;
