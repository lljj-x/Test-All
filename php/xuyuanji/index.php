<?php
/**
 * Created by PhpStorm
 * User: Liu.Jun
 * Date: 15-5-13
 * Time: 下午2:31
 * Wetsite: buhuida.com
 */
include_once("mysql.php");

$mysql = new Mysql('localhost','test','root','liujun','xuyuan');
$dataArr = $mysql->select('',30);
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
    <script type="text/javascript" src="js/js.js"></script>
</head>
<body>
    <div class="wrap">
        <div class="tree">
            <img src="images/tree.jpg" border="0" usemap="#Maptree"/>
            <map name="Maptree">
                <area id="yu1" shape="poly" coords="720,101,715,184,737,260,790,276,831,196,804,143" href="#">
                <area id="yu2" shape="poly" coords="302,287,382,277,414,280,449,311,466,374,465,399,415,412,370,393"
                      href="#">
                <area id="yu3" shape="poly" coords="458,220,529,239,553,275,541,331,494,325,477,303" href="#">
                <area id="yu4" shape="poly" coords="1072,69,982,114,956,155,959,196,987,253,1027,243,1068,171,1064,119"
                      href="#">
                <area id="yu5" shape="poly" coords="1297,256,1207,298,1182,337,1184,365,1218,436,1275,412,1297,374"
                      href="#">
                <area id="yu6" shape="poly" coords="1507,561,1439,527,1381,530,1342,564,1325,622,1378,650,1423,637,1472,588"
                      href="#">
                <area id="yu7" shape="poly" coords="249,496,345,488,388,512,404,541,411,609,368,619,317,605" href="#">
                <area id="yu8" shape="poly" coords="925,180,866,223,846,259,851,301,894,350,931,326,949,292,929,217"
                      href="#">
                <area id="yu9" shape="poly"
                      coords="674,153,630,193,609,219,611,256,625,287,656,316,692,289,704,259,681,192,676,182" href="#">
                <area id="yu10" shape="poly"
                      coords="350,631,326,630,303,637,284,656,251,720,274,716,349,722,383,708,401,674,406,657" href="#">
            </map>
        </div>
        <div>
            <table>
                <thead>
                <tr>
                    <td>名称</td>
                    <td>号码</td>
                    <td>愿望</td>
                    <td>时间</td>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($dataArr as $value): ?>
                    <tr>
                        <td><?php echo $value['name'] ?></td>
                        <td><?php echo $value['number'] ?></td>
                        <td><?php echo $value['str'] ?></td>
                        <td><?php echo date("Y-m-d H:i:t", $value['time']) ?></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <div id="add-form" class="">
            <form action="add.php" method="post">
                <label for="name">
                    姓名：
                </label>
                <input type="text" name="name" id="name"/>

                <label for="number">
                    号码：
                </label>
                <input type="text" name="number" id="number"/>

                <label for="str">
                    愿望：
                </label>
                <textarea rows="3" cols="20">

                </textarea>
            </form>
        </div>
    </div>
</body>
<script>
    <?php
        echo "var jsonData = " . json_encode($dataArr) . ";" ;
    ?>
</script>
</html>



