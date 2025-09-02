-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: peladinha
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `jogadores`
--

DROP TABLE IF EXISTS `jogadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `overall` int DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `jogos` int DEFAULT NULL,
  `assistencia` int DEFAULT NULL,
  `posicao` varchar(10) DEFAULT NULL,
  `altura` varchar(10) DEFAULT NULL,
  `gols` int DEFAULT NULL,
  `notaUltimoJogo` float DEFAULT NULL,
  `titulos` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogadores`
--

LOCK TABLES `jogadores` WRITE;
/*!40000 ALTER TABLE `jogadores` DISABLE KEYS */;
INSERT INTO `jogadores` VALUES (1,'Alvaro BH',91,22,6,2,'MEI','1.68m',12,0,5),(2,'Alvaro Cordeiro',84,22,10,2,'ZAG','1.70m',0,0,5),(3,'Athylon',89,21,35,23,'ATA','1.80m',89,0,5),(4,'Caio',84,21,18,22,'ATA','1.70m',17,0,5),(5,'Carlota',84,22,30,12,'ATA','1.70m',36,0,5),(6,'Cauã Soares',82,23,20,5,'ZAG','1.70m',14,0,5),(7,'Caua Xit',77,17,10,3,'ZAG','1.70m',9,0,5),(8,'Cristian',93,17,6,12,'MEI','1.70m',12,0,5),(9,'Deivid',83,21,10,5,'MEI','1.70m',9,0,5),(10,'Dion',97,24,24,23,'MEI','1.70m',119,0,5),(11,'Edson',91,17,17,12,'ZAG','1.70m',19,0,5),(12,'Feijao',75,17,10,2,'ATA','1.70m',2,0,5),(13,'Flavio',82,21,5,0,'ZAG','1.70m',0,0,5),(14,'Gabriel Barbosa',91,19,22,12,'MEI','1.70m',103,0,5),(15,'Geraldo',84,21,10,4,'MEI','1.70m',17,0,5),(16,'Helder',87,22,10,0,'GOL','1.70m',1,0,5),(17,'Heitor',83,16,10,0,'ZAG','1.70m',1,0,5),(18,'Igu',86,22,17,8,'ZAG','1.70m',14,0,5),(19,'Igor Rabello',87,19,10,2,'MEI','1.70m',1,0,5),(20,'Jaya',95,20,10,12,'MEI','1.70m',4,0,5),(21,'Jhony Nicolas',84,22,5,2,'ATA','1.70m',13,0,5),(22,'Jorge Mukika',87,22,31,22,'ATA','1.70m',55,0,5),(23,'Leo',95,24,10,12,'MEI','1.70m',10,0,5),(24,'Lippin',90,20,10,8,'ATA','1.70m',18,0,5),(25,'Logan',89,23,24,22,'MEI','1.70m',56,0,5),(26,'Lucas Santos',92,18,10,10,'MEI','1.70',26,0,7),(27,'Lucas Tuca',92,22,10,10,'MEI','1.70',20,0,1),(28,'Lucas Vilaça',92,20,19,10,'MEI','1.70',21,0,3),(29,'Luccas',96,20,10,10,'DEF','1.70',24,0,5),(30,'Mangote',87,21,10,10,'GOL','1.70',20,0,0),(31,'Marco Antonio',84,20,2,10,'MEI','1.70',0,0,0),(32,'Marlon Mendes',85,23,10,10,'MEI','1.70',13,0,3),(33,'Mateus Araujo',92,22,10,10,'MEI','1.70',20,0,1),(34,'Mateus Cordeiro',84,20,0,0,'MEI','1.70',0,0,0),(35,'Oliveira',83,18,2,1,'ATA','1.70',3,0,0),(36,'Paulo Sergio',83,21,3,10,'DEF','1.70',3,0,0),(37,'Pedro Vargas',87,20,32,10,'MEI','1.50',56,0,4),(38,'Pedro Vigas',85,22,28,20,'DEF','1.70',73,0,11),(39,'Pedro Vinicius',95,22,4,3,'MEI','1.70',1,0,0),(40,'Rafhael',84,22,2,0,'MEI','1.70',2,0,0),(41,'Ramires',96,24,5,10,'MEI','1.80',14,0,1),(42,'Rodolfo',84,22,6,10,'MEI','1.70',10,0,0),(43,'Samuel',89,20,10,4,'GOL','1.70',0,0,5),(44,'Talisson Taleco',84,18,10,10,'MEI','1.70',18,0,1),(45,'Teteu',90,21,30,25,'GOL','1.65',1,0,5),(46,'Thalisson Phill',95,22,28,30,'MEI','1.70',77,0,13),(47,'Theuzin',84,18,23,10,'DEF','1.70',18,0,7),(48,'Thiago Lima',96,22,24,25,'MEI','1.70',46,0,5),(49,'Thiago Vitor',92,20,10,10,'MEI','1.70',8,0,1),(50,'Thiago Perigoso',91,21,22,10,'GOL','1.70',5,0,3),(51,'Vieira',88,20,23,10,'MEI','1.70',47,0,4),(52,'Vinicius',84,18,2,10,'MEI','1.70',1,0,0),(53,'Vitor Chupada',84,21,10,10,'MEI','1.70',2,0,2),(54,'Vitor Boss',92,18,10,10,'MEI','1.70',17,0,2),(55,'Vitor Gabriel',91,22,10,10,'MEI','1.70',5,0,1),(56,'Vitor Oliver',79,20,10,10,'MEI','1.70',43,0,7),(57,'Vitor Santos',88,22,12,10,'MEI','1.70',27,0,5),(58,'Wescley Junior',86,22,14,10,'ATA','1.70',21,0,3),(59,'Alvaro BH',91,22,6,2,'MEI','1.68m',12,0,5),(60,'Alvaro Cordeiro',84,22,10,2,'ZAG','1.70m',0,0,5),(61,'Athylon',89,21,35,23,'ATA','1.80m',89,0,5),(62,'Caio',84,21,18,22,'ATA','1.70m',17,0,5),(63,'Carlota',84,22,30,12,'ATA','1.70m',36,0,5),(64,'Cauã Soares',82,23,20,5,'ZAG','1.70m',14,0,5),(65,'Caua Xit',77,17,10,3,'ZAG','1.70m',9,0,5),(66,'Cristian',93,17,6,12,'MEI','1.70m',12,0,5),(67,'Deivid',83,21,10,5,'MEI','1.70m',9,0,5),(68,'Dion',97,24,24,23,'MEI','1.70m',119,0,5),(69,'Edson',91,17,17,12,'ZAG','1.70m',19,0,5),(70,'Feijao',75,17,10,2,'ATA','1.70m',2,0,5),(71,'Flavio',82,21,5,0,'ZAG','1.70m',0,0,5),(72,'Gabriel Barbosa',91,19,22,12,'MEI','1.70m',103,0,5),(73,'Geraldo',84,21,10,4,'MEI','1.70m',17,0,5),(74,'Helder',87,22,10,0,'GOL','1.70m',1,0,5),(75,'Heitor',83,16,10,0,'ZAG','1.70m',1,0,5),(76,'Igu',86,22,17,8,'ZAG','1.70m',14,0,5),(77,'Igor Rabello',87,19,10,2,'MEI','1.70m',1,0,5),(78,'Jaya',95,20,10,12,'MEI','1.70m',4,0,5),(79,'Jhony Nicolas',84,22,5,2,'ATA','1.70m',13,0,5),(80,'Jorge Mukika',87,22,31,22,'ATA','1.70m',55,0,5),(81,'Leo',95,24,10,12,'MEI','1.70m',10,0,5),(82,'Lippin',90,20,10,8,'ATA','1.70m',18,0,5),(83,'Logan',89,23,24,22,'MEI','1.70m',56,0,5),(84,'Lucas Santos',92,18,10,10,'MEI','1.70',26,0,7),(85,'Lucas Tuca',92,22,10,10,'MEI','1.70',20,0,1),(86,'Lucas Vilaça',92,20,19,10,'MEI','1.70',21,0,3),(87,'Luccas',96,20,10,10,'DEF','1.70',24,0,5),(88,'Mangote',87,21,10,10,'GOL','1.70',20,0,0),(89,'Marco Antonio',84,20,2,10,'MEI','1.70',0,0,0),(90,'Marlon Mendes',85,23,10,10,'MEI','1.70',13,0,3),(91,'Mateus Araujo',92,22,10,10,'MEI','1.70',20,0,1),(92,'Mateus Cordeiro',84,20,0,0,'MEI','1.70',0,0,0),(93,'Oliveira',83,18,2,1,'ATA','1.70',3,0,0),(94,'Paulo Sergio',83,21,3,10,'DEF','1.70',3,0,0),(95,'Pedro Vargas',87,20,32,10,'MEI','1.50',56,0,4),(96,'Pedro Vigas',85,22,28,20,'DEF','1.70',73,0,11),(97,'Pedro Vinicius',95,22,4,3,'MEI','1.70',1,0,0),(98,'Rafhael',84,22,2,0,'MEI','1.70',2,0,0),(99,'Ramires',96,24,5,10,'MEI','1.80',14,0,1),(100,'Rodolfo',84,22,6,10,'MEI','1.70',10,0,0),(101,'Samuel',89,20,10,4,'GOL','1.70',0,0,5),(102,'Talisson Taleco',84,18,10,10,'MEI','1.70',18,0,1),(103,'Teteu',90,21,30,25,'GOL','1.65',1,0,5),(104,'Thalisson Phill',95,22,28,30,'MEI','1.70',77,0,13),(105,'Theuzin',84,18,23,10,'DEF','1.70',18,0,7),(106,'Thiago Lima',96,22,24,25,'MEI','1.70',46,0,5),(107,'Thiago Vitor',92,20,10,10,'MEI','1.70',8,0,1),(108,'Thiago Perigoso',91,21,22,10,'GOL','1.70',5,0,3),(109,'Vieira',88,20,23,10,'MEI','1.70',47,0,4),(110,'Vinicius',84,18,2,10,'MEI','1.70',1,0,0),(111,'Vitor Chupada',84,21,10,10,'MEI','1.70',2,0,2),(112,'Vitor Boss',92,18,10,10,'MEI','1.70',17,0,2),(113,'Vitor Gabriel',91,22,10,10,'MEI','1.70',5,0,1),(114,'Vitor Oliver',79,20,10,10,'MEI','1.70',43,0,7),(115,'Vitor Santos',88,22,12,10,'MEI','1.70',27,0,5),(116,'Wescley Junior',86,22,14,10,'ATA','1.70',21,0,3),(117,'Alvaro BH',91,22,6,2,'MEI','1.68m',12,0,5),(118,'Alvaro Cordeiro',84,22,10,2,'ZAG','1.70m',0,0,5),(119,'Athylon',89,21,35,23,'ATA','1.80m',89,0,5),(120,'Caio',84,21,18,22,'ATA','1.70m',17,0,5),(121,'Carlota',84,22,30,12,'ATA','1.70m',36,0,5),(122,'Cauã Soares',82,23,20,5,'ZAG','1.70m',14,0,5),(123,'Caua Xit',77,17,10,3,'ZAG','1.70m',9,0,5),(124,'Cristian',93,17,6,12,'MEI','1.70m',12,0,5),(125,'Deivid',83,21,10,5,'MEI','1.70m',9,0,5),(126,'Dion',97,24,24,23,'MEI','1.70m',119,0,5),(127,'Edson',91,17,17,12,'ZAG','1.70m',19,0,5),(128,'Feijao',75,17,10,2,'ATA','1.70m',2,0,5),(129,'Flavio',82,21,5,0,'ZAG','1.70m',0,0,5),(130,'Gabriel Barbosa',91,19,22,12,'MEI','1.70m',103,0,5),(131,'Geraldo',84,21,10,4,'MEI','1.70m',17,0,5),(132,'Helder',87,22,10,0,'GOL','1.70m',1,0,5),(133,'Heitor',83,16,10,0,'ZAG','1.70m',1,0,5),(134,'Igu',86,22,17,8,'ZAG','1.70m',14,0,5),(135,'Igor Rabello',87,19,10,2,'MEI','1.70m',1,0,5),(136,'Jaya',95,20,10,12,'MEI','1.70m',4,0,5),(137,'Jhony Nicolas',84,22,5,2,'ATA','1.70m',13,0,5),(138,'Jorge Mukika',87,22,31,22,'ATA','1.70m',55,0,5),(139,'Leo',95,24,10,12,'MEI','1.70m',10,0,5),(140,'Lippin',90,20,10,8,'ATA','1.70m',18,0,5),(141,'Logan',89,23,24,22,'MEI','1.70m',56,0,5),(142,'Lucas Santos',92,18,10,10,'MEI','1.70',26,0,7),(143,'Lucas Tuca',92,22,10,10,'MEI','1.70',20,0,1),(144,'Lucas Vilaça',92,20,19,10,'MEI','1.70',21,0,3),(145,'Luccas',96,20,10,10,'DEF','1.70',24,0,5),(146,'Mangote',87,21,10,10,'GOL','1.70',20,0,0),(147,'Marco Antonio',84,20,2,10,'MEI','1.70',0,0,0),(148,'Marlon Mendes',85,23,10,10,'MEI','1.70',13,0,3),(149,'Mateus Araujo',92,22,10,10,'MEI','1.70',20,0,1),(150,'Mateus Cordeiro',84,20,0,0,'MEI','1.70',0,0,0),(151,'Oliveira',83,18,2,1,'ATA','1.70',3,0,0),(152,'Paulo Sergio',83,21,3,10,'DEF','1.70',3,0,0),(153,'Pedro Vargas',87,20,32,10,'MEI','1.50',56,0,4),(154,'Pedro Vigas',85,22,28,20,'DEF','1.70',73,0,11),(155,'Pedro Vinicius',95,22,4,3,'MEI','1.70',1,0,0),(156,'Rafhael',84,22,2,0,'MEI','1.70',2,0,0),(157,'Ramires',96,24,5,10,'MEI','1.80',14,0,1),(158,'Rodolfo',84,22,6,10,'MEI','1.70',10,0,0),(159,'Samuel',89,20,10,4,'GOL','1.70',0,0,5),(160,'Talisson Taleco',84,18,10,10,'MEI','1.70',18,0,1),(161,'Teteu',90,21,30,25,'GOL','1.65',1,0,5),(162,'Thalisson Phill',95,22,28,30,'MEI','1.70',77,0,13),(163,'Theuzin',84,18,23,10,'DEF','1.70',18,0,7),(164,'Thiago Lima',96,22,24,25,'MEI','1.70',46,0,5),(165,'Thiago Vitor',92,20,10,10,'MEI','1.70',8,0,1),(166,'Thiago Perigoso',91,21,22,10,'GOL','1.70',5,0,3),(167,'Vieira',88,20,23,10,'MEI','1.70',47,0,4),(168,'Vinicius',84,18,2,10,'MEI','1.70',1,0,0),(169,'Vitor Chupada',84,21,10,10,'MEI','1.70',2,0,2),(170,'Vitor Boss',92,18,10,10,'MEI','1.70',17,0,2),(171,'Vitor Gabriel',91,22,10,10,'MEI','1.70',5,0,1),(172,'Vitor Oliver',79,20,10,10,'MEI','1.70',43,0,7),(173,'Vitor Santos',88,22,12,10,'MEI','1.70',27,0,5),(174,'Wescley Junior',86,22,14,10,'ATA','1.70',21,0,3);
/*!40000 ALTER TABLE `jogadores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-02 20:36:58
