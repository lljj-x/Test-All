<!DOCTYPE html>
<html lang="en">
<head>
	<? include 'top.htm'; ?>

	<link rel="stylesheet" href="http://www.wzhouhui.egocdn.com/temp/skin1/dist/mincss/other_min.css?2015080703">
</head>
<body>
	<header id="header">
		<? include 'public_top.htm'; ?>
	</header>

	<!-- 注册成功msg页面 -->
	<div class="js_mainBgWrap">
		<div class="review-success-msg-main success-msg-main w1200">
			<!-- success:表示成功 -->
			<div class="review-success-msg success-msg pr">
				<i class="msg-status success-icon48 pa"></i>
				<div class="msg-content">
					<p class="con-tit">感谢您的评价！</p>
					<p class="con-other">恭喜你获得20元优惠券</p>
				</div>
			</div><!-- .review-success-msg -->

			<p class="btn-wrap clearfix">
				<a href="#">查看我的优惠券</a>
				<a href="#" class="color-main">立即使用</a>
			</p>

			<div class="get-coupon clearfix">
				<p class="coupon-left fl">
					<span>￥</span><strong>20</strong>
				</p>
				
				<p class="coupon-right fr">
					<strong>满99元减20  全场通用</strong>
					<span>有效期：2015.06.02—2015.07.02</span>
				</p>
			</div>
		</div><!-- .review-success-msg-main -->
	</div><!-- .js_mainBgWrap -->


	<footer id="footer" class="footer-bgf3">
		<? include 'foot.php'; ?>
	</footer><!--end #footer -->

	<script>
		$LAB.script("")
			.wait(function(){

			})	
	</script>

</body>
</html>