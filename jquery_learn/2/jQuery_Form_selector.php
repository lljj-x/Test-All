<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>表单对象属性过滤选择器</title>
	<script type="text/javascript" src="http://localhost/magento_mipow/skin/frontend/default/mipow/js/jquery.1.8.js"></script>

	<style type="text/css">
		body{
			margin: 0;
			padding: 0;
		}
		#div1,#div2{
			font-size: 20px;
			color: red;
			font-weight: bold;
		}
		.first,.second{
			overflow: hidden;
			height: 100%;
			background: rgb(190, 183, 183);
			margin-bottom: 10px;
		}
		.second{
			background: rgb(221, 221, 221);
		}
	</style>
</head>
<body>
	<div class="first">
	<form id="form1" action="#">
		可用元素:<input name="add" value="可用文本框"><br/>
		不可用元素:<input name="email" disabled="disabled" value="不可用文本框"><br>
		可用元素:<input name="che" value="可用文本框"><br>
		多选框:<br>
		<input type="checkbox" name="newsletter" checked="checked" value="test1"/>test1
		<input type="checkbox" name="newsletter" value="test2"/>test2
		<input type="checkbox" name="newsletter" value="test3"/>test3
		<input type="checkbox" name="newsletter" value="test4" checked="checked"/>test4
		<input type="checkbox" name="newsletter" value="test5"/>test5
		<div id="div1">点击下面按钮获取</div>
		<br><br>
		
		下拉列表1:<br>
		<select name="test" multiple="multiple" style="height:100px">
			<option>浙江</option>
			<option selected="selected">湖南</option>
			<option>北京</option>
			<option selected="selected">天津</option>
			<option>广州</option>
			<optgroup>湖北</optgroup>
		</select>
		<br><br>

		下拉列表2:<br>
		<select name="test2">
			<option>浙江</option>
			<option>湖南</option>
			<option selected="selected">北京</option>
			<option>天津</option>
			<option>广州</option>
			<option>湖北</option>
		</select>
		<div id="div2">点击下面按钮获取</div>
	</form>
	<br><br>
	<button id="keyong1">修改可用文本框</button>
	<button id="bukeyong">修改不可用文本框</button>
	<button id="checkboxnum">获取多选框选中的个数</button>
	<button id="selectcon">获取下拉框选中的内容</button>

	<script type="text/javascript">
		$(document).ready(function() {

			$("#keyong1").click(function() {
				$("#form1 input:enabled").val("这里变化了"); //匹配可用的文本框 修改内容为 这里改变了

			});

			$("#bukeyong").click(function() {
				$("#form1 input:disabled").val("这里变化了"); //匹配不可用的文本框 修改内容为 这里改变了
			});

			$("#checkboxnum").click(function() {
				$("#div1").html('有' + $("#form1 input:checked").length + '个被选中');
			});

			$("#selectcon").click(function() {
				var selectcon = $('select :selected').text();
				$("#div2").html("你选中的是" + selectcon); //会获取所有 select 选择的内容 包括下拉列表1 和 下拉列表2的所有
			});
		})
	</script>
</div>

<div class="second">
	<form id="form2" action="#">	
		<input type="button" value="button" /><br>
		<input type="checkbox" name="c" />1
		<input type="checkbox" name="c" />2
		<input type="checkbox" name="c" />3<br>
		<input type="file"/><br>
		<input type="hidden"/><div style="display:none">test</div><br>
		<input type="image" /><br>
		<input type="password" /><br>
		<input type="radio" name ="a" />1<input type="radio" name="a">2<br>
		<input type="reset" /><br/>
		<input type="submit" value="提交" /><br>
		<input type="text"/><br>
		<select><option>option</option></select><br>
		<textarea></textarea><br>
		<button>button</button>
	</form>
	
	<br><br>
	<button id="but1">查询表单元素的个数</button>
	<button id="but2">查询单行文本框个数</button>
	<button id="but3">查询密码框个数</button>

	<script type="text/javascript">
		$(document).ready(function(){
			$("#but1").click(function(){
				var cont1 ='所有表单内表单元素的个数 ' + $("#form2 :input").length;	// 注意与  $("#form1 input")的区别
				alert(cont1);
			})

			$("#but2").click(function(){
				var cont2 = '表单内单行文本框的个数 ' + $("#form2 :text").length;
				alert(cont2);
			});

			$("#but3").click(function(){
				alert ("表单内密码框个数 " + $("#form2 :password").length);
			});

			

		})
	</script>
</div>

</body>
</html>