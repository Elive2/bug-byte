-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 05, 2018 at 11:31 PM
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
-- Table structure for table `bugs_dev`
--

CREATE TABLE `bugs_dev` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Severity` int(11) DEFAULT NULL,
  `Description` text COLLATE utf8_bin,
  `Program` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Browser` int(11) DEFAULT NULL,
  `FirstName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LastName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DateTime` datetime DEFAULT NULL,
  `progress` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bugs_dev`
--

INSERT INTO `bugs_dev` (`id`, `Name`, `Type`, `Severity`, `Description`, `Program`, `Browser`, `FirstName`, `LastName`, `DateTime`, `progress`) VALUES
(1, 'ecampus class not visible', 0, 2, 'couldn\'t find class on ecampus', 'ecampus', 0, 'Eli', 'Yale', NULL, 'In Progress'),
(2, 'Eli bug', 0, 0, 'test', 'test program', 0, 'Eli', 'Yale', NULL, 'Not Started'),
(3, 'Paul', 0, 0, ' Test bug', ' ecampus', 0, 'Paul', 'Jin', NULL, 'Not Started'),
(4, 'Casey', 0, 0, ' test 3', ' camino', 0, 'Casey', 'Xeureb', NULL, 'Not Started'),
(5, 'cool bug', 0, 0, ' cool bug test', ' peoplesoft', 0, NULL, NULL, NULL, 'Not Started');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bugs_dev`
--
ALTER TABLE `bugs_dev`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bugs_dev`
--
ALTER TABLE `bugs_dev`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
