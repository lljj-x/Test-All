<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-15 下午3:59
 */
include_once("../header.php");

// post data

printR($_POST);
if(!empty($_POST['num_1']) && (!empty($_POST['num_2']))){
    $num_1 = $_POST['num_1'];
    $num_2 = $_POST['num_2'];
}else if(empty($_POST['num_1'])){
    if($_POST['num_2'] === 0){
        $errorMsg = "第二个数字不能为0";
    }
    $errorMsg[] = "第一个数字不能为空";
}else if(empty($_POST['num_2'])){
    $errorMsg[] = '第二个数字不能为空';
}
?>

<table border="1" align="center" width="400">
    <form action="" method="post">
        <caption><h1>简单计算器</h1></caption>
        <tr>
            <td>
                <input type="text" size="10" name="num_1" value="<?php echo isset($num_1) ?  $num_1 : ""?>" />
            </td>
            <td>
                <select name="oper">
                    <option value="+" selected="selected">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                    <option value="%">%</option>
                </select>
            </td>
            <td>
                <input type="text" size="10" name="num_2" value="<?php echo isset($num_2) ? $num_2 : ""?>" />
            </td>
            <td>
                <input type="submit" name="submit" value="计算" />
            </td>
            <td>
                <input type="reset" name="reset" value="重置">
            </td>
        </tr>
    </form>
</table>
<div style="background-color: rgba(42, 42, 42, 0.18)">
    <?php
        if(isset($errorMsg)){
            echo "<p style='color: #ff0000'>";
                foreach($errorMsg as $msg){
                    echo $msg . '<br>';
                }
            echo "</p>";
        }else{
            switch($_POST['oper']){
                case '+' :
                    echo  $num_1 . "+" . $num_2 . " = " . ($num_1 + $num_2);
                    break;
                case '-':
                    echo  $num_1 . "-" . $num_2 . " = " . ($num_1 - $num_2);
                    break;
                case '*':
                    echo  $num_1 . "*" . $num_2 . " = " . ($num_1 * $num_2);
                    break;
                case "/":
                    echo  $num_1 . "/" . $num_2 . " = " . ($num_1 / $num_2);
                    break;
                case '%':
                    echo  $num_1 . "%" . $num_2 . " = " . ($num_1 % $num_2);
                    break;
            }
        }
    ?>
</div>
<?php
include_once("../footer.php");
?>

<script type="text/javascript">
    $(document).ready(function(){
        $.inTitle("简单那计算器");
        // $("body").append(new Date());
    })
</script>