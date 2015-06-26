<?php
	$subject = "abcdef";
	$pattern = '/^def/';
	preg_match($pattern, $subject,$matches,PREG_OFFSET_CAPTURE,3);
	
	print_r($matches);
	
	$subject= "abcdef";
	$pattern = '/^def/';
	preg_match($pattern, substr($subject, 3),$matches,PREG_OFFSET_CAPTURE);
	
	echo '<pre>';
	print_r($matches);
	echo '</pre>';
	
	$subject= "abcdefdefdefdefdefdef";
	$pattern = '/def/';
	preg_match_all($pattern, substr($subject, 3),$matches,PREG_OFFSET_CAPTURE);
	
	echo '<pre>';
	print_r($matches);
	echo '</pre>';	


	$subject = "abcDef";
	if (preg_match('/def/i', $subject)){
		echo "Match !";
	}else {
		echo "Not Match !";
	}
	
	$subject = "hello word Test";
	if (preg_match('/\btest\b/i', $subject,$matchs,PREG_OFFSET_CAPTURE)) {
		echo "Match !";
	}else{
		echo "Not Match !";
	}
	
	echo '<pre>';
	print_r($matchs);
	echo '</pre>';

	preg_match('@^(?:http://)?([^/]+)@i',"http://www.php.net/index.html", $matches);
	print_r($matches);
	
	$str = 'foobar: 2008';
	
	preg_match('/(?P<name>\w+): (?P<digit>\d+)/', $str, $matches);
	
	/* 下面例子在php 5.2.2(pcre 7.0)或更新版本下工作, 然而, 为了后向兼容, 上面的方式是推荐写法. */
	// preg_match('/(?<name>\w+): (?<digit>\d+)/', $str, $matches);
	
	print_r($matches);
	
	
	
	