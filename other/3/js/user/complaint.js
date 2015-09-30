function listOpinion(obj){
	window.location.href="/"+JS_LANG+"m-users-a-my_complaint_history.htm?search=1&complaint_type="+$(obj).val();
};

(function(){


	function checkData(Jform){//投诉内容检查
		var JselectType = Jform.find('.selt');

		var JcomplaintText = Jform.find('.complaintText');

		if(JselectType.length ){
			if(!(JselectType.val() && JselectType.val()-0 > 0)){
				
				if(layer.closeAll){layer.closeAll();}
				GLOBAL.PopObj.alert({msg:jsLg.complaint.type});
				return false;
			}
			
		}
		if(JcomplaintText.length){
			if(!$.trim(JcomplaintText.val()).length){
			
				if(layer.closeAll){layer.closeAll();}
				GLOBAL.PopObj.alert({msg:jsLg.complaint.text});
				return false;
			}
		}
		
		return true;

	}

	$(".userTable ").on("click",".js_toAddView",function(){
		var orderId = $(this).data("orderid");

		//投诉的弹出框
		GLOBAL.PopObj.openPop({offset : [($(window).height()-$("#js_myComplaintPop").height())/2+'px' , '50%'],page : {dom:"#js_myComplaintPop"}});
		//把orderid赋值
		$("#js_popOrderId").html(orderId);
		$("#js_hidePopOrderId").val(orderId);
	});

	//提交数据
	$("#js_myComplaintPop").find("form").submit(function(){
		return checkData($(this));
	});

	
	$("#js_viewComplaint").find("form").submit(function(){ 
		return checkData($(this));
	});

	//继续投诉
	$("#js_continue").on("click",function(){
		var viewComplaint = $("#js_viewComplaint");

		viewComplaint.show();
		$('html,body').scrollTop(viewComplaint.offset().top);
	});
	//关闭投诉
	$("#js_closeTicket").on("click",function(){
		var JcomplaintConfirm = $("#js_complaintConfirm");

		$("#js_closeTickesBtn").data("orderid",$(this).data("orderid"));
		GLOBAL.PopObj.openPop({offset : [($(window).height()-JcomplaintConfirm.height())/2+'px' , '50%'],page : {dom:JcomplaintConfirm}});
	});
	
	//确定关闭弹出框
	$("#js_closeTickesBtn").click(function(){
		layer.closeAll();

		$.get("m-users-a-my_complaint_close.htm",{complaintid:$(this).data("orderid")}, function(msg) {
			/*optional stuff to do after success */

			window.location.href="m-users-a-my_complaint_view.htm?id="+msg;
		});
	});
})();