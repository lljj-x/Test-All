<?php 
	header("Content-Type:text/xml; charset=utf-8");
	echo "<?xml version='1.0' encoding='utf-8'?>".
	     "<comments>".
		 "<comment username='{$_GET['username'] }' >".
		 "<content>{$_GET['content']}</content>".
		 "</comment>".
		 "</comments>";
?>
