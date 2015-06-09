<?php
/**
 * Created by PhpStorm
 * User: Liu.Jun
 * Date: 15-5-13
 * Time: 下午2:31
 * Wetsite: buhuida.com
 */
include_once("mysql.php");
$mysql = new Mysql('localhost','test','root','','xuyuan');
$dataArr = $mysql->select('',20,"id","DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>深圳市微讯时代网络技术有限公司</title>
    <meta name="description" content=""/>
    <meta name="keywords" content=""/>
    <meta name="title" content="">
    <meta name="author" content="">
    <meta name="Copyright" content="">
    <!-- 让IE浏览器用最高级内核渲染页面 还有用 Chrome 框架的页面用webkit 内核 -->
    <meta http-equiv="X-UA-Compatible" content="chrome=1,IE=edge">

    <!-- IOS6全屏 Chrome高版本全屏-->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">

    <!-- webkit内核渲染页面-->
    <meta name="renderer" content="webkit">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="format-detection" content="telephone=no">

    <!-- Le styles -->
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <!-- Scripts -->
    <script type="text/javascript" src="js/jquery.min.1.7.js"></script>
    <script type="text/javascript" src="js/snow.js"></script>
</head>
<body>
    <div class="wrap">
        <div id="tree" class="tree">
            <img src="images/ss.jpg" border="0"/>
            <div id="yu-bg"></div>
            <div class="bg"></div>
            <div id="show" style="width: 480px; height: auto; position: fixed; border-radius: 10px; top: 30%; left: 50%; margin-left: -250px; padding: 20px; display: block; background: #C6EAF9; font-size: 16px; line-height: 30px;">
                <p class="name"></p>
                <p class="content"></p>
            </div>
            <div id="add-form" class="">
                <form action="add.php" method="post" id="xuyuan-form">
                    <label for="name">
                        姓名：
                    </label>
                    <input type="text" name="name" id="name" placeholder="请输入你的名称"/>
                    <label for="number">
                        号码：
                    </label>
                    <input type="text" name="number" id="number" placeholder="请输入你的号码(保密,用于中奖通知)"/>
                    <label for="str">
                        愿望：
                    </label>
                    <textarea rows="5" cols="20" name="str" id="str" placeholder="请输入你的愿望"></textarea>
                    <input id="submit" name="submit" type="submit" value="许愿">
                    <input id="reset" name="reset" type="reset" value="重新输入">
                </form>
            </div>

            <div id="de-yuanwang">
                <div class="de-name">

                </div>
                <div class="de-str">

                </div>
            </div>

            <div class="btn">
                <button id="btn-add-yu">我要许愿</button>
                <button id="btn-weixin">关注我们</button>
            </div>
        </div>
        <div class="guize">
            这里显示活动的规则
        </div>
        <div class="lipin">
            这里显示礼品
        </div>
    </div>
</body>
<script>
    <?php
        echo "var jsonData = " . json_encode($dataArr) . ";" ;
    ?>
</script>
<script type="text/javascript" src="js/js.js"></script>

</html>



