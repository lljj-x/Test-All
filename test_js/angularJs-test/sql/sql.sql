DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  `city` varchar(64) NOT NULL,
  `country` varchar(64),
  `time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

insert into `customers` (`name`,`city`,`country`) values ('Berglunds snabbk?p','Lule?','Sweden');
insert into `customers` (`name`,`city`,`country`) values ('Centro comercial Moctezuma','M¨¦xico D.F.','Mexico');
insert into `customers` (`name`,`city`,`country`) values ('Ernst Handel','Graz','Austria');
insert into `customers` (`name`,`city`,`country`) values ('FISSA Fabrica Inter. Salchichas S.A.','Madrid','Spain');
insert into `customers` (`name`,`city`,`country`) values ('Galer¨ªa del gastr¨®nomo','Barcelona','Spain');
insert into `customers` (`name`,`city`,`country`) values ('Island Trading','Cowes','UK');
insert into `customers` (`name`,`city`,`country`) values ('K?niglich Essen','Brandenburg','Germany');
insert into `customers` (`name`,`city`,`country`) values ('Laughing Bacchus Wine Cellars','Vancouver','Canada');
insert into `customers` (`name`,`city`,`country`) values ('Magazzini Alimentari Riuniti','Bergamo','Italy');
insert into `customers` (`name`,`city`,`country`) values ('North/South','London','UK');
insert into `customers` (`name`,`city`,`country`) values ('Paris sp¨¦cialit¨¦s','Paris','France');
insert into `customers` (`name`,`city`,`country`) values ('Rattlesnake Canyon Grocery','Albuquerque','USA');
insert into `customers` (`name`,`city`,`country`) values ('Simons bistro','K?benhavn','Denmark');
insert into `customers` (`name`,`city`,`country`) values ('The Big Cheese','Portland','USA');
insert into `customers` (`name`,`city`,`country`) values ('Vaffeljernet','?rhus','Denmark');
insert into `customers` (`name`,`city`,`country`) values ('Wolski Zajazd','Warszawa','Poland');