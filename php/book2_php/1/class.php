<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-28 下午3:25
 */

include_once("../header.php");

class Person
{
    private $name;
    private $sex;
    private $age;

    public function __construct($name,$sex,$age){
        $this->name = $name;
        $this->sex = $sex;
        $this->age = $age;
    }

    public function __destruct(){
        echo "析构函数" . __FUNCTION__;
    }

    // __set 魔术方法
    public function __set($key,$value){
        if(($key === 'sex') && (($value === '男') || ($value === '女'))){
            $this->$key = $value;
        }else{
            return;
        }

        if(($key === 'age') && (($value > 0) && ($value <120))){
            $this->$key = $value;
        }else{
            return;
        }
    }

    // __get 魔术方法
    public function __get($key){
        if($key === 'sex'){
            return "保密";
        }else{
            return $this->$key;
        }
    }

    // __isset 魔术方法
    public function __isset($key){
        if($key === 'sex'){
            return false; // 不允许检测 sex
        }

        return isset($this->$key);
    }

    // __unset 魔术方法
    public function __unset($key){
        if($key === 'sex'){
            return false; // 不允许删除 私有属性 sex
        }
        unset($this->$key);
    }

    // __toString 魔术方法
    public function __toString(){
        // return $this->age;
        return "xxx";
    }

    // __call 魔术方法
    public function __call($functionName,$args){
        printR("你所调用的函数: " . $functionName . "不存在" . "。 <br>你的参数是:");
        printR($args);
    }

    public function say(){
        printR("姓名: " . $this->name . "<br>性别: " . $this->sex . "<br>年龄: " . $this->age);
    }

}

class Phone{

}

$person1 = new Person("姓名1","性别1","年龄1");
$person1->say();
$person1->name = "修改名字";

// __set 修改私有属性的值
$person1->sex = "男";
$person1->age = 100;
$person1->say();

// __get 获取私有属性的值
printR($person1->sex);
printR($person1->age);

// __isset 检测私有属性是否存在
printR("__isset --- start --- __isset");
varDump(isset($person1->sex)); // sex 不允许检测 return false;
varDump(isset($person1->age)); //
printR("__isset --- end --- __isset");

// __unset 删除私有属性
unset($person1->sex);   // sex 不允许删除
unset($person1->age);
printR($person1->say());

// __toString 方法echo 对象
$strPerson = new Person("姓名string","性别string",23);
echo $strPerson;

// __call 魔术方法
$strPerson->getxxx(); // 调用一个不存在的方法




echo "test coding.net";

include_once('../footer.php');
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("类");
        // $("body").append(new Date());
    })
</script>