<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8">
		<title>jQuery中的DOM操作</title>
		<script type="text/javascript" src="../js/jquery.1.8.js"></script>
	</head>
	<body>
		<p title="选择你最喜欢的水果 .">你最喜欢的水果是? </p>
		<ul>
			<li title="苹果">苹果</li>
			<li title="橘子">橘子</li>
			<li title="菠萝">菠萝</li>
		</ul>
		<button id="but1">选择器</button>
		<button id="but2">attr()方法</button>
		<button id="but3">创建节点</button>


		<script type="text/javascript">
			$(document).ready(function(){
				$("#but1").click(function(){
					$("ul li:eq(0)").css("background","red");
					alert($("ul li:eq(0)").text());
				})
				
				$("#but2").click(function(){
					alert($("p").attr("title"));
				})

				$("#but3").click(function(){
					var $li_1 = $("<li>香蕉</li>");
					var $li_2 = $("<li>雪梨</li>");
					$("ul").append($li_1).append($li_2);
					// $("ul").append($li_1,$li_2);  //等价
				})
			})
		</script>
	</body>
</html>