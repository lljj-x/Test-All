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
	
	<div class="e_cultereMain hf">
		<div class="bannerList">
			<ul id="js_bannerList" class="clearfix">
				<li>
					<img src="../images/domeimg/banner/e_cultere/e_cultere_1.jpg" width="227" height="467">
					<div class="floatItem">
						<h4>企业使命</h4>
						<p>助力中国制造，引领中国跨境B2C电子商务走向未来。</p>
					</div>
				</li>
				<li>
					<img src="../images/domeimg/banner/e_cultere/e_cultere_2.jpg" width="227" height="467">
					<div class="floatItem">
						<h4>企业愿景</h4>
						<p>成为跨境B2C电子商务的领航者。</p>
					</div>
				</li>
				<li>
					<img src="../images/domeimg/banner/e_cultere/e_cultere_3.jpg" width="227" height="467">
					<div class="floatItem">
						<h4>企业价值观</h4>
						<p>简单，高效，创新，务实。</p>
					</div>
				</li>
				<li>
					<img src="../images/domeimg/banner/e_cultere/e_cultere_4.jpg" width="227" height="467">
					<div class="floatItem">
						<h4>企业核心竞争力</h4>
						<p>产品、服务不断创新；团队勇于开拓进取，面对挑战永不退缩。</p>
					</div>
				</li>
				<li>
					<img src="../images/domeimg/banner/e_cultere/e_cultere_5.jpg" width="227" height="467">
					<div class="floatItem tc">
						<h4>员工行为准则</h4>
						<p>公司利益第一； 多劳多得，少劳少得。</p>
					</div>
				</li>
			</ul>
		</div><!-- .bannerList -->
		
		<div class="textInfo clearfix">
			<img src="../images/domeimg/banner/e_cultere/e_cultere_6.jpg" width="648" height="412">
			<h4>应用理念系统</h4>
			<ul>
				<li>1.人才理念：德才并举, 以人为本，爱岗敬业，高效务实</li>
				<li>2.客户理念：开拓、创新，立足市场求发展；优质、高效，用心服务为客户</li>
				<li>3.团队理念：团结协作，共同发展</li>
				<li>4.管理理念：明确的企业战略，合理的制度体系，完善的用人制度</li>
				<li>5.经营理念：客户第一，诚实守信</li>
				<li>6.创新理念：开拓进取，创新突破</li>
				<li>7.服务理念：服务只有起点，满意没有终点</li>
			</ul>
		</div><!-- textInfo -->

	</div><!-- e_cultereMain -->


	<footer id="pageFooter">
		<?php include 'foot.htm'; ?>
	</footer>
	<?php include 'foot_c_js.htm'; ?>
    <script>
        $LAB.script("../minjs/jquery.addClass.min.js")
            .wait(function(){
                $("#js_bannerList").timingaddClass();
            });
    </script>
</body>
</html>