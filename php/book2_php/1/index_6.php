<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-26 上午11:39 
 */

include_once("../header.php");



if(!empty($_POST)){
    printR($_POST);
    printR($_FILES);
};


$a = "xxx";
$b = "bbbbb";

function test(){
    printR($GLOBALS);
}

test();



include_once('../footer.php');
?>

<form action="" method="post">
    <input type="text" name="name"/>
    <input type="file" name="file" />
    <input type="file" name="file1" />
    <input type="submit" value="提交">
    <input type="reset" name="reset" valeu="reset" />
</form>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("高洛峰");
        // $("body").append(new Date());
    })
</script>