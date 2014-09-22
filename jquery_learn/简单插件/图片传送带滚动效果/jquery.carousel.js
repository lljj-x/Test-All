$(document).ready(function(){
	var page = 1; //默认页面
	var i = 4 //没版4张图片
	$("span.next").click(function(){ //右边按钮
		var $parent = $(this).parents("div.v_show");	//根据点击元素获取到父元素
		var $v_show = $parent.find("div.v_content_list");	//寻找到 "视频内容展示区域" 
		var $v_content = $parent.find("div.v_content");	//寻找到 "视频内容展示区域，外层div"
		var v_width = $v_content.width();	//获取外层div 宽度
		var len = $v_show.find("li").length;	//获取 li总个数
		var page_count = Math.ceil(len / i); //进一法 ，只要不是整数，就往大的方向取最小整数 ,计算出一共要有多少个版面

		if (!$v_show.is(":animated")) {	//判断是否在动画状态，没有动画状态则执行
			if (page == page_count) {	//表示当前页面数等于一共页面数，即：已经到达了最后一个版面了 
				$v_show.animate({"left":"0"},"slow"); // 通过改变left的值，跳转到第一个版面
				page=1;	//
			}else{
				$v_show.animate({ left : '-=' + v_width },"slow");	//右边按钮，所有left的值减小一个div.v_content 的宽度
				page ++;
			}
			$parent.find("span").eq((page-1)).addClass("current").siblings().removeClass("current");	//找到 当前小标添加class，去掉同胞元素的class
		}
	})

	$("span.prev").click(function(){
		var $parent = $(this).parents("div.v_show");	// 外层div
		var $v_show = $parent.find("div.v_content_list"); //动画区域
		var $v_content = $parent.find("div.v_content");	//可见区域
		var v_width=$v_content.width();	//获取可见区域宽度，方便后面移动的时候，正好移动一个可见区域宽度
		var len = $v_show.find("li").length;	//获取动画区域内 li 的总个数
		var page_count = Math.ceil(len/i); //进一法获取版面总数

		if (!($v_show.is(":animated"))){
			if (page == '1'){
				$v_show.animate({"left": '-=' + (v_width * (page_count -1 ))},"slow");
				page = page_count;
			}else{
				$v_show.animate({"left": '+=' + v_width})	//把左边的移出来 所以整个div 往右边移动，所以 left 增加
				page--;
			}
			$(".highlight_tip span").eq((page-1)).addClass("current").siblings().removeClass("current");
		}
	})

});

;(function($){
	$.fn.extend({
		"l_carousel" : function(options){
			options = $.extend({
				isAutoPlay : true,	//是否自动轮播
				interval : '',	// 如果自动轮播 设置间隔时间 (s)
				viewSize : '',	// 轮播内容区域的宽度 (px)
				prevBtnCls : '', // 上一页按钮 class 名称
				nextBtnCls : '', // 下一页按钮 class 名称
			},options);
		}
		
		
	});
	
	
	
}(jQuery));