(function($){
	var $banner = $('#js_banner');
	$banner.flexslider({
	 	namespace:"",
	    animation: "fade",
	    selector: ".slideList > li",
	    pauseOnAction:false,
	    directionNav: true, 
	    slideshowSpeed: 10000,
        start: function () {
			var slideListLen = $banner.find(".slideList li").length;
			if(slideListLen >= 2){
				$banner.hover(function() {
					$(this).find('.direction-nav a').show();
				}, function() {
					$(this).find('.direction-nav a').hide();
				});
			}else{
				$banner.find(".direction-nav").hide();
			}
		}
	});

    // 首次打开弹窗
    function addIndexCookie(){
        GLOBAL.otherGlobal.addCookie({
            name:'isFirst',
            value : '0'
        });
    }

    if(GLOBAL.otherGlobal.getCookie('isFirst') != '0'){
        layer.open({
            skin:'layer-ext-wzhouhui',
            extend:'skin/wzhouhui/style.css',
            type: 1,
            shadeClose: false,
            title: false,
            shade: 0.7,
            area: ['760px', "480px"], //宽高
            content: '<div><a href="/m-users-a-join.htm" onclick="addIndexCookie();"><img src="/temp/skin1/dist/images/domeimg/new_user.png?2015091401" alt="" style="display: block; width: 100%; height: auto;"/></a></div>',
            end: function () {
                addIndexCookie();
            }
        });
    }
})(jQuery);

