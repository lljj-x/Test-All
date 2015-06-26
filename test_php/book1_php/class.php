<?php 
// 	class MyClass{
// 		public $name;
// 		public $sex;
// 		public $age;
// 		static $global = 23;
// 		const  CCCCC = '000000';
		
		
// 		function __construct($a,$b,$c){
// 			$this->name = $a;
// 			$this->sex = $b;
// 			$this->age = $c;
// 		}
		
// 		function getName(){
// 			return $this->name;
// 		}
		
// 		static function getDe(){
// 			$returnStr= "this is static !"; 
			
// 			echo self::$global;
// 			return $returnStr;
// 		}
// 	}
	
	
// 	$c = new MyClass('LIU','F','11');
	
// // 	echo $c->getName();
	
// 	echo MyClass::getDe();
	
	interface Printtable{
		function setMessage();
		
		function getMessage();
	}
	
	class myInterface implements Printtable{
		public $name = 'L';
		public $age = '19';
		public $brithday = 'sfdsdf';
		
		function setMessage(){
			return "setMessage";
		}
		function getMessage(){
			return "getMessage";
		}
	}
	
	$interfaceClass = new myInterface();
	echo $interfaceClass->setMessage() . '<br>';
	echo $interfaceClass->getMessage();
	
	if (class_exists('myInterface')) {
		echo '<br>Class myInterface is exists';
	}
	
	$arrClassMethods = get_class_methods('myInterface');
	$arrClassVars = get_class_vars('myInterface');
	
	echo '<pre>';
	print_r($arrClassMethods);
	echo '</pre>';
	
	echo '<pre>';
	print_r($arrClassVars);
	echo '</pre>';
	
	if (is_object($interfaceClass)) {
		echo "ok";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	