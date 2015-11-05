<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="user-coupon" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap clearfix">
            <div class="user-conent-warp fr">
                <div class="user-action-menu-warp">
                    <span class="bline"></span>
                    <ul class="user-action-menu-list clearfix">
                        <li>
                            <a href="#">我的佣金</a>
                        </li>
                        <li class="split">|</li>
                        <li>
                            <a href="" class="current">我的优惠券 <span class="color-increase">2</span></a>
                        </li>
                    </ul>
                </div>
                <div class="coupon-form">
                    <span class="input-warp ">
                        <span class="bold">输入兑换码</span>
                        <input type="text" class="coupon-input" name="coupon"/>
                    </span>
                    <span class="submit-warp">
                        <input type="submit" class="btn btn-default" value="兑换"/>
                    </span>
                    <span class="ml30">
                        <a href="#" class="color-increase">优惠券使用规则</a>
                    </span>
                </div>

                <ul class="coupon-list-wrap clearfix">
                    <li>
                        <p class="coupon-num">￥<strong>10</strong></p>
                        <p class="coupon-condition">满99元减10元</p>
                        <p class="coupon-end-time">有效期：2015年6月15日—6月30日</p>
                        <p class="get-coupon clearfix"><span class="fl">全场通用</span><a href="#" class="fr">立即领取</a></p>
                    </li>
                    <li>
                        <p class="coupon-num">￥<strong>20</strong></p>
                        <p class="coupon-condition">满199元减10元</p>
                        <p class="coupon-end-time">有效期：2015年6月15日—6月30日</p>
                        <p class="get-coupon clearfix"><span class="fl">全场通用</span><a href="#" class="fr">立即领取</a></p>
                    </li>
                    <li>
                        <p class="coupon-num">￥<strong>30</strong></p>
                        <p class="coupon-condition">满299元减10元</p>
                        <p class="coupon-end-time">有效期：2015年6月15日—6月30日</p>
                        <p class="get-coupon clearfix"><span class="fl">全场通用</span><a href="#" class="fr">立即领取</a></p>
                    </li>
                    <li>
                        <p class="coupon-num">￥<strong>20</strong></p>
                        <p class="coupon-condition">满199元减10元</p>
                        <p class="coupon-end-time">有效期：2015年6月15日—6月30日</p>
                        <p class="get-coupon clearfix"><span class="fl">仅限营养保健</span><a href="#" class="fr">立即领取</a></p>
                    </li>
                    <li class="used">
                        <p class="coupon-num">￥<strong>20</strong></p>
                        <p class="coupon-condition">满199元减10元</p>
                        <p class="coupon-end-time">有效期：2015年6月15日—6月30日</p>
                        <p class="get-coupon clearfix"><span class="fl">仅限家居洗护</span><a href="#" class="fr">立即领取</a></p>
                        <div class="bg-layer">
                            <div class="bg"></div>
                            <i class="icon-status icon-coupon-list"></i>
                        </div>
                    </li>
                    <li class="disabled">
                        <p class="coupon-num">￥<strong>10</strong></p>
                        <p class="coupon-condition">满99元减10元</p>
                        <p class="coupon-end-time">有效期：2015年6月15日—6月30日</p>
                        <p class="get-coupon clearfix"><span class="fl">仅限美容彩妆</span><span class="all-out fr">已领完</span></p>
                        <div class="bg-layer">
                            <div class="bg"></div>
                            <i class="icon-status icon-coupon-list"></i>
                        </div>
                    </li>
                </ul>

                <div class="page tc mt30">
                    <div class="p-wrap">
						<span class="p-num">
							<a href="#" class="prev">上一页</a>
							<a href="#" class="cur">1</a>
							<a href="#">2</a>
							<a href="#">3</a>
							<a href="#">4</a>
							<a href="#">5</a>
							<a href="#" class="next">下一页</a>
						</span>
						<span class="p-skip">
							<em>共<b>5</b>页，&nbsp;&nbsp;到第</em>
							<input type="text" value="1" class="input-txt">
							<em>页</em>
							<a href="#" class="btn-go">确定</a>
						</span>
                    </div>
                </div>
            </div>



            <aside class="user-sidebar fl">
                <ul>
                    <li class="user-center-li"><a href="#" class="user-center">个人中心</a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-order"></i>我的订单</a></span></li>
                    <li><a href="#" class="current"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-asset"></i>我的财富</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-sale"></i>售后管理</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-account"></i>账户信息</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-address"></i>收货地址</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-commission"></i>佣金排名</span></a></li>
                </ul>
            </aside>
        </div>
    </div>
</div>

<footer id="footer">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("user.min.js")
</script>

</body>
</html>