<?php 
	header("Content-Type:text/json;charset=utf-8");
	$name = $_REQUEST['name'];
	$address = $_REQUEST['address'];
	$comment = $_REQUEST['comment'];
	echo <<<END
		{"name":"$name","address":"$address","comment":"$comment"}
	
END;

?>