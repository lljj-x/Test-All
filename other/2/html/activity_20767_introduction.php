<!DOCTYPE html>
<html lang="en">
<head>
    <?
    include 'top.htm';
    ?>
    <link rel="stylesheet" href="http://www.wzhouhui.egocdn.com/temp/skin1/dist/specialActivity/20767/style_min.css">
</head>
<body>
<header id="header">
    <? include 'public_top.htm'; ?>
</header>
<div class="active-wrap bg-spike">
    <section class="i_bg1 introduction-banner"></section>
    <section class="i_bg2"></section>
    <section class="i_bg3"></section>
    <section class="i_bg4">
        <div class="w1200">
            <div class="introduction-slider topBannerWrap clearfix">
                <div class="slider" id="js_banner">
                    <ul class="slideList clearfix">
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-1.jpg" height="680"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-2.jpg" height="680"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-3.jpg" height="680"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-4.jpg" height="680"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-5.jpg" height="680"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-6.jpg" height="680"/>
                            </a>
                        </li>
                        <li>
                            <a href="/sales.html#bg0" target="_blank">
                                <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/slide/banner-7.jpg" height="680"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section class="i_bg5">
        <div class="center-img">
            <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/i-cate.png" usemap="#Map1"/>
            <map name="Map1" id="Map1">
                <area shape="rect" coords="72,746,252,791" href="/sales.html#bg1" target="_blank"/>
                <area shape="rect" coords="315,746,489,790" href="/sales.html#bg2" target="_blank"/>
                <area shape="rect" coords="556,748,728,788" href="/sales.html#bg3" target="_blank"/>
                <area shape="rect" coords="793,749,969,789" href="/sales.html#bg5" target="_blank"/>
                <area shape="rect" coords="1034,748,1208,791" href="/sales.html#bg7" target="_blank"/>
            </map>
        </div>
    </section>
    <section class="i_bg6">
        <div class="w1200">
            <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/i-png1.png"/>
            <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/i-png2.png"/>
            <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/i-png3.png"/>
            <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/i-png4.png" usemap="#Map2"/>
            <map name="Map2" id="Map2">
                <area shape="rect" coords="244,63,504,178" href="http://www.wzhouhui.com/category-b-10.html" target="_blank"/>
                <area shape="rect" coords="691,116,968,274" href="http://www.wzhouhui.com/category-c-25.html" target="_blank"/>
                <area shape="rect" coords="293,280,602,450" href="http://www.wzhouhui.com/category-b-38.html" target="_blank"/>
                <area shape="rect" coords="691,312,1047,496" href="http://www.wzhouhui.com/category-c-27.html" target="_blank"/>
            </map>
        </div>
    </section>
    <section class="i_bg7"></section>

</div><!-- .active-wrap -->

<footer id="footer" class="footer-bgf3">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("jquery.flexslider.min.js")
        .wait(function () {
            $('#js_banner').flexslider({
                namespace:"",
                animation: "fade",
                selector: ".slideList > li",
                pauseOnAction:false,
                directionNav: true,
                slideshowSpeed: 10000
            });
        })
    
</script>
</body>
</html>