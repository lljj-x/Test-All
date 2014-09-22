<?php
	$serialize = $_POST['myList'];
	foreach ($serialize as $value){
		echo $value . "\n";
	}