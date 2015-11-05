<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_order_detail_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="user-order-detail" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap clearfix">
                <section class="order-status pr">
                    <h1 class="title">当前状态： <span>卖家已发货</span></h1>
                    <form action="提交地址" id="order-confirm-form" method="get">
                        <input type="submit" value="确认收货" class="btn btn-default js_submit"/>
                        <a href="#" class="pl20">再次购买</a>
                    </form>
                    <div class="qr-code-warp clearfix order-detail-qr">
                        <span class="qr-code-img fl"></span>
                            <span class="qr-code-text fl">  扫一扫 <br>
                                <span class="color-increase">手机购买更便宜</span>
                            </span>
                        <div class="qr-code-drop drop-box none">
                            <img src="../dist/images/domeimg/qr_code_app.jpg" alt=""> App首单减5元
                            <i class="triangle-right"><i class="triangle-right"></i></i>
                        </div>
                    </div>
                </section>
                <section class="shipping-status pt20">
                    <h3 class="bold16 pb10 border-bottom">物流信息</h3>
                    <ul class="order-shipping">
                        <li>
                            <span class="prompt">发货方式：</span>快递
                        </li>
                        <li>
                            <span class="prompt">物流公司：</span>申通
                        </li>
                        <li>
                            <span class="prompt">运单号码：</span>3301263258597
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 class="bold">物流跟踪：</h3>
                    <ul class="order-shipping">
                        <li>2015-07-11 18:23:32 您的订单开始处理 </li>
                        <li>2015-07-11 18:29:00 您的订单待配货 </li>
                        <li>2015-07-11 18:37:57 您的包裹已出库 </li>
                        <li>2015-07-11 20:43:47 【广东深圳罗湖民治分部】的收件员【吴祥城】已收件 </li>
                        <li>2015-07-12 02:59:10 快件已到达【广东深圳公司】 扫描员是【9105】上一站是【】 </li>
                        <li>2015-07-12 03:01:47 由【广东深圳公司】发往【深圳罗湖南油分点】 </li>
                        <li>2015-07-12 08:05:02 快件已到达【深圳罗湖南油分点】 扫描员是【林美足】上一站是【】 </li>
                        <li>2015-07-12 16:27:36 【深圳罗湖南油分点】已进行【疑难件】扫描 ，疑难件原因：【节假日延迟派送】 </li>
                        <li>2015-07-13 08:42:04 【深圳罗湖南油分点】已收入 </li>
                        <li>2015-07-13 08:42:04 【深圳罗湖南油分点】的派件员【王海平】正在派件 </li>
                        <li>2015-07-13 11:51:11 已签收,签收人是草签 </li>
                    </ul>
                </section>

                <section>
                    <h3 class="bold16 pb10 border-bottom">订单信息</h3>
                    <ul class="order-info">
                        <li>
                            <span class="prompt">收货地址：</span>
                            <span class="bold">张三三 &nbsp;&nbsp;&nbsp;18988888888&nbsp;&nbsp;&nbsp;广东省深圳市南山区XXXXX街道XXX号</span>
                        </li>
                        <li class="clearfix">
                            <span class="fl"><span class="prompt">订单编号：</span> 2015062316451022067997395</span>
                            <span class="fr"><span class="prompt">下单时间：</span> 2015-06-23 16:45:36</span>
                        </li>
                        <li class="clearfix">
                            <span class="fl"><span class="prompt">付款时间：</span> 2015-06-23 16:45:36 </span>
                            <span class="fr"><span class="prompt">发货时间：</span> 2015-06-23 16:45:36</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3 class="bold16 pb10">商品清单</h3>
                    <table class="table order-detail-table">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="table left-table">
                                        <thead>
                                            <tr>
                                                <th>商品信息</th>
                                                <th>重量（千克）</th>
                                                <th>单价（元）</th>
                                                <th>数量</th>
                                                <th>金额（元）</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="inline-block goods-img">
                                                        <a href="http://www.baidu.com" target="_blank">
                                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                                        </a>
                                                    </div>
                                                    <div class="inline-block goods-des">
                                                        <p class="goods-title">
                                                            <a href="http://www.baidu.com" target="_blank">Aptamil 德国爱他美 婴儿奶粉...</a>
                                                        </p>
                                                        <p class="user-shipping-address cart_icon1">
                                                            海外直供杭州保税区1号仓发货
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>3.6</td>
                                                <td>
                                                    <p class="price">9.25</p>
                                                    <p class="original-price">16.41</p>
                                                </td>
                                                <td>1</td>
                                                <td class="bold">100</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="inline-block goods-img">
                                                        <a href="http://www.baidu.com" target="_blank">
                                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                                        </a>
                                                    </div>
                                                    <div class="inline-block goods-des">
                                                        <p class="goods-title">
                                                            <a href="http://www.baidu.com" target="_blank">Aptamil 德国爱他美 婴儿奶粉...</a>
                                                        </p>
                                                        <p class="user-shipping-address cart_icon1">
                                                            海外直供杭州保税区1号仓发货
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>3.6</td>
                                                <td>
                                                    <p class="price">9.25</p>
                                                    <p class="original-price">16.41</p>
                                                </td>
                                                <td>1</td>
                                                <td class="bold">100</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table class="js_rightTable table right-table">
                                        <thead>
                                            <tr>
                                                <th>优惠（元）</th>
                                                <th>关税（元）</th>
                                                <th>运费（元）</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="prompt">
                                                    优惠券省30<br/>
                                                    佣金省56
                                                </td>
                                                <td class="prompt">
                                                    0.00<br/>
                                                    ( 关税 )
                                                </td>
                                                <td class="prompt">
                                                    0.00 <br/>
                                                    ( 快递 )
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="payment-amount">
                                    <span>实付款：</span><span class="color-increase">￥998.00</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </section>
        </div>
    </div>
</div>

<footer id="footer" class="footer-bg">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $(function(){
        var $rightTable = $(".js_rightTable");
        $rightTable.find("td").height($rightTable.parent().height() - 40);
    });
    // 确认收货
    $(".js_submit").click(function (event) {
        event.preventDefault();
        layer.confirm('确认收货 ？', {
            btn: ['确认','取消'], //按钮
            shade: false //不显示遮罩
        }, function(){
            document.getElementById("order-confirm-form").submit();
        }, function(){});
    });

    $LAB.script("user.min.js")
</script>

</body>
</html>