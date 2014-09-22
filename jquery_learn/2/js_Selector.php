<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<title>测试js传统方法选择器</title>
<script type="text/javascript" src="http://localhost/magento_mipow/skin/frontend/default/mipow/js/jquery.1.8.js"></script>
<style type="text/css">
	.div1{
		width:500px;
		height:200px;
		background: rgb(204, 186, 186);
		padding: 20px;
		margin-top: 20px;
	}
	.div2{
		width:500px;
		height:200px;
		background: rgb(150, 142, 142);
		padding: 20px;
	}
	.pcenter{
		text-align:center;
	}
</style>
</head>
<body>
	<p>示例1添加事件</p>
	<p>测试1</p>
	<p>测试2</p>
	<p>测试3</p>

	<p>示例2表格隔行变色</p>
	<table id="tb">
		<tbody>
			<tr><td>1</td></tr>
			<tr><td>2</td></tr>
			<tr><td>3</td></tr>
			<tr><td>4</td></tr>
			<tr><td>5</td></tr>
			<tr><td>6</td></tr>
		</tbody>
	</table>

	<p>示例3输入选中多选框的个数</p>
	<input type="checkbox" value="1" name="check"/>
	<input type="checkbox" value="2" name="check"/>
	<input type="checkbox" value="3" name="check"/>
	<input type="checkbox" value="4" name="check"/>
	<input type="button" value="选中的个数" id="checknum"/>



	<div class="div1">
		这里是 div1
	</div>
	<div class="div2">
		这里是 div2
	</div>

	<script type="text/javascript">
		$(document).ready(function() {

			/*			if ($(".div3")){ // 判断元素是否存在 错误的方法
				alert("即使元素不存在也会获取对象");
			};

			if ($(".div1").length > 0){
				alert("正确的方法");
				var thisHtml=$(".div1").html();
				alert(thisHtml);
			}*/
		})


		/*
			传统的 js 方法,执行下面操作
		
		 // 示例1
		var items = document.getElementsByTagName("p");
		for (var i = 0; i < items.length; i++) {
			items[i].onclick = function() { // dom对象循环匹配所有的p标签并添加 onclick事件
				$(this).addClass("pcenter"); //DOM对象转为 jQ对象提价class
			}
		}

		 // 示例2
		var item = document.getElementById("tb");
		var tbody = item.getElementsByTagName("tbody")[0]; //获取id为tb的表格中的第一个 tbody 元素;
		var trs = tbody.getElementsByTagName("tr") //获取所有tr 元素
		 for (var i = 0; i < trs.length; i++) {
			if (i % 2 == 0) { //取模 (取余数)
				trs[i].style.backgroundColor = "red";
			};
		}

		 // 示例3
		var checknum = document.getElementById("checknum");
		checknum.onclick = function() {
			var arrays = new Array();
			var items = document.getElementsByName("check"); //获取所有名为  check 的元素
			for (var i = 0; i < items.length; i++) {
				if (items[i].checked) { //判断是否选中
					arrays.push(items[i].value); //push()js数组中的方法，添加一个或者多个元素到数组
				}
			}
			alert("选中的个数为: " + arrays.length);
		}


*/

		
		//	jQuery 方法 
		
		$(document).ready(function(){

			// 示例1
			$("p").click(function(){
				$(this).addClass("pcenter"); 
			});

			// 示例2
			$("#tb tbody tr:even").css("background","red");

			// 示例3
			$("#checknum").click(function(){
				alert ('选择的个数为' + $("input[name='check']:checked").length);
			});

		})
	</script>
</body>
</html>