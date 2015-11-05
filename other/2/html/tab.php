<!DOCTYPE html>
<html lang="en">
<head>
	<? include 'top.htm'; ?>

	<link rel="stylesheet" href="http://www.wzhouhui.egocdn.com/temp/skin1/dist/mincss/tab_min.css?2015073106">
</head>
<body>
	
	<div class="tab-wrap">
		<div class="tab-nav-wrap">
			<ul class="tab-nav clearfix" id="js_tabNav">
				<li class="on"><a href="javascript:void(0);">会员信息</a></li>
				<li><a href="javascript:void(0);">订单信息</a></li>
				<li><a href="javascript:void(0);">退换货</a></li>
				<li><a href="javascript:void(0);">咨询商品</a></li>
			</ul>
		</div><!-- .tab-nav-wrap -->

		
		<div class="items-wrap" id="js_itemsWrap">
			<!-- 会员信息 -->
			<div class="item user-info-item">
				<div class="user-info-wrap mb25 bord_e4">
					<h3 class="title">会员信息：李明，你好！</h3>
					<ul class="user-info clearfix">
						<li>姓名：李明</li>
						<li>微信号：xxxxxxxx</li>
						<li>电话：0755-85628999</li>
						<li>手机：159 8888 8888</li>
						<li>邮箱：xxxxxxx@mail.com</li>
						<li>积分：156</li>
						<li>客服：陈玉玲</li>
						<li>对话时间：2015-07-15 15:14:12</li>
					</ul>
				</div><!-- .user-info-wrap -->
				<div class="user-address-wrap mb25 bord_e4">
					<h3 class="title">客户地址：</h3>
					<div class="user-address">
						<p>广东省深圳市南山区创业路中兴工业城8栋2楼</p>
						<p>广东省深圳市南山区创业路中兴工业城7栋6楼</p>
					</div>
				</div><!-- .user-address-wrap -->
			</div><!-- .item -->
			
			<!-- 订单信息 -->
			<div class="item order-info-item none">
				<table class="order-nav mb25" width="100%" cellspacing="0" cellpadding="0">
					<tbody>
						<tr>
							<td class="order-number td7_1">订单号</td>
							<td class="customer-service td7_2">客服</td>
							<td class="order-receiver td7_3">收货人</td>
							<td class="order-amount td7_4">订单金额</td>
							<td class="order-time-wrap td7_5">
								<div class="order-time user-drop">
									<span class="pointer">下单时间<i class="triangle-bottom icon-triangle"><i class="triangle-bottom"></i></i></span>
									<div class="drop-box order-status-dropbox user-drop-dropbox none">
	                                    <span class="top-line"></span>
	                                    <div class="box-content">
	                                        <ul class="order-status-dropbox-list user-drop-dropbox-list">
	                                            <li><a href="#">最近一个月</a></li>
	                                            <li><a href="#">最近三个月</a></li>
	                                            <li><a href="#">三个月之前</a></li>
	                                        </ul>
	                                    </div>
	                                </div>
								</div>
							</td>
							<td class="order-all-state td7_6">
								<div class="order-status user-drop">
									<span class="pointer">全部状态<i class="triangle-bottom icon-triangle"><i class="triangle-bottom"></i></i></span>
									<div class="drop-box order-status-dropbox user-drop-dropbox none">
	                                    <span class="top-line"></span>
	                                    <div class="box-content">
	                                        <ul class="order-status-dropbox-list user-drop-dropbox-list">
	                                            <li><a href="#">待付款</a></li>
	                                            <li><a href="#">待发货</a></li>
	                                            <li><a href="#">待收货</a></li>
	                                            <li><a href="#">已完成</a></li>
	                                            <li><a href="#">已取消</a></li>
	                                        </ul>
	                                    </div>
	                                </div>
								</div>
							</td>
							<td class="order-operate td7_7">操作</td>
						</tr>
					</tbody>
				</table>
				
				<div class="js_orderWrap">
					<table class="user-order-wrap mb25 table_bord_e4">
						<thead>
							<tr>
								<th colspan="7">订单编号：15061850724030</th>
							</tr>
						</thead>
						<tbody>
							<tr class="order-info">
								<td class="pro-img td7_1">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
								</td>
								<td class="customer-service td7_2">陈玉玲</td>
								<td class="order-receiver td7_3">张三</td>
								<td class="order-amount td7_4">￥299.98</td>
								<td class="order-time td7_5">2015-06-18 09:25:58</td>
								<td class="order-state td7_6">待发货</td>
								<td class="order-operate td7_7"><a href="javascript:void(0);" class="js_viewDetails">查看</a></td>
							</tr>
						</tbody>
					</table><!-- .user-order-wrap -->

					<div class="order-details bord_e4 none js_orderWrapDetails">
						<h1 class="details-title clearfix">
							<span class="left fl">订单编号：<strong>169520623</strong></span>
							<span class="fl">当前状态：<i>已发货</i></span>
							<a href="javascript:void(0);" class="js_closeThisDetails">【关闭】</a>
						</h1>
						
						<!-- 物流信息 -->
						<table class="logistics-information mb25" width="100%" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>物流信息</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="first"><span class="tit">发货方式：</span><span class="content">快递</span></td>
								</tr>
								<tr>
									<td><span class="tit">物流公司：</span><span class="content">申通快递</span></td>
								</tr>
								<tr>
									<td><span class="tit">运单号码：</span><span class="content">3301263258597</span></td>
								</tr>
							</tbody>
						</table><!-- .logistics-information -->

						<!-- 订单信息 -->
						<table class="order-information mb50" width="100%" cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th colspan="2">订单信息</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="first address" colspan="2"><span class="tit">收货地址：</span><span class="content fb">张三三   18988888888   广东省深圳市南山区XXXXX街道XXX号</span></td>
								</tr>
								<tr>
									<td class="td_left"><span class="tit">订单编号：</span><span class="content">2015062316451022067997395</span></td>
									<td class="td_right"><span class="tit">下单时间：</span><span class="content">2015-06-23 16:45:36</span></td>
								</tr>
								<tr>
									<td class="td_left"><span class="tit">付款时间：</span><span class="content">2015-06-23 16:45:36</span></td>
									<td class="td_right"><span class="tit">支付金额：</span><span class="content">¥968.00（支付宝支付）</span></td>
								</tr>
								<tr>
									<td class="td_left"><span class="tit">发货时间：</span><span class="content">2015-06-23 16:45:36</span></td>
									<td class="td_right"><span class="tit">快件签收时间：</span><span class="content">2015-06-23 16:45:36</span></td>
								</tr>
								<tr>
									<td class="td_left"><span class="tit">确认收货：</span><span class="content">已确认</span></td>
									<td class="td_right"><span class="tit">评价时间：</span><span class="content">2015-06-23 16:45:36</span></td>
								</tr>                                                               
							</tbody>
						</table><!-- .order-information -->
						
						<!-- 商品清单 -->
						<p class="product-Listing fb">商品清单</p>

						<table class="product-List-wrap mb25 table">
							<thead>
								<tr>
									<th class="td4_1">商品信息</th>
									<th class="td4_2">单价（元）</th>
									<th class="td4_3">数量</th>
									<th class="td4_4">金额（元）</th>
								</tr>
							</thead>
							<tbody>
								<tr class="product-List">
									<td class="td4_1">
										<div class="pro-img-wrap clearfix">
											<span class="img-wrap fl"><a href="#" target="_blank"><img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt=""></a></span>
											<span class="product-title fl">Mellin 美林 【免税店】西梅泥（100g×2）*2 来自意大利本土</span>
										</div>
									</td>
									<td class="td4_2">499</td>
									<td class="td4_3">1</td>
									<td class="td4_4 fb">499</td>
								</tr>
								<tr class="product-List">
									<td class="td4_1">
										<div class="pro-img-wrap clearfix">
											<span class="img-wrap fl"><a href="#" target="_blank"><img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt=""></a></span>
											<span class="product-title fl">Mellin 美林 【免税店】西梅泥（100g×2）*2 来自意大利本土</span>
										</div>
									</td>
									<td class="td4_2">499</td>
									<td class="td4_3">1</td>
									<td class="td4_4 fb">499</td>
								</tr>
								<tr class="product-List">
									<td class="td4_1">
										<div class="pro-img-wrap clearfix">
											<span class="img-wrap fl"><a href="#" target="_blank"><img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt=""></a></span>
											<span class="product-title fl">Mellin 美林 【免税店】西梅泥（100g×2）*2 来自意大利本土</span>
										</div>
									</td>
									<td class="td4_2">499</td>
									<td class="td4_3">1</td>
									<td class="td4_4 fb">499</td>
								</tr>
							</tbody>
						</table><!-- .product-List-wrap -->

						<ul class="order-price-all">
							<li>佣金：    <span>-￥0.00</span></li>
							<li>优惠券： <span>-￥30.00</span></li>
							<li>订单运费：<span>-￥0.00</span></li>
							<li>订单关税：<span>-￥0.00</span></li>
							<li class="actually-paid-amount">实付金额：<strong>￥998.00</strong></li>
						</ul>

					</div><!-- .order-details -->
				</div><!-- .js_orderWrap -->

				<div class="js_orderWrap">
					<table class="user-order-wrap mb25 table_bord_e4">
						<thead>
							<tr>
								<th colspan="7">订单编号：15061850724030</th>
							</tr>
						</thead>
						<tbody>
							<tr class="order-info">
								<td class="pro-img td7_1">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
								</td>
								<td class="customer-service td7_2">陈玉玲</td>
								<td class="order-receiver td7_3">张三</td>
								<td class="order-amount td7_4">￥299.98</td>
								<td class="order-time td7_5">2015-06-18 09:25:58</td>
								<td class="order-state td7_6">待发货</td>
								<td class="order-operate td7_7"><a href="javascript:void(0);">查看</a></td>
							</tr>
						</tbody>
					</table><!-- .user-order-wrap -->

					<div class="order-details">
						
					</div>
				</div><!-- .js_orderWrap -->

				<div class="js_orderWrap">
					<table class="user-order-wrap mb25 table_bord_e4">
						<thead>
							<tr>
								<th colspan="7">订单编号：15061850724030</th>
							</tr>
						</thead>
						<tbody>
							<tr class="order-info">
								<td class="pro-img td7_1">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
								</td>
								<td class="customer-service td7_2">陈玉玲</td>
								<td class="order-receiver td7_3">张三</td>
								<td class="order-amount td7_4">￥299.98</td>
								<td class="order-time td7_5">2015-06-18 09:25:58</td>
								<td class="order-state td7_6">待发货</td>
								<td class="order-operate td7_7"><a href="javascript:void(0);">查看</a></td>
							</tr>
						</tbody>
					</table><!-- .user-order-wrap -->

					<div class="order-details">
						
					</div>
				</div><!-- .js_orderWrap -->
			</div><!-- .item -->

			<!-- 退换货 -->
			<div class="item returns-info-item none">
				<table class="returns-nav mb25" width="100%" cellspacing="0" cellpadding="0">
					<tbody>
						<tr>
							<td class="order-number td7_1">订单号</td>
							<td class="goods-price td7_2">商品价</td>
							<td class="refund-amount td7_3">退款金额</td>
							<td class="application-time td7_4">申请时间</td>
							<td class="change-time td7_5">变更时间</td>
							<td class="returns-all-state td7_6">
								<div class="order-status user-drop">
									<span class="pointer">全部状态<i class="triangle-bottom icon-triangle"><i class="triangle-bottom"></i></i></span>
									<div class="drop-box order-status-dropbox user-drop-dropbox none">
	                                    <span class="top-line"></span>
	                                    <div class="box-content">
	                                        <ul class="order-status-dropbox-list user-drop-dropbox-list">
	                                            <li><a href="#">等待审核中</a></li>
	                                            <li><a href="#">退款完成</a></li>
	                                            <li><a href="#">退款关闭</a></li>
	                                        </ul>
	                                    </div>
	                                </div>
								</div>
							</td>
							<td class="returns-operate td7_7">操作</td>
						</tr>
					</tbody>
				</table>
				
				<div class="js_orderWrap">
					<table class="user-returns-wrap mb25 table_bord_e4">
						<thead>
							<tr>
								<th colspan="7">订单编号：15061850724030</th>
							</tr>
						</thead>
						<tbody>
							<tr class="returns-info">
								<td class="pro-img td7_1">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
								</td>
								<td class="goods-price td7_2">￥298.98</td>
								<td class="refund-amount td7_3">￥298.98</td>
								<td class="application-time td7_4">2015-06-18 09:25:58</td>
								<td class="change-time td7_5">2015-06-18 09:25:58</td>
								<td class="returns-state td7_6 status-ing">等待审核中</td>
								<td class="returns-operate td7_7"><a href="javascript:void(0);" class="js_viewDetails">查看</a></td>
							</tr>
						</tbody>
					</table><!-- .user-returns-wrap -->

					<div class="returns-details bord_e4 none js_orderWrapDetails">
						<h1 class="details-title clearfix">
							<!--icon-returns-ing:进行中， icon-returns-success：成功 ，icon-returns-end：结束-->
							<i class="icon-returns icon-returns-ing"></i>
							<strong>等待售后人员处理退款申请</strong>
							<span class="tips">
								如果售后人员同意，退款申请将达成并退款至您的微信、支付宝或银行卡中如果商家拒绝，将需要你修改退款申请。
							</span>
							<a href="javascript:void(0);" class="js_closeThisDetails">【关闭】</a>
						</h1>
						
						<div class="returns-details-content">
							<h3 class="returns-content-tit fb mb20">售后跟踪</h3>

							<p class="fb mb20">用户名（手机号）于2015-07-06 13：00：02修改售后申请</p>
							
							<p class="mb20">
								退款类型：仅退款<br/> 
								退款金额：<span class="color-main">￥499</span><br/>
								退款原因：<span class="fb">没有收到货</span>
							</p>
							
							<p class="mb20">
								退款说明<br/>
								荷兰皇室首选品牌，婴幼儿食品行业公认领袖品牌之一，纽迪希亚 100年科研支持，
								ENP ™ 帮助妈妈发现后天选择的力量。五洲会海购直飞荷兰，一手采购!
							</p>
							<p class="mb20">
								退款凭证<br/>
								<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt="">
								<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt="">
								<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt="">
								<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt="">
								<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt="">
							</p>
						</div><!-- .returns-details-content -->
					</div><!-- .returns-details -->
				</div><!-- .js_orderWrap -->

				<div class="js_orderWrap">
					<table class="user-returns-wrap mb25 table_bord_e4">
						<thead>
							<tr>
								<th colspan="7">订单编号：15061850724030</th>
							</tr>
						</thead>
						<tbody>
							<tr class="returns-info">
								<td class="pro-img td7_1">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
								</td>
								<td class="goods-price td7_2">￥298.98</td>
								<td class="refund-amount td7_3">￥298.98</td>
								<td class="application-time td7_4">2015-06-18 09:25:58</td>
								<td class="change-time td7_5">2015-06-18 09:25:58</td>
								<td class="returns-state td7_6 status-success">退款完成</td>
								<td class="returns-operate td7_7"><a href="javascript:void(0);">查看</a></td>
							</tr>
						</tbody>
					</table><!-- .user-returns-wrap -->

					<div class="returns-details bord_e4">

					</div><!-- .returns-details -->
				</div><!-- .js_orderWrap -->

				<div class="js_orderWrap none">
					<table class="user-returns-wrap mb25 table_bord_e4">
						<thead>
							<tr>
								<th colspan="7">订单编号：15061850724030</th>
							</tr>
						</thead>
						<tbody>
							<tr class="returns-info">
								<td class="pro-img td7_1">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
									<img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="60" height="60" alt="">
								</td>
								<td class="goods-price td7_2">￥298.98</td>
								<td class="refund-amount td7_3">￥298.98</td>
								<td class="application-time td7_4">2015-06-18 09:25:58</td>
								<td class="change-time td7_5">2015-06-18 09:25:58</td>
								<td class="returns-state td7_6 status-end">退款关闭</td>
								<td class="returns-operate td7_7"><a href="javascript:void(0);">查看</a></td>
							</tr>
						</tbody>
					</table><!-- .user-returns-wrap -->

					<div class="returns-details bord_e4">

					</div><!-- .returns-details -->
				</div><!-- .js_orderWrap -->
			</div><!-- .item -->
			
			<!-- 咨询商品 -->
			<div class="item consultingGoods-info-item none">
				<div class="goods-info-wrap clearfix mb25">
					<div class="goods-img fl"><img src="../dist/images/domeimg/goods/pro_normal_img.jpg" width="250" height="250" alt=""></div>
					<div class="goods-info fr">
						<p class="goods-title fb">【3罐装 单罐仅166元】Aptamil 德国爱他美 婴儿奶粉 Pre段 800g/罐</p>
						<p class="goods-price-wrap"><span class="shop_price fb">￥499</span>  <span class="market_price">市场价：988</span></p>
						<p class="goods-instock"><span class="g-tit">库存：</span>10件</p>
						<p class="goods-shipment"><span class="g-tit">运费：</span>15元</p>
						<p class="goods-coupon"><span class="g-tit">优惠券：</span><strong>满299减20 全场</strong></p>
						<p class="goods-shipping-to mb20"><span class="g-tit">发货地：</span>德国直供杭州保税区1号仓发货</p>
						<a href="#" target="_blank">查看商品详情</a>
					</div>
				</div><!-- .goods-info -->

				<!-- 客户购物车列表 -->
				<table class="product-List-wrap mb25 table">
					<thead>
						<tr>
							<th class="td3_1">商品信息</th>
							<th class="td3_2">单价（元）</th>
							<th class="td3_3">数量</th>
						</tr>
					</thead>
					<tbody>
						<tr class="product-List">
							<td class="td3_1">
								<div class="pro-img-wrap clearfix">
									<span class="img-wrap fl"><a href="#" target="_blank"><img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt=""></a></span>
									<span class="product-title fl">Mellin 美林 【免税店】西梅泥（100g×2）*2 来自意大利本土</span>
								</div>
							</td>
							<td class="td3_2"><span class="shop_price">499</span><br/><span class="market_price">998</span></td>
							<td class="td3_3">1</td>
						</tr>
						<tr class="product-List">
							<td class="td3_1">
								<div class="pro-img-wrap clearfix">
									<span class="img-wrap fl"><a href="#" target="_blank"><img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt=""></a></span>
									<span class="product-title fl">Mellin 美林 【免税店】西梅泥（100g×2）*2 来自意大利本土</span>
								</div>
							</td>
							<td class="td3_2"><span class="shop_price">499</span><br/><span class="market_price">998</span></td>
							<td class="td3_3">1</td>
						</tr>
						<tr class="product-List">
							<td class="td3_1">
								<div class="pro-img-wrap clearfix">
									<span class="img-wrap fl"><a href="#" target="_blank"><img src="../dist/images/domeimg/goods/pro_small_img.jpg" width="80" height="80" alt=""></a></span>
									<span class="product-title fl">Mellin 美林 【免税店】西梅泥（100g×2）*2 来自意大利本土</span>
								</div>
							</td>
							<td class="td3_2"><span class="shop_price">499</span><br/><span class="market_price">998</span></td>
							<td class="td3_3">1</td>
						</tr>
					</tbody>
				</table><!-- .product-List-wrap -->

				<!-- 客户所在页面位置 -->
				<div class="user-location">
					<h1 class="location-tit">客户浏览位置</h1>
					<p class="location"><span>母婴专区</span>  >  <span>大牌奶粉</span>  > <span>爱他美专区</span>  > <strong class="fb">【3罐装 单罐仅166元】Aptamil 德国爱他美 婴儿奶粉 Pre段 800g/罐 </strong></p>
				</div><!-- .user-location -->
			</div><!-- .item -->

		</div><!-- .items-wrap -->
	</div><!-- .tab-wrap -->


	<script>
		(function(){
			var $js_tabNav = $("#js_tabNav");
			var $js_itemsWrap = $("#js_itemsWrap");
			// var ArrayTabNav = $("#js_tabNav").find("li");
			var ArrayTargetItems = $("#js_itemsWrap").find(".item");

			var $js_orderWrap = $(".js_orderWrap");

			$js_tabNav.on("click","li",function(){
				var that = $(this);
				var index = $js_tabNav.find("li").index(that);

				that.addClass('on').siblings('li').removeClass('on');
				ArrayTargetItems.eq(index).show().siblings('.item').hide();
			});

			$js_orderWrap.on("click",".js_viewDetails",function(){
				var that = $(this);
				var thatShow = $js_orderWrap.find(".js_orderWrapDetails");
				var thatSiblings = that.closest(".js_orderWrap").siblings('.js_orderWrap');

				thatShow.show();
				thatSiblings.hide();
			});

			$js_orderWrap.on("click",".js_closeThisDetails",function(){
				var that = $(this);
				var thatBox = that.closest(".js_orderWrapDetails");

				thatBox.hide();
				$js_orderWrap.show();
			});
		})();
	</script>

</body>
</html>