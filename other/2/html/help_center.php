<!DOCTYPE html>
<html lang="en">
<head>
	<? include 'top.htm'; ?>

	<link rel="stylesheet" href="http://www.wzhouhui.egocdn.com/temp/skin1/dist/mincss/other_min.css">
</head>
<body>
	<header id="header">
		<? include 'public_top.htm'; ?>
	</header>


	<div class="js_mainBgWrap">
		<div class="help-center-main">
			<h1 class="help-center-tit"><a href="#">五洲会海购</a> > <span>帮助中心</span></h1>
			
			<div class="help-center-wrap clearfix">
				<div class="left-nav fl">
					<ul class="nav" id="js_leftNavWrap">
						<li class="top first expanded">
							<h3 class="tit"><i class="c_tagbg icon-help-shopping"></i>购物指南<i class="c_tagbg icon-help-arr"></i></h3>
							<ul class="subnav">
								<li class="leaf"><a href="#" class="active">购物流程</a></li>
								<li class="leaf"><a href="#">用户协议</a></li>
								<li class="leaf"><a href="#">实名认证</a></li>
							</ul>
						</li>
						<li class="top expanded">
							<h3 class="tit"><i class="c_tagbg icon-help-pay"></i>支付配送<i class="c_tagbg icon-help-arr"></i></h3>
							<ul class="subnav">
								<li class="leaf"><a href="#">配送方式</a></li>
								<li class="leaf"><a href="#">运费计算</a></li>
								<li class="leaf"><a href="#">物流跟踪</a></li>
							</ul>
						</li>
						<li class="top expanded">
							<h3 class="tit"><i class="c_tagbg icon-help-service"></i>售后服务<i class="c_tagbg icon-help-arr"></i></h3>
							<ul class="subnav">
								<li class="leaf"><a href="#">退换货政策</a></li>
								<li class="leaf"><a href="#">取消订单</a></li>
								<li class="leaf"><a href="#">退款流程</a></li>
								<li class="leaf"><a href="#">退款说明</a></li>
							</ul>
						</li>
						<li class="top expanded">
							<h3 class="tit"><i class="c_tagbg icon-help-aboutus"></i>关于五洲会<i class="c_tagbg icon-help-arr"></i></h3>
							<ul class="subnav">
								<li class="leaf"><a href="#">公司介绍</a></li>
								<li class="leaf"><a href="#">联系我们</a></li>
								<li class="leaf"><a href="#">关注我们</a></li>
							</ul>
						</li>
					</ul>
				</div>

				<div class="right-content fr">
					<h3 class="content-tit">购物流程</h3>

					<div class="content">
						<p style="padding:50px; text-align:center; font-size:18px; font-weight:bold; color:#000;">这里是帮助中心的内容哦~</p>
					</div>
				</div>
			</div><!-- .help-center-wrap -->

		</div><!-- .help-center-main -->
	</div><!-- .js_mainBgWrap -->

	<!-- 右侧悬浮框 -->
	<div id="rightBar" class="m-rightbar">
		<ul class="clearfix">
			<li>
				<a class="shopcart" title="购物车" href="#" target="_blank" rel="nofollow" id="js_shopcart"><span class="txt">购物车</span><span class="num">0</span></a>
			</li>
			<li>
				<a class="servonline" title="在线客服" href="#" rel="nofollow" data-category="联系客服" data-event="侧边栏点击数" data-label=""><span class="txt">在线客服</span></a>
			</li>
			<li>
				<a class="srcolltop" id="scrollTop" title="返回顶部" href="#" rel="nofollow">&nbsp;</a>
			</li>
		</ul>
		<a class="m-app2 m-app2-1" href="#" target="_blank" rel="nofollow">
			<i class="icon w-icon-app3"></i>
			<span class="text">手机购买更优惠</span>
			<span class="icon_qrcode qrcode"></span>
		</a>
	</div><!-- #rightBar -->

	<!-- 左侧悬浮框 -->
	<div id="leftBar" class="m-leftbar">
		<span class="icon_qrcode qrcode"></span>
	</div><!-- #leftBar -->

	<footer id="footer" class="footer-bgf3">
		<? include 'foot.php'; ?>
	</footer><!--end #footer -->

	<script>
		$LAB.script("")
			.wait(function(){

				$(function(){
					$("#js_leftNavWrap").on("click",".tit",function(){
						var $this = $(this),
							$thisParent = $this.parent(".top");

						if($thisParent.hasClass('expanded')){
							$thisParent.removeClass('expanded').addClass('collapsed').find(".subnav").hide();
						}else{
							$thisParent.removeClass('collapsed').addClass('expanded').find(".subnav").show();
						}
					});
				});
			})	
	</script>

</body>
</html>