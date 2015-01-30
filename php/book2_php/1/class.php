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
    private function __set($key,$value){
        if(($key === 'sex') && (($value === '男') || ($value === '女'))){
        }else{
            return;
        }

        if(($key === 'age') && (($value > 0) && ($value <120))){
        }else{
            return;
        }

        $this->$key = $value;
    }

    public function say(){
        printR("姓名: " . $this->name . "<br>性别: " . $this->sex . "<br>年龄: " . $this->age);
    }

//    public function getName(){
//        return $this->name;
//    }
//
//    public function setName($name){
//        $this->name = $name;
//    }
}

class Phone{

}

$person1 = new Person("姓名1","性别1","年龄1");
$person1->say();

$person1->name = "修改名字";
$person1->sex = "男";
$person1->age = 100;
$person1->say();



echo "test coding.net";


include_once('../footer.php');
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("类");
        // $("body").append(new Date());
    })
</script>