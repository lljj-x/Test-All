<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="http://localhost/magento_mipow/skin/frontend/default/mipow/js/jquery.1.8.js"></script>
<title>品牌列表效果</title>

<style type="text/css">
	*{ margin:0; padding:0;}
	body {font-size:12px;text-align:center;}
	a { color:#04D; text-decoration:none;}
	a:hover { color:#F50; text-decoration:underline;}
	.SubCategoryBox {width:600px; margin:0 auto; text-align:center;margin-top:40px;}
	.SubCategoryBox ul { list-style:none;}
	.SubCategoryBox ul li { display:block; float:left; width:200px; line-height:20px;}
	.showmore { clear:both; text-align:center;padding-top:10px;}
	.showmore a { display:block; width:120px; margin:0 auto; line-height:24px; border:1px solid #AAA;}
	.showmore a span { padding-left:15px; background:url(img/down.gif) no-repeat 0 0;}
	.promoted a { color:#F50;}
</style>
</head>
<body>
	<div class="SubCategoryBox">
		<ul>
			<li ><a href="#">佳能</a><i>(30440) </i></li>
			<li ><a href="#">索尼</a><i>(27220) </i></li>
			<li ><a href="#">三星</a><i>(20808) </i></li>
			<li ><a href="#">尼康</a><i>(17821) </i></li>
			<li ><a href="#">松下</a><i>(12289) </i></li>
			<li ><a href="#">卡西欧</a><i>(8242) </i></li>
			<li ><a href="#">富士</a><i>(14894) </i></li>
			<li ><a href="#">柯达</a><i>(9520) </i></li>
			<li ><a href="#">宾得</a><i>(2195) </i></li>
			<li ><a href="#">理光</a><i>(4114) </i></li>
			<li ><a href="#">奥林巴斯</a><i>(12205) </i></li>
			<li ><a href="#">明基</a><i>(1466) </i></li>
			<li ><a href="#">爱国者</a><i>(3091) </i></li>
			<li ><a href="#">其它品牌相机</a><i>(7275) </i></li>
		</ul>

		<div class="showmore">
			<a href="more.html"><span>显示全部品牌</span></a>
		</div>
	</div>

<script type="text/javascript">
	$(document).ready(function() {
		var $category = $('ul li:gt(5):not(:last)');	//获取索引值大于5 但不包含最后一条
		$category.hide();	// 默认为隐藏
		var $toggleBtn = $('div.showmore > a');	//获取 "显示全部品牌按钮" 
		$toggleBtn.click(function(){
			if ($category.is(":visible")){
				$category.hide();
				$(this).find("span").css("background","url(img/down.gif) no-repeat 0 0").text("显示全部品牌");
				$("ul li").removeClass("promoted");
			}else{
				$category.show();
				$(this).find('span').css("background","url(img/up.gif) no-repeat 0 0").text("精简显示品牌");
				//$("ul li").filter(":contains('佳能'),:contains('尼康'),:contains('奥林巴斯')").addClass("promoted");

				$("ul li:contains('佳能'),ul li:contains('尼康'),ul li:contains('奥林巴斯')").addClass("promoted");
			}

			return false;
		});
	})

</script>
</body>
</html>