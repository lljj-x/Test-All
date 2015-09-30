function show_container(){
	var url='/fun/index.php?act=show_container';
	var query_url = window.location.href;	//当前页面URL地址
	$.ajax({
		type: "GET",
		url: url,
		success: function(msg){
			var $msg = $(msg);
			$('#n_nav').html($msg);
		}
	});
	
}
$(document).ready(function(){
	(function(){
		// top slideDown
		$("li.n_top_nav").hover(function(){
			var $this = $(this);

			$this.find(".n_topBox").stop().show();
			$this.find(".n_topTitle").addClass('n_topTitleCur');
		},function(){
			var $this = $(this);

			$this.find(".n_topBox").stop().hide();
			$this.find(".n_topTitle").removeClass('n_topTitleCur');
		});

		//改变货币
		$("#n_currencyList").find("li").click(function(event) {
			/* Act on the event */
			try{
				change_houbi($(this));
			}catch(e){}
		});

		islogin();
	})();


	(function(){

		/**
		 * show Nav
		 * @param  {[Jquery Object]} $that       [当前导航]
		 * @param  {[String]} blcokClass      [要显示的对象的classs]
		 * @param  {[String]} navCurClass [标示当前导航]
		 * @return {[null]}             [description]
		 */
		function showNavList($that,blcokClass,navCurClass){
			var $NavList = $that.find("."+blcokClass),
				$allNavList = $('.'+blcokClass),
				leftNum = $that.attr("data-left");

			$that.addClass(navCurClass);
			$NavList.stop().show();
			$NavList.animate({"left":leftNum+"px"}, 500);
			
		}
		/**
		 * close Nav
		  * @param  {[Jquery Object]} $that       [当前导航]
		 * @param  {[String]} blcokClass      [要显示的对象的classs]
		 * @param  {[String]} navCurClass [标示当前导航]
		 */
		function hideNavList($that,blcokClass,navCurClass){
			var $NavList = $that.find('.'+blcokClass),
				$allNavList = $('.'+blcokClass),
				leftNum = $that.attr("data-left");

			$that.removeClass(navCurClass);
			$NavList.stop().hide();
			$allNavList.css({"left":leftNum+"px"});

		}

		$("#n_nav").find('li').live("mouseover",function(){
			var $this = $(this);

			showNavList($this,'n_nav_b','cur');
		});
		$("#n_nav").find('li').live("mouseout",function(e){
			var $this = $(this);

			hideNavList($this,'n_nav_b','cur');
		});

	})()
	$(".seeMore").live('click',function(){
		$(this).parent().find('li:gt(4)').toggle();
		var data = $(this).attr('data-hidde');
		if(data==0){
			$(this).html('View Less -');
			$(this).attr('data-hidde',1);
		}else{
			$(this).html('View More +');
			$(this).attr('data-hidde',0);
		}	
	
	})

});
