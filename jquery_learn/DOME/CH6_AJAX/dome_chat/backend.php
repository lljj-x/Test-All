<?php
	// 简单配置
	$bdhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$store_num = 10;
	$display_num = 10;
	$dbname = "chat";

	error_reporting(E_ALL); //报告所有错误

	//头信息
	header("Content-type: text/xml");
	header("Cache-Control: no-cache");

	//链接mysql,选择数据库
	$dbconn = mysql_connect($bdhost,$dbuser,$dbpass);
	mysql_select_db($dbname,$dbconn);

	// 获取 所有post 数据的信息
	foreach ($_POST as $key => $value){
		$$key = mysql_real_escape_string($value);
			/*
				根据post 的数据返回
				$message
				$name
				$action
				$time
			*/
	}

	// 插入数据
	if(@$action == "postmsg"){
		// 插入数据	 判断是否是通过提交
		mysql_query("insert into messages (`user`,`msg`,`time`) values ('$name','$message'," . time() . ")",$dbconn);

		/*
			插入的 id - 一共保存的数据,得到超过的数据数量，然后删除这些超出的数据 
			删除数据(因为我们默认值存储 10 条数据)
			mysql_insert_id 返回上一步插入数据 所产生的AUTO_INCREMENT id
		*/
		mysql_query("delete from messages where id <=" .(mysql_insert_id($dbconn)-$store_num ),$dbconn);
	}

	// 查询数据 是否有新数据
	$messages = mysql_query("select user,msg from messages WHERE time > $time ORDER BY id ASC limit $display_num",$dbconn);
	//是否有新数据
	if(mysql_num_rows($messages) == "0" ){	//判断 查询结果包含多少条数据
		$status_code = 2;	//请求成功 并且没有新数据
	}else {
		$status_code = 1;
	}
	
	// 返回xml 格式数据


	echo "<?xml version='1.0' encoding = 'utf-8' ?>".
			"<response>".
			"<status>" . $status_code . "</status>".
			"<time>" . time() . "</time>";

	if($status_code == 1){
		while ($message = mysql_fetch_array($messages)){
			$message['msg'] = htmlspecialchars(stripslashes($message['msg']));
			echo "<message>".
					"<author>" . $message['user'] . "</author>".
					"<text>" . $message['msg'] . "</text>".
				 "</message>";
		}
	}

	echo "</response>";
?>