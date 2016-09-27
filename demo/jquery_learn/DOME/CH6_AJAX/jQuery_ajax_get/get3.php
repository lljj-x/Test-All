<?php
	header("Content-Type:text/json; charset=utf-8");
	echo "{\"username\":\"{$_GET['username']}\",\"content\":\"{$_GET['content']}\"}";
?>
