<?php
	header("Content-Type:text/json;charset=utf-8");
	echo "{\"username\":\"{$_POST['username']}\",\"content\":\"{$_POST['content']}\"}";
?>