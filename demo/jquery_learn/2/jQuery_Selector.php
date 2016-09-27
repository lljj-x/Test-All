<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>jQuery选择器</title>
	<script type="text/javascript" src="http://localhost/magento_mipow/skin/frontend/default/mipow/js/jquery.1.8.js"></script>
</head>
<style type="text/css">
	div,span,p{
		width: 140px;
		height: 140px;
		margin : 5px;
		background: #aaa;
		border: #000 1px solid;
		float: left;
		font-size: 17px;
		font-family: Verdana;
	}

	div.mini{
		width: 55px;
		height: 55px;
		background-color: #aaa;
		font-size: 12px;
	}

	div.hide{
		display: none;
	}

</style>

<body>
	<div class="one" id="one">
		id为one,class为one的div
		<div class="mini">class为mini</div>
	</div>

	<div class="one" id="two" title="test">
		id为two,class为one,title为test的div.
		<div class="mini" title="other">class为mini，title为other</div>
		<div class="mini" title="test">class为mini,title为test</div>
	</div>

	<div class="one">
		<div class="mini" >class为mini</div>
		<div class="mini" >class为mini</div>
		<div class="mini" >class为mini</div>
		<div class="mini" ></div>
	</div>

	<div class="one">
		<div class="mini">class为mini</div>
		<div class="mini">class为mini</div>
		<div class="mini">class为mini</div>
		<div class="mini" title="tesst">class为mini，title为tesst</div>
	</div>

	<div style="display:none; " class="none">style的display为none的div</div>
	<div class="hide"> class 为"hide"的div</div>
	<div>
		包含input的type为"hidden"的div<input type="hidden" size="8"/>
	</div>
	<span id="mover">正在执行动画的span元素.</span>
	<button id="bu1">测试</button>
	<button id="bu2">测试2</button>
	<button id="bu3">测试3</button>
	<button id="bu4">测试4</button>
	<button id="bu5">测试5</button>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#bu1").click(function(){

				$('body > div ').css("background","#bbffaa");
			});


			$("#bu2").click(function(){

				$('body div').css("background","#bbffaa");
			});

			$("#bu3").click(function(){

				//$('.one + div').css("background","#bbffaa"); //和下面的方法等价
				$(".one").next("div").css("background","#bbffaa");
			});

			$("#bu4").click(function(){

				$('#two ~ div').css("background","#bbffaa"); //和下面的方法等价
				// $("#two").nextAll("div").css("background","#bbffaa");
			});

			$("#bu5").click(function(){
				$("#two").siblings("div").css("background","#bbffaa"); //与bu4的区别在于4必须是后面的同胞元素，而siblings不分先后
			});

			// $('div:first').css("background","#bbffaa"); 
			// $('div:last').css("background","#bbffaa"); 
			// $('div:not(.one)').css("background","#bbffaa");
			// $('div:even').css("background","#bbffaa"); // even 所有偶数，odd为奇数
			// $('div:eq(3)').css("background","#bbffaa"); // :eq(index) index 的值从0开始
			// $('div:gt(3)').css("background","#bbffaa"); // index 值大于 3
			// $('div:lt(3)').css("background","#bbffaa");
			// $('div:contains(di)').css("background","#bbffaa");
			// $('div:empty').css("background","#bbffaa");
			
			// $("div:has(.mini)").css("background","#bbffaa"); 和下面的方法等价
			// $("div").has(".mini").css("background","#bbffaa");
			// $('div:parent').css("background","#bbffaa");

			// 可见和隐藏 元素
			// $('div:visible').css("background","#ff6500");
			// $('div:hidden').show(3000);	//所有隐藏的元素 在 3s 显示出来
			// $(":animated").css("background","#bbffaa"); //所有动画的元素 

			//属性过滤选择器
			// $('div[title]').css("background","#bbffaa"); //含有属性 title 的div
			// $('div[title=test]').css("background","#bbffaa"); //含有title属性值为test 的div
			// $('div[title!=test]').css("background","#bbffaa");
			// $('div[title^=te]').css("background","#bbffaa");
			// $('div[title$=est]').css("background","#bbffaa");
			// $('div[title*=es]').css("background","#bbffaa");
			// $('div[id][title*=es]').css("background","#bbffaa");
		
			// 子元素过滤选择器
			//$('div.one :nth-child(even)').css("background","#bbffaa");
			// $('div.one :nth-child(2)').css("background","#bbffaa"); // 注意div.one 后面必须有空格,并且 :nth-child(index) index的值是从 1开始的 
			// $('div.one :first-child').css("background","#bbffaa"); 
			// $('div.one :last-child').css("background","#bbffaa"); 
			$('div.one :only-child').css("background-color","#bbffaa");
		})
	</script>
</body>
</html>