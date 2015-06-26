<?php
	if (!empty($_POST['submit'])) {
		echo 'Username lenth:' . strlen($_POST['username']) . '<br/>';
		
		echo 'Username :' . $_POST['username'] . '<br>Password: ' . $_POST['password'] . '<br>';
		
		echo 'language :' . $_POST['language'] . '<br>';
		echo 'select attr :<pre>';
		empty($_POST['attr']) ? null : print_r($_POST['attr']);
		echo '</pre>';
	}
	
	function checkIsInput($name){
		if (isset($_POST[$name])) {
			return 'value="' . $_POST[$name] . '"';
		}
	}
	
	function checkIsSelect($name,$emValue){
		if (isset($_POST[$name])) {
			$value = $_POST[$name];
			if (is_array($value)) {
				if (in_array($emValue, $value)) {
					return 'selected=selected';
				}
			}elseif (is_string($value)){
				if ($value == $emValue) {
					return 'selected=selected';
				}
			}
		}
	}
	
	function checkIsChecked($name,$emValue){
		if (isset($_POST[$name])) {
			$value = $_POST[$name];
			if (is_array($value)) {
				if (in_array($emValue, $value)) {
					return 'checked=checked';
				}
			}elseif (is_string($value)){
				if ($value == $emValue) {
					return 'checked=checked';
				}
			}
		}
	}
?>

<html>
<head>
<title>Just A Test</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Test,Form">
<meta name="description" content="This is test form">
<style>
	body{
		margin:0;
		padding:60px;
	}
	
	form{
		margin-top:20px;
	}
</style>
</head>
<body>
	<form action="" method="POST">
		Name: <input type="text" name="username" <?php echo checkIsInput('username')?>/><br>
		Password: <input type="password" name="password" /> <br>
		Language: 
		<select name="language">
			<option value="c" <?php echo checkIsSelect('language','c')?>>C</option>
			<option value="php" <?php echo checkIsSelect('language','php')?>>PHP</option>
			<option value="java" <?php echo checkIsSelect('language','java')?>>JAVA</option>
		</select> <br>
		attr: 
		<label><span>attr1</span><input type="checkbox" name="attr[]" value="attr1" <?php echo checkIsChecked('attr','attr1')?>/></label>
		<label><span>attr2</span><input type="checkbox" name="attr[]" value="attr2" <?php echo checkIsChecked('attr','attr2')?>/></label>
		<label><span>attr3</span><input type="checkbox" name="attr[]" value="attr3" <?php echo checkIsChecked('attr','attr3')?>/></label>
		<label><span>attr4</span><input type="checkbox" name="attr[]" value="attr4" <?php echo checkIsChecked('attr','attr4')?>/></label>
		<input type="submit" value="submit" name="submit">
	</form>
</body>
</html>