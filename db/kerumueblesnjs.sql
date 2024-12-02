-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kerumueblesnjs
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kerumueblesnjs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kerumueblesnjs` DEFAULT CHARACTER SET utf8 ;
USE `kerumueblesnjs` ;

-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`CATEGORIA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`CATEGORIA` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`CATEGORIA` (
  `id_categoria` INT NOT NULL,
  `nombre` VARCHAR(30) NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`ARTICULO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`ARTICULO` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`ARTICULO` (
  `id_articulo` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `descripción` VARCHAR(45) NULL,
  `tipo` VARCHAR(20) NULL,
  `precio` FLOAT NULL,
  `CATEGORIA_id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_articulo`, `CATEGORIA_id_categoria`),
  INDEX `fk_ARTICULO_CATEGORIA1_idx` (`CATEGORIA_id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_ARTICULO_CATEGORIA1`
    FOREIGN KEY (`CATEGORIA_id_categoria`)
    REFERENCES `kerumueblesnjs`.`CATEGORIA` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`CLIENTE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`CLIENTE` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`CLIENTE` (
  `id_cliente` INT NOT NULL,
  `nombre` VARCHAR(50) NULL,
  `correo` VARCHAR(45) NULL,
  `contraseña` VARCHAR(100) NULL,
  `direccion` VARCHAR(50) NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`PEDIDO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`PEDIDO` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`PEDIDO` (
  `id_pedido` INT NOT NULL,
  `estatus` VARCHAR(45) NOT NULL,
  `fecha` DATETIME NULL,
  `fecha_entrega` DATE NULL,
  `fecha_recogida` DATE NULL,
  `metodo` VARCHAR(20) NULL,
  `metodo_desc` VARCHAR(30) NULL,
  `recargo` FLOAT NULL,
  `total` FLOAT NULL,
  PRIMARY KEY (`id_pedido`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`desglose_articulo_pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`desglose_articulo_pedido` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`desglose_articulo_pedido` (
  `ARTICULO_id` INT NOT NULL,
  `PEDIDO_id` INT NOT NULL,
  `precio` FLOAT NULL,
  PRIMARY KEY (`ARTICULO_id`, `PEDIDO_id`),
  INDEX `fk_PRODUCTO_has_PEDIDO_PEDIDO1_idx` (`PEDIDO_id` ASC) VISIBLE,
  INDEX `fk_PRODUCTO_has_PEDIDO_PRODUCTO_idx` (`ARTICULO_id` ASC) VISIBLE,
  CONSTRAINT `fk_PRODUCTO_has_PEDIDO_PRODUCTO`
    FOREIGN KEY (`ARTICULO_id`)
    REFERENCES `kerumueblesnjs`.`ARTICULO` (`id_articulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCTO_has_PEDIDO_PEDIDO1`
    FOREIGN KEY (`PEDIDO_id`)
    REFERENCES `kerumueblesnjs`.`PEDIDO` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`desglose_cliente_pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`desglose_cliente_pedido` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`desglose_cliente_pedido` (
  `PEDIDO_id` INT NOT NULL,
  `CLIENTE_id` INT NOT NULL,
  PRIMARY KEY (`PEDIDO_id`, `CLIENTE_id`),
  INDEX `fk_PEDIDO_has_CLIENTE_CLIENTE1_idx` (`CLIENTE_id` ASC) VISIBLE,
  INDEX `fk_PEDIDO_has_CLIENTE_PEDIDO1_idx` (`PEDIDO_id` ASC) VISIBLE,
  CONSTRAINT `fk_PEDIDO_has_CLIENTE_PEDIDO1`
    FOREIGN KEY (`PEDIDO_id`)
    REFERENCES `kerumueblesnjs`.`PEDIDO` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PEDIDO_has_CLIENTE_CLIENTE1`
    FOREIGN KEY (`CLIENTE_id`)
    REFERENCES `kerumueblesnjs`.`CLIENTE` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`CARRITO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`CARRITO` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`CARRITO` (
  `id_carrito` INT NOT NULL,
  `CLIENTE_id` INT NOT NULL,
  PRIMARY KEY (`id_carrito`),
  INDEX `fk_CARRITO_CLIENTE1_idx` (`CLIENTE_id` ASC) VISIBLE,
  CONSTRAINT `fk_CARRITO_CLIENTE1`
    FOREIGN KEY (`CLIENTE_id`)
    REFERENCES `kerumueblesnjs`.`CLIENTE` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`desglose_carrito_articulo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`desglose_carrito_articulo` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`desglose_carrito_articulo` (
  `ARTICULO_id` INT NOT NULL,
  `CARRITO_id` INT NOT NULL,
  `descuento` FLOAT NULL,
  PRIMARY KEY (`ARTICULO_id`, `CARRITO_id`),
  INDEX `fk_ARTICULO_has_CARRITO_CARRITO1_idx` (`CARRITO_id` ASC) VISIBLE,
  INDEX `fk_ARTICULO_has_CARRITO_ARTICULO1_idx` (`ARTICULO_id` ASC) VISIBLE,
  CONSTRAINT `fk_ARTICULO_has_CARRITO_ARTICULO1`
    FOREIGN KEY (`ARTICULO_id`)
    REFERENCES `kerumueblesnjs`.`ARTICULO` (`id_articulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ARTICULO_has_CARRITO_CARRITO1`
    FOREIGN KEY (`CARRITO_id`)
    REFERENCES `kerumueblesnjs`.`CARRITO` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kerumueblesnjs`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kerumueblesnjs`.`usuario` ;

CREATE TABLE IF NOT EXISTS `kerumueblesnjs`.`usuario` (
  `id_usuario` INT NOT NULL,
  `nombre` VARCHAR(50) NULL,
  `usuario` VARCHAR(20) NULL,
  `password` CHAR(13) NULL,
  `rol` INT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
