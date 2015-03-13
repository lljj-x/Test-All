<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-2-3 下午2:43 
 */

include_once("../header.php");

abstract class Person
{
    protected $name;
    protected $country;

    public function __construct($name, $country)
    {
        $this->name = $name;
        $this->country = $country;
    }

    abstract function say(); // 并未实现该方法

    abstract function eat(); // 并未实现该方法

    public function ahahha()
    {
        printR("我是" . __CLASS__ . "中的方法");
    }
}

class Chinese extends Person
{
    public function say()
    {
        printR($this->name . "是" . $this->country);
    }

    public function eat()
    {
        printR($this->name . "用筷子吃饭");
    }
}

class America extends Person
{
    public function say()
    {
        printR($this->name . "是" . $this->country);
    }

    public function eat()
    {
        printR($this->name . "用叉子吃饭");
    }
}

// 实例化
$chinese = new Chinese("某某", "中国人");
$chinese->say();
$chinese->eat();
$chinese->ahahha();

//
$america = new America("xxx","america");
$america->say();
$america->eat();
$america->ahahha();

include_once('../footer.php');
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("abstract");
    })
</script>