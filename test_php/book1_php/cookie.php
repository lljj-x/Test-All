<?php
	if(!empty($_POST['submit'])){
		$colors = array(
				'black' => '#000',
				'white' => '#fff',
				'blue' => '#0000ff'
		);
		$bg_name = $_POST['background'];
		$fg_name = $_POST['foreground'];
		setcookie('bg',$colors[$bg_name]);
		setcookie('fg',$colors[$fg_name]);
	}
?>

<html>
	<head>
		<title>This Is Test</title>
	</head>
	
	<body style="background:<?php echo $_COOKIE['bg']?>;color:<?php echo $_COOKIE['fg']?>">
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
	
	