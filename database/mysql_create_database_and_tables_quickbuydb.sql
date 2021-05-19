CREATE DATABASE `quickbuydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `enderecos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CEP` varchar(12) NOT NULL,
  `Estado` varchar(30) NOT NULL,
  `Cidade` varchar(80) NOT NULL,
  `Bairro` varchar(50) NOT NULL,
  `Logradouro` varchar(100) NOT NULL,
  `Numero` varchar(5) DEFAULT NULL,
  `Complemento` varchar(50) DEFAULT NULL,
  `Apelido` varchar(30) DEFAULT NULL,
  `UsuarioId` int NOT NULL,  
  PRIMARY KEY (`Id`),
  KEY `IX_Enderecos_UsuarioId` (`UsuarioId`),
  CONSTRAINT `FK_Enderecos_Usuarios_UsuarioId` FOREIGN KEY (`UsuarioId`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `formaspagamento` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `itenspedido` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProdutoId` int NOT NULL,
  `Quantidade` int NOT NULL,
  `PedidoId` int NOT NULL,
  `Valor` decimal(18,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`Id`),
  KEY `IX_ItensPedido_PedidoId` (`PedidoId`),
  CONSTRAINT `FK_ItensPedido_Pedidos_PedidoId` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pedidos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DataPedido` datetime(6) NOT NULL,
  `DataPrevisaoEntrega` datetime(6) NOT NULL,
  `UsuarioId` int NOT NULL,
  `EnderecoId` int NOT NULL,
  `FormaPagamentoId` int NOT NULL,
  `ValorTotal` decimal(18,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`Id`),
  KEY `IX_Pedidos_EnderecoId` (`EnderecoId`),
  KEY `IX_Pedidos_FormaPagamentoId` (`FormaPagamentoId`),
  KEY `IX_Pedidos_UsuarioId` (`UsuarioId`),
  CONSTRAINT `FK_Pedidos_Enderecos_EnderecoId` FOREIGN KEY (`EnderecoId`) REFERENCES `enderecos` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Pedidos_FormasPagamento_FormaPagamentoId` FOREIGN KEY (`FormaPagamentoId`) REFERENCES `formaspagamento` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Pedidos_Usuarios_UsuarioId` FOREIGN KEY (`UsuarioId`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `produtos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Descricao` varchar(250) NOT NULL,
  `Preco` decimal(18,2) NOT NULL,
  `NomeArquivo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `Senha` varchar(250) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `SobreNome` varchar(50) NOT NULL,
  `Administrador` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
