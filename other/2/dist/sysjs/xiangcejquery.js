// JavaScript Document
jQuery.fn.loadthumb = function(options) {
	options = $.extend({
		 src : ""
	},options);
	var _self = this;
	_self.hide();
	var img = new Image();
	$(img).load(function(){
		_self.attr("src", options.src);
		_self.show();//_self.fadeIn("slow");
	}).attr("src", options.src);  //.atte("src",options.src)要放在load后面，
	return _self;
}

$(function(){


if($("#scrollable").find("li").length>4){
    $("#scrollable .items").jCarouselLite({
        btnNext: ".xiang_next",
        btnPrev: ".xiang_prev",
        vertical:true,
        speed: 100,
        visible:4
    });
}


  $(".scrollableDiv a").live("mouseover",function(){
		var src = $(this).find("img").attr("imgb");
		var bigimgSrc = $(this).find("img").attr("bigimg");
		$(this).parents("#myImagesSlideBox").find(".myImgs").loadthumb({src:src}).attr("bigimg",bigimgSrc);
		$(".xx350 img").attr("jqimg",bigimgSrc);
		$("#gallery_url").attr("relurl",($("#gallery_url").attr("url")+bigimgSrc)); //点击放大
		$(this).addClass("active").parent().siblings().find("a").removeClass("active");
		return false;
  });
  //$(".scrollableDiv a:nth-child(1)").trigger("mouseover");
  
  $("#gallery_url").click(function(){
	  url = $(this).attr("relurl");
	 // alert(url);
	  window.opener=null;
	  window.open(url,'_blank','');					   
	});
})
