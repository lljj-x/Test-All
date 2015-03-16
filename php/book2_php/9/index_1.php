<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-3-16 下午5:27 
 */

$a = 'abc';
$b = 123456.4456;

$c = sprintf($b . "保留三位有效数字是%0.3f",$b);
echo $c;
