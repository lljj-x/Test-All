//显示快速浏览按钮
function display_fast_buy_button(id)
{
	$('#fast_buy_button_'+id).show();	
}

//隐藏快速浏览按钮
function hidden_fast_buy_button(id)
{
	$('#fast_buy_button_'+id).hide();
}

//获取商品信息
function get_fast_buy_goods_info(goods_id)
{
	$.ajax({
		   type: "POST",
		   url: "/m-goods_fast-a-info.htm",
		   //url: "/fun/fun.goods_fast.php",
		   data: "goods_id="+goods_id,
		   dataType:"JSON",
			//beforeSend:function(){$("#ajaxmsg").html("<img src='/temp/skin1/images/990000_bai.gif' id='verify' > Signing ...</div>");	},
			success: function(msg){
				display_goods_info(msg);
				show_my_shop_price('');
			}
		});
}

// 显示商品信息
function display_goods_info(msg){
	 var date = eval("(" + msg + ")");
	 ymPrompt.close();
	 ymPrompt.setDefaultCfg({okTxt:' Send ',cancelTxt:' Cancel ',closeTxt:'Close',minTxt:'Minimize',maxTxt:'Maximize'});
     ymPrompt.win({icoCls:'',msgCls:'confirm',message:date.info ,titleBar:false,width:800, height:500,autoClose:false});
     //显示相册第一张相片
     $(".scrollableDiv a:nth-child(1)").trigger("mouseover");	
}

//却换不同商品编码的同类商品信息
function change_fast_buy_goods_info(obj)
{
	var goods_id = parseInt(obj.value);
	get_fast_buy_goods_info(goods_id);
}

