<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-19 上午11:49 
 */

// php 函数
include_once('../header.php');



function sumA($num1,$num2){
    return $num1 + $num2;
}
echo sumA(1 , 4) . "<br />";


$a = 1;
$b = 2;
function sumB(){
    global $a, $b;
    $b ++;
    return $a + $b;
}
echo sumB() . "<br />";

    // 静态变量
echo "静态变量<br>";
function sumC($num1,$num2){
    static $sum = 0;
    $sum = $num1 + $num2 + $sum;
    return $sum;
}

echo sumC(1,2);
echo sumC(1,2);


include_once('../footer.php');
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("高洛峰");
        // $("body").append(new Date());
    })
</script>