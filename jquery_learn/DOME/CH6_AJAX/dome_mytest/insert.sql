drop table if exists `messages`;
create table `messages`(
	`id` int(7) not null auto_increment,
	`user` varchar(255) not null,
	`msg` text not null,
	`time` int(9) not null,
	primary key (`id`)
);
