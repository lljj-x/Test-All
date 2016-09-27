<?php
	header("Content-Type:text/json;charset=utf-8");
	$username = $_POST['username'];
	$content = $_POST['content'];
	echo <<<END
	{"username":"$username","content":"$content"}
END;
?>