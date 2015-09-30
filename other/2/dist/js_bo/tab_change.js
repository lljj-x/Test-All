/*
***obj: 参数内容区域块对应的class************
***targetObj: fixed在页面顶部的nav导航区域块 对应的id或class************
***author: yuanbo************
***2015-07-10************
*/

//滑动页面顶部tab切换
function SetScrollTop(obj,targetObj){ 
	this.index = 0;
	this.obj = $(obj);
	this.targetObj = $(targetObj);
	this.ini();
}
SetScrollTop.prototype.ini = function(){
	var that = this;
	
	//设定每个里的宽度
	this.setLiwidth();

	$(window).scroll(function(event) {
		var $this = $(this),
			widnScroll = $this.scrollTop(),
			firstTargetTop = that.obj.eq(0).offset().top + 70;

		if(widnScroll > firstTargetTop){//如果页面滑动到第一个目标对象区域块
			that.targetObj.removeClass('none');
		}else{
			that.targetObj.addClass('none');
		}

		$.each(that.obj, function(index, val) {
			 var $targetItem = $(val);
			 var targetTop = $targetItem.offset().top-50;

			 if(widnScroll >= targetTop){
			 	that.targetObj.find("li").eq(index).addClass('on').siblings('li').removeClass('on');
			 }
		});
	});

	that.chooseItem();
};
SetScrollTop.prototype.chooseItem = function(){
	var that = this;

	that.targetObj.on("click","li",function(){
		var $this = $(this);
		var targetIndex = that.targetObj.find("li").index($(this));
		var huadongLength = that.obj.eq(targetIndex).offset().top-50; 

		$this.addClass('on').siblings('li').removeClass('on');

		$("html,body").animate({scrollTop:huadongLength}, 500);
	});
};
SetScrollTop.prototype.setLiwidth = function(){
	/* body... */
	var navWrap = this.targetObj.find('.s-t-nav');
	var allList = navWrap.children('li');
	allList.width(navWrap.width()/allList.length - 2);

};