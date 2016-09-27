<?php
	header("Content-Type:text/html;charset=utf-8");
	$username = $_REQUEST['username'];
	$content = $_REQUEST['content'];
	echo <<<END
	<div class="comment">
			<h6>$username</h6>
			<p class="para">$content</p>
	</div>
END;
?>