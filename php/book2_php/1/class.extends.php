<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-2-2 下午3:22
 */

include_once("../header.php");

// Class 1
class MyTest{
    protected $name;
    protected $sex;
    protected $age;

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->age = $age;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $sex
     */
    public function setSex($sex)
    {
        $this->sex = $sex;
    }

    /**
     * @return mixed
     */
    public function getSex()
    {
        return $this->sex;
    }

    public function __construct($name,$sex,$age){
        $this->name = $name;
        $this->sex = $sex;
        $this->age = $age;
    }

    public function __clone(){
        $this->sex = "我是" . $this->name . "的副本";
        $this->age = 10;
    }

    public function sayMySelf(){
        printR("我的姓名" . $this->name . " 我的性别" . $this->sex . " 我的年龄" . $this->age );
    }

    public function say(){
        printR("我是父类中的say");
    }
}

// Class 2 extends 重载父类的方法
class MyTest1 extends MyTest
{
    protected $birthday;

    public function say()
    {
        printR("我是子类中的say");
    }
}

$myTest = new MyTest1("父类姓名","男",23);
$myTest->say();

// parent:: (父类的方法)

class Mytest2 extends MyTest{
    public function __construct()
    {
        $this->birthday = "2015-01-02";
        parent::__construct("子类姓名","子类男","子类22");
    }

    public function getParams($key){
        if(isset($this->$key)){
            return $this->$key;
        }else{
            return "nothing";
        }
    }
}

$myTest1 = new Mytest2();
printR($myTest1->getParams('name'));

// clone 对象
$myTestClone = new MyTest("姓名1","男",25);
$myTestClone->sayMySelf();


$myTestClone1 = clone $myTestClone;
$myTestClone1->setName("cloneName");

$myTestClone1->sayMySelf();

printR("--------------------- 分割线 ---------------------");


// class static 方法&属性
Class StaticClass{
    static $count =0;
    const MYCONST = 10086;
    public function __construct(){
        self::$count++;
    }
    static function getCount(){
        return self::$count;
    }
    static function getConst(){
        return self::MYCONST;
    }
}

// 实例化一个对象 count + 1
$objStatic = new StaticClass();
$objStatic1 = new StaticClass();
printR(StaticClass::$count);
$objStatic2 = new StaticClass();
$objStatic3 = new StaticClass();
printR($objStatic->getCount());
printR(StaticClass::MYCONST);
printR(StaticClass::getConst());




include_once('../footer.php');
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("类");
        // $("body").append(new Date());
    })
</script>
