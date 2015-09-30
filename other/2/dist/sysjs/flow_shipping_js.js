$(document).ready(function(){
	$('#showyiwen').live('mouseover',function(){$('#yiwen').show();});
	$('#showyiwen').live('mouseout',function(){$('#yiwen').hide();});
	$('#insurance_checked').click(function(){
		if ($("#insurance_checked").attr("checked") == true)
			$("#insurancehtml").css("display","block");
		else
			$("#insurancehtml").css("display","none");
	});
	//gift cart select change
	$("#gift_card_select").live("change",function(){
		select_gift_card( this.value, $('#price_total').attr('orgp') );
	});
	function numbers(obj){obj.value=obj.value.replace(/[^\d]/g,'');}	
    
	$("#point_ipt").live('keyup', function(){
		//积分
		numbers(this);
        $('#hidden-point').val(this.value);
		//caculate_point();	
		jisuan_total();
	});	
	$("#sc_sign_r").live('click',function(){
		if( $("#sc_reg_r").hasClass('curtab')){
			$("#sc_sign_r").addClass( 'curtab' );
			$("#sc_reg_r").removeClass( 'curtab' );
		}
		$("#sc_sign").show();
		$("#sc_reg").hide();
		$(".messages").hide();

	});
	$("#sc_reg_r").live('click',function(){
		if($("#sc_sign_r").hasClass('curtab')){
			$("#sc_reg_r").addClass( 'curtab' );
			$("#sc_sign_r").removeClass( 'curtab' );
		}
		$("#sc_reg").show();
		$("#sc_sign").hide();
		$(".messages").hide();

	});	
	function caculate_point(){
		var el = $('#point_ipt'), point_money = 0, msg, point;
		var bizhong = $.cookie('bizhong');
		if (typeof(min_use_point) == 'number') {
			point = el.val();
            
			if (point == ''){
				$('#point_tips').html('');
				return point_money;		
			}		
			
			point = parseInt(point);
			isNaN(point) && (point = 0);
			el.val(point);
			
			var use_point_max = parseInt($('#use_point_max').text());
			
			if (point > use_point_max) {
                point = use_point_max;
				$('#point_ipt, #hidden-point').val(use_point_max);
			}
            
			point_money = (parseFloat(point) * point_rate).toFixed(2);
			var currency_sign = huobi_short_sign($.cookie('bizhong'));
			var price = (parseFloat(my_array[bizhong]) * parseFloat(point_money)).toFixed(2);
            msg = ' - <span class="my_shop_price" orgp='+point_money+' >'+currency_sign+price+ '</span><span class="bizhong">'+bizhong+'</span>';
            $('#point_tips').html(msg);
		}
		
        return point_money;
	}
			
	jisuan_total();
	
	$(".shipping_method").click(function(){
		shipping_id = $(this).val();
		yunfei      = $("#sm"+shipping_id).html();
		freeyunfei  = $("#freesm"+shipping_id).html();
		$("#shipping_sub_total").html(yunfei);
		$("#free_shipping_sub_total").html(freeyunfei);

		if(shipping_id == '1'){
			/*if($("#Need_Traking_number"+shipping_id).attr("checked") == true){
				$("#sm"+shipping_id).html($("#sm"+shipping_id).attr('orgps')+2);
			}else{
				$("#sm"+shipping_id).html($("#sm"+shipping_id).attr('orgps'));
			}*/
			// yunfei = parseFloat($("#sm"+shipping_id).attr('orgps'))+2;
			// $("#shipping_sub_total").html(yunfei);
			//$("#sm"+shipping_id).html(yunfei);

		}
		
		switch (shipping_id){
			case "1":
			   $("#Need_Traking_number_button1").show('slow');
			   $('#freesm1').html($(".Need_Traking_number").val());
			   //$(".Need_Traking_number").attr("checked",true);
			break;
			
			case "2":
			   $("#Need_Traking_number_button1").hide('slow');
			   $(".Need_Traking_number").attr("checked",false);
			   $('#freesm1').html('0.00');
			break;
			
			case "3":
			   $("#Need_Traking_number_button1").hide('slow');
			   $(".Need_Traking_number").attr("checked",false);
			   $('#freesm1').html('0.00');
			break;
			case "4":
			   $("#Need_Traking_number_button1").hide('slow');
			   $(".Need_Traking_number").attr("checked",false);
			   $('#freesm1').html('0.00');
			break;
			
			default:
			
			break;
		}
		
		jisuan_total();
		
/*		
		//隐藏显示need chacking number
		$(".shipping_method").each(function(){
		   sid = $(this).val();
		   if (sid == shipping_id){
			   $("#Need_Traking_number_button"+sid).show('slow');
		   }else{
		       $("#Need_Traking_number_button"+sid).hide('slow');
			   $(".Need_Traking_number").attr("checked",false);//去掉够选
			//   freesmprice = parseFloat($('#freesm1').attr('orgp'));//去掉清除价格
			   $('#freesm1').html('0.00');
		   }
		})	
*/		
		
			
	 });



	$('.Need_Traking_number').click(function(){
		// var shipid = $(this).attr('shipid');
		// var sign = $('#sm'+shipid).html();
		// var freesmprice;
		// if(sign){
		// 	sign = sign.getSign();
		// }
		// thisprice = $('#Need_Traking_number_fee'+shipid).html();
		// if(thisprice){
		// 	thisprice = thisprice.getFloat();
		// }
		//  freesmprice = $('#sm'+shipid).html();
		// if(freesmprice){
		// 	freesmprice = freesmprice.getFloat();
		// }
		// if($(this).attr("checked")){
		// 	freesmprice = freesmprice*1 + thisprice*1;
		// 	$('#sm'+shipid).html(sign + freesmprice.toFixed(2));
		// 	$('#sm'+shipid).attr("orgp",freesmprice.toFixed(2));
		// }else{
		// 	freesmprice = freesmprice - thisprice;
		// 	$('#sm'+shipid).html(sign + freesmprice.toFixed(2));
		// 	$('#sm'+shipid).attr("orgp",freesmprice.toFixed(2) );
		// }
		// var el = $("#shipping_sub_total")
		// el.html(sign + freesmprice.toFixed(2));
		// el.attr("orgp",freesmprice.toFixed(2));
		jisuan_total();

	});
	

	
	
    
    $("#bizhong").val($.cookie('bizhong'));

    //保费
	$(".baofei").click(function(){
		yunfei  = $("#baofei").html();
		if($(this).attr("checked") == true){ 
			$("#insurance").html(yunfei);
		}else{
			$("#insurance").html(0);
		}
		jisuan_total();
    });
	
	
	function jisuan_total(){
		var sign = $('.my_shop_price').html();
		if(sign){
			sign = sign.getSign();
		}		
		var point_money = 0;
		point_money=caculate_point();
		//return;
		var bizhong = $.cookie('bizhong');
		point_price=(parseFloat(my_array[bizhong]) * parseFloat(point_money)).toFixed(2);;
		//alert(point_money);
		$("#point_money").html(point_price);
		$("#point_money").attr("orgp",point_money);
		point_money = (point_money == undefined)?0:parseFloat(point_money);
		
		free_sub_total = $("#free_shipping_sub_total").html();
		if(!!free_sub_total){
			free_sub_total = free_sub_total.getFloat();
		}		
		free_sub_total = (free_sub_total == undefined)?0:parseFloat(free_sub_total);
		sub_total = $("#shipping_sub_total").html();
		if(sub_total){
			sub_total = sub_total.getFloat();
		}		
		cheknum = ($('.Need_Traking_number').attr("checked"))?parseFloat($('.Need_Traking_number').val()):0;
		sub_total = (sub_total == undefined)?0:parseFloat(sub_total);
		yunfei    = $("#insurance").html();
		if(yunfei){
			yunfei  = yunfei.getFloat();
		}
		xx_sub_total = $("#items_sub_total").html();
		if(xx_sub_total){
			xx_sub_total = xx_sub_total.getFloat();
		}		
		$("#price_total").html(sign + (sub_total - point_price + yunfei + xx_sub_total+free_sub_total + cheknum).toFixed(2));
	}
	
	$(".paymentselect").click(function(){
			id = $(this).val();
			if (id == 'PayPal') {
				$("#bt_apple_code").show("slow");
			//	$("#showapp").show("slow");
			}else{
				$("#bt_apple_code").hide("slow");
				$("#showapp").hide("slow");
			}
			
		$(".paymentselect").each(function(){
			sid = $(this).val();
			if (sid==id){
				$("#subpaymentlist"+sid).show("slow");
			}else{
				$("#subpaymentlist"+sid).hide("slow");
			}
			 
	    });
    });
	
	
	
/*	var m = 0;
	var currid = 0;
	$(".shtitle").click(function(){
		var enid = $(this).attr('entryid');
		$(".showhiden").hide('slow');
		$('.shtitle h6 span').removeClass("xxia"); 
		$('.shtitle h6').removeClass("h6xxia"); 
		if (m%2 == 0 || currid != enid){
			$("#showhiden"+enid).show('slow');
			$('*[entryid="'+enid+'"] h6 span').addClass("xxia"); 
			$('*[entryid="'+enid+'"] h6').addClass("h6xxia"); 
		}
		m++;
		currid = enid;
	
    });
*/	
});


	var m = 0;
	var currid = 0;


function billingsave(j){
	if (j ==4 || j ==5 || j ==6){
		if(chenkship()!=true){		
			alert("Please choose shipping method");
			window.location.hash="ship";
			try{
				document.getElementsByName("shipping")[0].focus();
			}
			catch(err){
				
			}
			return false;
		}	
	}
	
	if (j ==6){
			if(chenkpayment()!=true){
					
				alert("Please choose payment method");
				window.location.hash="pay";
				try{
					document.getElementsByName("payment")[0].focus();
				}
				catch(err){
					
				}
				return false;
			}
	}
	
	
	
	
	
	$(".showhiden").hide('slow');
	$('.shtitle h6 span').removeClass("xxia"); 
	$('.shtitle h6').removeClass("h6xxia"); 
	
	$("#showhiden"+j).show('slow');
	$('*[entryid="'+j+'"] h6 span').addClass("xxia"); 
	$('*[entryid="'+j+'"] h6').addClass("h6xxia"); 
	
	
	
	
	
	
	if (j ==6){
		$(".shtitle").live('click',function(){
			var enid = $(this).attr('entryid');
			$(".showhiden").hide('slow');
			$('.shtitle h6 span').removeClass("xxia"); 
			$('.shtitle h6').removeClass("h6xxia"); 
			if (m%2 == 0 || currid != enid){
				$("#showhiden"+enid).show('slow');
				$('*[entryid="'+enid+'"] h6 span').addClass("xxia"); 
				$('*[entryid="'+enid+'"] h6').addClass("h6xxia"); 
			}
			m++;
			currid = enid;
		});	
		$('#ordersubmit').attr('islastchech','yes');
		$('#ordersubmit').attr('disabled',false);
		$('#ordersubmit').attr('src','/temp/skin1/images/checkout2.jpg');
	
	}
}



function chenkpayment(){
	try{
		var obj=document.getElementsByName("payment");
	}
	catch(err)
	{
		return false;
	}
	var l=obj.length;
	
	for(var i=0;i<l;i++)
	{
		if(obj[i].checked==true){
			//document.getElementById("payment_title").className="";
			return true;
		}
	}

	return false;
}

function chenkship(){
	 
	try{
		var obj=document.getElementsByName("shipping");
	}
	catch(err)
	{
		return false;
	}
	var l=obj.length;
	
	for(var i=0;i<l;i++)
	{
		if(obj[i].checked==true){
			//document.getElementById("payment_title").className="";
			return true;
		}
	}

	return false;
}
function checkInfo(){
	
	
	if ($('#ordersubmit').attr('islastchech') == ''){
		alert("Please check your order information step by step ");
		return false;
	}
	
	
	if(chenkship()!=true){		
		alert("Please choose shipping method");
		window.location.hash="ship";
		try{
			document.getElementsByName("shipping")[0].focus();
		}
		catch(err){
			
		}
		return false;
	}	
	
	if(chenkpayment()!=true){
			
		alert("Please choose payment method");
		window.location.hash="pay";
		try{
			document.getElementsByName("payment")[0].focus();
		}
		catch(err){
			
		}
		return false;
	}
	
	if ($("#postscript").val().length>500){
		$("#postscript").focus();
		alert("The review must be less than 500 chars.");
		return false;
	}
	//paymentlist_gift_card
	
	if($("input[type='radio'][name='payment']:checked").val()=='GiftCard'){
		var card_no=$("#gift_card_select").val();
		if(card_no=='0'){
			alert("please select your gift card");
			return false;
		}

		if(card_no != '0'){
			var  bol=true;
			var price_total=$('#price_total').html();
				
			$.ajax({
				type: "POST",
				url:  '/m-flow-a-check_gift_cart.htm',
				data: "card_no="+card_no+"&price_total="+price_total,
				async:false,
				success: function(msg){
					if(msg && msg !='&nbsp;'){
						//$("#gift_card_msg").html(msg);
						alert(msg);
						bol=false;
					}
				}
			});
			return bol;
		}

    }
	return true;
}



function checkcode(obj){
	var obj = $(obj);
	var objvalue = encodeURIComponent(obj.val());
	var huance   = obj.attr('huance');  //huan chun zong jia 
	var isApply  = obj.attr('isApply');  //huan chun shi fou yingyong 
	var huancode = obj.attr('huancode');  //huan chun cu xiao ma , yongyu panduan cuxiaoma sfou you gaidong 
	var total_obj = $('span[entry="all_total_price"]');
	var total_p = parseFloat(huance).toFixed(2);
	
	if (isApply == "1") {
		if (objvalue!=huancode){
			total_obj.html(total_p);
			total_obj.attr('orgp',total_p);
			obj.attr('isApply','0')
			obj.attr('huance','0')
			alert('Please do not delete or modify the promotional code, or can not be the appropriate discount will be applied');
		}
	}
	
}

var hitnum = 1;
function showappdiv(showdiv){
	if (hitnum%2 == 0 ){
	    $("#"+showdiv).hide();
		$("#bt_apple_code").attr('class','bt_apple1');
	}else{
	    $("#"+showdiv).show();
		$("#bt_apple_code").attr('class','bt_apple2');
	}
	hitnum++;
}

function code_apply(obj_str){
	var obj = $("#"+obj_str);	
	var objvalue = encodeURIComponent(obj.val());
	if  (objvalue.length == 0) return false;
	if (objvalue.length > 40){
    	alert('Promotion code Please do not enter too many characters');
		return false;
	}
	hitnum = 1;
	$('#apply_msg').html('Loading...');
    $('#hidden-coupon').length > 0 ? $.post('/m-dropshipping-a-apply_coupon.htm', {
        coupon: objvalue,
        dropshipping: $('#hidden-dropshipping').length,
        price: $('#items_sub_total').html()
    }, function(data) {
        if (data) {
            $('#apply_msg').html(data);
            $('#hidden-coupon').val() && re_load();
        }
        else {
            re_load();
        }
    }) : re_load('/m-flow-a-cart.htm?pcode='+objvalue);
}

function toClose(){
	$("#signin").hide();
	$("#maskLevel1").hide();

}
function sc_loginreg(){
	$("#signin").show();
	$("#maskLevel1").show();
	$("#sc_loginreg").show();
}

//gift cart select on change
function select_gift_card(val,price_total){
	var  cardNo = val;
	if(cardNo != 0){
		$.ajax({
			type: "POST",
			url: "/m-flow-a-check_gift_cart.htm",
			data: "card_no="+ cardNo +"&price_total="+price_total,
			success: function(msg){
				if(msg) {
					$("#gift_card_msg").html(msg);
					alert(msg)
				}
			}
		});
	}
}
