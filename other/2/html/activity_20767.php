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
<div class="active-wrap">
    <section id="banner">
        <div class="hf">
            <?php // 优惠链接 ?>
            <a href="#" class="raiders-btn block-img" target="_blank">
                <img src="/temp/skin1/dist/specialActivity/20767/images/raiders_btn.png" alt="优惠攻略"/>
            </a>
        </div>
    </section>
    <div class="cate-warp" id="cate-warp">
        <section id="bg0">
        <div class="hf">
            <div class="spike-warp">
                <div class="spike-tab-wrap">
                    <ul id="spike-tabs" class="clearfix">
                        <li>
                            <a href="#tab-spike-0" class="active">
                                <span class="active-bg a-icon"></span>
                                <span class="pr">10:00场</span>
                                <span class="point a-icon icon-point"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#tab-spike-1">
                                <span class="active-bg a-icon"></span>
                                <span class="pr">12:00场</span>
                                <span class="point a-icon icon-point"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#tab-spike-2">
                                <span class="active-bg a-icon"></span>
                                <span class="pr">14:00场</span>
                                <span class="point a-icon icon-point"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#tab-spike-3">
                                <span class="active-bg a-icon"></span>
                                <span class="pr">明日预告</span>
                                <span class="point a-icon icon-point"></span>
                            </a>
                        </li>
                    </ul>
                    <div class="b-line"></div>
                </div>

                <ul id="spike-tab-contents">
                    <?php // 循环这个 li  开始时间差，结束时间差?>
                    <li class="js_spike" id="tab-spike-0" data-start-time='0' data-end-time='3'>
                        <div class="goods-countdown">
                            <div class="countdown-warp clearfix">
                                <p class="text js_text">
                                    距离本场开始还有：
                                </p>
                                <p class="a-icon countdown clearfix js_time">
                                    <span class="h">00</span>
                                    <span class="m">00</span>
                                    <span class="s">00</span>
                                </p>
                            </div>
                        </div>
                        <ul class="goods-list-wrap clearfix">
                            <li>
                                <p class="goods-img">
                                    <a href="#1" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>

                                <?php // 这里需要判断 是不是被抢完，已经结束的活动不用判断，js统一加上结束?>
                                <a class="spike-out spike-warp" href="#商品链接" target="_blank">已抢完<span class="spike-layer"></span></a>
                                <?php  // end ?>

                                <?php // 这里需要判断 抢完不显示?>
                                <p class="spike-btn a-icon"></p>
                                <?php // ?>


                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#2" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#3" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                        </ul>
                    </li>
                    <li class="js_spike" id="tab-spike-1" data-start-time='300' data-end-time='6000'>
                        <div class="goods-countdown">
                            <div class="countdown-warp clearfix">
                                <p class="text js_text">
                                    距离本场开始还有：
                                </p>
                                <p class="a-icon countdown clearfix js_time">
                                    <span class="h">00</span>
                                    <span class="m">00</span>
                                    <span class="s">00</span>
                                </p>
                            </div>
                        </div>
                        <ul class="goods-list-wrap clearfix">
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201507/grid-img/1436480472928-P-2751257.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435169936972-P-2769802.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434073220813-P-2724990.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                        </ul>
                    </li>
                    <li class="js_spike" id="tab-spike-2" data-start-time='4600' data-end-time='5600'>
                        <div class="goods-countdown">
                            <div class="countdown-warp clearfix">
                                <p class="text js_text">
                                    距离本场开始还有：
                                </p>
                                <p class="a-icon countdown clearfix js_time">
                                    <span class="h">00</span>
                                    <span class="m">00</span>
                                    <span class="s">00</span>
                                </p>
                            </div>
                        </div>
                        <ul class="goods-list-wrap clearfix">
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                        </ul>
                    </li>
                    <li class="js_spike" id="tab-spike-3" data-start-time='5600' data-end-time='7600'>
                        <div class="goods-countdown">
                            <div class="countdown-warp clearfix">
                                <p class="text js_text">
                                    距离本场开始还有：
                                </p>
                                <p class="a-icon countdown clearfix js_time">
                                    <span class="h">00</span>
                                    <span class="m">00</span>
                                    <span class="s">00</span>
                                </p>
                            </div>
                        </div>
                        <ul class="goods-list-wrap clearfix">
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201508/grid-img/1438986344854-P-2907660.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201508/grid-img/1438984720703-P-2885717.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                            <li>
                                <p class="goods-img">
                                    <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                        <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201508/grid-img/1438986704401-P-2898267.jpg?a=6" height="180" width="180"/>
                                    </a>
                                </p>
                                <p class="goods-title">
                                    <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                                </p>
                                <p class="goods-price">
                                    秒杀价 <span class="price-text">￥140.00</span>
                                </p>
                                <p class="goods-o-price">
                                    市场价：￥190.00
                                </p>
                                <p class="spike-btn a-icon"></p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    </section>

        <section id="bg1">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate1.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
        </section>

        <section id="bg2">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate2.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
        </section>

        <section id="bg3">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate3.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
        </section>

        <section id="bg4">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate4.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
        </section>

        <section id="bg5">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate5.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>

            </div>
        </section>

        <section id="bg6">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate6.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="bg7">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate7.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>

                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="bg8">
            <div class="hf">
                <div class="goods-bg">
                    <ul class="goods-list-wrap clearfix">
                        <li class="li-cate">
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="/temp/skin1/dist/specialActivity/20767/images/cate8.jpg" width="246" height="326"/>
                                </a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435099670245-P-2766531.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1434074169816-P-2725494.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                        <li>
                            <p class="goods-img">
                                <a href="#" title="【保税】澳大利亚Devondale德运 全脂奶粉 1kg">
                                    <img src="/temp/skin1/dist/images/domeimg/lazyload1.gif" data-original="http://img.wzhouhui.com/wzhl/2015/201506/grid-img/1435103423718-P-2767104.jpg?a=6" height="150" width="150"/>
                                </a>
                            </p>
                            <p class="goods-title">
                                <a href="#">【保税】澳大利亚Devondale德运 全脂奶粉 1kg</a>
                            </p>
                            <p class="goods-o-price">
                                约惠价：￥190.00
                            </p>
                            <p class="goods-price">
                                约惠价 <span class="price-text">￥140.00</span>
                            </p>
                            <p class="goods-buy-btn">
                                <a href="#">立即抢购</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <aside class="sidebar" id="js_sidebar">
            <ul class="cate-list">
                <li>
                    <a href="#bg0">天天特卖</a>
                </li>
                <li>
                    <a href="#bg1" class="active">德国奶粉</a>
                </li>
                <li>
                    <a href="#bg2">美国雅培</a>
                </li>
                <li>
                    <a href="#bg3">女性健康</a>
                </li>
                <li>
                    <a href="#bg4">营养保健</a>
                </li>
                <li>
                    <a href="#bg5">关爱宝宝</a>
                </li>
                <li>
                    <a href="#bg6">辅食精选</a>
                </li>
                <li>
                    <a href="#bg7">美容彩妆</a>
                </li>
                <li>
                    <a href="#bg8">约惠攻略</a>
                </li>
            </ul>
            <div class="">
                <a href="javascript:;" class="psa c-service" onclick="javascript:openChat('http://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=531713&configID=124972&jid=7057418698&info=',900,600);" rel="nofollow">联系客服</a>
            </div>
            <div>
                <a href="javascript:;" class="psa js_toTop to-top">Top</a>
            </div>
        </aside>
    </div>
</div><!-- .active-wrap -->

<footer id="footer" class="footer-bgf3">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("jquery.nav.js")
        .script('/temp/skin1/dist/specialActivity/20767/js.min.js?<?php echo time()?>')
        .wait(function () {

        });
</script>
</body>
</html>