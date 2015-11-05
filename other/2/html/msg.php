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
		<div class="msg-main w1200">
			<!-- success:表示成功，failure：表示失败，warning：表示警告 -->
			<p class="title"><i class="msg-status success"></i></p>
			<div class="msg-content">
				<p class="con-tit">你的密码已重置！</p>
				<p class="con-other">请使用新密码，重新登陆</p>
			</div>
			<p class="btn-wrap clearfix">
				<a href="#">返回上一页</a>
				<a href="#" class="color-main">重新登录</a>
			</p>
		</div><!-- .msg-main -->
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