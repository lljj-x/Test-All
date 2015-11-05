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
    <div id="user-order" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap clearfix">
            <div class="user-conent-warp fr">
                <div class="user-action-menu-warp clearfix">
                    <span class="bline"></span>
                    <ul class="user-action-menu-list fl clearfix">
                        <li>
                            <a href="#" class="current">所有订单</a>
                        </li>
                        <li class="split">|</li>
                        <li>
                            <a href="">待付款 <span class="color-increase">2</span></a>
                        </li>
                        <li class="split">|</li>
                        <li>
                            <a href="">待发货 <span class="color-increase">2</span></a>
                        </li>
                        <li class="split">|</li>
                        <li>
                            <a href="">待收货 <span class="color-increase">2</span></a>
                        </li>
                        <li class="split">|</li>
                        <li>
                            <a href="">待评价 <span class="color-increase">2</span></a>
                        </li>
                    </ul>
                    <form class="order-form fr">
                        <div class="order-search">
                            <input type="submit" value="搜索" class="user-icon icon-search"/>
                            <input type="text" placeholder="商品名称或订单号"/>
                        </div>
                    </form>
                </div>

                <section class="order-item-warp">
                    <table class="title-table table">
                        <tbody>
                            <td class="goods-info">商品信息</td>
                            <td class="operate">商品操作</td>
                            <td class="pirce">价格</td>
                            <td class="status">
                                <div class="order-status-drop user-drop">
                                    <span class="pointer">订单状态 <i class="triangle-bottom icon-triangle"><i class="triangle-bottom"></i></i></span>
                                    <div class="drop-box order-status-dropbox user-drop-dropbox none">
                                        <span class="top-line"></span>
                                        <div class="box-content">
                                            <ul class="order-status-dropbox-list user-drop-dropbox-list">
                                                <li><a href="# ">待付款</a></li>
                                                <li><a href="# ">待发货</a></li>
                                                <li><a href="# ">已发货</a></li>
                                                <li><a href="# ">交易完成</a></li>
                                                <li><a href="# ">交易关闭</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="deal">交易操作</td>
                        </tbody>
                    </table>
                </section>

                <section class="order-item-warp">
                    <table class="user-table table user-table-danger">
                        <thead>
                        <tr>
                            <th colspan="4">
                                <span class="fl">
                                    <span>订单号：15061850724030</span>
                                    <span class="pl30">下单时间：2015-06-18 09:25:58</span>
                                    <a href="#" class="pl30">
                                        <i class="user-icon icon-chat"></i> 联系客服
                                    </a>
                                </span>
                                <span class="fr">
                                    请在 <span class="color-increase">11</span>小时 <span class="color-increase">59</span>分 <span class="color-increase">19</span>秒内付款
                                </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="first">
                            <td class="first">
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="price-td">
                                <p>
                                    <span class="bold goods-price">￥33.40</span>
                                </p>
                                <p class="prompt fs12">(含运/税费：0.00 )</p>
                            </td>
                            <td class="status-td">
                                <p class="color-increase">等待支付</p>
                                <p><a href="#" target="_blank">订单详情</a></p>
                            </td>
                            <td>
                                <p><a href="#" class="btn btn-default">立即付款</a></p>
                                <p><a href="#" target="_blank" class="js_deleteOrder" data-order-id="xxxxxx">取消订单</a></p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section class="order-item-warp">
                    <table class="user-table table">
                        <thead>
                        <tr>
                            <th colspan="4">
                                <span class="fl">
                                    <span>订单号：15061850724030</span>
                                    <span class="pl30">下单时间：2015-06-18 09:25:58</span>
                                    <a href="#" class="pl30">
                                        <i class="user-icon icon-chat"></i> 联系客服
                                    </a>
                                </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="first">
                            <td class="first">
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:2</span>
                                        </p>
                                    </div>
                                    <div class="inline-block goods-operate">
                                        <p class="">
                                            <a href="#">申请售后</a>
                                        </p>
                                    </div>
                                </div>
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:2</span>
                                        </p>
                                    </div>
                                    <div class="inline-block goods-operate">
                                        <p class="">
                                            <a href="#">申请售后</a>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="price-td">
                                <p>
                                    <span class="bold goods-price">￥33.40</span>
                                </p>
                                <p class="prompt fs12">(含运/税费：0.00 )</p>
                            </td>
                            <td class="status-td">
                                <p class="color-increase">卖家已发货</p>
                                <p><a href="#" target="_blank">订单详情</a></p>
                                <div class="view-shipping-warp">
                                    <a href="javascript:void(0);" target="" class="view-shipping js-view-shipping">查看物流</a>

                                </div>
                            </td>
                            <td>
                                <p><a href="#" class="btn btn-default">确认收货</a></p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section class="order-item-warp">
                    <table class="user-table table">
                        <thead>
                            <tr>
                                <th colspan="4">
                                    <span class="fl">
                                        <span>订单号：15061850724030</span>
                                        <span class="pl30">下单时间：2015-06-18 09:25:58</span>
                                        <a href="#" class="pl30">
                                            <i class="user-icon icon-chat"></i> 联系客服
                                        </a>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr class="first">
                            <td class="first">
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="price-td">
                                <p>
                                    <span class="bold goods-price">￥33.40</span>
                                </p>
                                <p class="prompt fs12">(含运/税费：0.00 )</p>
                            </td>
                            <td class="status-td">
                                <p class="color-increase">待发货</p>
                                <p><a href="#" target="_blank"><a href="#" class="">订单详情</a></a></p>
                            </td>
                            <td>
                                <p>
                                    <a href="#" class="">再次购买</a>
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section class="order-item-warp">
                    <table class="user-table table">
                        <thead>
                        <tr>
                            <th colspan="4">
                                <span class="fl">
                                    <span>订单号：15061850724030</span>
                                    <span class="pl30">下单时间：2015-06-18 09:25:58</span>
                                    <a href="#" class="pl30">
                                        <i class="user-icon icon-chat"></i> 联系客服
                                    </a>
                                </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="first">
                            <td class="first">
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>

                            </td>
                            <td class="price-td">
                                <p>
                                    <span class="bold goods-price">￥33.40</span>
                                </p>
                                <p class="prompt fs12">(含运/税费：0.00 )</p>
                            </td>
                            <td class="status-td">
                                <p class="">交易成功</p>
                                <p><a href="#" target="_blank">订单详情</a></p>
                                <div class="view-shipping-warp">
                                    <a href="javascript:void(0);" target="" class="view-shipping js-view-shipping">查看物流</a>

                                </div>
                            </td>
                            <td>
                                <p>
                                    <a href="#" class="btn btn-default">我要评论</a>
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section class="order-item-warp">
                    <table class="user-table table">
                        <thead>
                        <tr>
                            <th colspan="4">
                                <span class="fl">
                                    <span>订单号：15061850724030</span>
                                    <span class="pl30">下单时间：2015-06-18 09:25:58</span>
                                    <a href="#" class="pl30">
                                        <i class="user-icon icon-chat"></i> 联系客服
                                    </a>
                                </span>
                                <span class="user-icon icon-delete js_order_delete fr"></span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="first">
                            <td class="first">
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="goods-td">
                                    <div class="inline-block goods-img">
                                        <a href="http://www.baidu.com" target="_blank">
                                            <img src="../dist/images/domeimg/other/goods_100.jpg" alt="Mellin 美林 【免税店】西梅泥" width="100" height="100">
                                        </a>
                                    </div>
                                    <div class="inline-block goods-des">
                                        <p class="goods-title">
                                            <a href="http://www.baidu.com" target="_blank">
                                                【3罐装 单罐仅166元】Aptamil 德
                                                国爱他美婴儿奶粉 Pre段 800g/罐
                                            </a>
                                        </p>
                                        <p class="goods-other">
                                            <span class="goods-original-price">￥49.49</span>
                                            <span class="goods-num">数量:1</span>
                                        </p>
                                    </div>
                                </div>

                            </td>
                            <td class="price-td">
                                <p>
                                    <span class="bold goods-price">￥33.40</span>
                                </p>
                                <p class="prompt fs12">(含运/税费：0.00 )</p>
                            </td>
                            <td class="status-td">
                                <p class="">交易成功</p>
                                <p><a href="#" target="_blank">订单详情</a></p>
                                <div class="view-shipping-warp">
                                    <a href="javascript:void(0);" target="" class="view-shipping js-view-shipping">查看物流</a>

                                </div>
                            </td>
                            <td>
                                <p>
                                    <a href="#" class="">再次购买</a>
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

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
                    <li><a href="#" class="current"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-order"></i>我的订单</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-asset"></i>我的财富</a></span></li>
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