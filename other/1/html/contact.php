<!DOCTYPE html>
<html lang="en" class="over-x-hide">
<head>
    <?php include 'top.htm'; ?>
    <script src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>
</head>
<body class="over-x-hide">
<header id="pageheader" >
    <?php include 'publick_top.htm'; ?>
</header>

<div class="sub_banner">
    <img src="../images/domeimg/banner/ct_banner.jpg" width="100%">
</div>

<?php include 'path.htm' ?>

<div class="contactMain pb50">
    <div class="hf">
        <h1>
            深圳市环球易购电子商务有限公司
        </h1>
        <div class="ct-bg pr">
            <div class="ct-line"></div>
            <div class="ct-icon-bg">
                <span class="ct-icon ct-icon-address"></span>
                <span class="ct-text pt5">
                    <b>地址</b><br/>
                    南山区创业路中兴工业城8栋2楼
                </span>
            </div>
            <div class="ct-icon-bg bg-phone">
                <span class="ct-icon ct-icon-phone"></span>
                <span class="ct-text pt5">
                    <b>电话</b><br/>
                    0755-22678359
                </span>
            </div>
            <div class="ct-icon-bg bg-fax">
                <span class="ct-icon ct-icon-fax"></span>
                <span class="ct-text pt5">
                    <b>传真</b><br/>
                    0755-86528109
                </span>
            </div>

            <div class="ct-icon-bg bg-mail">
                <span class="ct-icon ct-icon-mail"></span>
                <span class="ct-text pt5">
                    <b>邮箱</b><br/>
                    hr@globalegrow.com
                </span>
            </div>

            <div class="ct-icon-bg bg-cooperation">
                <span class="ct-icon ct-icon-cooperation"></span>
                <span class="ct-text pt5">
                    <b>品牌合作</b><br/>
                    xiaohongzhi@globalegrow.com
                </span>
            </div>
        </div>
        <div style="width:1200px;height:500px; margin-bottom:10px;" id="dituContent"></div>
    </div>
</div>

<footer id="pageFooter">
    <?php include 'foot.htm'; ?>
</footer>
<?php include 'foot_c_js.htm'; ?>

<script>
    $LAB.script("../minjs/baiduMap.min.js")
        .script("../minjs/r_common.min.js")
        .wait(function () {
            // do ...
            var isCss3 = $.supports("transition");
            if(isCss3){
                $(".ct-icon-bg").each(function(i,v){
                    $(this).addClass("animation-delay" + i);
                    $(this).addClass("animation-bounceInFromRight");
                });

                setTimeout(function () {
                    $(".ct-text").each(function (i ,v) {
                        $(this).addClass("transition-delay" + i);
                        $(this).addClass("animation-scale");
                    })
                },800);
            }else{
                $(".ct-icon-bg,.ct-text").addClass("no-transition");
            }

        });
</script>
</body>
</html>