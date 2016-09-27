<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>链式操作风格 dome</title>
	<script type="text/javascript" src="http://localhost/magento_mipow/skin/frontend/default/mipow/js/jquery.1.8.js"></script>

	<style type="text/css">
		#menu { width: 300px}
		.has_children{background: #555; color: #fff; cursor: pointer;}
		.highlight{color: #fff; background: green;}
		div {padding:0; margin: 10px 0;}
		div a{background:#888; display: none; float: left; width: 300px}
	</style>
</head>
<body>
	<div id="menu" title="test">
		<div class="has_children">
			<span>第一章 - 认识 jquery </span>
			<a>1.1 javascript 和 javascript 库</a>
			<a>1.2 加入 jQuery </a>
			<a>1.3 编写简单 jQuery 代码 </a>
			<a>1.4 jQuery对象和DOM对象</a>
			<a>1.5 解决jquery 和 其他库的冲突问题</a>
			<a>1.6 jQuery开发工具和插件</a>
			<a>1.7 小结</a>
		</div>

		<div class="has_children">
			<span>第二章 - jQuery 选择器</span>
			<a>2.1 - jQuery 选择器是什么</a>
			<a>2.2 - jQuery 选择器的优势</a>
			<a>2.3 - jQuery 选择器 </a>
			<a>2.4 - 应用jQuery改写示例</a>
			<a>2.5 - 选择器中的一些注意事项</a>
			<a>2.6 - 案例研究——类似淘宝网品牌列表的效果</a>
			<a>2.7 - 还有其它选择器吗 </a>
			<a>2.8 - 小结 </a>
		</div>
		
		<div class="has_children">
			<span>第三章 - jQuery中的DOM操作</span>
			<a>3.1 - DOM 操作的分类</a>
			<a>3.2 - jQuery 中的DOM操作</a>
			<a>3.3 - 案例研究 ———— 某网站超链接和图片提示效果</a>
			<a>3.4 - 小结 </a> 
		</div>

		<button>
			测试attr方法
		</button>
	</div>
	
	<script type="text/javascript">
		$(document).ready(function(){
			$(".has_children").click(function(){
				$(this).addClass("highlight").children("a").show().end().siblings().removeClass("highlight").children("a").hide();
			});


			// var myget = document.getElementById('menu').innerHTML;
			// alert(myget);
		$("button").click(function(){
			alert ("has_children background " + $("#menu").attr("title"));
		});

		})
	</script>
</body>
</html>
