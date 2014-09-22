<?php
	// -- 声称并保存图片 
	$img =  imagecreate(200, 200);
	$white = imagecolorallocate($img, 0xFF, 0xFF, 0xFF);
	$black = imagecolorallocate($img, 0x00, 0x00, 0x00);
	imagefilledrectangle($img, 50, 50, 150, 150, $black);
	header('Content-Type:image/png');
	imagepng($img,'test.png');
	// imagepng($img);
	// -- - -end 
	
	// 读取已存在的文件
	$image = imagecreatefrompng('test.png');
	// 旋转刚才生成的图片
	$img_rotated = imagerotate($image, 45, 1);
	// imagepng($img_rotated);
	
	// 添加文字到图片中
	imagestring($image, 5, 50, 160, 'Hello Word', $black);
	imagepng($image);
	