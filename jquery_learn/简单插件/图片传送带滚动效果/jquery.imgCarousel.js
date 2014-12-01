;(function($){
	$.fn.extend({
		"l_carousel" : function(options){
			var options = $.extend({
				isAutoPlay : true,				// 是否自动轮播
				idDisControllBtn : true,
                interval : '3000',				// 如果自动轮播 设置间隔时间 (ms)
				imgPageNums : '4',				// 每页显示的图片张数
				prevBtnId : 'prev',				// 上一页按钮 Id 名称
				nextBtnId : 'next' ,			// 下一页按钮 Id 名称
				switchDivId : 'highlight_tip', 	// 指示器放在那个div中
                speed : 500 ,   // 动画时间
                easing : 'swing'    //需要animate easing 扩展，或者jquery ui
			},options);

			return this.each(function(){
				var viewSize = $(this).width();
				var $contentList = $(".l_content_list",$(this));
				var imgNums = $(".l_content_list li",$(this)).length;
				var imgPages = Math.ceil(imgNums/options.imgPageNums);
				var imgCurrentPage = 1; //从1开始自加

                if(options.idDisControllBtn){
                    // 添加指示器
                    $contentList.width(viewSize * imgPages);
                    var htmlInnerSwitch = '<span class="current">1</span>';
                    for (var i = 1; i <= imgPages; i++) {
                        if(i > 1){
                            htmlInnerSwitch = htmlInnerSwitch + '<span>' + i + '</span>';
                        }
                    };
                    $("#" + options.switchDivId).append($(htmlInnerSwitch));

                    // 指示器点击事件
                    $("#" + options.switchDivId).children("span").on("click",function(){
                        var thisIndex = $(this).index();
                        $contentList.animate({"left" : - (viewSize * (thisIndex))},options.speed,options.easing);
                        $(this).addClass("current").siblings().removeClass("current");
                        imgCurrentPage = thisIndex + 1;
                    });
                }

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
					var thisId = setInterval(autoPlay, options.interval);
                    $(this).attr({"intervalid" : thisId});
				}
			});
			return $this;
		},
        "removeL_carousel" : function(options){
            //  移出的时候为了保证不出错误，需要使用相同配置
            var options = $.extend({
                isAutoPlay : true,				// 是否自动轮播
                idDisControllBtn : true,
                interval : '3000',				// 如果自动轮播 设置间隔时间 (ms)
                imgPageNums : '4',				// 每页显示的图片张数
                prevBtnId : 'prev',				// 上一页按钮 Id 名称
                nextBtnId : 'next' ,			// 下一页按钮 Id 名称
                switchDivId : 'highlight_tip', 	// 指示器放在那个div中
                speed : 500 ,   // 动画时间
                easing : 'swing'    //需要animate easing 扩展，或者jquery ui
            },options);
            return this.each(function(){
                // 取消自动轮播
                if (options.isAutoPlay) {
                    clearInterval($(this).attr("intervalid"));
                }
                // 移出指示器
                if(options.idDisControllBtn){
                    $("#" + options.switchDivId).children("span").unbind("click");
                    $("#" + options.switchDivId).html("");
                }
                // 取消翻页按钮事件
                $("#" + options.prevBtnId).unbind("click");
                $("#" + options.nextBtnId).unbind("click");

                // 恢复到原来的位置
                $(".l_content_list",$(this)).css({"left":"0"});
            });
        }
	});
}(jQuery));

