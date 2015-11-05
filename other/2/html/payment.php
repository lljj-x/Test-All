<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/cart_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_cart_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="payment" class="hf pt20 pb50">
        <h1 class="title">订单提交成功，就差最后一步啦！</h1>
        <p class="prompt">
            请您在提交订单后， <b class="color_increase">1</b>小时 <b class="color_increase">00</b>分钟 <b class="color_increase">00</b>秒内完成支付，否则订单会自动取消！
        </p>
        <div class="mt50 bt">
            <table class="cart_table payment_confirm_table">
                <tbody>
                    <tr>
                        <td>
                            <div class="cart_goods_img">
                                <img class="goods_img" src="http://www.wzhouhui.egocdn.com/temp/skin1/dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="60" height="60">
                            </div>
                            <div class="cart_goods_content tl ml15">
                                <p class="cart_goods_title">
                                    <b>Mellin 美林 【免税店】西梅泥</b>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="prompt shipping_address">海外直供杭州保税区1号仓发货</span>
                                </p>
                                <p>数量:2</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="cart_goods_img">
                                <img class="goods_img" src="http://www.wzhouhui.egocdn.com/temp/skin1/dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="60" height="60">
                            </div>
                            <div class="cart_goods_content tl ml15">
                                <p class="cart_goods_title">
                                    <b>Mellin 美林 【免税店】西梅泥</b>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="prompt shipping_address">海外直供杭州保税区1号仓发货</span>
                                </p>
                                <p>数量:2</p>
                            </div>
                        </td>
                    </tr>

                    <tr class="more_goods none">
                        <td>
                            <table class="cart_table">
                                <tbody>
                                <tr>
                                    <td>
                                        <div class="cart_goods_img">
                                            <img class="goods_img" src="http://www.wzhouhui.egocdn.com/temp/skin1/dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="60" height="60">
                                        </div>
                                        <div class="cart_goods_content tl ml15">
                                            <p class="cart_goods_title">
                                                <b>Mellin 美林 【免税店】西梅泥</b>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="prompt shipping_address">海外直供杭州保税区1号仓发货</span>
                                            </p>
                                            <p>数量:2</p>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <!--  如果超过 多少个显示改按钮-->
                    <tr>
                        <td>
                            <a href="#" class="js_show_all_goods show_all_goods"><span class="icon_plus">+</span> 查看全部商品</a>
                        </td>
                    </tr>
                    <!--  如果超过 多少个显示改按钮-->

                    <tr class="bt">
                        <td>
                            <div class="cart_goods_content tl ">
                                <p class="fs16">
                                    广东省 深圳市 南山区 南山街道 创业路中兴工业城8栋2楼(李明 收)&nbsp;&nbsp;&nbsp;157888815315 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="payment_money mt30">
            <h2 class="title"><span class="text">支付金额：</span><span class="color_increase">￥998</span></h2>
        </div>
        <form action="" class="selet_payment_form">
            <div class="payment_mode mt20">
                <h2 class="title bb">平台支付</h2>
                <div class="pt30 pb10">
                    <label>
                        <input type="radio" name="payment_mode" value="alipay"/>&nbsp;&nbsp;支付宝
                        <span class="cart_icon icon_alipay"></span>
                    </label>

                    <label>
                        <input type="radio" name="payment_mode" value="weixin"/>&nbsp;&nbsp;微信支付
                        <span class="cart_icon icon_weixin"></span>
                    </label>

                    <label>
                        <input type="radio" name="payment_mode" value="yinlian"/>&nbsp;&nbsp;银联支付
                        <span class="cart_icon icon_yinlian"></span>
                    </label>
                </div>
            </div>

            <p class="go_payment mt50">
                <input type="submit" value="立即付款" class="btn btn-default btn-xl"/>
            </p>
        </form>


    </div>
</div>

<footer id="footer" class="cart_footer">
    <?php include 'foot.php'; ?>
</footer><!--end #footer -->


<script>
    $LAB.script("laytpl.min.js")
    $(function () {
        $(".js_show_all_goods").click(function (e) {
            e.preventDefault();
            $(".more_goods").toggle();
            var $tmpIcon = $(this).find(".icon_plus");
            $tmpIcon.text(($tmpIcon.text() == "+") ? "-" : "+");
        });
    })


</script>

</body>
</html>