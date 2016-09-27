<?php
	header("Content-Type:text/html;charset=utf-8");
	
	$name = $_REQUEST['name'];
	$address = $_REQUEST['address'];
	$comment = $_REQUEST['comment'];
	
	echo <<<END
		name : $name <br>
		address : $address <br>
		comment : $comment
END;

?>