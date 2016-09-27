<?php
	// 直接返回 html、 
	header("Content-Type:text/html;charset=utf-8");
	echo "<div class='comment'>".
			"<h6>".
				$_GET['username'].
			":</h6>".
			"<p class='para'>".
				$_GET['content'].
			"</p>".
		"</div>";	
?>