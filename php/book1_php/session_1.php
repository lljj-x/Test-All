<?php
	session_start();
	echo session_id();
	
// 	if (!isset($_SESSION['num'])) {
// 		$_SESSION['num'] = 10;
// 	}
	
// 	$_SESSION['num'] = $_SESSION['num'] + 1;
	
// 	echo 'This page has been viewed ' . $_SESSION['num'] . 'times' ;
	
	
	if(!empty($_POST['submit'])){
		$colors = array(
				'black' => '#000',
				'white' => '#fff',
				'blue' => '#0000ff'
		);
		$bg_name = $_POST['background'];
		$fg_name = $_POST['foreground'];
		
		$_SESSION['bg'] = $colors[$bg_name];
		$_SESSION['fg'] = $colors[$fg_name];
		
	}
	?>
	
	<html>
		<head>
			<title>This Is Test</title>
		</head>
		
		<body style="background:<?php echo $_SESSION['bg']?>;color:<?php echo $_SESSION['fg']?>">
			<h1>Welcome to website !!</h1>
			<div>hello word !</div>
			<form method="post">
				 bgColor: 
				 <select name="background">
					<option value="black">black</option>
					<option value="white">white</option>
					<option value="blue">blue</option>	
				</select>
				<br>
				fontColor: 
				<select name="foreground">
					<option value="black">black</option>
					<option value="white">white</option>
					<option value="blue">blue</option>	
				</select>
				<br>
				<input type="submit" value="submit" name="submit"/>
			</form>
		</body>
	</html>
		
		