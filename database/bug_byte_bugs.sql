-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 26, 2018 at 09:35 AM
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
-- Table structure for table `bug_byte_bugs`
--

CREATE TABLE `bug_byte_bugs` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Severity` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Description` text COLLATE utf8_bin,
  `Program` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Browser` int(11) DEFAULT NULL,
  `DateTime` datetime DEFAULT NULL,
  `progress` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `developer` varchar(255) COLLATE utf8_bin NOT NULL,
  `tester` varchar(255) COLLATE utf8_bin NOT NULL,
  `creator` varchar(255) COLLATE utf8_bin NOT NULL,
  `history` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bug_byte_bugs`
--

INSERT INTO `bug_byte_bugs` (`id`, `Name`, `Type`, `Severity`, `Description`, `Program`, `Browser`, `DateTime`, `progress`, `developer`, `tester`, `creator`, `history`) VALUES
(52, 'test1', 'Syntax Error', 'Low', 'test1', 'test1', 0, NULL, 'Completed', 'eli', 'eli', 'paul', '\"created\": \"2018-11-24 08:00:58pm\", \"DevAssigned\": \"2018-11-24 08:02:31pm\", \"TesterAssigned\": \"2018-11-24 08:02:57pm\", \"progress\": \"2018-11-24 08:07:41pm\", \"progress\": \"2018-11-24 08:08:23pm\"'),
(53, 'test2', 'Syntax Error', 'Low', 'test2', 'test2', 0, NULL, 'Completed', 'eli2', 'eli2', 'paul', '\"created\": \"2018-11-24 08:01:07pm\", \"DevAssigned\": \"2018-11-24 08:02:36pm\", \"TesterAssigned\": \"2018-11-24 08:03:07pm\", \"progress\": \"2018-11-24 08:11:00pm\", \"progress\": \"2018-11-24 08:11:02pm\"'),
(54, 'test3', 'Syntax Error', 'Low', 'test3', 'test3', 0, NULL, 'Not Started', 'eli2', '', 'paul2', '\"created\": \"2018-11-24 08:43:38pm\", \"DevAssigned\": \"2018-11-24 08:44:27pm\"'),
(55, 'test5', 'Syntax Error', 'Low', 'test5', 'test5', 0, NULL, 'Not Started', 'eli2', 'eli', 'paul', '\"created\": \"2018-11-26 06:35:43am\", \"DevAssigned\": \"2018-11-26 06:36:03am\", \"TesterAssigned\": \"2018-11-26 06:36:07am\"');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bug_byte_bugs`
--
ALTER TABLE `bug_byte_bugs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bug_byte_bugs`
--
ALTER TABLE `bug_byte_bugs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
