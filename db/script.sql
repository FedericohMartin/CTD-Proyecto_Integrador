CREATE TABLE IF NOT EXISTS `rentcarsdigitalbookingprod`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `titulo` VARCHAR(255) NULL DEFAULT NULL,
  `url_img` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))