
(function(){
	/*
	*  鼠标经过缩略图列表
	*
	@param	{jqObj}		zoomBox		主图片父元素
	@param	{string}	bigimgAttr 	大图属性名bigimgAttr
	@param	{jqObj}		$this 		鼠标经过当前缩略图
	*
	*/
	function showBigimg(zoomBox,bigimgAttr,$this){
		var bigImg = zoomBox.find('.myImgs');
			$img = $this.find('img');

		var Img = new Image();
		Img.src= $img.attr(bigimgAttr);

		zoomBox.append('<span class="loading"></span>');
		//在ie中img会被缓存，导致第二次无法更新图片。要解决这个问题需要使用one方法来绑定onload事件，来避免onload事件多次执行，另外需要检测图片的complete属性，并执行load事件
		$(Img).one('load', function() {
			$("#js_jqzoom").find('.loading').remove();
			bigImg.attr({
				"src":$img.attr(bigimgAttr),
				"bigimg":$img.attr(bigimgAttr)
			});
			//更新放大镜图
			if(zoomBox.find('.magnifyingShow').length){
				zoomBox.find('.magnifyingShow').find("img").attr('src',$img.attr(bigimgAttr));
			}
		}).each(function() {
			if(this.complete){
				$(this).load();
			}
		});	

		$this.addClass("active").siblings('li').removeClass('active');
	}

	//鼠标经过缩略图
	$("#js_n_thumbImg").on("mouseover","li.thumbnail_list",function(){
		var $this = $(this);

		showBigimg($('#js_jqzoom'),"bigimg",$this);
	});
	$("#js_n_thumbImg").find('li:first()').trigger('mouseover');

	//缩略图滚动
	if($("#js_n_thumbImg").find('ul.js_scrollableDiv').find('li').length > 4 ){
		$("#js_n_thumbImg").find('.n_thumbImg_item').jCarouselLite({
		    btnNext: "#js_spec-backward",
		    btnPrev: "#js_spec_forward",
		    vertical: false,
		    visible:4
		});
	};

	/*
	*商品图片放大镜
	*/
	$.fn.magnifying = function(){
		var $this = $(this),	 
		 	$imgCon = $('#js_jqzoom'),//正常图片容器
		 	$Img = $imgCon.find('img'),//正常图片，还有放大图片集合
		 	$Drag = $this.find('.magnifyingBegin'),//拖动滑动容器
		 	$show = $this.find('.magnifyingShow'),//放大镜显示区域
			$showIMg = $show.find('img'),//放大镜图片
			multiple = $show.width()/$Drag.width();

		$imgCon.mousemove(function(e){
			$Drag.css('display','block');
			$show.css('display','block');
		   	var iX = e.pageX - $(this).offset().left - $Drag.width()/2,
		   		iY = e.pageY - $(this).offset().top - $Drag.height()/2,	
		   		MaxX = $imgCon.width()-$Drag.width(),
		   		MaxY = $imgCon.height()-$Drag.height();
		   	iX = iX > 0 ? iX : 0;
		   	iX = iX < MaxX ? iX : MaxX;
		   	iY = iY > 0 ? iY : 0;
		   	iY = iY < MaxY ? iY : MaxY;	
		   	$Drag.css({left:iX+'px',top:iY+'px'});	   		
		   	$showIMg.css({marginLeft:-multiple*iX+'px',marginTop:-multiple*iY+'px'});
		});

		$imgCon.mouseout(function(){
		   	$Drag.css('display','none');
			$show.css('display','none');
		});
	}

	//商品图片放大镜
	$("#js_jqzoom").magnifying();
})();

(function(){
	$(function () {
        var pageIndex = 0;     //页面索引初始值   
		var pageSize = 10;     //每页显示条数初始化，修改显示条数，修改这里即可  
		var pageCount = $("#js_pageCount").val(); //通过页面隐藏域取得 评价的总数量
		var js_goodsDetailTopTop = $("#js_goodsDetailTop").offset().top;
		
        //分页，pageCount是总条目数，这是必选参数，其它参数都是可选
        $("#Pagination").pagination(pageCount, {
           callback: PageCallback,  //PageCallback() 为翻页调用次函数。
           prev_text: "« 上一页",
           next_text: "下一页 »",
           items_per_page:pageSize,
           num_edge_entries: 2,       //两侧首尾分页条目数
           num_display_entries: 6,    //连续分页主体部分分页条目数
           current_page: pageIndex,   //当前页索引
        });
        //翻页调用   
        function PageCallback(index, jq) {             
           InitTable(index);  
        }  
        //请求数据   
        function InitTable(pageIndex) {                                  
           $.ajax({   
               type: "POST",  
               dataType: "json",  
               url: $("#js_pageCountUrl").val(),      //提交到一般处理程序请求数据   
               data: "pageIndex=" + (pageIndex-0+1) + "&pageSize=" + pageSize,          //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)                   
               success: function(data) {

                   	var gettpl = document.getElementById('userRating_load').innerHTML;
                   	laytpl(gettpl).render(data, function(html){
                       	document.getElementById('js_userRating').innerHTML = html;
                       	$("html,body").animate({scrollTop: js_goodsDetailTopTop}, 500);//页面返回到评价顶部
                   	});
               }  
           }); 
        }

		function ChangeTab(){
			this.goodsDetailWrap = $("#js_goodsDetailTop");
			this.goodsDetailTopTop = this.goodsDetailWrap.offset().top;
			this.goodsDetailMain = $("#goodsDetailMain");
			this.userRatingBox = $("#js_userRating");
			
			this.targetObj = this.goodsDetailWrap.find(".P_nav");
			
			this.init();
		}
		ChangeTab.prototype.init = function(){
			var that = this;

			that.targetObj.on("click","span",function(){
				var $this = $(this);
				var index = that.targetObj.children("span").index($this);

				$this.addClass('active').siblings("span").removeClass('active');;
				
				$("html,body").animate({scrollTop: that.goodsDetailTopTop}, 500);

				that.goodsDetailMain.children().eq(index).show().siblings().hide();
			
				//是否第一次点击用户评论
				if($this.hasClass("is_userRating") && !that.userRatingBox.children().length){
					InitTable(0);
				}
				
			});
		};
		new ChangeTab();
	}); 
	
	
	//点击用户上传小图，查看大图
	$("#js_userRating").on("click",".js_smallPicList a",function(){
		var $js_smallPicList = $(this).parent(".js_smallPicList"),
			$js_showBigImgList = $js_smallPicList.siblings(".js_showBigImgList"),
			ArrayImg = $js_showBigImgList.find("img");

		$.each(ArrayImg, function(index, val) {
			var that = $(val),
				srcImg = that.attr("data-src-img");
			that.attr("src",srcImg);
		});

		$js_smallPicList.addClass('none');
		$js_showBigImgList.removeClass('none');

		//缩略图滚动
		if($js_showBigImgList.find('ul.js_scrollableDiv').find('li').length > 1 ){
			$js_showBigImgList.find('.n_thumbImg_item').jCarouselLite({
				btnNext: $js_showBigImgList.find(".js_showPicBackward"),
				btnPrev: $js_showBigImgList.find(".js_showPicForward"),
				vertical: false,
				visible:1
			});
		};
	});
	
	//点击大图右上方的关闭图标
	$("#js_userRating").on("click",".js_closeShowBigImg",function(){
		var thisParentBigImgList = $(this).parent(".js_showBigImgList");

		thisParentBigImgList.addClass('none').siblings('.js_smallPicList').removeClass('none');
	});
})();

$(function(){
	$(window).scroll(function(event) {
		/* Act on the event */
		var $win = $(this),
			windowScroll = $win.scrollTop(),
			$js_goodsDetailTop = $("#js_goodsDetailTop"),
			p_nav = $js_goodsDetailTop.find(".P_nav"),
			btn_aAddCart = p_nav.find(".aAddCart"),
			btn_aBuyBtn = p_nav.find(".aBuyBtn");

		var js_goodsDetailTopTop = $js_goodsDetailTop.offset().top;

		if(windowScroll >= js_goodsDetailTopTop){
			p_nav.addClass("p_fixedNav");
			btn_aAddCart.css("display","block");
			btn_aBuyBtn.css("display","block");
		}else{
			p_nav.removeClass("p_fixedNav");
			btn_aAddCart.css("display","none");
			btn_aBuyBtn.css("display","none");
		}
	});
});