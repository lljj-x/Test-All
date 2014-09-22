<?php
	$names = array(
		'1'=>'cath',
		'2'=>'angela',
		'4'=>'brad',
		'3'=>'dave' 
	);
	
	// 会重新分配新的key
 	// sort($array); rsort($array);
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
// 	sort($names);
	
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
// 	rsort($names);
	
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
	// 不会重新分配key
	// asort($array); arsort($array);
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
// 	asort($names);
	
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
// 	arsort($names);
	
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
	
	// 按照key排序
	// ksort($array); krsort($array);
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
// 	ksort($names);
	
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
// 	krsort($names);
	
// 	echo '<pre>';
// 	print_r($names);
// 	echo '</pre>';
	
	$values = array(
			'name' => 'Buzz Lightyear',
			'email_address' => 'buzz@mipow.com',
			'age' => 32,
			'smarts' => 'some'
	);
	
	// 原数组
// 	echo '<pre>';
// 	print_r($values);
// 	echo '</pre>';
	
// 	// 翻转
// 	echo '<pre>';
// 	print_r(array_reverse($values));
// 	echo '</pre>';
	
// 	// key value 对换
// 	echo '<pre>';
// 	print_r(array_flip($values));
// 	echo '</pre>';
	
// 	// 随机排序
// 	shuffle($values);
// 	echo '<pre>';
// 	print_r($values);
// 	echo '</pre>';
	
// 	$sum = array_sum($values);
// 	echo $sum;
	
	$a = array('aaa1','aaa2','aaa3');
	$b = array('bbb1','bbb2','bbb3','aaa1');
	// 合并数组 不会过滤重复
	$newArr = array_merge($a,$b);
	
	echo '<pre>';
	print_r($newArr);
	echo '</pre>';
	
	//过滤重复
	$newArr = array_unique($newArr);
	echo '<pre>';
	print_r($newArr);
	echo '</pre>';
	
	// 数组的交集
	$newArr = array_intersect($a, $b);
	echo '<pre>';
	print_r($newArr);
	echo '</pre>';
	
	// 数组的差集  第一个相对于第二个区别
	$newArr = array_diff($a , $b);
	echo '<pre>';
	print_r($newArr);
	echo '</pre>';
	
	