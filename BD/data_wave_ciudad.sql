CREATE DATABASE  IF NOT EXISTS `data_wave` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `data_wave`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: data_wave
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `departamentoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departamentoId` (`departamentoId`),
  CONSTRAINT `ciudad_ibfk_1` FOREIGN KEY (`departamentoId`) REFERENCES `departamento` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'SANTA ROSA DE CALAMUCHITA',1),(2,'LA CRUZ',1),(3,'LOS REARTES',1),(4,'LA CALERA',2),(5,'RÍO CEBALLOS',2),(6,'CAPITAL',2),(7,'AGUA DE ORO',3),(8,'COLONIA CAROYA',3),(9,'MALVINA ARGENTINAS',3),(10,'CRUZ DEL EJE',4),(11,'CRUZ DE CAÑA',4),(12,'SAN MARCOS SIERRA',4),(13,'VILLA HUIDOBRO',5),(14,'JOVITA',6),(15,'JUAREZ CELMAN',8),(16,'INRIVILLE',9),(17,'VILLA CARLOS PAZ',13),(18,'LA FALDA',13),(19,'CAPILLA DEL MONTE',13),(20,'RÍO CUARTO',14),(21,'VICUÑA MAKENA',14),(22,'ALCIRA GIGENA',14),(23,'VILLA SANTA ROSA',15),(24,'LA PARA',15),(25,'RIO SEGUNDO',17),(26,'LAGUNA  LARGA',17),(27,'POZO DEL MOLLE',17),(28,'FREYRE',20),(29,'ARROYITO',20),(30,'RÍO TERCERO',23),(31,'OLIVA',23),(32,'TANCACHA',23),(33,'VILLA DEL TOTORAL',24),(34,'TOTORAL',24),(35,'VILLA TULUMBA',25),(36,'BELL VILLE',26),(37,'NOETINGER',26),(38,'MORRISON',26);
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 19:19:58
