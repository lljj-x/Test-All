(function(){

	//设置导航
	function setNav(){
		this.Tnav = $("#top_nav");
		this.TnavWrap = $("#pageheader").find('.fixedNav');
		this.defaultH = 30;
		this.targetH = 0;
		this.timeout = 300;
		this.ini();
	}

	setNav.prototype.ini = function(){
		/* body... */
		var that = this;
		
		that.targetH = that.setTargetH()+30;

		//显示导航
		this.Tnav.hover(function(){
			$(this).stop().animate({height: that.targetH},that.timeout);
		});

		this.TnavWrap.mouseleave(function(){
			that.Tnav.stop().animate({height: that.defaultH},that.timeout);
		});
	};
	setNav.prototype.setTargetH = function(){
		var NavsubList = this.Tnav.find('.navsub');
		var cur = 0;

		$.each(NavsubList, function(index, val) {
			 /* iterate through array or object */
			cur = $(val).find('li').length > cur ? index : cur;
		});

		return NavsubList.eq(cur).closest('li').height();

	}
	new setNav();


	//子页面设置导航
	(function(){
		var $navWrap = $(".sub_nav_columns");
		var $navOn = $navWrap.find('.on');
		if($navWrap && $navWrap.length){
			$navWrap.find('a').hover(function(){
				$(this).addClass('on').siblings('a').removeClass('on');
			},function(){
				$navOn.addClass('on').siblings('a').removeClass('on');
			})
		}
		
	})();
	
})(); 