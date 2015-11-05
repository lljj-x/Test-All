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

		<div class="page-404-main">
			<p class="img-404"><img src="../dist/images/domeimg/lazyload1.gif" width="500" height="120" data-original="../dist/images/domeimg/404.gif" alt=""></p>
			<p class="txt-404">404</p>
			<p class="tips-404"><strong>哎呀~~~，</strong>页面飞走啦！让我们回到首页吧~</p>
			<p class="btn-goto-index"><a href="#">回到首页</a></p>
		</div><!-- .page-404-main -->
		
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
			.wait(function(){})	
	</script>

</body>
</html>