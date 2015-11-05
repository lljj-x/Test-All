(function(){

	$("#js_cateTopBar").on('mouseover', 'div.operate_list', function(event) {
		/* Act on the event */
        var $this = $(this),
        	$navList = $this.find('ul');

        if($navList.length){
        	$this.addClass('operate_list_hover')
        	$navList.show();
        }
	});

	$("#js_cateTopBar").on('mouseout', 'div.operate_list', function(event) {
		/* Act on the event */
        var $this = $(this),
        	$navList = $this.find('ul');

        if($navList.length){
        	$this.removeClass('operate_list_hover')
        	$navList.hide();
        }
	});

	//快速预览弹出宽
	$("#js_cateListUl").on("click","a.lookFast",function(){
		var $this = $(this);

		var options = {
			area : ['1020px','580px'],
			offset : [($(window).height()-590)/2 +"px" , '50%'],
			shadeClose : true,
			iframe : {src : $this.data("url")}
			
		}
		GLOBAL.PopObj.iframe(options);
	});

	//tips提示
	$(".js_tips").hover(function() {
		var $this = $(this);

		GLOBAL.PopObj.tipsShow({
			Obj : $this,
			msg : $this.data("tips")
		})
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		GLOBAL.PopObj.closeTipsShow();
	});
	
})();


(function(){
	//定义分类页面dom 变量
	var $closeBtn = $("#js_closeCateAttr"),
		$cateWarp = $("#js_cateWrap"),
		$showCateBar = $("#js_showCateBar"),
		$cate_attr = $("#js_cate_attr"),
		$cateTopBar = $("#js_cateTopBar"),
		$cateListUl = $("#js_cateListUl"),
		$wind = $(window);

	//定义分类页面dom 位置变量
	var attrH = parseInt($cate_attr.height(), 10) + parseInt($cate_attr.css("paddingBottom"), 10),
		cateWarpH = parseInt($cateWarp.height(), 10),
		windH = $(window).height();

	//定义左边栏目 he 分类导航栏目的位置对象--记录的是打开页面一瞬间的位置，不是实时变化的
	var	CateWarpOffset = $cateWarp.offset(),
		CateTopBarOffset = $cateTopBar.offset();

	//定义分类页面显示隐藏时间变量
	var _tmie = 200;


	//比较元素高度
	var setHeight = function(){
		var maxH = attrH;
		maxH >= cateWarpH ? $cateWarp.height(maxH) : "";
	
	};
	setHeight();

	//设置分类导航栏目的宽度和位置
	var setPosition = function(){
		$cateTopBar.css({
			width : $cateWarp.width() - 20, //因为父元素有左右10个像素的padding值，
			left : $cateWarp.offset().left
		})
	};
	setPosition();

	//设置产品列表的ul的宽度
	var setCateListUlWidth = function(){
		var liW = $cateListUl.find('li').outerWidth(true),
			warpW = $cateWarp.width();

		$cateListUl.width(Math.floor(warpW/liW)*liW);

	}
	setCateListUlWidth();

	//关闭属性栏目
	$closeBtn.on('click', function(event) {
		/* Act on the event */
		$cateWarp.animate({marginLeft: 0}, _tmie,function(){
			$showCateBar.fadeIn();
			$cate_attr.hide();
			$cateWarp.height("auto");
			setPosition();
			setCateListUlWidth();
		});

		return false;
	});

	//显示属性栏目
	$showCateBar.on('click', function(event) {
		/* Act on the event */

		$cateWarp.animate({marginLeft: '245px'}, _tmie,function(){
			setHeight();
			setPosition();
			setCateListUlWidth();
		});
		$showCateBar.fadeOut(_tmie);
		$cate_attr.fadeIn(_tmie);


		return false;
	});

	//窗口滚动
	$wind.on('scroll', function(event) {
		/* Act on the event */
		var $this = $(this);

		var scrollT = $this.scrollTop();
		attrH = parseInt($cate_attr.height(), 10) + parseInt($cate_attr.css("paddingBottom"), 10);
		//如果滚动到了分类页导航栏
		if(scrollT > CateTopBarOffset.top){
			$cateTopBar.css({
				position: 'fixed',
				top:0
			});
		}else{
			$cateTopBar.css({
				position: 'static'
			});
		}

		//如果滚动到右边栏目的顶部
		if(scrollT > CateWarpOffset.top){

			//如果左边栏目高于窗口高度
	
			if(attrH > windH ){
				if(scrollT - CateWarpOffset.top + windH >= $cate_attr.height() ){ //使用实时获取的高度，避免有属性隐藏后高度发生变化
					$cate_attr.css({
						position: 'fixed',
						top:'auto',
						bottom: '0'
					});
				}else{
					$cate_attr.css({
						position: 'absolute',
						top:'0',
						bottom: 'auto'
					});
				}

				if(scrollT - CateWarpOffset.top + windH >= cateWarpH){
					$cate_attr.css({
						position: 'absolute'
					});
				}

			}else{
				
				if( scrollT -CateWarpOffset.top + $cate_attr.height() >= cateWarpH){
					$cate_attr.css({
						position: 'absolute',
						top: 'auto',
						bottom:'0'
					});

				}else{

					$cate_attr.css({
						position: 'fixed',
						top: '0',
						bottom: 'auto'
					});
				}
			}
		}else{
			$cate_attr.css({
				position: 'absolute',
				top: '0',
				bottom:'auto'
			});

		}
	})
	.on("resize", function(){
		setPosition();
		setCateListUlWidth();
	});

	//搜索页面左边，一级分类显示隐藏显示隐藏
	function showSearchFirstNav(){
		var FirstWrap = $("#js_C_all"),
			FirstBtn = $('<div id="see_all_department"></div>')
			FirstNavList = FirstWrap.children('.c_ctg_item'),
			len = 0;

		if(FirstWrap.length && FirstNavList.length > 3){
			//初始化设置，一级分类多余3个分类的隐藏起来，地步加入seemore btn
			len = FirstNavList.length;
			FirstBtn.find('span').html(len);
			FirstNavList.slice(3).hide();
			FirstBtn.html(jsLg.seeAllDepartments).find('span').text(len);

			FirstWrap.append(FirstBtn);

			//重新定义左边栏目的高度和位置
			
			setHeight();
			setPosition();

			//点击seemore 显示和隐藏一级分类
			FirstBtn.click(function(){
				var that = $(this);

				if(that.data("isShow")!=1){
					FirstNavList.slice(3).show();
					that.data("isShow",1);
					FirstBtn.html(jsLg.seeFewerDepartments);

				}else{
					FirstNavList.slice(3).hide();
					that.data("isShow",0);
					if($(window).height() > $("#js_cate_attr").height()){
	        			$("#js_cate_attr").css({"position":"fixed","top":0,"bottom":"auto"});
	        		}
	        		FirstBtn.html(jsLg.seeAllDepartments).find('span').text(len);
				}

				setHeight();
				setPosition();
			})
		}
	}
	//搜索页面左边，二,三级分类显示隐藏显示隐藏
	function showSearchSecondNav(){
		var CateList = $("#js_C_all").find(".c_ctg_item");

		CateList.each(function(i,v){
			var S_ctg_con = $(v).find('.c_ctg_con'),
				S_ctg_conLi = S_ctg_con.find("li");

			//二级和三级分类多余5个的隐藏	
			if(S_ctg_conLi.length > 5){
				S_ctg_conLi.slice(5).hide();
				S_ctg_con.append('<div class="seeLine"><strong>+</strong>See More</div>');

				//显示隐藏二级分类
				S_ctg_con.on("click",".seeLine",function(){
					var that = $(this);

					if(that.data("isShow")!=1){
						S_ctg_conLi.slice(5).show();
						that.data("isShow",1);
						that.html('<strong>-</strong>See Less');
					}else{
						S_ctg_conLi.slice(5).hide();
						that.data("isShow",0);
						that.html('<strong>+</strong>See More');
					}
				});

				setHeight();
				setPosition();
			}
		})

		setHeight();
		setPosition();
	}
	showSearchFirstNav();
	showSearchSecondNav();


})();


//搜索页面
(function(){
	function RelatedKey(id){
		this.contains = $(id);
		this.link = this.contains.find('span');
	}

	RelatedKey.prototype.ini=function(){
		if(this.link.length > 3){
			this.link.slice(3).hide();
			this.contains.append('<i data-flag="0">'+ jsLg.More +'</i>');
			this._operal();
		}
	}
	RelatedKey.prototype._operal = function(){
		var that = this;
		var height = this.contains.height();

		$(this.contains).on("click","i",function(){

			if($(this).data("flag")==0){

				that.link.slice(3).show();
				that.contains.css("height","auto");
				$(this).text(jsLg.Less).data("flag",1);

			}else{
				
				that.link.slice(3).hide();
				that.contains.height(height);
				$(this).text(jsLg.More).data("flag",0);
			}
		})
	}

	var Related = new RelatedKey("#js_search_key");
		Related.ini();
})();