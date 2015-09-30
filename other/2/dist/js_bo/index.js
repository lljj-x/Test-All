(function(){
	$('#js_banner').flexslider({
	 	namespace:"",
	    animation: "fade",
	    selector: ".slideList > li",
	    pauseOnAction:false,
	    directionNav: true, 
	    slideshowSpeed: 10000
	});
})();

(function(){
	var slideListLen = $('#js_banner').find(".slideList li").length;
	if(slideListLen >= 2){
		$('#js_banner').hover(function() {
			$(this).find('.direction-nav a').show();
		}, function() {
			$(this).find('.direction-nav a').hide();
		});
	}else{
		$(".direction-nav").hide();
	}
})();

(function(){
	function SetIconChange(wrap,items){
		this.index = 0;
		this.wrap = $(wrap);
		this.items = $(items);
		this.ini();
	}
	SetIconChange.prototype.ini = function(){
		/* body... */
		var that = this;
		that.wrap.on("click","ul.direction-nav a",function(){
			var $this = $(this);
			
			if($this.hasClass('prev')){
				that.index--;
			}else if($this.hasClass('next')){
				that.index++;
			}

			that.index = that.index < 0 ? 0 : that.index >= that.items.length ? that.items.length - 1 : that.index ;

			that.items.eq(that.index).show()
									 .siblings().hide();
	        that.changeSrc();

			return false;
		});

		if(that.wrap.offset().top - $(window).scrollTop() < $(window).height() ){
			that.changeSrc();
		}
		$(window).scroll(function(){
			if(that.wrap.offset().top - $(window).scrollTop() < $(this).scrollTop() ){
				that.changeSrc();
			}
		})
		
		that.showFirtItme();
	};
	SetIconChange.prototype.showFirtItme = function(){
		/* body... */
		this.items.eq(this.index).show();
	};
	SetIconChange.prototype.changeSrc = function(){

		var $targetItem = this.items.eq(this.index); 

		if($targetItem.data("isChangeSrc") != 1){
			$targetItem.data("isChangeSrc",1);
			$.each($targetItem.find("img[data-s-src]"), function(index, val) {
				 /* iterate through array or object */
				var $newItem = $(val);
				$newItem.attr("src", $newItem.data("s-src"));
			});
		}
		

	}

	new SetIconChange("#js_brandsList",".brandCon")
})();

(function(){
	$(function(){
		$(".js_brandCon_hover").find(".bc").hover(function() {//品牌hover事件
			var $showImg = $(this).find("div.yd").find('img');

			$(this).addClass('hover').siblings('.bc').removeClass('hover');
			$showImg.attr("src",$showImg.attr("data-src"));

		}, function() {
			$(this).removeClass('hover');
		});
	});
})();

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