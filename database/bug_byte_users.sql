-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 26, 2018 at 09:36 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bug_byte_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `bug_byte_users`
--

CREATE TABLE `bug_byte_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bug_byte_users`
--

INSERT INTO `bug_byte_users` (`id`, `username`, `password`, `type`, `created_at`) VALUES
(4, 'eli', '$2y$10$ZupKIHmzb7Zj2GY2sj.3QuabBHkqX1.NfDEru1a26fZ/3lVHh3mii', 'developer', NULL),
(6, 'casey', '$2y$10$NKxoVMsubY2ryA2IFiFdyu.uQEJ6X2EnTQO1s0t5wABv7vizABm52', 'manager', NULL),
(7, 'paul', '$2y$10$9o8z5PHP9wwOURqVpDmpHOvJKc1qmHZqupIGvgaW7PahDjkEDq9PO', 'client', NULL),
(8, 'eli2', '$2y$10$9Cnp3D8JmzA4L9ozF8vtdeDYCciWqvnJQr4GVoUFevmqbIYC4Zdny', 'developer', NULL),
(9, 'paul2', '$2y$10$ah.xRBtZq47E3PNIZbaE6.BOV2IXY2DTZ2QV//rLlIc7hQ2oZO.Ui', 'client', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bug_byte_users`
--
ALTER TABLE `bug_byte_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bug_byte_users`
--
ALTER TABLE `bug_byte_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
