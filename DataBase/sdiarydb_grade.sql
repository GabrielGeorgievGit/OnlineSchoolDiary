-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: sdiarydb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `id_grade` int unsigned NOT NULL AUTO_INCREMENT,
  `class` int NOT NULL,
  `grade` char(1) NOT NULL,
  `id_school` int unsigned NOT NULL,
  `id_class_teacher` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_grade`),
  KEY `idClassTeacher_idx` (`id_class_teacher`),
  KEY `idSchool_idx` (`id_school`),
  CONSTRAINT `idClassTeacher` FOREIGN KEY (`id_class_teacher`) REFERENCES `teacher` (`id_teacher`),
  CONSTRAINT `idSchoolGrade` FOREIGN KEY (`id_school`) REFERENCES `school` (`id_school`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (2,1,'a',9,NULL),(3,1,'b',9,NULL),(4,1,'c',9,NULL),(5,1,'d',9,NULL),(6,1,'e',9,2),(7,2,'a',9,NULL),(8,2,'b',9,NULL),(9,2,'c',9,NULL),(10,2,'d',9,NULL),(11,2,'e',9,NULL),(12,3,'a',9,3),(13,3,'b',9,NULL),(14,3,'c',9,NULL),(15,3,'d',9,NULL),(16,3,'e',9,NULL),(17,4,'a',9,NULL),(18,4,'b',9,NULL),(19,4,'c',9,NULL),(20,4,'d',9,NULL),(21,4,'e',9,NULL),(22,5,'a',9,NULL),(23,5,'b',9,NULL),(24,5,'c',9,NULL),(25,5,'d',9,NULL),(26,5,'e',9,NULL),(27,6,'a',9,4),(28,6,'b',9,NULL),(29,6,'c',9,NULL),(30,6,'d',9,NULL),(31,6,'e',9,NULL),(32,7,'a',9,NULL),(33,7,'b',9,NULL),(34,7,'c',9,NULL),(35,7,'d',9,NULL),(36,7,'e',9,NULL),(37,8,'a',9,NULL),(38,8,'b',9,NULL),(39,8,'c',9,NULL),(40,8,'d',9,NULL),(41,8,'e',9,NULL),(42,9,'a',9,NULL),(43,9,'b',9,NULL),(44,9,'c',9,NULL),(45,9,'d',9,NULL),(46,9,'e',9,NULL),(47,10,'a',9,NULL),(48,10,'b',9,NULL),(49,10,'c',9,NULL),(50,10,'d',9,NULL),(51,10,'e',9,NULL),(52,11,'a',9,NULL),(53,11,'b',9,NULL),(54,11,'c',9,NULL),(55,11,'d',9,NULL),(56,11,'e',9,NULL),(57,12,'a',9,NULL),(58,12,'b',9,NULL),(59,12,'c',9,NULL),(60,12,'d',9,NULL),(61,12,'e',9,NULL);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-30 17:51:06
