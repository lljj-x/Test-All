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

		<div class="page-not-found-main">
			<div class="page-not-found">
				<h1 class="tips-tit"><span>抱歉~~~，</span>没有找到与“<strong>点读机</strong>”相关的商品~</h1>
				<p class="tips-txt">
					建议您：<br/>
					1、看看输入的文字是否有误<br/>
					2、拆分要搜索的关键词，分成几个词语再次搜索
				</p>
				<i class="icon-position-left"></i>
			</div>
		</div><!-- .page-not-found-main -->
		
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