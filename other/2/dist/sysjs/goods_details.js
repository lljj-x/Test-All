$(document).ready(function(){
	setBrowerHistories()
    $("#detailstopsalefudong").jCarouselLite({
		btnNext: "#detailsrightbar",
		btnPrev: "#detailsleftbar",
		vertical: false,
		play:false,
		auto: 3000,
		visible: 6,
        scroll: 2,
		//mouseWheel: true,
		speed: 800
    });
	   
    if ($(".jqzoom img").attr('jqimg'))
    {
        $(".jqzoom").jqueryzoom({ xzoom: 600, yzoom: 600 });
    }  
	
	
	
		var validator = $(".theAddressForm").validate({
			rules: {
				email: {required: true,maxlength: 60,email: true},
				content: {required: true,maxlength: 300},
				rating: {required: true},
				nickname: {required: true,maxlength: 30}
			},
			messages: {
				email: {required: email_msg,maxlength: email_maxlength_msg},
				content: {required:content_msg,maxlength: content_maxlength_msg},
				rating: {required:rating_msg},
				nickname: {required:nickname_msg,maxlength: nickname_maxlength_msg}
			},
			submitHandler: function() {
				var content = $("#msg_content").val();
				var gid     = $("#gid").val();
				var nickname = $("#nickname").val();
				var email = $("#email").val();
				var rating = $("input[name='rating']:checked").val();
				if (nickname == undefined) return false;
				if (email == undefined) return false;
				if (rating == undefined) return false;
				if (content == undefined) return false;
				$.ajax({
					type: "POST",
					data:{'rank':rating,'email':email,'content':content,'nickname':nickname,'id':gid},
					url: '/m-comment.htm',
					beforeSend:function(){$("#ajaxmsg").html(" <img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
					success: function(msg){
						$("#msg_content").val('');
					//	ymPrompt.succeedInfo({message:msg,width:300,height:160,title:'System Message',handler:null});
						$("#ajaxmsgre").html(msg);						
					} 
				});
				},
			success: function(label) {
				// set &nbsp; as text for IE
				label.html("&nbsp;").addClass("checked");
			}
		});
	
		$('#content').inputlimitor({
			limit: 300,
			boxId: 'limitingtext',
			boxAttach: false
		});
	
	
/*   if ($.cookie('WEBF-email') != null && $.cookie('WEBF-firstname')!= null){
	   var zifu = $.cookie('WEBF-email');
	   var niname = $.cookie('WEBF-firstname');
	   $("#review_w #email").val(zifu);
	   $("#review_w #nickname").val(niname);
	}
*/	
	
	
	
	
	
	
	
	//var comm_url = document.location.href;
	//comm_load(comm_url);
	
	$("#review a").livequery("click",function(){
		page_url = $(this).attr("atr");
		if (page_url!=undefined)
		comm_load(page_url);
	});
	
	
	$("#PB_Page_Select").livequery("change",function(){
		page_url  = $("#PB_Page_Select").attr("atr");
		pageno    = $("#PB_Page_Select").val();
		comm_load(page_url+pageno);
	});
	
	
	function comm_load(page_url){
		$.ajax({
			type: "GET",
			url: page_url,
			success: function(msg){
				var stext = $(msg).find('#review').html();
				if (stext.indexOf('review_title')>=0){
					$('#review').html(stext);
				}else{
					$('#review').remove('');
				}
			}
		});
	}
	
	//document.body.oncopy = function () {
	//	if (window.clipboardData) {
	//		setTimeout(function () {
	//			var text = clipboardData.getData("text");
	//			if (text && text.length > 50) {
			//		text = text + "\r\n\nThe content comes from : " + location.href;
	//				clipboardData.setData("text", text);
		//		}
	//		}, 100);
	//	}
	//}
	
	
	
});



//单位的转换 cm -> inch  按照的是 2.54cm = 1英寸
function Conversion_Units(){
	var size_cm = document.getElementById("size_cm").value;
	var re = size_cm / 2.54;
	if(isNaN(re)){								
		document.getElementById("size_cm").value = ""
		document.getElementById("size_cm").focus();
		return false;
	}
	document.getElementById("size_inch").value = parseFloat(re).toFixed(2);
}
//单位的转换 inch ->  cm  按照的是  1英寸=2.54cm
function Inch_cm(){
	var size_inch1 = document.getElementById("size_inch1").value;
	var size_cm1 = size_inch1 * 2.54;
	if(isNaN(size_cm1)){								
		document.getElementById("size_inch1").value = ""
		document.getElementById("size_inch1").focus();
		return false;
	}
	document.getElementById("size_cm1").value = parseFloat(size_cm1).toFixed(2);
}

/**
 * 设置浏览器历史
 * 
 * @author          mashanling
 * @date            2012-12-10 15:23:07
 * @last modify     2012-12-10 15:23:07
 * 
 * @return void 无返回值
 */
function setBrowerHistories() {
    var goodsId = $('#hidden-goodsId').val(),//商品id
    maxNum = 6,//最大保存数
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
            expires: 365, 
            path: '/'
        });
    }
}//end setBrowerHistories