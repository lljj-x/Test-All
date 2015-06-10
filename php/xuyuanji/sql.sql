DROP TABLE IF EXISTS `xuyuan`;
CREATE TABLE `xuyuan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(12),
  `number` varchar(64),
  `str` text NOT NULL,
  `time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `xuyuan`;
CREATE TABLE `xuyuan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `str` text NOT NULL,
  `time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;