DROP TABLE IF EXISTS `xuyuan`;
CREATE TABLE `xuyuan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  `number` varchar(64) NOT NULL,
  `str` varchar(32) NOT NULL,
  `time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;