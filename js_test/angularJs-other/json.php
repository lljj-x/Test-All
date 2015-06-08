<?php
	$jsonArr = [1 => [
		'firstName' => 'Liu',
		'lastName' => 'Jun'
	], 2 => [
		'firstName' => 'Zhang',
		'lastName' => 'San'
	],3=>[
		'firstName' => 'Li',
		'lastName' => 'Si'
	]];

	if ($_GET) {
		switch ($_GET[a]) {
			case '1':
				$jsonArr = $jsonArr[1];
				break;
			
			case '2':
				$jsonArr = $jsonArr[2];
				break;
			default:
			break;
		}

	}
	echo(json_encode($jsonArr));
	