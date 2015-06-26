<?php
	session_set_save_handler('open', 'close', 'read', 'write', 'destroy', 'gc');	
	session_start();
	
	function open(){
		$conn = @ mysql_connect("localhost", "root", "liujun") or die('database connect error !');
		mysql_select_db("test",$conn) or die("Can't find this db !");
		mysql_set_charset("set names 'utf-8'");
	}
	
	function write($session_id,$data){
		if (!get_magic_quotes_gpc()) {
			$data = addslashes($data);
			$insertSql = "insert into session_store(session_id,value) values('$session_id','$data')";
			$mysqlQuery = mysql_query($insertSql);
			return $mysqlQuery;
		}
	}
	
	function read($session_id){
		$selectSql = "select value from session_store where session_id = '$session_id'";
		$result = mysql_query($selectSql);
		if ($result && mysql_num_rows($result)) {
			return $result;
		}
		
		/*
		while ($row = mysql_fetch_array($result)){
			print_r($row);
		}
		*/
		
	}
	
	function destroy ($session_id){
		// session完成后  ， 负责清空数据库中的session信息
		mysql_query("delect from session_Store where session_id = '$session_id'");
	}
	
	function close(){
		mysql_close();
	}
	
	function gc(){
		
	}
	