<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-23 上午10:40 
 */
include_once("../header.php");

// 可变长度参数

function more_args(){
    $args = func_get_args();
    echo __FUNCTION__ . "<br />";
    for($i = 0; $i<count($args); $i++){
        echo '第' . $i . '个参数是' . $args[$i] . '<br />';
    }
}

function more_args_2(){
    echo "<br />" . __FUNCTION__ . "<br />";
    for($i = 0;$i <func_num_args();$i++){
        echo "第" . $i . "个参数是" . func_get_arg($i) . "<br/>";
    }
}

more_args("xxx","dddddd","ppppppp");
more_args_2("xxx","dddddd","ppppppp");

// 变量函数
$one = function($xxx){
    echo "<br />变量函数" . $xxx . "<br />";
};

$one("xxxxxxxx");

function two($xxx){
    echo "<br />变量函数" . $xxx . "<br />";
};

$two = "two";
$two("two-two-two-");

// 递归调用
function test($n){
    echo $n . "&nbsp;&nbsp;";
    if($n > 0){
        test($n - 1);
    }else{
        echo "<-->";
    }
    echo $n . "x&nbsp;&nbsp;";
}
test(10);

// 二维数组
$xx = array(
    "1" => array(
        "姓名" => "name",
        "年龄" => "10"
    ),
    "2" => array(
        "name" => "姓名",
        "age" => 20
    ),
    "3" => array(
        "name1" => "姓名1",
        "age1" => 201
    )
);

foreach($xx as $x => $v){

}
printR($xx);

// list() each() while
$arrEach = array(
    "a" => "xxxxx",
    "b" => "dddddd",
    "d" => "xxxxxxx"
);

/*
    echo printR(each($arrEach));
    echo "<br />";
    echo printR(each($arrEach));
    echo "<br >";
    echo printR(each($arrEach));
    echo "<br />";
    echo varDump(each($arrEach));
*/

list($key,$value) = each($arrEach);
printR($key);
printR($value);

printR(current($arrEach));
printR(key($arrEach));

printR(next($arrEach));
printR(prev($arrEach));
printR(end($arrEach));
printR(reset($arrEach));

// 数组相关函数
$arrTest = array(
    "a" => "aaaaa",
    "b" => "bbbbb",
    "c" => "ccccc",
    "d" => "ddddd",
    "e" => "ddddd"
);

printR($arrTest);

echo "数组 键值 对调<br/>";
printR(array_flip($arrTest));

echo "翻转<br/>";
printR(array_reverse($arrTest,false));

echo "数组有" . count($arrTest) . "个元素" ;

printR(array_count_values($arrTest));

printR(array_unique($arrTest));

// array_filter()

function myFilterTest($var){
    if($var  % 2 === 0){
        return true;
    }
}

for($i = 1; $i<= 100;$i ++){
    $arrFilter[] = $i;
}

$arrNew = array_filter($arrFilter,myFilterTest);

echo "过滤出 1 - 100 中间的偶数";
printR($arrNew);

// ...

$arr = array(
    "aa" => 1111,
    "bb" => 22222,
    "cc" => 333,
    "dd" => 444444,
    "ee" => 555555
);


// ksort($arr);

// printR($arr);

// printR(rsort($arrNew));

function mySort($v1,$v2){
    if(strlen($v1) === strlen($v2)) return 0;
    else return (strlen($v1) > strlen($v2) ? 1 : -1);
};
printR($arr);
uasort($arr,mySort);
printR($arr);

$arrNew = array_slice($arr,1,3);
printR($arrNew);

$arrNew = array_splice($arr,3,3);
printR($arrNew);
printR($arr);

// 组合数组
$arrKey = array("a","b","c","d");
$arrValue = array("aaa","bbb","ccc","ddd");
$arrNew = array_combine($arrKey,$arrValue);
printR($arrNew);

// 合并数组
$arr1 = array(
    "a" => "aaa",
    "b" => "bbb",
    "c" => "ccc"
);
$arr2 = array(
    "d" => "ddd",
    "e" => "eee",
    "f" => "fff"
);
$arrNew = array_merge($arr1,$arr2);
printR($arrNew);

// 数组实现堆栈
$arr = array("aaaaa");

printR($arr);
echo array_push($arr,"bbbb");
echo array_push($arr,"cccc");
echo array_push($arr,"dddd");
echo array_push($arr,"eeee");
echo array_push($arr,"ffff");
printR($arr);

/*
    foreach(array_rand($arr,2) as $value){
        printR($arr[$value]);
    };
*/

printR(shuffle($arr));
printR($arr);

$arrSum = array(1,32423,2434,4234,"12.3");
printR(array_sum($arrSum));
printR(range(1,100));
printR(range(0,100,20));





include_once('../footer.php');
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("高洛峰");
        // $("body").append(new Date());
    })
</script>