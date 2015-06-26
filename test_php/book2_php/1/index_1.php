<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-13 上午11:14 
 */

include_once("../header.php");
$sysos = $_SERVER['SERVER_SOFTWARE'];
$sysversion = PHP_VERSION;

// php
$conn = mysql_connect('localhost','root','liujun',false,0);
$mysqlinfo = mysql_get_server_info();

if(function_exists("gd_info")){
    $gd = gd_info();
    $gdinfo = $gd['GD Version'];
    varDump($gd);
    varDump($gdinfo);
}else{
    $gdinfo = "未知";
}

printR(ini_get("allow_url_fopen") ? "支持" : "不支持");

//
echo date("Y-m-d H:i:s") . "<br>";


$name = "liu";
$Name = "jun";

echo $name . "<br>" . $Name;

// 可变变量

$hi = "hello";
$$hi = "你好";

printR($$hi);
printR($hello);

// 引用赋值
$a = "xxx";
$b = &$a;
$c = $a;
printR($a);
printR($b);
printR($c);
$b = "dddd";
printR($a);
printR($b);
printR($c);


// 变量类型 由变量的内容决定
$bool = FALSE;
$str = "string";

// array 数组
$array = [
    "xx" => "xxx"
];
printR($array);


// oBject
class Person{
    protected $name = "xxx";
    function say(){
        echo "<br>" . $this->name;
    }
}
class PersonChildren extends Person{
    public function sayAgain(){
        $this->name = "ddd";
        echo "<br>" . $this->name;
    }
}

$o = new PersonChildren();
$o->say();
$o->sayAgain();


// Resource 资源类型

$file_handle = fopen("info.txt","w");
varDump($file_handle);

$dir_handle = openDir("C:\\WINDOWS\\Fonts");
var_dump($dir_handle);

// 数据类型转换
$x = 123.3;
printR($x);
$x = (int)$x;
printR($x . "int 类型");
$x = (bool)$x;
printR($x . "bool 类型");
$x = (float)$x;
printR($x . "float 类型");
$x = (string)$x;
printR($x . "string 类型");

// 常量
define("CON_XXX",100);
echo CON_XXX;

// 预定义常量
printR(__FILE__);
printR(__DIR__);

printR("操作系统版本是" . PHP_OS . "");

// 运算符
$a = 9.9%3.3;
printR($a);

// a++
$a = 1;
$a ++ ;
varDump($a);
varDump($a ++ > 1);
varDump($a);
$b = $c || $a;

varDump($a);
varDump($b);

$pdo = new PDO("mysql:host=localhost;dbname=test","root","liujun");
$re = $pdo->query("select * from user");

while($row = $re->fetch()){
    printR($row);
}

@$a = 200 / 0;

date_default_timezone_set("Etc/GMT-8");

echo "当前时间" . date("Y-m-d H:i:s",time());

$currentTime =  date("H");

if($currentTime > 10 && $currentTime <= 100){
    echo "大于10小于等于 100";
}elseif($currentTime > 100){
    echo "大于100";
}

switch($currentTime){
    case 1 :
        printR("11");
        break;
    case 2:
        printR("222");
        break;
    case 3:
        printR("333");
        break;
    default:
        printR("default");
        break;
}


$arr = array('11',11);


include_once("../footer.php");
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("高洛峰");
        // $("body").append(new Date());
    })
</script>