jQuery.validator.addMethod("isRightfulString", function(value, element) {   
	return this.optional(element) || (/[A-Za-z]+/.test(value) && /[0-9]+/.test(value))
}, jsLg.wallet.isRightfulString);

function checkWalletPas(form,callBack,callBackArr){
	form.validate({
	    rules: {
	    	curPassword:{
	    		required: true,
	            minlength:6,
	            maxlength: 10,
	            isRightfulString:true
	    	},
	        password: {
	            required: true,
	            minlength:6,
	            maxlength: 10,
	            isRightfulString:true
	        },
	        password_confirm: {
	            required: true,
	            minlength: 6,
	            maxlength: 10,
	            isRightfulString:true,
	            equalTo: form.find(".js_setWalletpassword")
	        }
	    },
	    messages: {
	    	curPassword:{
	    		required:  jsLg.formMsg.password,
	            minlength: jsLg.formMsg.password_minlength,
	            maxlength: jsLg.formMsg.passwor_maxlength
	    	},
	        password: {
	            required:  jsLg.formMsg.password,
	            minlength: jsLg.formMsg.password_minlength,
	            maxlength: jsLg.formMsg.passwor_maxlength
	        },
	        password_confirm: {
	            required:  jsLg.formMsg.password_repeat,
	            minlength: jsLg.formMsg.password_minlength,
	            maxlength: jsLg.formMsg.passwor_maxlength,
	            equalTo:   jsLg.formMsg.password_repeat
	        }
	    },
	    errorPlacement:function(error,element){
	        element.parent().find("label.checked").remove();
	        error.appendTo(element.parent());
	    },
	    success: function(label) {
	        label.remove();
	    },
	    submitHandler: function() {
	        if(callBack && typeof(callBack)=="function"){
	            callBack(form,callBackArr);
	        }
	    }
	});

}


function checkFormSuc(form,options){ 
		var Btn = form.find('submit');

		Btn.prop({ disabled:true});
		layer.close(walletPopIndex);

		$.ajax({
			url: options.url,
			type: 'POST',
			dataType: 'json',
			data: {password: form.find('input[name=password]').val(),password_confirm:form.find('input[name=password_confirm]').val(),curPassword:form.find('input[name=curPassword]').val()},
			success:function(data){
				Btn.prop({ disabled:false});

				if(data.status == 1){
					layer.close(options.popIndx);

					$.layer({
						type : 1,
						title : false,
						area : ['auto','auto'],
						border : [0],
						offset : [($(window).height()-$(options.sucPopObj).height())/2 , '50%'], 
						page : {dom : options.sucPopObj},
						close:function(index){
			                layer.close(index);

			                window.location.reload();
			            }
					})
					
				}else{
					GLOBAL.PopObj.alert({msg:data.msg});
					
				}
			}
		})
		
		
	}
var walletPopIndex= null;
(function(){ 
	//弹出设置电子钱包密码的弹出框
	var setWalletPopBox = $("#js_setWalletPopBox");
	var popHeight = setWalletPopBox.outerHeight();
	var setWalletPassFormValidata = null;

	if(setWalletPopBox.length){
		$("#js_setWalletPasBtn").on("click",function(){
			var html = setWalletPopBox.html();

			walletPopIndex = GLOBAL.PopObj.openPop({
				 border : [0],
				offset : [($(window).height()-popHeight)/2 , '50%'], 
				page : {html : html},

				success:function(){
					setWalletPopBox.html("");
				},
				end:function(){
					setWalletPopBox.html(html);
					
				}
			});
			checkWalletPas($("#js_setWalletPassForm"),checkFormSuc,{url:"/" + JS_LANG + "m-users-a-set_wallet_password.htm",sucPopObj:"#js_setWalletSucPop"});
		});
		
		
	}

})();


(function(){//重置密码
	//弹出设置电子钱包密码的弹出框
	var setWalletPopBox = $("#js_resetWalletPopBox");
	var popHeight = setWalletPopBox.outerHeight();
	var popIndex = null

	
	if(setWalletPopBox.length){
		$("#js_resetWalletPasBtn").on("click",function(){
			var html = setWalletPopBox.html();

			walletPopIndex = GLOBAL.PopObj.openPop({
				border : [0],
				offset : [($(window).height()-popHeight)/2 , '50%'], 
				page : {html:html},
				success:function(){
					setWalletPopBox.html("");
				},
				end:function(){
					setWalletPopBox.html(html);
					
				}
			});

			checkWalletPas($("#js_resetWalletPassForm"),checkFormSuc,{url:"/" + JS_LANG + "m-users-a-set_wallet_password.htm",sucPopObj:"#js_resetWalletSucPop"});
		});

		
	}
})();

(function(){//邮件认证
	$("#js_sendEmailBtn").on("click",function(){//发送邮件
		
		var that = $(this);

		if(!that.hasClass('isSend')){
			$("#js_stepW").addClass('stepW1');

			$("#js_sendEmailTips").fadeIn();
			that.addClass('isSend');

			$.get('/' + JS_LANG + 'm-users-a-retrieve_wallet_password.htm?step=step1&send_email=1', function(data) {
				/*optional stuff to do after success */
			});
		}else{
			return false;
		}
	});

	checkWalletPas($("#js_stepsetWalletPassForm"),function(form){form.submit()},{});

})()
