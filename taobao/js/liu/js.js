$(function(){
	// getfocus 获取焦点
	$("#form").on("click","label[for=getFocus]",function(){
		$(this).next().children("input:first")[0].focus();
	});
	$("#form").on("mouseover",".hoverShow:gt(0)",function(){
		$(this).children(".showClose").show();
	});
	$("#form").on("mouseout",".hoverShow",function(){
		$(this).children(".showClose").hide();
	});
	$("#form").on("mouseover",".showClose",function(){
		$(this).children("i").addClass("icon-2x");
	});
	$("#form").on("mouseout",".showClose",function(){
		$(this).children("i").removeClass("icon-2x");
	});

	$("#form").on("click",".showClose",function(){
		$(this).parent().parent().remove();
		_num --;
	});
});
function checkNum(val) 
{
	if (val == "") {
		return true;
	};
	if(!isNaN(val)){
	   return true;
	}else{
	   return false;
	}
}

function checkRequired(val){
	if (val == "") {
		return false;
	}else{
		return true;
	}
}

function checkUrl(val) {
	if (val == "") {
		return true;
	};
		var regu = "(https?|ftp|mms):\/\/([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?";
		var re = new RegExp(regu);
    if (re.test(val)) {
        return true;
    } else {
         return false;
    }
}

function checkLength( o, n, min, max ) {
	if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( "Length of " + n + " must be between " +
			min + " and " + max + "." );
		return false;
	} else {
		return true;
	}
}

function checkEm($thisEm){
	// inputType = 'num' , 'url'	 ,'required'
	$thisEm.parent().removeClass("has-error").children(".error").remove();
	if ($thisEm.attr("inputType")) {
		var arrInputType = $thisEm.attr("inputType").split(',');
	}else{
		return true;
	}
	
	var returnBool = true;
	for (var i = arrInputType.length - 1; i >= 0; i--) {
		switch (arrInputType[i]){
			case 'required':
				if (!checkRequired($thisEm.val())) {
					$thisEm.parent().addClass("has-error").end().after('<label class="error">必须要输入 .</label>');
					returnBool = returnBool && false;
				};
				break;
			case 'num':
				if (! checkNum($thisEm.val()))
				{
					$thisEm.parent().addClass("has-error").end().after('<label class="error">请填写一个有效的数字 .</label>');
					returnBool = returnBool && false;
				};
				
				break;
			case 'url':
				if (! checkUrl($thisEm.val())) 
				{
					$thisEm.parent().addClass("has-error").end().after('<label class="error">请填写一个有效的URL地址 .</label>');
					returnBool = returnBool && false;
				};
				break;
			default :
				returnBool = returnBool && true;
				break;
		}
	};
	return returnBool;
}

function checkForm(formId){
	var isCheck = true;
	$("#" + formId).find("input").each(function(index,em){
		isCheck = checkEm($(this)) && isCheck;
	});
	if (isCheck) {
		return true;
	}else{
		$(".has-error:first").children()[0].focus();
		return false;
	}
}

