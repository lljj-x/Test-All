<!DOCTYPE html>
<html lang="en">
<head>
	<?php include 'top.htm'; ?>
	
</head>
<body>
	<header id="pageheader" >
		<?php include 'publick_top.htm'; ?>
	</header>
	
	<div class="i_banner">
		<img src="../images/domeimg/banner/i_banner.jpg" width="100%">
	</div>
	
	<div class="hf">
		<div class="i_main clearfix">
			<ul>
				<li>
					<header>
						<a href="#">MORE &gt;</a>
						<h4>服装网站</h4>
					</header>
					<div class="item">
						<a href="http://www.sammydress.com" target="_blank">
							<img src="../images/domeimg/sm.jpg"  class="bg"  width="204" height="114">
							<div class="hover" style="background-image:url(../images/domeimg/s_logo.png);"></div>
						</a>
					</div>
				</li>

				<li>
					<header>
						<a href="#">MORE &gt;</a>
						<h4>电子网站</h4>
					</header>
					<div class="item">
						<a href="http://www.everbuying.net" target="_blank">
							<img src="../images/domeimg/ev.jpg" class="bg"  width="204" height="114">
							<div class="hover" style="background-image:url(../images/domeimg/e_logo.png);"></div>
						</a>
					</div>
				</li>

				<li >
					<header>
						
						<h4>企业宣传片</h4>
					</header>
					<div class="item vd">
						<a href="javascript:void(0);" id="js_showVD">
							<img src="../images/domeimg/vd.jpg" class="bg"  width="204" height="114">
							<div class="hover" style="background-image:url(../images/domeimg/vdicon.png);"></div>
						</a>
					</div>
				</li>

				<li class="codeItem">
					<header>
						<h4>公司微信二维码</h4>
					</header>
					<img src="../images/domeimg/codeimg.jpg" width="114" height="114">
				</li>

			</ul>
		</div>
	</div>

	<footer id="pageFooter">
		<?php include 'foot.htm'; ?>
	</footer>
	<?php include 'foot_c_js.htm'; ?>

	<script>
		(function(){
			$("#js_showVD").click(function(event) {
				/* Act on the event */
				layer.open({
				    type: 1,
				    title: false,
				    closeBtn:false,
				    shade: 0.8,
				    shadeClose: true,
				    skin: 'layui-layer-rim', //加上边框
				    area: ['830px', '400px'], //宽高
				    scrollbar: false,

				    content:  '<div style="padding:10px; width:810px; height:380px;"><iframe height=380 width=810 src="http://player.youku.com/embed/XMTI1OTE1NjIyOA==" frameborder=0 allowfullscreen></iframe></div>'
				});
			});
			
		})();
	</script>
</body>
</html>