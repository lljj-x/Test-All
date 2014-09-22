<?php
	//头信息
	header("Content-Type:text/xml;charset='utf-8'");
	header("Cache-Control: no-cache");

	$store_num = 10;
	$display_num = 10;
	$dbname = "chat";

	error_reporting(E_ALL); //报告所有错误

	$conn = mysql_connect("localhost","root","");
	mysql_select_db($dbname,$conn);
	foreach ($_POST as $key => $value) {	//循环输出 POST 数据，并且定义新变量
		//	mysql_real_escape_string(string,connection) // 转义特殊字符
		$$key = mysql_real_escape_string($value,$conn);
	}

	// sql insert
	if(isset($isSubmit)){
		if($isSubmit == "true"){
			$sql_insert = "insert into messages (`user`,`msg`,`time`) values ('$author','$msg'," . time() . ")";
			mysql_query($sql_insert,$conn); // 执行插入
		
			$insertid = mysql_insert_id($conn); // 返回前面一步插入 的自动增长 id
			$deleteid = $insertid - $store_num; // 获取应该删除 id的最大值，(因为数据库最多保存 $store_num 条消息,所以获取到应该删除的最大id)
			$sql_delete = "delete from messages where id <= $deleteid";
			mysql_query($sql_delete);	//执行删除超过条目
		}
	}
	
	// sql select
	//获取到前面一个时间戳之后添加的数据 ,最多10条数据，有 bug 假如在 ajax 自动请求的时候内超过了 $display_num 条数据，会导致数据丢失,在加上总条数的控制所以会是前面的信息丢失
	$sql_select = "select `user`,`msg` from `messages` where `time` >$time order by `id` asc limit $display_num";
	$row_select = mysql_query($sql_select,$conn);	//执行查询命令
	$time = time();	//查询完成后，更新时间戳
	if (mysql_num_rows($row_select) != "0"){
		$isupdata = 1;	//查询成功有新消息需要更新
	}else{
		$isupdata = 2;	//查询成功木有消息要更新
	}
	
	echo "<?xml version='1.0' encoding='utf-8' ?>".
		"<response>".
			"<status>" . $isupdata . "</status>".
			"<time>" . $time . "</time>";
	if ($isupdata == 1){
		while ($message = mysql_fetch_array($row_select)){
		$msg= htmlspecialchars($message['msg']);	// htmlspecialchars 函数把一些预定义的字符转换为 HTML 实体 
		echo "<message>".
				"<author>" . $message['user'] . "</author>".
				"<text>" . $msg ."</text>".
			"</message>";
			}
	}
	echo "</response>";

?>