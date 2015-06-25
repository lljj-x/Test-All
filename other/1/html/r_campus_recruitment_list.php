<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'r_top.htm'; ?>

</head>
<body>
<header id="pageheader" >
    <?php include 'r_list_public_top.htm'; ?>
</header>

<div class="crlMain hf pt50 pb50">
    <div class="clearfix crl-top-city">
        <h2 class="fl text-city">笔面试城市: <span>深圳</span></h2>
        <div id="drop-menu" class="fr pr">
            <p class="text-city cup select-city">切换笔面试城市 <span class="crl-triangle crl-triangle1"><span class="crl-triangle crl-triangle2"></span></span></p>
            <ul class="crl-drop-menu clearfix">
                    <li><a href="#" class="on">深圳</a></li>
                    <li><a href="#">广州</a></li>
                    <li><a href="#">南宁</a></li>
                    <li><a href="#">长沙</a></li>
                    <li><a href="#">武汉</a></li>
                    <li><a href="#">西安</a></li>
                    <li><a href="#">大连</a></li>
                    <li><a href="#">成都</a></li>
                    <li><a href="#">南昌</a></li>
                    <li><a href="#">郑州</a></li>
                    <li><a href="#">北京</a></li>
            </ul>
        </div>
    </div>

    <table class="crl-table crl-table-1" cellspacing="0">
        <tr>
            <td class="tc table-first">
                09月 <br/>
                2015年
                <span class="crl-triangle"></span>
            </td>
            <td class="crl-bt crl-bl crl-bb">哈工大深圳研究生院</td>
            <td class="crl-bt crl-bb">国际报告厅</td>
            <td class="crl-bt crl-bb">综合宣讲会</td>
            <td class="crl-bt crl-br crl-bb">9月12日（周五）<br/><span>19:00-21:00</span></td>
        </tr>
        <tr>
            <td class="table-empty"></td>
            <td class="crl-bb crl-bl">哈工大深圳研究生院</td>
            <td class="crl-bb">国际报告厅</td>
            <td class="crl-bb">综合宣讲会</td>
            <td class="crl-bb crl-br">9月12日（周五）<br/><span>19:00-21:00</span></td>
        </tr>
    </table>

    <table class="crl-table crl-table-2" cellspacing="0">
        <tr>
            <td class="tc table-first">
                09月 <br/>
                2015年
                <span class="crl-triangle"></span>
            </td>
            <td class="crl-bt crl-bl crl-bb">哈工大深圳研究生院</td>
            <td class="crl-bt crl-bb">国际报告厅</td>
            <td class="crl-bt crl-bb">综合宣讲会</td>
            <td class="crl-bt crl-br crl-bb">9月12日（周五）<br/><span>19:00-21:00</span></td>
        </tr>
        <tr>
            <td class="table-empty"></td>
            <td class="crl-bb crl-bl">哈工大深圳研究生院</td>
            <td class="crl-bb">国际报告厅</td>
            <td class="crl-bb">综合宣讲会</td>
            <td class="crl-bb crl-br">9月12日（周五）<br/><span>19:00-21:00</span></td>
        </tr>
    </table>

    <p class="view-jobs">
        <a href="#" class="job-button">查看全部职位</a>
    </p>


</div>
<footer id="pageFooter">
    <?php include 'foot.htm'; ?>
</footer>
<?php include 'foot_c_js.htm'; ?>

<script>
    $LAB.script("r_common.min.js")
        .wait()
        .script("dropMenu.min.js")
        .wait(function () {
            $("#drop-menu").myToggleMenu({
                hasDropMenuClass : '.select-city',
                isCss3 : $.supports('transition'),
                oepnd: 'opend',
                dropMenuCLass : '.crl-drop-menu',
                showClassName : "show",
                time : 500
            });
        });
</script>
</body>
</html>