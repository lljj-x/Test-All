(function(){
	/**
	 * 设置浏览器历史
	 * @author          mashanling
	 * @date            2012-12-10 15:23:07
	 * @last modify     2012-12-10 15:23:07
	 * @return void 无返回值
	 */
	function setBrowerHistories() {
		var goodsId = $('#hidden-goodsId').val(),//商品id
		maxNum = 5,//最大保存数
		split = 'EOT',//商品分类分割符
		key = 'browserHistories',//cookie名称
		values = $('#hidden-history').val(),//当前商品信息
		histories = $.cookie(key);//浏览器历史
		
		if (goodsId && values) {
			var search = goodsId + '.htm', arr = [];
			if (histories) {
				var arr = histories.split(split);
				if (histories.indexOf(search) > -1) {//已经浏览器过，unshift到最前面
					for (var i = 0, len = arr.length; i < len; i++) {
						if (arr[i].indexOf(search) > -1) {//干掉当前商品
							arr.splice(i, 1);
							break;
						}
					}
				}
			}
			arr.unshift(values);
			arr = arr.length > maxNum ? arr.slice(0, maxNum) : arr;
			$.cookie(key, arr.join(split), {
				expires: 7, 
				path: '/',
				domain: COOKIESDIAMON
			});
		}
	}//end setBrowerHistories

	/*
	*  全屏产品大图		
	*
	@param	{jqObj}		zoomBox			主图片父元素
	@param	{string}	zoomPlugUrl		jquery.zoom.min.js插件的url
	@param	{jqObj}		thumb_listWrap 	缩略图列表父元素
	@param  {string}	thumb_list 		缩略图列表class名
	@param  {string}	thumbPlugUrl 	jquery.jcarousellite.min.js插件的url
	*
	*/
	function showFullPic(zoomBox,zoomPlugUrl,thumb_listWrap,thumb_list,thumbPlugUrl){
	
		var	mainImg = zoomBox.find('.myImgs');			//主图片
		zoomBox.find('.loading').remove();

		//更新放大镜图
		// zoomBox.find('.zoomImg').attr('src',mainImg.attr("src"));
		//只执行一次zoom()
		if(typeof flag === "undefined"){
			$LAB.script(zoomPlugUrl)
			.wait(function(){
				zoomBox.zoom().addClass('cursorZoomIn');
				flag = true;
			})
		}

		zoomBox.click(function(){
			if($('#full_mode').length == 0){
				var popImg = mainImg.attr('bigimg');
				var windowWid = $(window).width(),windowHei = $(window).height();
				$('html').css('overflow', 'hidden');						

				//初始化图片
				$(document.body).append('<div id="full_mode" class="cursorZoomOut"><img class="fullimg none" src='+ popImg + '><span class="loading"></span><div id="fullClose" title="close">close</div></div>')
				var fullMode = $('#full_mode'), fullPic = fullMode.find('.fullimg');
				
				//显示图片
				fullPic.load(function(){
					fullMode.find('.loading').remove();
					fullPic.css('marginLeft', windowWid/2 - fullPic.width()/2).fadeIn('fast');
				});

				//遍历出图片列表
				var thumb_listArr = thumb_listWrap.find('.' + thumb_list);
				var htmls = '';
				htmls += '<div class="fullList_wrap"><div id="fullList"><ul>';
				$.each(thumb_listArr, function(index, ele) {
					htmls += '<li class="imgItem">'+ele.innerHTML+'</li>';
				});
				htmls += '</ul></div><a href="javascript:;" class="prev none">prev</a><a href="javascript:;" class="next none">next</a></div>';
				fullMode.append(htmls);

				var ofullList = $('#fullList');

				// 给当前图片加上class
				ofullList.find('.imgItem').each(function(index,el){
					if(fullPic.attr('src') == $(el).find('img').attr('bigimg')){
						$(el).addClass('on');
						return false;
					}
				})
				ofullList.parent().on('click', function(event) {event.stopPropagation()});

				//点击图片列表
				ofullList.on('click', '.imgItem', function(event) {
					var that = $(this);
					if(fullPic.attr('src') != that.find('img').attr('bigimg')){
						fullPic.after('<span class="loading"></span>').attr('src',that.find('img').attr('bigimg')).hide();;
						that.addClass('on').siblings('.imgItem').removeClass('on');
						fullPic.load(function(){
							$(this).fadeIn('fast');
							fullMode.find('.loading').remove();
						});
					}
				});
				// 图片列表滑动
				if(ofullList.outerHeight(true) > (windowHei-100)){
					ofullList.parent().find('.prev,.next').fadeIn();
					var visibleLen = Math.floor((windowHei-100) / ofullList.find('li').outerHeight(true));
					$LAB.script(thumbPlugUrl)
					.wait(function(){
			            $("#fullList").jCarouselLite({
			                btnNext: ".fullList_wrap .next",
			                btnPrev: ".fullList_wrap .prev",
			                vertical: true,
			                visible: visibleLen,
			                scroll: 2
			            });
					})
				}
				//关闭全屏
				fullMode.on('click',function(){
					fullMode.fadeOut('fast',function(){fullMode.remove()});
					$('html').css('overflow', 'scroll');
				});	
			}
		});				
				
	}

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
		$(Img).load(function() {
			$("#js_jqzoom").find('.loading').remove();
			bigImg.attr({
				"src":$img.attr(bigimgAttr),
				"bigimg":$img.attr(bigimgAttr)
			});
			//更新放大镜图
			if(zoomBox.find('.zoomImg').length){
				zoomBox.find('.zoomImg').attr('src',$img.attr(bigimgAttr));
			}
		});		

		$this.addClass("on").siblings('li').removeClass('on');
	}


	//隐藏域#pic_from的值为2的时使用全屏大图
	if($('#pic_from').val() == 2){	
		var zoomPlugUrl = JS_IMG_URL+'/minjs/jquery.zoom.min.js';
		var thumbPlugUrl = JS_IMG_URL+'/minjs/jquery.jcarousellite.min.js';
		showFullPic($('#js_jqzoom'),zoomPlugUrl,$('#js_n_thumbImg'),'thumbnail_list',thumbPlugUrl);
	}

	//鼠标经过缩略图
	$("#js_n_thumbImg").on("mouseover","li.thumbnail_list",function(){
		var $this = $(this);
		//如果不是视频
		if(!$this.hasClass('video')){
			//$this.siblings().find("div.n_showBigBox").hide();
			showBigimg($('#js_jqzoom'),"bigimg",$this);
		}
	});
	$("#js_n_thumbImg").find('li:first()').trigger('mouseover');

	$("#js_n_thumbImg").on("click","li.video",function(){ 
		var $this = $(this);
		var options = {
			area:['590px','380px'],
			offset : [($(window).height()-380)/2 +"px" , '50%'],
			closeBtn :false,
			page : {
				html:'<iframe width="590" height="380" src="//www.youtube.com/embed/'+$this.find('img').data("video-url")+'" frameborder="0" allowfullscreen></iframe>'
			}
		};
		GLOBAL.PopObj.openPop(options);
	});

	//缩略图滚动
	if($("#js_n_thumbImg").find('ul.js_scrollableDiv').find('li').length > 3 ){
		$("#js_n_thumbImg").find('.n_thumbImg_item').jCarouselLite({
		    btnNext: "#js_spec-backward",
		    btnPrev: "#js_spec_forward",
		    vertical: true,
		    visible:3
		});
	}

	//缩略图，用户的图片弹出框
	$("#js_revThumb_img").click(function(event) {
		/* Act on the event */
		var H = 704, W=935;
		var wH = $(window).height();
		var iframeH;

		if(wH>H){
			iframeH = H;
		}else{
			iframeH = wH;
			W = W+20;
		}
		var options = {
				area: [W+'px',iframeH+"px"],
				offset : [($(window).height()-iframeH)/2 +"px", '50%'],
				//index是用来标记点击图片是同类图片中的第几张
				iframe : {src : $(this).find('a').data("uid")}
		}

		GLOBAL.PopObj.iframe(options);
		return false;
	});

	$(".js_property_secelt").on("change",function(){
		 GLOBAL.cart.change_same_goods(this);
	});

	// $("#js_input_quantity").on("keyup",function(){
	// 	GLOBAL.cart.input_quantity(this);
	// });

	// $("a.btn_add").on("click",function(){
	// 	GLOBAL.cart.add();
	// });

	// $("a.btn_reduce").on("click",function(){
	// 	GLOBAL.cart.reduce();
	// });

	// $("#new_addcart").on("click",function(){
	// 	GLOBAL.cart.addcart();
	// });
	//加入收藏加
	$(".addToFavBtn").click(function(event) {
		/* Act on the event */
		var $this = $(this);
		var options = {
			url:$this.attr("data-src"),
			rebackPage:window.location.href,
			top:$this.find("i").offset().top,
			left:$this.find("i").offset().left
		};
		GLOBAL.login.isLogin(GLOBAL.addTofavorite,options);
		$this.addClass("addToFavBtnOn");

		return false;
	});
	//查看用户上传的图片
	$("div.js_reviews_img").find("a").each(function(i,v){
		$(this).click(function(){
			var options = {
				area: ['810px','490px'],
				offset : [($(window).height()-490)/2 +"px", '50%'],
				//index是用来标记点击图片是同类图片中的第几张
				iframe : {src : $(this).data("uid")+"?index="+$(this).index()}
			}
			
			//index是用来标记点击图片是同类图片中的第几张
			//options.url = $(this).data("uid")+"?index="+$(this).index();

			//options是弹出iframe框的配置信息
			GLOBAL.PopObj.iframe(options);
			return false;
		})
	});
	//查看视频
	$("div.js_reviews_video").find("a").click(function(){
		var $this = $(this);

		var options = {
			area:['590px','380px'],
			offset : [($(window).height()-380)/2 +"px" , '50%'],
			closeBtn :false,
			page : {
				html:'<iframe width="590" height="380" src="//www.youtube.com/embed/'+$this.data("video")+'" frameborder="0" allowfullscreen></iframe>'
			}
		};
		GLOBAL.PopObj.openPop(options);
		return false;
	});

	//设置浏览器历史
	setBrowerHistories();

	//单位换算
	$(".js_size_btn").click(function(){
		var $this = $(this);
		var $inputBox = $this.parent().find(".js_size");
		var $showBox = $this.parent().find(".js_size_show");
		var unit = $this.data("unit");
		
		if(/^([1-9]\d*|0){1,3}$/.test($.trim($inputBox.val()))){
			if(unit=="inch"){
				$showBox.val(($inputBox.val()*2.54).toFixed(2));
			}else{
				$showBox.val(($inputBox.val()/2.54).toFixed(2));
			}
		}else{
			$showBox.val("0.00");
			$inputBox.val("");
		}
	});
})();
(function(){
	function itemPosition(itemBox,navBox,warpBox){
		var $item = $(itemBox),
			$nav = $(navBox),
			$warp = $(warpBox);

		$(window).resize(function(){
			$nav.css({
				width: $warp.width(),
				left: $warp.offset().left,
				top:0
			});
			$item.css("position") == "fixed" ? $item.css({"right": $(window).width()-$warp.offset().left - $warp.width()}) : $item.css({"right": 0});
		});

		$(window).scroll(function(){
			var $scrollObj = $(this);
			var scrollTop = $scrollObj.scrollTop();
			var warpHeight = $warp.height();

			//如果滚动视区到达导航的范围
			if(scrollTop > $warp.offset().top){ 
				$nav.css({
					position: 'fixed',
					width: $warp.width(),
					left: $warp.offset().left,
					top:0
				});

				$(".js_p_infoBlack").each(function(index, el) {
					var top = $(this).offset().top;

					$nav.find('li').eq(index).data("s_top",top);

				});

				$nav.find('li').each(function(index, el) {
					var $this = $(this);
					if($this.data('s_top') < scrollTop+90  && $this.parent("ul").data("isClick") != 1){
						$this.addClass('on').siblings('li').removeClass('on');
					}
				});

			}else{
				$nav.css({
					position: 'static',
					width: $warp.width(),
					left: $warp.offset().left,
					top:0
				});
			}
			//如果滚动视区到item的范围
			if(scrollTop > $nav.parent().outerHeight(true) + $warp.offset().top){ 

				//如果item相对父元素的滚动值加上本身的高度，仍然小于父元素的高度
				if(scrollTop - $warp.offset().top + $item.height()- warpHeight<0){
					$item.css({
						"position": "fixed",
						"right": $(window).width()-$warp.offset().left - $warp.width(),
						"bottom":"auto",
						"top":"40px"
					});
				}else{
					$item.css({
						"position": "absolute",
						"right":"0", 
						"top":"auto", 
						"bottom":"0"
					});
				}
			}else{
				$item.css({
					"position": "absolute",
					"right": "0",
					"bottom":"auto",
					"top":"0"
				});
			}
		})
	};
	itemPosition("#js_newGoods","#js_pro_nav","#js_proMain");


	$("#js_pro_nav").each(function(index, el) {
		var $this = $(this);

		$this.css({"backgroundColor":"#fff","zIndex":30});
		$this.find('li').click(function(event) {
			/* Act on the event */
			var $this = $(this),i = $this.index(),
				top = $(".js_p_infoBlack").eq(i).offset().top;

				$this.data("s_top",top);

			$this.addClass('on').siblings('li').removeClass('on');
			$this.parent("ul").data("isClick",1);
			$("body,html").stop().animate({"scrollTop":$this.data("s_top")-40}, 500,function(){
				$this.parent("ul").data("isClick",0);
			});
		});
	});

})();

(function(){
	/**
	 * 倒计时对象
	 * @param {jquery 对象} $cutBox 用来显示倒计时的容器
	 * @param {String} cutTime 记录结束时间的，如 “02/12/2013 08:59:59 AM”
	 * @param {Number} msec 是否显示毫秒，1不显示，0或者不填显示
	 */
	GLOBAL.Untime = function($cutBox,msec){
		this.timeBox = $cutBox;
		this.cutTime = unescape($cutBox.data("time")).split(" ");
		this._bland = "";
		this.d=""
		this.msec = arguments[2];
	}
	GLOBAL.Untime.prototype.ini = function(){
		var that = this;
		var a1,a2;
		var cutTime = this.cutTime;
		if(cutTime.length > 1){
			a1 = cutTime[0].split("/");
			a2 = cutTime[1].split(":");
			that.d = new Date(a1[2], a1[1]-1, a1[0], a2[0], a2[1]);
			
			that.setCutTime(that.d);
		}	
	}
	GLOBAL.Untime.prototype.n8 = function(n){
		if(n < 10){return "0" + n.toString()};
		return n.toString();
	}
	GLOBAL.Untime.prototype.n3 = function(n){
		if(n < 10){return "00" + n.toString()};
		if(n < 100){return "0" + n.toString()};
		return n.toString();
	}

	GLOBAL.Untime.prototype.setCutTime = function(d){
		var that = this;
		var time_h,tmme_m,time_s,time_ms,time_day;
		var d1 = new Date();
	    var zone =  d1.getHours()-d1.getUTCHours();
		var n;
		n = d.getTime() - d1.getTime()+(zone+7)*3600*1000;

		if(n > 0){
			time_ms = that.n3(n % 1000);
			n = (n - n % 1000) / 1000;
			time_s = that.n8(n % 60);
			n = (n - n % 60) / 60;
			tmme_m = that.n8(n % 60);
			n = (n - n % 60) / 60;
			time_h = that.n8(n % 24);
			n = (n - n % 24) / 24;

			if(this.msec == 1 ){
				if(n>0){
					that.timeBox.html(n+"<span>"+jsLg.day+"</span> "+time_h+":"+tmme_m+":"+time_s)
				}else{
					that.timeBox.html(time_h+":"+tmme_m+":"+time_s)
				}
			}else{
				if(n>0){
					that.timeBox.html(n+"<span>"+jsLg.day+"</span> "+time_h+":"+tmme_m+":"+time_s+":"+time_ms)
				}else{
					that.timeBox.html(time_h+":"+tmme_m+":"+time_s+":"+time_ms)
				}
			}
			that._bland = setTimeout(function(){
				that.setCutTime(d)
			}, 1);
		}else{
			that.timeBox.html("00 : 00 : 00 : 00");
			if(that._bland){
				clearTimeout(that._bland);
			}
		}
	}//倒计时对象结束

	var Timecut = new GLOBAL.Untime($("#time_coutDown"));
	Timecut.ini();
})();

(function(){
	/**
	 * 倒计时对象2,只显示分秒和毫秒，不显示天数和小时
	 * @param {jquery 对象} $cutBox 用来显示倒计时的容器
	 * @param {String} cutTime 记录结束时间的，如 “02/12/2013 08:59:59 AM”
	 * @param {Number} msec 是否显示毫秒，1不显示，0或者不填显示
	 */
	GLOBAL.Untime = function($cutBox,cutTime,msec){
		this.timeBox = $cutBox;
		this.cutTime = cutTime*1000;//将秒变为毫秒
		this._bland = "";
		this.msec = msec;
	}
	GLOBAL.Untime.prototype.ini = function(){
		var that = this;
		var a1,a2;
		var cutTime = this.cutTime;
		if($.isNumeric(cutTime)){	
			that.setCutTime(cutTime);
		}	
	}
	GLOBAL.Untime.prototype.n8 = function(n){
		if(n < 10){return "0" + n.toString()};
		return n.toString();
	}
	GLOBAL.Untime.prototype.n3 = function(n){
		if(n < 10){return "00" + n.toString()};
		if(n < 100){return "0" + n.toString()};
		return n.toString();
	}

	GLOBAL.Untime.prototype.setCutTime = function(d){
		var that = this;
		var tmme_m,time_s,time_ms;
		var n;
		n = d;
		var startTime = new Date();//定义一个变量，记录每次执行到这里的时间
		
		if(n > 0){
			time_ms = that.n3(n % 1000);
			n = (n - n % 1000) / 1000;
			time_s = that.n8(n % 60);
			n = (n - n % 60) / 60;
			tmme_m = that.n8(n % 60);

			if(this.msec == 1 ){
				that.timeBox.html(tmme_m+":"+time_s)
			}else{
				that.timeBox.html(tmme_m+":"+time_s+":"+time_ms)
			}

			that._bland = setTimeout(function(){
				var endTime = new Date();//定义一个变量，记录每次执行到这里的时间
				var loseTime = endTime - startTime;//误差值（因为每次执行setTimeout代码需要时间，下次执行时要减去这个误差值）
				that.setCutTime(d-1-loseTime);
			}, 1);
		}else{
			that.timeBox.html("00 : 00 : 00");
			if(that._bland){
				clearTimeout(that._bland);
			}
		}
	}//倒计时对象结束

	var Timecut2 = new GLOBAL.Untime($("#time_coutDown2"),$("#time_coutDown2").data("time"),0);
	Timecut2.ini();
	var Timecut3 = new GLOBAL.Untime($("#time_coutDown3"),$("#time_coutDown3").data("time"),0);
	Timecut3.ini();
})();

(function(){						
$("#InquiryBox").validate({
	rules: {
		txtPrice: {
			required: true,
			maxlength: 20
		},
		txtQuantity: {
			required: true,
			maxlength: 10
		},
		txtDelDay: {
			required: true,
			maxlength: 60
		},
		txtTrueName: {
			required: true,
			maxlength: 50
		},
		txtPhone: {
			required: true,
			maxlength: 30
		},
		txtEMail: {
			required: true,
			maxlength: 60,
			email: true
		},
		txtMessage: {
			required: true,
			maxlength: 300,
			minlength: 6
		},
        verifycode: {
			required: true,
			maxlength: 4
		}
	},
	messages: {
		txtPrice: {
			required: jsLg.inquiry.txtPrice
		},
		txtQuantity: {
			required: jsLg.inquiry.txtQuantity,
			rangelength: jQuery.format(jsLg.formMsg.Enter_at_least)
		},
		txtDelDay: {
			required: jsLg.inquiry.txtDelDay,
			rangelength:  jQuery.format(jsLg.formMsg.Enter_at_least)
		},
		txtTrueName: {
			required:jsLg.inquiry.txtTrueName,
			rangelength: jQuery.format(jsLg.formMsg.Enter_at_least)
		},
		txtPhone: {
			required: jsLg.inquiry.txtPhone,
			rangelength: jQuery.format(jsLg.formMsg.Enter_at_least)
		},
		txtEMail: {
			required:jsLg.inquiry.txtEMail,
			email: jsLg.formMsg.email_require_msg,
			rangelength: jQuery.format(jsLg.formMsg.Enter_at_least)
		},
		txtMessage: {
			required:jsLg.inquiry.txtMessage,
			minlength: jQuery.format(jsLg.formMsg.Enter_at_least)
		},
        verifycode: {
			required:jsLg.inquiry.verifycode,
			minlength: jQuery.format(jsLg.formMsg.Enter_at_least)
		}
	},
	submitHandler:function(){
		$.post('/m-inquiry-method-ajax.htm?'+$("#goods_id").val(), $("#InquiryBox").serialize(),function(data) {
			/*optional stuff to do after success */
			var options = {
	            msg : "",
	            typeTag :0
	        }

			if(data=="ok"){
				//提示用户发布成功，同事清空表单
				options.msg = jsLg.inquiry.success;
				GLOBAL.PopObj.alert(options);

				$("#InquiryBox").find("table").find("input").val("");
				$("#txtMessage").val("");
				$("#InquiryBox").find("label.checked").remove();
				$("#refresh-verifycode").trigger('click');
			}else{
				options.msg = data;
				options.callBack = function(){$("#refresh-verifycode").trigger('click');}
				GLOBAL.PopObj.alert(options);
			}
		});
	},
	errorPlacement:function(error,element){
		element.parent().find("label.checked").remove();
		error.appendTo(element.parent());
		
	},
	success: function(label) {
		 label.remove();
	}
});

$('#refresh-verifycode').click(function() {
	var element = $('#img-verifycode');
	element.attr('src', element.attr('data-src') + '&' + Math.random());
});

})();

(function(){
	//表格单位换算
	function chartTable(btn,table){
		this.btnWrap = $(btn),
		this.table = this.btnWrap.closest(".chartContainer").find(table),
		this.tabel_unit = this.table.data("unit");
	}
	chartTable.prototype = {
		ini : function(){
			var that = this;
			var btnWrap = that.btnWrap;

			btnWrap.on("click","a",function(){ 
				var $this = $(this),unit;

				if(!$this.hasClass('active')){
					unit = $this.data("unit");
					that.changeCell(unit);

					$this.addClass('active').siblings().removeClass('active');
				}
			}).find("a:eq(0)").trigger('click');
		},
		changeCell:function(unit){
			var changeObj = this.table.find('.unit-change');
			var that = this;

			if(unit == "inch"){
				var curUnit = this.tabel_unit;
				var unitNum = curUnit == 'cm' ? 0.3937 :  curUnit == 'mm' ? 0.03937 : 0;

				$.each(changeObj, function(index, val) {
					that.changeToIn($(val),$(val).data("orig"),unitNum);
				})
			}else{
				$.each(changeObj, function(index, val) {
					 /* iterate through array or object */
					$(val).html($(val).data("orig"));
				});
			}
		},
		changeToIn:function(obj,orig,unitNum){
			var u = Math.round(orig*unitNum*100)/100;
			$(obj).html(u.toFixed(2));
			
		}
	}
	$(".js_unit-switcher").each(function(i,v){
		var setCharetBox = new chartTable($(v),".js_datasource");
			setCharetBox.ini();
	});


	$(".js_table-switcher").on("click","a",function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active').siblings().removeClass('active');

			$(".chartContainer").eq($(this).index()).show().siblings(".chartContainer").hide();
		}
	})
})();

(function(){//选择颜色和属性
  function ChangeAttr(){
    this.curColor = $.trim( $("#js_property_color").find('.selected').find('a').attr("title"));
    this.curSize =  $.trim($("#js_property_size").find('.selected').find('a').attr("title"));
    this.datas = ColorSize;
    this.usefulColor = {};
    this.usefulSize = {};
    this.ini();
  };

  ChangeAttr.prototype.getUsefulData  = function(){
    /* body... */
    var that = this;
    for(var i = 0, length1 = this.datas.length; i < length1; i++){
      
      if(this.datas[i].size == this.curSize && this.datas[i].isSale==0){//找到当前尺寸下，有货的商品颜色
        var item = this.datas[i].color;
        that.usefulColor[item] = 1;
      }
     
      if(this.datas[i].color == this.curColor && this.datas[i].isSale==0){
        var item = this.datas[i].size;
        that.usefulSize[item] = 1;
      }
    }
  };

  ChangeAttr.prototype.setStyle = function(){
    var JcolorList = $("#js_property_color").find('li');
    var JsizeList = $("#js_property_size").find('li');
    var that = this;

    $.each(JcolorList, function(index, val) {
       /* iterate through array or object */
      var $this = $(val);
      
      if(that.usefulColor[$.trim($this.find('a').attr("title"))] !=1  ){
        $this.addClass('product_out');
      }else{
        $this.removeClass('product_out');
      }
    });

    $.each(JsizeList, function(index, val) {
       /* iterate through array or object */
       var $this = $(val);
      if(that.usefulSize[$.trim($this.find('a').attr("title"))] !=1 ){
        $this.removeClass('selected ').addClass('product_out');
      }else{
        $this.removeClass('product_out');
      }
    });



  };
  ChangeAttr.prototype.getGotToNewGoodsId = function(curColor,curSize){
    for(var i = 0, length1 = this.datas.length; i < length1; i++){
      if(this.datas[i].size == curSize && this.datas[i].color == curColor && this.datas[i].isSale == 0){
       
        return this.datas[i].goodsId;
      }
    }
  },
  ChangeAttr.prototype.gotoNewPage = function(newGoodsId){

    //window.location.href ='/pg/' + newGoodsId + '.html';
    // for(var i = 0, length1 = this.datas.length; i < length1; i++){
    //   if(this.datas[i].size == curSize && this.datas[i].color == curColor && this.datas[i].isSale){
    //     //console.log(this.datas[i].goodsId);
    //     window.location.href ='/'+JS_LANG+'product' + this.datas[i].goodsId + '.html';
    //   }
    // }
    // 
    var url = window.location.href;
		
	var newUrl = url.replace(new RegExp(/(.+\-product)(.)+(\.html|\.htm)+/),'$1'+newGoodsId+'$3');
	layer.load('loading..');
	window.location.href=newUrl;
  };

  ChangeAttr.prototype.ini = function(){
    that = this;
    this.getUsefulData();
    this.setStyle();

    //选择一个颜色
    $("#js_property_color").on("click","li",function(){

      var $this = $(this);

      var $addCartBtn = $("#new_addcart");
      var $SizeWrap = $("#js_property_size").parent();

      $this.siblings('li').removeClass('selected');
      $this.addClass('selected');

      //更改当前颜色
      that.curColor = $.trim( $this.find('a').attr("title"));

      //清空可使用数据，
      delete that.usefulColor;
      delete that.usefulSize;

      that.usefulColor = {};
      that.usefulSize = {};

      //重新获取可使用数据
      that.getUsefulData();

      //设置样式
      that.setStyle();

      //判断是否可以跳转页面
      if(!$.trim(that.curSize).length){//如果没有尺寸
        var newGoodId = "";
        for(var i = 0, length1 = that.datas.length; i < length1; i++){
        
          if( that.datas[i].color == that.curColor){
           
          newGoodId = that.datas[i].goodsId;
          break;
          
          }
        }
        that.gotoNewPage(newGoodId);
        
      }else{
        if(!$this.hasClass('product_out') && $("#js_property_size").find('.selected').length){

          var newGoodId = that.getGotToNewGoodsId(that.curColor,that.curSize);//取到新的goodid

          $addCartBtn.show().attr("gid",newGoodId);

          that.gotoNewPage(newGoodId);
        }else{
           //购物车不能购买
           $addCartBtn.attr("gid","").hide();
           $SizeWrap.addClass('hl-bg');

          //that.curSize = "";
        }
    }    

     // $("#js_jqzoom").find('img').attr("src",$this.find("img").data("bigimg"));

    });

    //选择一个尺寸
    $("#js_property_size").on("click","li",function(){
      var $this = $(this);
      var $addCartBtn = $("#new_addcart");
      var $SizeWrap = $("#js_property_size").parent();

      if($("#js_property_size").hasClass('disabled')){
        return false;
      }

      if($this.hasClass('product_out')){
        return false;
      }else{
        $this.siblings('li').removeClass('selected');
        $this.addClass('selected');

        //更改当前颜色
        that.curSize = $.trim( $this.find('a').attr("title"));

        //清空可使用数据，
        delete that.usefulColor;
        delete that.usefulSize;

        that.usefulColor = {};
        that.usefulSize = {};

        //重新获取可使用数据
        that.getUsefulData();

        //设置样式
        that.setStyle();

        $SizeWrap.removeClass('hl-bg');

        //跳转页面
        var newGoodId = that.getGotToNewGoodsId(that.curColor,that.curSize);//取到新的goodid

       $addCartBtn.attr("gid",newGoodId);

       that.gotoNewPage(newGoodId);
      }

    });
  };

  new ChangeAttr();

})()
