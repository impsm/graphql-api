/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.21-0ubuntu0.20.04.4 : Database - TESTDATA_DB
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`TESTDATA_DB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

/*Table structure for table `getmovies` */

DROP TABLE IF EXISTS `getmovies`;

CREATE TABLE `getmovies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_name` varchar(255) NOT NULL,
  `release_year` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Table structure for table `getmovies_reviews` */

DROP TABLE IF EXISTS `getmovies_reviews`;

CREATE TABLE `getmovies_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `rating` float DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `getmovies_reviews_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `getmovies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
