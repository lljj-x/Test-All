// JavaScript Document
$(document).ready(function(){
	var intervalID;
	var curLi; //现在选中的li标签
	
	$("#tab-nav li a").mouseover(function(){
		curLi = $(this);
		intervalID=setInterval(onMouseOver,250);//鼠标移入的时候有一定的延时才会切换到所在项，防止用户不经意
	});
	
	/*function onMouseOver(){
		$(".cur-on").removeClass("cur-on"); //下面部分存在效果的移除效果
		$(".sub-con").eq($('#tab-nav li a').index(curLi)).addClass("cur-on"); //上面tab栏的对应下面的容器加上移动到上面的效果
		$(".cur").removeClass("cur"); //去除移动到上面的效果
		curLi.addclass("cur");//选中的加上移动到上面的效果
	}
	
	$("#tab-nav li a").mouseout(function(){
			clearInterval(intervalID);
	});*/
	
	//鼠标点击也可以切换
	$("#tab-nav li a").click(function(){
		clearInterval(intervalID);
		$(".cur-on").removeClass("cur-on");
		$(".sub-con").eq($("#tab-nav li a").index(curLi)).addClass("cur-on");
		$(".cur").removeClass("cur");
		curLi.addClass("cur");	
	})
})