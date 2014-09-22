;(function($){
	$.fn.extend({
		"l_carousel" : function(options){
			options = $.extend({
				isAutoPlay : true,				// 是否自动轮播
				interval : '3000',				// 如果自动轮播 设置间隔时间 (ms)
				imgPageNums : '4',				// 每页显示的图片张数
				prevBtnId : 'prev',				// 上一页按钮 Id 名称
				nextBtnId : 'next' ,			// 下一页按钮 Id 名称
				switchDivId : 'highlight_tip' 	// 指示器放在那个div中
			},options);
			
			return this.each(function(){
				var viewSize = $(this).width();		//可视区域 即为轮播区域的宽度
				var $contentList = $(".l_content_list",$(this));	// 滚动div
				var imgNums = $(".l_content_list li",$(this)).length; //图片总数
				var imgPages = Math.ceil(imgNums/options.imgPageNums);	//计算出需要多少个页
				var imgCurrentPage = 1; //从1开始自加

				// 添加指示器
				$contentList.width(viewSize * imgPages);
				var htmlInnerSwitch = '<span class="current">1</span>';;
				for (var i = 1; i <= imgPages; i++) {
					if(i > 1){
						htmlInnerSwitch = htmlInnerSwitch + '<span>' + i + '</span>';
					}
				};
				$("#" + options.switchDivId).append($(htmlInnerSwitch));

				// 指示器点击事件
				$("#" + options.switchDivId).children("span").on("click",function(){
					var thisIndex = $(this).index();
					$contentList.animate({"left" : - (viewSize * (thisIndex))},"slow");
					$(this).addClass("current").siblings().removeClass("current");
					imgCurrentPage = thisIndex + 1;
				});
				
				$("#" + options.prevBtnId).on("click",function(event){
					event.preventDefault();
					// 上一页事件
					if (!$contentList.is(":animated")) {
						if (imgCurrentPage == 1) {
							$contentList.animate({"left" : "-=" +  (viewSize * (imgPages-1))},"slow")
							imgCurrentPage = imgPages;
						}else{
							$contentList.animate({"left" : "+=" +  viewSize},"slow")
							imgCurrentPage --;
						}
						$("#" + options.switchDivId).children("span").eq(imgCurrentPage-1).addClass("current").siblings().removeClass("current");
					}
				});

				$("#" + options.nextBtnId).on("click",function(event){
					event.preventDefault();
					// 下一页事件
					if (!$contentList.is(":animated")) {
						if (imgCurrentPage == imgPages) {
							$contentList.animate({"left" : "+=" +  viewSize * (imgPages-1)},"slow")
							imgCurrentPage = 1;
						}else{
							$contentList.animate({"left" : "-=" +  viewSize},"slow")
							imgCurrentPage ++;
						}
						$("#" + options.switchDivId).children("span").eq(imgCurrentPage-1).addClass("current").siblings().removeClass("current");
					}
				});

				// 自动轮播
				if (options.isAutoPlay) {
					function autoPlay(){
						$("#" + options.nextBtnId).trigger("click");
					};
					setInterval(autoPlay, options.interval);
				}
			});
			return $this;
		}
	});
}(jQuery));

