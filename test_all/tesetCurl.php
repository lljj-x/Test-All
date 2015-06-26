<?php 
$post_string = "&username=vgtestt&password=123456";

$test = request_by_curl('http://vg12.itdeng.com/index.php?m=api&a=getticket',$post_string);
var_dump($test);

function request_by_curl($remote_server, $post_string)

{
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $remote_server);

	curl_setopt($ch, CURLOPT_POSTFIELDS, 'mypost=' . $post_string);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_USERAGENT, "Jimmy's CURL Example beta");

	$data = curl_exec($ch);

	curl_close($ch);

	return $data;

}
