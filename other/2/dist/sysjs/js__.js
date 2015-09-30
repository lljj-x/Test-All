$(document).ready(function(){
	
	
	//服务人员滚动
	$("#ScrollMe").jCarouselLite({
		vertical: true,
		auto: 3000,
		visible: 1,
        scroll: 1,
		mouseWheel: true,
		speed: 800
    });
	
	//添加书签
	$('#addbookmark').click(function(){
		var weburl = $(this).attr('href');
		ymPrompt.win({message:weburl,width:870,height:450,title:'To Dresslily.com Add to Bookmarks',handler:null,maxBtn:true,minBtn:true,iframe:true});									 
	});
	
	
	$('#checkorderbtn').click(function(){
		 ymPrompt.setDefaultCfg({okTxt:' OK ',cancelTxt:' Cancel ',closeTxt:'Close',minTxt:'Minimize',maxTxt:'Maximize'});
         ymPrompt.confirmInfo({icoCls:'',msgCls:'confirm',message:"Please enter your order<br><input type='text' id='myInput' onfocus='this.select()' />",title:'Query Order',height:150,handler:getInput,autoClose:false});	
	});
	
	$(".dalei_div_menu").mouseover(function(){
		$('#dalei_menu').show();
	});
	
	$(".dalei_div_menu").mouseout(function(){
		$('#dalei_menu').hide();
	});
	
	
	//订阅邮件
	$('#subscribe').click(function(){
		var firstname = $('#sub_firstname').val();					   
		var email     = $('#sub_email').val();	
		if (!firstname){ alert('Please enter your first name!'); $('#sub_firstname').focus(); return false; }
		if (firstname.length > 25){ alert('First name please do not be too long!'); $('#sub_firstname').focus(); return false; }
		if (!email){alert('please enter a Email !');  $('#sub_email').focus();return false;}
		if (!checkmail(email)){alert('Please  a valid e-mail!');  $('#sub_email').focus();return false;}
		
		$.ajax({
			type: "GET",
			url: 'index.php?m=users&a=email_list&job=add&email=' + email +'&firstname='+firstname,
			success: function(msg){ alert(msg); } 
		});
	});

});


function checkmail(Email)
{
    var pattern=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    flag=pattern.test(Email);
    if (flag){
		return true;
	}else{
        return false;
    }
}







function setTab(m,n){
 var tli=document.getElementById("menu"+m).getElementsByTagName("li");
 var mli=document.getElementById("main"+m).getElementsByTagName("ul");
 for(i=0;i<tli.length;i++){
  //tli[i].className=i==n?str1[n]:str2[n];
  if (i == n ) {
	  tli[i].className = 'pr_'+(n+1)+'_2';
	}else{
	  tli[i].className = 'pr_'+(i+1)+'_1';
	}
  mli[i].style.display=i==n?"block":"none";
 }
};


function getInput(tp){
	if(tp!='ok') return ymPrompt.close();
	var v=$('#myInput').val();
	if(v=='' || v.length < 17 || v.length > 18)
		alert('Please enter your correct order number!');
	else{
		window.open('/m-users-a-queryorder-n-'+v+'.htm');
		ymPrompt.close();
	}
};

function talkall(st){
	ymPrompt.win({message:'online.html',width:270,height:155,title:'Needs Help?',handler:null,maxBtn:true,minBtn:true,iframe:true}); 
};

//显示自定义框
function show_custom(key){
	///alert($(".spec_"+key).val());
	if ($(".spec_"+key).val() == "custom made"){
		$("#custom"+key).show();
	}else{
		$("#custom"+key).hide();
	};
};
//显示复选自定义框
function show_check_custom(key){
	///alert($(".spec_"+key).val());
	if ($("#customxx"+key).attr("checked")){
		$("#custom"+key).show();
	}else{
		$("#custom"+key).hide();
	};
};



function show_my_shop_price(selectid){
	if (selectid!='')selectid +=' ';
	if ($.cookie('bizhong') == null){
		$.cookie('bizhong', 'USD', {expires: 7, path: '/'});
	} 
	
   $(selectid+".my_shop_price").each(function(i,o) {
		yuanshi = $(this).attr('orgp');
		$(o).html((parseFloat(my_array[$.cookie('bizhong')]) * parseFloat(yuanshi)).toFixed(2)); 
	});
$(".bizhong").html($.cookie('bizhong'));
$("#cur_jiancheng").html($.cookie('bizhong'));
};

//改变货币种类
function change_houbi(obj){
	$('.tab_right1').attr('style','POSITION: absolute; TOP: -2400px;');
	var bizhong = $(obj).attr('tref');
	$("#cur_jiancheng").html(bizhong);
	$.cookie('bizhong',bizhong, {expires: 7, path: '/'});          
	$(".bizhong").html(bizhong);
	   $(".my_shop_price").each(function(i,o){
			yuanshi = $(this).attr('orgp');
			$(o).html((parseFloat(my_array[bizhong]) * parseFloat(yuanshi)).toFixed(2)); 
	   });
};

//更新购物车数量
function cart_items(){
   $("#cart_items").load("/fun/?act=cart_item&noscript=1");
};

//搜索
function kw_onfocus(obj){
	kw = $.trim($(obj).val());
	if (kw == 'Products keyword'){
		$(obj).val('');
	}
	$(obj).attr('style','color:#000000');
};

function seach_submit(){
	var reg = /\s/g;     
	//var ss = kw.replace(reg, "");
	kw  = encodeURIComponent($.trim($("#k2").val()).replace(reg, "-"));
	category = $.trim($("#category").val());
	if ((kw == '') || (kw == 'Products-keyword')){
		alert('Please enter keywords!');
		$("#k2").val('');						   
		$("#k2").focus();
		return false;
	}else{
		kw = kw.replace('%20','-');
		if (category == '0'){
			window.location.href='/wholesale/'+kw+'.html';
		}else{
			window.location.href='/wholesale/'+kw+'/'+category+'.html';
		}
	}
};

//添加商品到购物车
function addcart(obj){
	var gid = $(obj).attr('gid');
	var num = $(obj).attr('num');
		num = (num == undefined)?1:num;
	var reflash = $(obj).attr('ref');
		reflash = (reflash == undefined)?0:reflash;
		cartval =  '';
	var attrchage = $(obj).attr('attrchage');
		attrchage = (attrchage == undefined)?'':attrchage;
	var geshuxing = '';	
	var error_msg = '';
	var is_kong_msg = '';
	var dijige = '';
	
	var temparr = new Array();
	
	if(attrchage.indexOf('|')>0){
		attrchage = attrchage.split('|');
		$.each(attrchage,function(i,v){
			temparr[i] = new Array();
			var type = $('.spec_'+v).attr('type');	
			var lab_name = $('.spec_'+v).attr('lab_name');	
			switch (type){
				   case 'select-one':
					   temparr[i] = $('.spec_'+v).val();
					   if (temparr[i] == "") {is_kong_msg = i+'. Please select '+lab_name+'!\n'; if (dijige==''){dijige = v;}}
					   if (temparr[i] == "custom made"){							   
						   var custom_var = encodeURIComponent($('#custom'+v).val());
						   var duixiang = temparr[i] +" "+$('#custom'+v).attr("custom_name");
						   error_msg = check_values(custom_var,error_msg,duixiang);
						   temparr[i] = duixiang+":"+custom_var;
					   }
				   case 'checkbox':
						$('.spec_'+v+':checked').each(function(j){
							temparr[i][j] = $(this).val();
							if (temparr[i][j] == "") {is_kong_msg = i+'.  Please select '+lab_name+'!\n';}
							   if (temparr[i][j] == "custom made"){
								   var custom_var = encodeURIComponent($('#custom'+v).val());
								   var duixiang = temparr[i][j] +" "+$('#custom'+v).attr("custom_name");
								   error_msg = check_values(custom_var,error_msg,duixiang);
								   temparr[i][j] = duixiang +":"+custom_var;
							   }
						});
			}
		});
	}else{
		if (attrchage!=''){
			dijige = attrchage;
			temparr[1] = new Array();
			var type = $('.spec_'+attrchage).attr('type');
			var lab_name = $('.spec_'+attrchage).attr('lab_name');	
			switch (type){
				   case 'select-one':
					   temparr[1] = $('.spec_'+attrchage).val();
					   if (temparr[1] == "") {is_kong_msg = '   Please select '+lab_name+'!\n';}
					   if (temparr[1] == "custom made"){
						   var custom_var = encodeURIComponent($('#custom'+attrchage).val());
						   var duixiang = temparr[1] +" "+$('#custom'+attrchage).attr("custom_name");
						   error_msg = check_values(custom_var,error_msg,duixiang);
						   temparr[1] = duixiang +":"+ custom_var;
					   }
				   case 'checkbox':
						$('.spec_'+attrchage+':checked').each(function(j){
							temparr[1][j] = $(this).val();
							if (temparr[1][j] == "") {is_kong_msg = '   Please select '+lab_name+'!\n';}
							   if (temparr[1][j] == "custom made"){
								   var custom_var = encodeURIComponent($('#custom'+attrchage).val());
								   var duixiang = temparr[1][j] +" "+$('#custom'+attrchage).attr("custom_name");
								   error_msg = check_values(custom_var,error_msg,duixiang);
								   temparr[1][j] = duixiang+":"+custom_var;
							   }
						});
			}
		}else{
			temparr[1] =  $(this).attr('atrid');
			atrrid = $(this).attr('atrid');
		}
	}
	
	if (is_kong_msg!="") {alert('Can not be submitted for the following reasons:\n\n'+is_kong_msg);$('.spec_'+dijige).focus();return false;}
	
	cartval = temparr;
	target_div = $(this).attr('atrid')!=undefined?"#add_cart_msg"+gid+atrrid:"#add_cart_msg"+gid;
	if (error_msg !=''){ alert(error_msg);return false;}
	$.ajax({
		type: "POST",
		url: "/m-flow-a-add_to_cart.htm",
		data: "goods_id="+gid+"&number="+num+"&spec="+cartval+"&attrchage="+attrchage,
		dataType:"text",
		beforeSend:function(){$(target_div).html("<img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");}, 
		success: function(msg){
			if (msg.indexOf('Added To Cart')>0){  //当添加成功的时候执行并分解 1||Added To Cart
				var mag_arr = msg.split('||');
					cartnum = parseInt(mag_arr[0]);
				$(".all_red_cart_items").each(function(){$(this).html(cartnum);}); //刷新每一个
				
				
				$(target_div).html(mag_arr[1]+'<br><a href="/m-flow-a-cart.htm" class="view_cart"> Cart & Checkout <span class="all_red_cart_items">'+cartnum+'</span>items(s)</a>');
				if (reflash == "1" ) re_load('/m-flow-a-cart.htm'); 
				cart_items();
			}else{
			   $(target_div).html(msg);
			}
		}
	}); 
};


//刷新购物车中商品数量
//检查自定义属性是否填写和是否超长。
function check_values(vals,error_msg,duixiang){
	if (vals == ''){
	   error_msg += duixiang + ' can not be blank!\n';
	}else if (vals.length > 120){
	   error_msg += duixiang + ' for far too long!\n';
	}
	 return error_msg;
};


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
	if (!num) return false;
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
};

function list_load(page_url,tobj,obj){
	$.ajax({
		type: "GET",
		url: page_url,
		beforeSend:function(){$(tobj).html("<img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
		success: function(msg){
			if (msg=='Deleted'){
				$(obj).hide("slow");
				//$(obj).animate({opacity:"toggle"},"slow");
				//$(obj).remove("slow");
				re_load('/m-flow-a-cart.htm');
			}
			 $(tobj).html(msg);
		} 
	});
};


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
				$("#unit_price2").html(uprice); //附值新一级数量价格
			}
		});
		
		$("#input_quantity").val(shur_num);
		$("#span_quantity").html(shur_num);
		$("#total_sub_price").html((shur_num*uprice).toFixed(2));
		$(".add_cart_button").attr('num',shur_num);
		
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
				$("#unit_price2").html(uprice); //附值新一级数量价格
			}
		});
		
		$("#input_quantity").val(shur_num);
		$("#span_quantity").html(shur_num);
		$("#total_sub_price").html((shur_num*uprice).toFixed(2));
		$(".add_cart_button").attr('num',shur_num);
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
				$("#unit_price2").html(uprice); //附值新一级数量价格
			}
		});
		
		$("#input_quantity").val(shur_num);
		$("#span_quantity").html(shur_num);
		$("#total_sub_price").html((shur_num*uprice).toFixed(2));
		$(".add_cart_button").attr('num',shur_num);
	}
});



