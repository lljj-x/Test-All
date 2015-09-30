$(".prev_goods,.next_goods").click(function(){
	var layer_i = layer.load(0);
	window.location.href=$(this).attr("href");
});

$("#js_gf_outStock").click(function(event) {
	/* Act on the event */
	var url = $(this).prop('href');
	window.top.location.href = url;
	return false;
});

$(".albumList").mCustomScrollbar({
	horizontalScroll:true,
	theme:"dark"
});

$("div.albumList").on('click', 'li', function(event) {
	/* Act on the event */
    var $this = $(this),
    	$imgBox = $("#js_gf_img"),
    	layer_i;

    if($this.hasClass('video')){
    	$imgBox.html('<iframe width="430" height="430" src="//www.youtube.com/embed/'+$this.find('img').data("bigsrc")+'" frameborder="0" allowfullscreen></iframe>');                    	
    }else{
    	layer_i = layer.load(0);

    	var img = new Image();
    	img.onload = function(){
    		$imgBox.html('<img src="'+img.src+'" />');
    		layer.close(layer_i);
    	}
    	img.src = $this.find('img').data("bigsrc");
    }
	return false;
});
function setNewUrl(goodsId){
	var url = window.location.href;
	var first = url.search(/goods_id=/)-0+"goods_id=".length;
	var last = url.search(/&ids=/);

	var newUrl = url.replace(new RegExp(url.slice(first,last)),goodsId);

	window.location.href=newUrl
}
$(".js_property_secelt").children('.card_attr').on("click",function(){
	 //GLOBAL.cart.change_same_goods(this);
	var goods_id = parseInt(this.value);
	//setNewUrl(goods_id);

    if(goods_id > 0) {
        setNewUrl(goods_id);
    }
});

$(".js_property_secelt").on("change",function(){
	 //GLOBAL.cart.change_same_goods(this);
	var goods_id = parseInt(this.value);
	//setNewUrl(goods_id);

    if(goods_id > 0) {
        setNewUrl(goods_id);
    }
});

$("#js_input_quantity").on("keyup",function(){
	GLOBAL.cart.input_quantity(this);
});

$("a.btn_add").on("click",function(){
	GLOBAL.cart.add();
});

$("a.btn_reduce").on("click",function(){
	GLOBAL.cart.reduce();
});
//添加到购物车
$("#new_addcart").click(function(){
	GLOBAL.cart.addcart(this,0,function(){});
});

$(".addToFavBtn").click(function(event) {
	/* Act on the event */
	var $this = $(this);
	var options = {
		url:$this.attr("data-src"),
		rebackPage:window.top.location.href,
		top:$this.find("i").offset().top,
		left:$this.find("i").offset().left
	};
	GLOBAL.login.isLogin(GLOBAL.addTofavorite,options);
	$this.addClass("addToFavBtnOn");
	return false;
});

$(".gotoFullDetail").click(function(event) {
	/* Act on the event */
	window.top.location.href = DOMAIN + $(this).attr("data-url");
});


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

    var url = window.location.href;
	var first = url.search(/goods_id=/)-0+"goods_id=".length;
	var last = url.search(/&ids=/);

	var newUrl = url.replace(new RegExp(url.slice(first,last)),newGoodsId);

	window.location.href=newUrl
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

  if($(".gf_property").find('.choose_wrap').length){
    new ChangeAttr();
  }

  
})()