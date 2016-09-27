<?php
	header("Content-Type:text/xml;charset=utf-8");
	$name = $_REQUEST['name'];
	$comment = $_REQUEST['comment'];
	$address = $_REQUEST['address'];
	
	echo "<?xml version='1.0' encoding='utf-8'?>".
		"<root><name>" . 
		$name.
		"</name><address>".
		$address.
		"</address><comment>".
		$comment.
		"</comment></root>";
	
	