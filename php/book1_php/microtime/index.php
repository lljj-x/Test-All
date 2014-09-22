<?php
	ob_start();
	$start = microtime();
	phpinfo();
	$end = ob_end_clean();
	
	echo "phpinfo() took " . ($end-$start) . "seconds to run . ";	
	
	define('testCon', "this is con");
	echo constant('testCon');