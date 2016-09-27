<?php
// 	$sendtext=$_GET['date']; GET 方法

	$sendtext = @$_POST['mydate'];
	
	echo (int)$sendtext * 2;
?>