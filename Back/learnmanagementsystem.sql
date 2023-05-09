-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2023 at 04:15 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learnmanagementsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `name` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `image` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`name`, `status`, `image`, `id`, `code`, `description`) VALUES
('cyber security', 'active', 'url', 1, 'IT-548', 'phkjfmfmfbio dfgsdfg'),
('Is', 'active', 'url', 2, 'cs:12', ''),
('MiS', 'active', 'url', 3, 'Is:88', ''),
('SW', 'active', 'url', 4, 'cs:512', ''),
('Software 4', 'active', '1680986318315.jpg', 9, 'CS-1244', 'haakna matata haakna mata'),
('Software 4', 'active', '1680986319496.jpg', 10, 'CS-1244', 'haakna matata haakna mata'),
('Software 4', 'active', '1680986320348.jpg', 11, 'CS-1244', 'haakna matata haakna mata'),
('Software 4', 'active', '1680986321310.jpg', 12, 'CS-1244', 'haakna matata haakna mata'),
('Software 4', 'active', '1680987022468.jpg', 13, 'CS-1244', 'haakna matata haakna mata');

-- --------------------------------------------------------

--
-- Table structure for table `course_instructors`
--

CREATE TABLE `course_instructors` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `instructorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course_instructors`
--

INSERT INTO `course_instructors` (`id`, `courseId`, `instructorId`) VALUES
(2, 1, 11),
(4, 3, 11),
(7, 4, 11),
(10, 13, 46),
(15, 9, 40);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`id`, `studentId`, `courseId`, `grade`) VALUES
(1, 48, 13, 100),
(20, 48, 12, 18),
(24, 36, 9, 80),
(25, 8, 4, 60);

-- --------------------------------------------------------

--
-- Table structure for table `lession`
--

CREATE TABLE `lession` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `contant` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lession`
--

INSERT INTO `lession` (`id`, `courseId`, `title`, `contant`) VALUES
(12, 2, 'Information', '1681187941052.mp4'),
(13, 2, 'Information', '1681188631813.mp4');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'instructor'),
(3, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `status` varchar(11) NOT NULL DEFAULT 'active',
  `roleId` int(11) NOT NULL DEFAULT 3,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `roleId`, `token`) VALUES
(8, 'ali', 'ali@gmail.com', '7532148', 10874563, 'active', 3, 'ahosdfodqe'),
(11, 'amr', 'amt@gmail.com', '9512478', 158745236, 'active', 2, 'ijbvfredc'),
(12, 'mohammed', 'mohammed21@gmail.com', 'k8745555141', 111874563, 'active', 3, 'okmoihlpijh'),
(13, 'Mohammed', 'mohammed@gmail.com', '1212121212', 15615615, 'active', 2, 'srvdfwefwve'),
(32, 'admin-admin', 'admin@admin.com', '$2b$10$FVTUbOhU7jfj3ZaQ4hF11./5cEMV9P2eKFBAEyzz3YCC6m/XiA/Hi', 0, 'active', 1, 'bab352ebe250c93e49c69543d0527874'),
(35, 'mohauhsdsdasd', 'mghmhm@yahoo.com', '$2b$10$KmfMQvu6eUiop9j6Jw4nKe4HMlx5lm1pkAek1Dj5FHieTaL3f1LbK', 2147483647, 'active', 2, '9ebf84a42b1c1bd9ad6b42ec58ea62af'),
(36, 'mohauhsdsdasd', 'mghmhm@yahoo.com', '987654321', 2147483647, 'active', 3, '502f888fa1de351aad7a86fadfe1ddb0'),
(37, 'ahmed mohamemd', 'ahmed123@yahoo.com', '1478521245', 147852369, 'active', 2, '42b7e6903fe5d96d39e72b81ef308e4a'),
(38, 'mohauhsdsdasd', 'mghmhm@yahoo.com', '987654321', 2147483647, 'active', 2, '9ae6c2c1b3f8030807f5328cc4432862'),
(39, 'mohauhsdsdasd', 'mghmhm@yahoo.com', '987654321', 2147483647, 'active', 2, '2ad75c43815f16b2490005f1d01a05eb'),
(40, 'mohauhsdsdasd', 'mghmhm25@yahoo.com', '987654321', 2147483647, 'active', 2, 'b0fd6e5548a6f261bfa3497349bbe9fa'),
(42, 'mohauhsdsdasd', 'mghmhm@yahoo.com', '$2b$10$Ntt.TSysk.yLjOSP6Jinb.MVR4zO6O/rd0h6HQPbPEreqbabZm/6e', 2147483647, 'active', 2, '2f8fbafd7febe995f2ec1f025070c098'),
(43, 'mohauhsdsdasd', 'ppppp@yahoo.com', '$2b$10$ykilDuLrYGkbNPNOcOH.uOrfFGn7dppAANLhcQ1gWl1P.OZ/wY4Qi', 2147483647, 'active', 2, '9727b3375f4d5538e84aa5416febc42c'),
(44, 'mohauhsdsdasd', 'ppppp@yahoo.com', '$2b$10$6plbdQNw.VZOvoEnmsZ8ZeZ2xeTauZFLbFYvbDZiTogQpQ8//EYc2', 2147483647, 'active', 2, '73c50d7c15306ea0e45686ade085fc19'),
(45, 'mohauhsdsdasd', 'ppppp@yahoo.com', '$2b$10$vyQPQs8n37W5pXkPA7AEpupNpJP99YT5F7SeP89bEmxa8KQr/I.1e', 2147483647, 'active', 2, '742466a3edd0d6030b937ccdacf621fb'),
(46, 'mohauhsdsdasd', 'ppppp@yahoo.com', '$2b$10$OnteR7KaZ/RcY2g1GKDCNOeLXNZElROCaUfIAMfOjf.12MhgtQf9C', 2147483647, 'active', 2, '61764a9970194743e7b3609fc8da8aa5'),
(47, 'mohauhsdsdasd', 'ppppp@yahoo.com', '$2b$10$8ee0UmeDgT2vteElxuD7Z.uXvFepQw5E6kstNp8lvfDM2QjNGDl/W', 2147483647, 'active', 3, '5a8c318971d1a4f2647557fdb47a7e99'),
(48, 'mohauhsdsdasd', 'llll@yahoo.com', '$2b$10$oDHhunvtFeWTX39/Mj../edU/I0ymlRrPLXmfnV0kqjDPnH5yhDY.', 2147483647, 'active', 3, '92f922cd9bd02a04903212043ddb4d44'),
(49, 'ahmed mohamemd', 'ahmed123@yahoo.com', '$2b$10$pWjzYGOkpDu9cFy7SHbsEe2Uf4HSl6AQMqg4eJRs2t0b1JH23C.uS', 147852369, 'active', 2, '1424c3d7f17e50c4a2099e39a12b2c6a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_instructors`
--
ALTER TABLE `course_instructors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`),
  ADD KEY `instructorId` (`instructorId`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `lession`
--
ALTER TABLE `lession`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_ibfk_1` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `course_instructors`
--
ALTER TABLE `course_instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `lession`
--
ALTER TABLE `lession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_instructors`
--
ALTER TABLE `course_instructors`
  ADD CONSTRAINT `course_instructors_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `course_instructors_ibfk_2` FOREIGN KEY (`instructorId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lession`
--
ALTER TABLE `lession`
  ADD CONSTRAINT `lession_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
