$(document).ready(function(){
    $("a").bind("focus",function(){ if(this.blur){ this.blur(); }});
   show_my_shop_price('');
   
   function show_my_shop_price(selectid){
		var mypriceArr = new Array();
		if (selectid!='')selectid +=' ';
		$.cookie('mypriceArr',null,{expires: 7, path: '/'}) ;
		if ($.cookie('mypriceArr') == null){
		   $(selectid+".my_shop_price").each(function(i,o){ 
				mypriceArr[i] = $(o).html();
			});
			$.cookie('mypriceArr', mypriceArr, {expires: 7, path: '/'});  
		}
		
		if ($.cookie('bizhong') == null){$.cookie('bizhong', 'USD', {expires: 7, path: '/'});} 	
	   $("#currency").val($.cookie('bizhong')); //选中
		
	   if ($.cookie('mypriceArr') != null){
			mypriceArr = $.cookie('mypriceArr').split(",");
	   }
	   $(selectid+".my_shop_price").each(function(i,o) {
			$(o).html((parseFloat(my_array[$.cookie('bizhong')]) * parseFloat(mypriceArr[i])).toFixed(2)); 
		});
   }
   
	$(".bizhong").html($.cookie('bizhong'));	
    $("#currency").change(function(){	
	   if ($.cookie('mypriceArr') != null){
			mypriceArr = $.cookie('mypriceArr').split(",");
	   }
	   $(".my_shop_price").each(function(i,o){ 
			$(o).html((parseFloat(my_array[$("#currency").val()]) * parseFloat(mypriceArr[i])).toFixed(2)); 
		}); 
		
		$.cookie('bizhong', $(this).val(), {expires: 7, path: '/'});          
		$(".bizhong").html($(this).val());
	});
	

    //搜索
	$("#k2").focus(function(){
		$(this).attr('style','color:#000000');
		$(this).val('');
	})
	
	$("#topSearch").click(function(){
		kw = $.trim($("#k2").val());
		if ((kw == '') || (kw == 'Products keyword')){
			alert('Please enter keywords!');
			$("#k2").val('');						   
			$("#k2").focus();
			return false;
		}
	})
	
	//前台产品排序
	$("#porder").change(function (){
	   var thisHREF = document.location.href; 
	   var odr = $("#porder").val();
	   var arr = thisHREF.split("/");
	   var thisHPage = arr[ arr.length-1 ]; 
	   var pagearr = thisHPage.split("-");
	   pagearr[pagearr.length-3] = odr;
	   $.cookie('porder', odr, {expires: 7, path: '/'}); 
	   window.location.href = pagearr.join("-");
	   //alert(pagearr.join("-"));
	})
	
	if ($.cookie('porder') != null){
		   $("#porder").val($.cookie('porder'));
		   $("#smoothmenu a").each(function(){
			   url = $(this).attr('href');
			   var urlarr = url.split("-");
			   urlarr[urlarr.length-3] = $.cookie('porder');
			   xhref = urlarr.join("-");
			   $(this).attr('href',xhref);
				//alert(xhref);
			});
		   
		   $("#hotproduct a").each(function(){
			   url = $(this).attr('href');
			   var urlarr = url.split("-");
			   urlarr[urlarr.length-3] = $.cookie('porder');
			   xhref = urlarr.join("-");
			   $(this).attr('href',xhref);
				//alert(xhref);
			});
		   
		   
		   $("#topmenulink a").each(function(){
			   url = $(this).attr('href');
				 if (url.indexOf('-')>0){
					   var urlarr = url.split("-");
					   urlarr[urlarr.length-3] = $.cookie('porder');
					   xhref = urlarr.join("-");
					   $(this).attr('href',xhref);
				 }
			});
    }
	
	
	
	//产品排列按钮样式
    $("#list_head_rs").click(function(){
		$(this).attr('class','list_head_rs');
		$("#list_head_cs").attr('class','list_head_cs_s');
		list_grid('l');
	 });
	
    $("#list_head_cs").click(function(){
	    $(this).attr('class','list_head_cs');
	    $("#list_head_rs").attr('class','list_head_rs_s');
		list_grid('g');
	 });
	
    if($.cookie('layout') == 'g'){
			$("#list_head_rs").attr('class','list_head_rs_s');
			$("#list_head_cs").attr('class','list_head_cs');
			
		}else{
			$("#list_head_rs").attr('class','list_head_rs');
			$("#list_head_cs").attr('class','list_head_cs_s');
			
		}
		
		
	if ($.cookie('layout') != null){
		//分类连接
		var lay;
			if ($.cookie('layout') == 'g'){
				lay = 24;
			}else{
				lay = 20;
			}
		
	   $("#smoothmenu a").each(function(){
			url = $(this).attr('href');
			var urlarr = url.split("-");
			var str_Arr = urlarr[urlarr.length-3];
			var len = str_Arr.length;
			str_Arr =  str_Arr.substr(1,len);
			urlarr[urlarr.length-3] = $.cookie('layout') + str_Arr;
			urlarr[urlarr.length-2] = lay;
		  // $.cookie('porder', urlarr[urlarr.length-3], {expires: 7, path: '/'}); 
			 xhref = urlarr.join("-");
			$(this).attr('href',xhref);
			///alert(xhref);
		});
	   
	   $("#hotproduct a").each(function(){
			url = $(this).attr('href');
			var urlarr = url.split("-");
			var str_Arr = urlarr[urlarr.length-3];
			var len = str_Arr.length;
			str_Arr =  str_Arr.substr(1,len);
			urlarr[urlarr.length-3] = $.cookie('layout') + str_Arr;
			urlarr[urlarr.length-2] = lay;
		  // $.cookie('porder', urlarr[urlarr.length-3], {expires: 7, path: '/'}); 
			xhref = urlarr.join("-");
			$(this).attr('href',xhref);
			///alert(xhref);
		});
	   
	   
	   
	   //改变导航连接
	   $("#topmenulink a").each(function(){
			url = $(this).attr('href');
		 if (url.indexOf('-')>0){
			var urlarr = url.split("-");
			var str_Arr = urlarr[urlarr.length-3];
			var len = str_Arr.length;
			str_Arr =  str_Arr.substr(1,len);
			urlarr[urlarr.length-3] = $.cookie('layout') + str_Arr;
			urlarr[urlarr.length-2] = lay;
		  // $.cookie('porder', urlarr[urlarr.length-3], {expires: 7, path: '/'}); 
			xhref = urlarr.join("-");
			$(this).attr('href',xhref);
		 }
		});
	   
	   
	}
	
	
	
	//记住每页个数
	$("#pager a").live("click",function(){
		var num = $(this).html();
		var thisHREF = document.location.href; 
		var arr = thisHREF.split("/");
		var thisHPage = arr[ arr.length-1 ]; 
		var pagearr = thisHPage.split("-");
		pagearr[pagearr.length-2] = num;
		$.cookie('page_num', num, {expires: 7, path: '/'}); 
		window.location.href = pagearr.join("-");
	});
		
		if ($.cookie('page_num') != null){
			//分类连接
		   $("#smoothmenu a").each(function(){
				url = $(this).attr('href');
				var urlarr = url.split("-");
				var str_Arr = urlarr[urlarr.length-3];
				var len = str_Arr.length;
				str_Arr =  str_Arr.substr(1,len);
				urlarr[urlarr.length-2] = $.cookie('page_num');
				xhref = urlarr.join("-");
				$(this).attr('href',xhref);
			});

		   $("#hotproduct a").each(function(){
				url = $(this).attr('href');
				var urlarr = url.split("-");
				var str_Arr = urlarr[urlarr.length-3];
				var len = str_Arr.length;
				str_Arr =  str_Arr.substr(1,len);
				urlarr[urlarr.length-2] = $.cookie('page_num');
				xhref = urlarr.join("-");
				$(this).attr('href',xhref);
			});


		   //改变导航连接
		   $("#topmenulink a").each(function(){
				url = $(this).attr('href');
				 if (url.indexOf('-')>0){
					var urlarr = url.split("-");
					var str_Arr = urlarr[urlarr.length-3];
					var len = str_Arr.length;
					str_Arr =  str_Arr.substr(1,len);
					urlarr[urlarr.length-2] = $.cookie('page_num');
					xhref = urlarr.join("-");
					$(this).attr('href',xhref);
				 }
			});
		}
	
	//添加商品到购物车
	$("#new_addcart").live('click',function(){
		var gid = $(this).attr('gid');
		var num = $(this).attr('num');
		    num = (num == undefined)?1:num;
		var reflash = $(this).attr('ref');
		    reflash = (reflash == undefined)?0:reflash;
		$.ajax({
			type: "POST",
			url: "/m-flow-a-add_to_cart.htm",
			data: "goods_id="+gid+"&number="+num,
			dataType:"text",
			beforeSend:function(){$("#add_cart_msg"+gid).html("<img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
			success: function(msg){
				$("#add_cart_msg"+gid).html(msg);
				if (msg=='Added To Cart'){
					if (reflash == "1" ) re_load('/m-flow-a-cart.htm'); 
					cart_items();
				}
			}
		}); 
	});
	
	//刷新购物车中商品数量
	function cart_items(){
	   $("#cart_items").load("/fun/?act=cart_item&noscript=1");
	}
	
	
	//删除购物车
	$('#del_action').live("click",function (){
		delatr = ($(this).attr('delatr')!=undefined)?$(this).attr('delatr'):'';  //删除连接
		gid    = ($(this).attr('gid')!=undefined)?$(this).attr('gid'):'';
		delmsg = ($(this).attr('delmsg')!=undefined)?$(this).attr('delmsg'):'Are you sure that you want to perform this action?'; //确认信息
		if ((confirm(delmsg)) && (delatr!='')){
			list_load(delatr,"#del_ajax_msg"+gid,"#cart"+gid);
			cart_items();
		}
	});
	
	//从购物车放入收藏
	$('#add_favour_msg').live("click",function (){
		delatr = ($(this).attr('delatr')!=undefined)?$(this).attr('delatr'):'';  //删除连接
		gid    = ($(this).attr('gid')!=undefined)?$(this).attr('gid'):'';
		delmsg = ($(this).attr('delmsg')!=undefined)?$(this).attr('delmsg'):'Are you sure that you want to perform this action?'; //确认信息
		if ((confirm(delmsg)) && (delatr!='')){
				$.ajax({
					type: "GET",
					url: delatr,
					beforeSend:function(){$("#del_ajax_msg"+gid).html("<img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
					success: function(msg){
						re_load('/m-flow-a-cart.htm');
						cart_items();
					} 
				});
		}
	});
	
	
	//更新购物车
	$(".goods_number").livequery('keyup',function (){
		num = $(this).val();
		rid = ($(this).attr('rid')!=undefined)?$(this).attr('rid'):'';
		$.ajax({
			type: "POST",
			url: '/m-flow-a-update_cart.htm',
			data:'rid='+rid+'&goods_number='+num,
			beforeSend:function(){$("#num"+rid).html("<img src='/temp/skin1/images/990000_bai.gif'>");}, 
			success: function(msg){
				if (msg=='Updated'){
					$("#num"+rid).html('');
					re_load('/m-flow-a-cart.htm');
				}else{
				    $("#num"+rid).html(msg);
				}
			} 
		});
	});
	
	//根据国家查看运费
	$("#selcountries").livequery('change',function (){   
			var country = $("#selcountries").val();
			if (country == '') return false;
			$.ajax({
				type: "POST",
				url: 'm-flow-a-cart.htm?country='+country,
				beforeSend:function(){$("#load_ajax_msg").html(" <img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
				success: function(msg){
				$("#load_ajax_msg").html('');
					var stext = $(msg).find('#shipajax').html();
					$('#shipajax').html(stext);
					show_my_shop_price('#shipajax');
					$(".bizhong").html($.cookie('bizhong'));
				} 
			});
     });

	function re_load(page_url){
		$.ajax({
			type: "GET",
			url: page_url,
			success: function(msg){
				var stext = $(msg).find('#cart_list').html();
				$('#cart_list').html(stext);
				show_my_shop_price('');
				$(".bizhong").html($.cookie('bizhong'));
			}
		});
	}
	
	function list_load(page_url,tobj,obj){
		$.ajax({
			type: "GET",
			url: page_url,
			beforeSend:function(){$(tobj).html("<img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
			success: function(msg){
				if (msg=='Deleted'){
					$(obj).hide("slow");
					//$(obj).animate({opacity:"toggle"},"slow");
					//$(obj).remove();
					re_load('/m-flow-a-cart.htm');
				}
				 $(tobj).html(msg);
			} 
		});
	}
	
	
	//详细页面商品数量 减 每次减1
	$("#minus_op").click(function(){
		shur_num = parseInt($("#input_quantity").val());
		if (shur_num > 1) {
			shur_num --;
			$(".plnum").each(function(){
				cur_num = $(this).html();
				cur_num = parseInt(cur_num.replace(/[\u4e00-\u9fa5]/g,""));
				if (shur_num >= cur_num ){
					pk     = parseFloat($(this).attr('atrp'));
					uprice = $("#pk"+pk).html();
				    $("#unit_price").html(uprice); //附值新一级数量价格
				}
			});
			
			$("#input_quantity").val(shur_num);
			$("#span_quantity").html(shur_num);
			$("#total_sub_price").html((shur_num*uprice).toFixed(2));
			$("#new_addcart").attr('num',shur_num);
			
		}
		
	});
	
	//详细页面商品数量 加 每次加1
	$("#plus_op").click(function(){
		shur_num   = parseInt($("#input_quantity").val());
		uprice     = parseFloat($("#unit_price").html());
		
		if (shur_num < 9999){
			shur_num ++;
			$(".plnum").each(function(){
				cur_num = $(this).html();
				cur_num = parseInt(cur_num.replace(/[\u4e00-\u9fa5]/g,""));
				if (shur_num >= cur_num ){
					pk     = parseFloat($(this).attr('atrp'));
					uprice = $("#pk"+pk).html();
				    $("#unit_price").html(uprice); //附值新一级数量价格
				}
			});
			
			$("#input_quantity").val(shur_num);
			$("#span_quantity").html(shur_num);
			$("#total_sub_price").html((shur_num*uprice).toFixed(2));
			$("#new_addcart").attr('num',shur_num);
		}
	});


	//详细页面商品数量 直接填写
	$("#input_quantity").val(1); //刷新页面时直接设置为1
	$("#input_quantity").blur(function(){
		shur_num   = parseInt($("#input_quantity").val());
		uprice     = parseFloat($("#unit_price").html());
		
		if (shur_num <= 9999){
			$(".plnum").each(function(){
				cur_num = $(this).html();
				cur_num = parseInt(cur_num.replace(/[\u4e00-\u9fa5]/g,""));
				if (shur_num >= cur_num ){
					pk     = parseFloat($(this).attr('atrp'));
					uprice = $("#pk"+pk).html();
				    $("#unit_price").html(uprice); //附值新一级数量价格
				}
			});
			
			$("#input_quantity").val(shur_num);
			$("#span_quantity").html(shur_num);
			$("#total_sub_price").html((shur_num*uprice).toFixed(2));
			$("#new_addcart").attr('num',shur_num);
		}
	});
     


});

    





function list_grid(v){
	if (v == 'g'){
	   lay = 24;
	}else{
	   lay = 20;
		}
		
    var thisHREF = document.location.href; 
	var arr = thisHREF.split("/");
	var thisHPage = arr[ arr.length-1 ]; 
	var pagearr = thisHPage.split("-");
	var str_Arr = pagearr[pagearr.length-3];
	var len = str_Arr.length;
	str_Arr =  str_Arr.substr(1,len);
	pagearr[pagearr.length-3] = v + str_Arr;
	 pagearr[pagearr.length-2] = lay;
	$.cookie('layout', v, {expires: 7, path: '/'}); 
	$.cookie('porder', pagearr[pagearr.length-3], {expires: 7, path: '/'}); 
	$.cookie('page_num', lay ,{expires: 7, path: '/'});     //默认值
	//alert(pagearr[pagearr.length-3]);
	window.location.href = pagearr.join("-");
}









function setTab(m,n){
 var tli=document.getElementById("menu"+m).getElementsByTagName("li");
 var mli=document.getElementById("main"+m).getElementsByTagName("ul");
 for(i=0;i<tli.length;i++){
  //tli[i].className=i==n?str1[n]:str2[n];
  if (i == n ) {
	  tli[i].className = 'prod_'+(n+1)+'_1';
	}else{
	  tli[i].className = 'prod_'+(i+1)+'_2';
	}
  mli[i].style.display=i==n?"block":"none";
 }
}

