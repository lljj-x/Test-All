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
    maxNum = 6,//最大保存数
    split = 'EOT',//商品分类分割符
    key = 'browserHistories3',//cookie名称
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
      $.cookie('browserHistories2',"",{
        expires: -1, 
        path: '/',
        domain: COOKIESDIAMON
      });
      $.cookie(key, arr.join(split), {
        expires: 7, 
        path: '/',
        domain: COOKIESDIAMON
      });
    }
  }//end setBrowerHistories


  // 显示产品大图
  var falg = true;
  function showBigimg($this){
    var zoomBox = $('#js_jqzoom'),thumb_list = $('#js_n_thumbImg'),thumb_customer = $('#js_revThumb_img');
    var $bigImg = zoomBox.find('img');
      $img = $this.find('img');

    var Img = new Image();
    zoomBox.append('<span class="loading"></span>');
    $(Img).load(function() {
      zoomBox.find('span.loading').remove();
      $bigImg.attr({"src":$img.data("normal-img"),"jqimg":$img.data("big-img")});
      var width=Img.width,height=Img.height;
      //隐藏域#pic_from的值为2的时使用大图
      if($('#pic_from').val() == 2 && falg){
        zoomBox.zoom();
        zoomBox.addClass('cursorZoomIn');
        zoomBox.click(function(){
          var original_img = zoomBox.find('img').attr('jqimg');
          var windowHei = $(window).height(),windowWid = $(window).width();
          $('html').css('overflow', 'hidden');
          $(document.body).append('<div id="full_mode" class="cursorZoomOut"><img src='+ original_img + '></div>')
          thumb_list.addClass('n_thumbImg_in_fixed');
          var fullMode = $('#full_mode'), fullPic = fullMode.find('img');

          fullMode.append('<div id="fullClose" title="close">close</div>');
          fullPic.css('marginLeft', windowWid/2 - fullPic.width()/2);

          thumb_customer.hide();
          
          // 大图模式时，将1000以下的图list隐藏
          thumb_list.find('li').each(function(index, el) {
            var each_listImg = new Image();
            each_listImg.src = $(this).children('img').data('big-img');
            each_listImg.onload = function(){
              if(each_listImg.width < 1000){
                thumb_list.find('li').eq(index).hide();
              }
            }
            
          });

          //关闭全屏
          fullMode.on('click',function(){
            $(this).remove();
            thumb_list.removeClass('n_thumbImg_in_fixed');
            $('html').css('overflow', 'scroll');
            thumb_customer.show();
            thumb_list.find('li').show();
          });

          $("#js_n_thumbImg").find('li').on("mouseenter",function(){
            fullPic.attr('src',$(this).find('img').data('big-img'));
          })  
        });
        falg = false;
      }
    });
    Img.src= $img.data("normal-img");
    // 获取原图尺寸


    $this.addClass("on").siblings('li').removeClass('on');
  }
  //查看大图
  //$('#js_jqzoom').jqueryzoom({xzoom:430,yzoom:430});
  $("#js_n_thumbImg").on("mouseover","li",function(){
    var $this = $(this);

    //如果不是视频
    if(!$this.hasClass('video')){
      //$this.siblings().find("div.n_showBigBox").hide();
      showBigimg($this);
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
  //  GLOBAL.cart.input_quantity(this);
  // });

  // $("a.btn_add").on("click",function(){
  //  GLOBAL.cart.add();
  // });

  // $("a.btn_reduce").on("click",function(){
  //  GLOBAL.cart.reduce();
  // });

  // $("#new_addcart").on("click",function(){
  //  GLOBAL.cart.addcart();
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
  $("#js_goodRevieList").on("click","div.js_reviews_img a",function(){
    var options = {
        area: ['810px','490px'],
        offset : [($(window).height()-490)/2 +"px", '50%'],
        //index是用来标记点击图片是同类图片中的第几张
        iframe : {src : $(this).data("uid")+"?index="+$(this).index()}
      }
    GLOBAL.PopObj.iframe(options);
    return false;
  })
  
  //查看视频
  $("#js_goodRevieList").on("click","div.js_reviews_video a",function(){
  
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
      required:jsLg.formMsg.required,
      maxlength: jsLg.formMsg.Enter_at_least
    }
  },
  submitHandler:function(){
    $.post('/'+JS_LANG +'m-inquiry-method-ajax.htm?'+$("#goods_id").val(), $("#InquiryBox").serialize(),function(data) {
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
      }else{
        options.msg = data;
        //options.callBack = function(){$("#refresh-verifycode").trigger('click');}
        GLOBAL.PopObj.alert(options);
      }
      $("#refresh-verifycode").trigger('click');
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
  function ChangeRevie(item,reviewBox,themeString){
    this.item = $(item);
    this.themeStr = themeString;
    this.r_Box = $(reviewBox);
    this.datas = {
      "default" : $.trim(this.r_Box.html()),
      small:"",
      suitable:"",
      large:""
    }
  }

  ChangeRevie.prototype.ini = function(){
    var that = this;
    
    $(that.item).click(function(){

      var flag = this.getAttribute("data-cur"),//判断当前类型是否选择
        type = -1,
        num = this.getAttribute("data-num");

      if(!(num-0)){ 
        return false;
      }

      //如果当前评论不是选择的评论类型,flag = 0,1;0 表示不是，1 表示是的；
      if(flag != 1){
        $.each(that.item, function(index, val) {
           /* iterate through array or object */
           val.setAttribute("data-cur",0);
        });
        $(that.item).find(that.themeStr).each(function(i,v){

          $(v).removeClass('on');
        });

        type = this.getAttribute("data-type");
        type = $.isNumeric(type-0) ? type : -1;

        this.setAttribute("data-cur",1);
        $(this).find(that.themeStr).addClass('on');

      }else{//如果当前评论已经是选择的评论类型，则还原为默认评论
        this.setAttribute("data-cur",0);
        $(this).find(that.themeStr).removeClass('on');
      }
      that.showHtml(type);
      
      return false
    })
  };
  ChangeRevie.prototype.showHtml = function(type){
    var item = "default",htmls;
    var that = this;
    
    switch(type-0){
      case -1:
        item = "default";
        break;
      case 2:
        item = "small";
        break;
      case 0:
        item = "suitable";
        break;
      case 1:
        item = "large";
        break;          
    }

    htmls = $.trim(this.datas[item]);

    //如果以前还没有加载过该数据，就直接发ajax取回数据并存下来
    if(!htmls){
      this.getData(type,function(data){
        that.datas[item] = data; 

        that.r_Box.html(data);
        //GLOBAL.lazyLoad.scrollLazyLoad(that.r_Box.find(".js_lazy"));
      }); 

    }else{
      this.r_Box.html(htmls);
    }
  }

  ChangeRevie.prototype.getData = function(type,callBack){
    var htmls = "";

    //ajax 获取html，并且返回
    this.r_Box.append('<div id="loading"></div>');

    $.ajax({
      url: document.URL,
      type: 'GET',
      data: {itemPropertyIndex: type}

    })
    .done(function(data) {
      htmls = $.trim(data);

      callBack && $.isFunction(callBack) ? callBack(htmls) : "";

    });
  }

  var UserChangeRevie = new ChangeRevie("#js_reviewTheme li","#js_goodRevieList",".js_rateItem");
  UserChangeRevie.ini();
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
})()


  setPositionSaleCookie();//设置推荐位销售cookie

  /*
   * 设置推荐位销售cookie
   *
   * @author      mashanling <msl-138@163.com>
   * @date        2014-03-17 14:34:05
   *
   * @return {void} 无返回值
   */
  function setPositionSaleCookie() {
      var search = location.search;

      if (search && 0 == search.indexOf('?i=')) {
          var match           = search.match(/^\?i=(\d{5}_\d+)$/),//普通
              positionCookie  = $.cookie('position_sale');

          if (!match) {
              match = search.match(/^\?i=(00004&s=\d{5})$/);//专题

              if (match) {
                  match = [null, match[1].replace('&s=', '_')];
              }
          }

          if (match) {
              var positionId  = match[1],
                  tmp         = $('#hidden-goodsId').val() + '_';

              if (!positionCookie) {//格式:goods_id,positionId|...
                  positionCookie = tmp + positionId;
              }
              else if (('|' + positionCookie).indexOf(tmp) > -1) {//多个positionId,取最后一个
                  var arr = positionCookie.split('|');

                  for (var i = 0, len = arr.length; i < len; i++) {

                      if (arr[i].indexOf(tmp) > -1) {
                          arr[i] = tmp + positionId;
                          break;
                      }
                  }

                  positionCookie = arr.join('|');
              }
              else {
                  positionCookie += '|' + tmp + positionId
              }
              $.cookie('position_sale', positionCookie, {
                  expires: 1,
                  path: '/',
                  domain: COOKIESDIAMON
              });
          }
      }
  }//end setPositionSaleCookie

;(function(){
  //多语言商品属性切换
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

	if(!$.trim(this.curSize).length){//如果没有尺寸
		//不显示选择颜色
		$("#js_property_size").closest("li").hide();
		return false;
	}
	
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

    window.location.href ='/'+JS_LANG+'product' + newGoodsId + '.html';
    // for(var i = 0, length1 = this.datas.length; i < length1; i++){
    //   if(this.datas[i].size == curSize && this.datas[i].color == curColor && this.datas[i].isSale){
    //     //console.log(this.datas[i].goodsId);
    //     window.location.href ='/'+JS_LANG+'product' + this.datas[i].goodsId + '.html';
    //   }
    // }
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

			$addCartBtn.attr("gid","newGoodId");

			that.gotoNewPage(newGoodId);
		  }else{
			 //购物车不能购买
			 $addCartBtn.attr("gid","");
			 $SizeWrap.addClass('hl-bg');
			//that.curSize = "";
		  }
      }

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

       $addCartBtn.attr("gid","newGoodId");

       that.gotoNewPage(newGoodId);
      }

    });
  };

  if($(".js_property_secelt_Box").find('.choose_wrap').length){
    new ChangeAttr();
  }

  //预售弹出框
  $("#js_openPop").click(function(){
    GLOBAL.PopObj.openPop({
      offset: [($(window).height() - 210) / 2 + 'px', '50%'],
      page: {
        dom: '#js_popHelp'
      }
    })
  })
})()

/*火鸡快跑的活动下架js注释掉
(function(){
  

  //facebook 
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '1406009852948446',
          xfbml      : true,
          version    : 'v2.1'
        });
    };
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.twttr = (function (d, s, id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src= "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
  }(document, "script", "g_Tweet"));

  twttr.ready(function (twttr) {
    twttr.events.bind(
      'tweet',
      function (event) {
        sharefn($("#hidden-goodsId").val());
      }
    );
   
  });

  var userInfo = {
    islogin : 0,
    team : 0,
    shareNum:0

  };

  $("#js_shareWinBtn").click(function(){
    GLOBAL.PopObj.openPop({page : {dom:"#js_shareWinPop"}});

    $.ajax({
      url: 'm-turkey.html?act=get_user',
      type: 'GET',
      async:false,
      dataType: 'json'
    })
    .done(function(data) {//{"status":1,islogin":1,"team":1,"shareNum":3}
      
      if(data.status){
        userInfo.islogin = data.islogin;
        userInfo.team = data.team;
        userInfo.shareNum = data.shareNum;
        userInfo.game_is_end = data.game_is_end
      }
      
    })
  });

  //Facebook分享
  function shareFaceBook(link){
    

    FB.ui({
          method: 'share',
          name: 'Facebook Dialogs',
          href: link
         
        },function(response) {
          if (response && !response.error_code){//分享成功了
            if(userInfo.islogin != 0){
              sharefn($("#hidden-goodsId").val());
            }
            
          } 
       });
  }

  function sharefn(goodsid){
    if(userInfo.game_is_end == 1){//如果是等待时间直接退出
      return false;
    }

    if(userInfo.shareNum < 5 ){//如果分享次数没有超过五次
      $.get('m-turkey.html?act=start_game',{goodsid:goodsid}, function(data) {//{status:1,isend:1,helpnum:20,shareNum:2}
        

        userInfo.shareNum = data.shareNum;

        if (data.status==1) {

          

          if(data.isend == 1){
            
            if(data.win_team == 1){
              GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_gameover_turkey_pop"}});
            }else if(data.win_team == 2){
              GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_gameover_tweedy_pop"}});
            }
          }else{
            $("strong.js_helpnum").text(data.helpnum);

            if($.trim(data.code).length){//如果获取了coupon码
              $(".js_codeCouponWarp").show();
              $(".js_codeCouponWarp").find("strong.js_codeCoupon").text(data.code);
              $(".js_codeCouponWarp").find("strong.js_codeCouponoff").text(data.off+"%"+" OFF");
            }else{
              $(".js_codeCouponWarp").hide();
            }


            if(userInfo.team == 1){
              GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_shareOk_turkey_pop"}});

            }else if(userInfo.team == 2){
              GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_shareOk_tweedy_pop"}});
            }
          
          }
          
        }else{
          return false;
        }

      },"json");
    }else{
      
      if(userInfo.team == 1){
        GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_maxShare_turkey"}});

      }else if(userInfo.team == 2){
        GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_maxShare_turkey"}});
      }
      //alert("小样你分享的次数超过5次了")
    }
  }

  $("#js_shareWinPop").on("click","a.js_shareFaceBook",function(){
    shareFaceBook(window.location.href);
  });

  
})($);
*/