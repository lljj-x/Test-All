<!DOCTYPE html>
<html lang="en">
<head>
	<?php include 'top.htm'; ?>
</head>
<body>
	<header id="pageheader" >
		<?php include 'publick_top.htm'; ?>
	</header>

	<div class="sub_banner">
		<img src="../images/domeimg/banner/ad_banner.jpg" width="100%">
	</div>
	
	<?php include 'path.htm' ?>
	
	<div class="culturesMain">
		<div class="timeLine hf f14" id="js_timeBox">
		
			<div class="saderImg" id="saderBox" ><span></span></div>
			
			<ul>
				<li class="clearfix">
					<i class="i_point"><b></b></i>
					<div class="time"><strong>2007-2010</strong> </div>
					<p>公司成立&nbsp;&nbsp;稳健发展</p>
					<div class="img"><img src="../images/domeimg/banner/cultere/cultere_1.jpg" width="628" height="285"></div>
				</li>
				<li class="clearfix">
					<i class="i_point"><b></b></i>
					<div class="time"><strong>2011</strong></div>
					<p>成立香港全资子公司&nbsp;&nbsp;获深圳创新投风险投资&nbsp;&nbsp;推出Gamiss等4个自有品牌</p>
					<div class="img"><img src="../images/domeimg/banner/cultere/cultere_2.jpg" width="805" height="233"></div>
				</li>
				<li class="clearfix">
					<i class="i_point"><b></b></i>
					<div class="time"><strong>2012</strong></div>
					<p>建立多个海外仓；获国家多项著作权版权</p>
					<div class="img"><img src="../images/domeimg/banner/cultere/cultere_3.jpg" width="812" height="253"></div>
				</li>
				<li class="clearfix">
					<i class="i_point"><b></b></i>
					<div class="time"><strong>2013</strong></div>
					<p>市海关第一家电子商务报关试点单位；获得国家高新企业技术认证</p>
					<div class="img"><img src="../images/domeimg/banner/cultere/cultere_4.jpg" width="741" height="232"></div>
				</li>
				<li class="clearfix">
					<i class="i_point"><b></b></i>
					<div class="time"><strong>2014</strong></div>
					<p>百圆裤业并购，A股上市(股票代码：SZ002640)</p>
					<div class="img"><img src="../images/domeimg/banner/cultere/cultere_5.jpg" width="496" height="307"></div>
				</li>
				
				<li class="future clearfix">
					<i class="i_point"><b></b></i>
					<div class="time"><strong>2015</strong></div>
					<p>国家级电子商务试点单位<br>未来无限可能......</p>
					<div class="img"><img src="{$imgcache_url}images/domeimg/banner/cultere/cultere_6.jpg" width="498" height="280"></div>
				</li>
			</ul>

			<div class="cb"></div>
		</div>

		<section class="companyKey">
			<h4 class="hf">环球易购关键词</h4>

			<ul class="hf clearfix pb30">
				<li><span class="c_icon key_icon_0"></span>成立：2007年</li>
				<li><span class="c_icon key_icon_1"></span>供应商：1000多个品牌（销售SKU达20万种之多)</li>
				<li><span class="c_icon key_icon_2"></span>现有员工：达1000多人</li>
				<li><span class="c_icon key_icon_3"></span>仓储面积：50000多平方米</li>
				<li><span class="c_icon key_icon_4"></span>客户：全球200多个国家</li>
				<li><span class="c_icon key_icon_5"></span>日发包裹：超过50000个</li>
				<li><span class="c_icon key_icon_6"></span>销网访问量：超过200万人次/天（单日页面浏览：达800万）</li>
				<li><span class="c_icon key_icon_7"></span>2014年销售额：1470000000元</li>					
			</ul>
		</section>
	</div><!-- culturesMain -->


	<footer id="pageFooter">
		<?php include 'foot.htm'; ?>
	</footer>
	<?php include 'foot_c_js.htm'; ?>

	<script>
		
		$LAB.script("jquery.nail.min.js")
			.wait(function(){
				$('#saderBox').nail({
			        lOr: 'left',
			        topOffset: 90,
			        bottomOffset: 60
			      })
			});

		$("#js_timeBox").on("mouseover","li",function(){
			var $thisWrap = $(this);
			if(!$thisWrap.find('.img').is(':animated')){
				$thisWrap.siblings('li').removeClass('on').find('.img').stop().slideUp();
				$thisWrap.addClass('on').find('.img').stop().slideDown();
				
				$("#saderBox").addClass('on');
			}
			
	
		});

		$("#js_timeBox").on("mouseleave","ul",function(){
			var $this = $(this);
			$this.find('li.on').removeClass('on');
			$this.find('.img').slideUp(function(){
				var scrollTop = $(window).scrollTop();
				$(window).scrollTop(scrollTop-1);
			});
			$("#saderBox").removeClass('on');
			
		});
	</script>
</body>
</html>