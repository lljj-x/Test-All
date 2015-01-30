<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-15 下午4:36 
 */

include_once("../header.php");


// while 循环
$i = 1;
while($i<=10){
    echo $i ."<br />";
    $i ++ ;
}

$i = 1;
$c = 1;
while($i <=10){
    $x = 1;
    while($x <= 10){
        echo '<div style="width:50px;height:30px;display:inline-block;text-align:center">' . $c ++ . '</div>';
        $x ++;
    }
    echo '<br>';
    $i ++;
}

// do ... while 循环
$i = -1;
do{
    // 先执行后判断，所以最少执行一次 。
    echo "xxx";
    ++ $i ;
}while($i >=1);

echo "<br /><br />";
$i = -1;
do{
    // 先执行后判断，所以最少执行一次 。
    echo "xxx<br />";
    ++ $i ;
}while($i <=10);

// for 循环 乘法表

for($i = 1 ;$i <=9 ; $i ++){
    for($a = 1;$a <= $i; $a ++){
        echo $a . '*' . $i . '=' . $i * $a . "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    echo '<br>';
}

// exit() die()
echo "<br /> 1 - 100 奇数";
for($i = 1 ;$i <= 100 ;$i ++){
    if(($i % 2) !== 0 ){
        echo $i . "&nbsp;&nbsp;";
    }
}
echo "<br /> 1 - 100 质数";
for($i=2;$i<=100;$i++){
    $is_ = true;
    for($x=2;$x<$i;$x++){
        if(($i % $x) === 0){
            $is_ = false;
            break ;
        }
    }
    if($is_){
        echo $i . "&nbsp;&nbsp;";
    }
}


$conn = mysql_connect("localhost","root","liujun") or exit("数据库连接失败");

mysql_select_db("xxx") or die("数据库选择失败");


echo "啦啦啦";



include_once("../footer.php");
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("高洛峰");
        // $("body").append(new Date());
    })
</script>