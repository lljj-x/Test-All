(function(){
    var inCheckout = true;
    var min_use_point= 50;
    var point_rate= 0.02;
    var min_use_point=parseInt(min_use_point);
    var point_rate=parseFloat(point_rate);

    //自定义弹出框提示信息，替换alert
    function alertMsg(msg,callBack,callBackArg){
        GLOBAL.PopObj.confirm({
            shade : [0.8 , '#000' , true],
            area : ['400','auto'],
            title: jsLg.message,
            closeBtn : [0 , false],
            dialog : {
                msg:msg,
                btns : 1,
                type : 0,
                btn : [jsLg.okj],
                yes :  function(index){
                    if(callBack){
                        arguments.length>1 ? callBack(callBackArg) : callBack();
                    }
                    layer.close(index);
                }
            }
        })
    }
    //检测婚纱是否平邮
    function weddingShip(){
        var bol = true;

        $.ajax({
            type: "GET",
            url: '/'+JS_LANG+'m-flow-a-check_ship_method.htm?shipping='+ $("input[name=shipping]:checked").val(),
            async:false,
            success: function(msg){
                if(msg == 0){
                    //$("#gift_card_msg").html(msg);
                    alertMsg(jsLg.checkOut_5,function(){
                        window.location.reload();
                    });
                    bol=false;
                }else{
                    bol=true;
                }
            }
        });
        //document.getElementById("payment_title").className="";
        return bol;
    }
    //是否有使用电子钱包
    function isUserWallet(){
        var JinputWallet = $("#Js_userWallet");
        return JinputWallet.length && JinputWallet.prop("checked");
    }


    //计算使用电子钱包
    function countWallet(allprice){//allprice 订单总金额，selfUserWallet 是否自己输入的

        var Jwallet_ipt = $("#wallet_ipt"),
            JmyWallet   = $("#js_myWallet"),
            JisUserWallet = $("#Js_userWallet"),
            //JbalaceWallet = $("#js_balaceWallet"),
            JalsoNeedPayNum = $(".js_alsoNeedPayNum"),
            JpayMethod = $(".paymentselect"),
            //JalsoNeedPay  = $("#js_alsoNeedPay");

            Jwallet_pay = $("#wallet_text");


        //获取电子钱包
        var allwallet = 0,userwallet = 0;

        //获取电子钱余额总数
        allwallet = JmyWallet.attr("orgp");
        allwallet = allwallet - 0 > 0 ? allwallet : 0;//实际可以使用金额

        //希望使用金额
        userwallet = allprice;

        //如果使用金额大于实际可以使用金额
        userwallet = userwallet - allwallet > 0 ? allwallet  :  userwallet;

        //计算支付后电子钱包还剩余多少
        //JbalaceWallet.attr("orgp",allwallet-userwallet);

        //提示用户还需支付多少
        //JalsoNeedPayNum.attr("orgp",allprice - userwallet);

        //如果使用金额可以支付了
        if(userwallet  - allprice >= 0){

            //电子钱包的支付方式为单选框
            if(JisUserWallet.prop("type")=="checkbox"){
                var JnewInput = $('<input type="radio" class="iswallet" checked value="1" id="Js_userWallet" name="is_wallet"/>');
                JisUserWallet.remove();
                Jwallet_ipt.closest('dt').prepend(JnewInput);
                JisUserWallet = JnewInput;
            }
            JpayMethod.prop("checked",false);

        }else{//如果不够支付
            //电子钱包的支付方式为复选框
             if(JisUserWallet.prop("type")=="radio"){
                var JnewInput = $('<input type="checkbox" class="iswallet" checked value="1" id="Js_userWallet" name="is_wallet"/>');
                JisUserWallet.remove();
                Jwallet_ipt.closest('dt').prepend(JnewInput);
                JisUserWallet = JnewInput;
            }

            //JisUserWallet.clone().attr("type","checkbox").replaceWith(JisUserWallet)
            //JisUserWallet.attr("type","checkbox");
            //显示第三方支付和需要支付金额提示
            //JpayMethod.add(JalsoNeedPay).fadeIn();

        }
        Jwallet_ipt.val(userwallet);//转换成当前币种

        Jwallet_pay.attr("orgp",userwallet);
    }

    //计算第三方需要支付多少钱
    function otherPayNum(){
        //其他支付方式要全额支付
        var allPrice = $("#walletPriceTotal").attr("orgp");
        var walletPay = $("#wallet_text").attr("orgp");
        var alsoNeedPayList = $("dl.paymentList").find('.js_alsoNeedPayNum');

        var $alsoPay ;

        allPrice =  $.isNumeric(allPrice) ? allPrice : 0;
        walletPay = $.isNumeric(walletPay) ? walletPay : 0;


        if(!alsoNeedPayList.length){
            $("dl.paymentList").append($('<dd><div class="payFloatBox">pay <span class="bizhong"></span><span class="my_shop_price js_alsoNeedPayNum" orgp="'+(allPrice-walletPay)+'" >'+(allPrice-walletPay)+'</span></div></dd>'))
        }else{
            alsoNeedPayList.attr("orgp",allPrice-walletPay);
        }



        //根据cookie，改变币种
        GLOBAL.currency.change_html("","#js_payMethod");
    }

    //不选电子钱包的处理
    function clearWallet(){

        var JuserWallet = $("#Js_userWallet");

        //清空电子钱包
        $("#wallet_ipt").val(0);
        $("#wallet_text").attr("orgp",0);
        $("#wallet_pass").val("");

        $("#Js_userWalletWrap").find(".walletPass").fadeOut();
    }
    //计算总数
    function jisuan_total(){
        //积分换算
        var $point_money =  $("#point_money");
        var point_money = caculate_point();

        point_money = (point_money == undefined)?0:parseFloat(point_money);
        $point_money.attr("orgp",point_money);

        //var free_sub_total = $("#free_shipping_sub_total").attr("orgp");
       // free_sub_total = (free_sub_total == undefined)?0:parseFloat(free_sub_total);

        //获取Shipping Sub-total的值
        var sub_total = $("#shipping_sub_total").attr("orgp");
        sub_total = (sub_total == undefined)?0:parseFloat(sub_total);
         //获取Tacking number的值
        var $needTrakNumber = $('.Need_Traking_number'),cheknum = 0;
        if($needTrakNumber.attr("checked")){
            cheknum = parseFloat($needTrakNumber.val());
        }
        $("#Tracking_number").attr("orgp",cheknum);
        //获取保费的值
        var  yunfei    = parseFloat($("#insurance").attr("orgp"));
        var  Item_sub_total = parseFloat($("#items_sub_total").attr("orgp"));
        var price_total_orgp = (sub_total - point_money + yunfei + Item_sub_total  + cheknum).toFixed(2);
        //price_total_orgp == 0.01 ? $("td.handling_fee").show():$("td.handling_fee").hide();

        //$("#price_total").attr("orgp",(sub_total - point_money + yunfei + Item_sub_total + free_sub_total + cheknum).toFixed(2));
        $("#price_total").add("#walletPriceTotal").attr("orgp", price_total_orgp);

        //如果有选择电子钱包
        if(isUserWallet()){
            countWallet(price_total_orgp);
        }

        //计算第三方需要支付多少钱
        otherPayNum();
        //根据cookie，改变币种
        GLOBAL.currency.change_html("")
    }

    //计算使用积分后减多少钱
    function caculate_point(){
        var el = $('#point_ipt'), point_money = 0, msg, point;
        var $pointTips =  $('#point_tips');
        var use_point_max = parseInt($('#use_point_max').text());

        if (typeof(min_use_point) == 'number') {
            point = el.val();

            if ($.trim(point) == ''){
                $pointTips.html('');
                return point_money;
            }

            point = parseInt(point);

            if (point > use_point_max) {
                point = use_point_max;
                $('#point_ipt, #hidden-point').val(use_point_max);
            }
            point_money = (parseFloat(point) * point_rate).toFixed(2);
            msg = '- '+'<span class="my_shop_price"  orgp="'+ point_money +'">'+point_money  +'</span> <span class="bizhong">USD</span>';
           // msg = ' - '+ point_money + ' USD';
            $pointTips.html(msg);
        }

        return point_money;
    }

    //删除值前面非数字字符
    function numbers(obj){obj.value=obj.value.replace(/[^\d]/g,'');}

    //gift cart select 值发生改变
    function select_gift_card(val,price_total){
        var  cardNo = val;
        if(cardNo != 0){
            $.ajax({
                type: "POST",
                url: "/"+JS_LANG+"m-flow-a-check_gift_cart.htm",
                data: "card_no="+ cardNo +"&price_total="+price_total,
                success: function(msg){
                    if(msg && msg !='&nbsp;') {
                        $("#gift_card_msg").html(msg);
                        //alert(msg)
                    }
                }
            });
        }
    }

    //检查是否选择了运送方式
    function chenkship(){
        try{
            var obj=document.getElementsByName("shipping");
        }
        catch(err){
            return false;
        }
        var l=obj.length;
        for(var i=0;i<l;i++){
            if(obj[i].checked==true){
               return true;
            }
        }
        return false;
    }
    //提交表单检查电子钱包
    function checkWallet(){
	
        if(isUserWallet()){//如果有选择电子钱包支付

            var Jwallet_ipt = $("#wallet_ipt");
            var allPrice = $("#price_total").attr("orgp");
            var Jwallet_pas = $('#wallet_pass');
            var flag = true;
			var JpayMentList = $(".paymentselect");

            //如果还没有设置过密码，提示用户设置密码
            if($("#Js_userWalletWrap").find("a.gotoSetPass").length){
                alertMsg(jsLg.wallet.isNosetPas,function(){
                    window.location.href = DOMAIN_USER + "/m-users-a-wallet_password.htm";
                });
                flag = false;
                return flag;
            }

            if((Jwallet_ipt.val() - allPrice < 0) && !chenkpayment()){//如果电子钱包不够支付
                
				if(JpayMentList.length){//如果有其他支付方式可选
				   alertMsg(jsLg.wallet.otherPayMethod,function(){}); 

			   }else{//没有其他支付方式可选
                   alertMsg(jsLg.wallet.balanceNotEnough,function(){}); 
               }
			   flag = false;
			   return flag;
            }

            if(!Jwallet_pas.val().length){
                alertMsg(jsLg.wallet.enterPas);
                flag = false;
            }else{
                //检查密码是否正确
                $.ajax({
                    url: '/m-flow-a-check_transaction_password.htm',
                    type: 'POST',
                    async : false,
                    dataType: 'json',
                    data: {walletpass: Jwallet_pas.val()},
                    success: function(data){
                        if(!data.status){
                            alertMsg(jsLg.wallet.IncorrectPas);
                            flag = false;
                        }
                    }
                });
            }
            return flag;

        }else{//如果没有选择电子钱包，则必须选择一种其他的支付方式
			var JpayMentList = $(".paymentselect");

            if(chenkpayment()!=true){
						
				if(JpayMentList.length){//如果有其他支付方式可选
				    alertMsg(jsLg.checkOut_2,function(){
                        window.location.hash="pay";
                        JpayMentList.eq(0).focus();
                    });

			   }else{//没有其他支付方式可选
                   alertMsg('Please contact our Customer Service Team for special VIP service, discounts and enhanced payment security, Thank you!',function(){}); 
               }
                
               return false;
            }
            return true;
        }
    }
    //检查是否选择了付款方式
    function chenkpayment(){
		var obj=document.getElementsByName("payment");

		if(obj && obj.length){
			var l=obj.length;
			for(var i=0;i<l;i++){
				if(obj[i].checked==true){
					//document.getElementById("payment_title").className="";
					return true;
				}
			}
		}
		return false;
    }
    //
    //check out 提交页面
    function checkInfo(){


        if(chenkship()!=true){

            alertMsg(jsLg.checkOut_1,function(){
                window.location.hash="ship";
                try{
                    document.getElementsByName("shipping")[0].focus();
                }
                catch(err){

                }
            });

            return false;
        }
        if(checkWallet() != true){

            return false;
        }
        // if(chenkpayment()!=true){

        //     alertMsg(jsLg.checkOut_2,function(){
        //         window.location.hash="pay";
        //         try{
        //             document.getElementsByName("payment")[0].focus();
        //         }
        //         catch(err){

        //         }
        //     });
        //     JupOrderBtn.prop("disabled",false);
        //     return false;
        // }

        if ($("#postscript").length && $("#postscript").val().length>500){

            alertMsg(jsLg.checkOut_3,function(){$("#postscript").focus();});


            return false;
        }

        //检查是否使用礼品卡paymentlist_gift_card
        if($("input[type='radio'][name='payment']:checked").val()=='GiftCard'){
            var card_no=$("#gift_card_select").val();
            if(card_no=='0'){
                alertMsg(jsLg.checkOut_4);


                return false;
            }

            if(card_no != '0'){
                var  bol=true;
                var price_total=$('#price_total').attr("orgp");

                $.ajax({
                    type: "POST",
                    url: '/'+JS_LANG+'m-flow-a-check_gift_cart.htm',
                    data: "card_no="+card_no+"&price_total="+price_total,
                    async:false,
                    success: function(msg){
                        if(msg && msg !='&nbsp;'){
                            //$("#gift_card_msg").html(msg);
                            alertMsg(msg);
                            bol=false;
                        }
                    }
                });

                return bol;
            }

        }

        //return weddingShip();

       return true;
    }

    function setChoicePayment($obj){
        var $this = $obj;

        var JuserWallet = $("#Js_userWallet");
        var JuserWalletWrap = $("#Js_userWalletWrap");
        //礼品卡
        var paymentlist_gift_cardWrap = $("#paymentlist_gift_cardWrap");

        var isChecked = $this.hasClass("on");

        //如果是选中状态
        if (isChecked) {
            //如果选择的是电子钱包
            if($this.hasClass('cart_wallet')){

                //如果电子钱包是复选框
                if(JuserWallet.prop("type") == "checkbox"){
                    //清空电子钱包
                    clearWallet();
                    //取消选择状态
                    $this.removeClass('on');
                    JuserWallet.prop("checked",false);
                    //显示礼品卡
                    !!paymentlist_gift_cardWrap.length ? paymentlist_gift_cardWrap.fadeIn() : "";
                }
            }

        }else{

            //如果选择的是电子钱包
            if($this.hasClass('cart_wallet')){

                //如果电子钱包是单选框
                if(JuserWallet.prop("type") == "radio"){
                    //取消其他支付方式
                    $.each($(".paymentselect"), function(index, val) {
                        var $that = $(val);
                        $that.closest('dl').removeClass('on');
                        $that.prop("checked",false);
                    });
                }
                //如果电子钱包是复选框
                if(JuserWallet.prop("type") == "checkbox"){
                    //隐藏礼品卡
                    !!paymentlist_gift_cardWrap.length ? paymentlist_gift_cardWrap.fadeOut() : "";
                }
                //显示密码输入框
                JuserWalletWrap.find(".walletPass").fadeIn();

            }else if($this.is('#paymentlist_gift_cardWrap')){//如果选择的是礼品卡

                var JgiftCard = $("#paymentlist_gift_card");

                //取消其他支付方式
                $.each($(".paymentselect"), function(index, val) {
                    var $that = $(val);
                    $that.closest('dl').removeClass('on');
                    $that.prop("checked",false);
                });

                //如果电子钱包存在
                if(!!JuserWalletWrap.length){

                    if(JuserWalletWrap.hasClass('on')){//选中状态
                        //清空电子钱包
                        clearWallet();

                        //取消电子钱包的选中状态
                        JuserWallet.prop("checked",false);
                        JuserWalletWrap.removeClass('on');
                    }

                    //如果电子钱包是复选框
                    if(JuserWallet.prop("type") == "checkbox"){
                        //隐藏电子钱包
                        JuserWalletWrap.fadeOut();
                    }
                }
            }else{//如果是其他的方式

                //如果电子钱包存在
                if(!!JuserWalletWrap.length){
                    //显示电子钱包
                    JuserWalletWrap.fadeIn();

                    //如果电子钱包是单选框且选中状态
                    if(JuserWallet.prop("type")=="radio" && JuserWalletWrap.hasClass('on')){

                        //清空电子钱包
                        clearWallet();

                        //取消电子钱包的选中状态
                        JuserWallet.prop("checked",false);
                        JuserWalletWrap.removeClass('on');
                    }

                    //如果电子钱包不是选中的
                    if(!JuserWalletWrap.hasClass('on')){
                        //礼品卡显示
                        !!paymentlist_gift_cardWrap.length ? paymentlist_gift_cardWrap.fadeIn() : "";
                    }

                }

                //取消其他支付方式
                $.each($(".paymentselect"), function(index, val) {
                    var $that = $(val);
                    $that.closest('dl').removeClass('on');
                    $that.prop("checked",false);
                });
            }



            //添加选中状态
            $this.addClass('on');
            $this.find('input.paymentselect').prop("checked",true);
            $this.find('input.iswallet').prop("checked",true);

            //计算第三方需要支付多少钱
            //otherPayNum();
        }

        jisuan_total();
    }
    //计算总数
    jisuan_total();

    //积分
    $("#point_ipt").on('keyup', function(){
        //积分
        numbers(this);
        $('#hidden-point').val(this.value);
        //计算使用积分后减多少钱
        jisuan_total();
    });
    $("#point_ipt").focus(function(event) {
        /* Act on the event */
        $(this).val("");
        $(this).trigger('keyup');
    });
    $("#point_ipt").blur(function(event) {
        /* Act on the event */
        var pointVal = $(this).val();

        if(!($.trim(pointVal).length && parseInt(pointVal)-0 > 0)){
            $(this).val(0);
			$(this).trigger('keyup');
        }
    });
    //选择配送方式
    $(".shipping_method").click(function(){
        var shipping_id = $(this).val();
        var yunfei  = $("#sm"+shipping_id).attr("orgp");
        var $needTrakingNumBut1 =  $("#Need_Traking_number_button1");
        var $Need_Traking_number = $(".Need_Traking_number");

        $("#shipping_sub_total").attr("orgp",yunfei);

       // var  freeyunfei  = $("#freesm"+shipping_id).attr("orgp");
       // $("#free_shipping_sub_total").html(freeyunfei);

        switch (shipping_id){
            case "1":
                $needTrakingNumBut1.show( );
               // $('#freesm1').html($(".Need_Traking_number").val());
                $Need_Traking_number.attr("checked",true);
                break;

            case "2":

            case "3":

            case "4":
                $needTrakingNumBut1.hide( );
                $Need_Traking_number.attr("checked",false);
                break;

            default:
                break;
        }

        jisuan_total();

    });

    //tracking number click
    $('.Need_Traking_number').click(function(){
        var disabled = $(this).data("disabled");
        if(disabled=="disabled"){
            $(this).prop("checked",true);
            return false;
        }
       var  shipid = $(this).attr('shipid');
       var  thisprice = parseFloat($('#Need_Traking_number_fee'+shipid).html());

       jisuan_total();
    });

    var $useCopon = $(".useCoupon_help a");
    $useCopon.on("mouseover",function(){
        $("div.useCoupon_helpWrap").show();
    });
    $useCopon.on("mouseout",function(){
        $("div.useCoupon_helpWrap").hide();
    });

    //电子钱包使用
    $("#js_payMethod").on("click","dl",function(){

        setChoicePayment($(this));

    }).on("click","#wallet_pass",function(){

        var JuserWallet = $("#Js_userWallet");
        if(JuserWallet.length && JuserWallet.prop("checked")){ //如果电子钱包是复选框并且还是选中状态，则取消冒泡
            return false;
        }
    });

    if(isUserWallet()){
        $("input.paymentselect").each(function(index, element) {
           $(this).prop("checked",false);
        });
    }


    //保费

    var baofeiOrgp = $("#baofei").attr("orgp");

    $(".baofei").click(function(){
        if($(this).attr("checked") == "checked"){
            $("#insurance").attr("orgp",baofeiOrgp);

        }else{
            $("#insurance").attr("orgp",0);

        }
        jisuan_total();
    });
    //gift cart select 值发生改变
    $("#gift_card_select").on("change",function(){
        $("#gift_card_msg").html("");
        select_gift_card( this.value, $('#price_total').attr('orgp') );
    });


    //下单
    $("#theForm").submit(function(){
       var $upOrderBtn = $("#js_upOrder");
       $upOrderBtn.prop("disabled",true).addClass('uping');

        if(checkInfo()){
            return true;
        }else{
            $upOrderBtn.prop("disabled",false).removeClass('uping');
            return false;
        }
        return false;
    });
})();

(function(){
    $("dl.helpTage").hover(function(){
        $(this).find("dd").fadeIn();
    },function(){
         $(this).find("dd").hide();
    });

    //var _bland;
    $(".payMethod").on("mouseenter",".help",function(){
        var Jthis = $(this);
        var _bland = Jthis.data("_bland");

        if(_bland){
            clearTimeout(_bland);
           Jthis.data("_bland",0)
        }

        Jthis.find(".helpTips").stop().show();
        Jthis.find('.triangle').show();
        Jthis.closest('dl').css("zIndex",3);
    });
    $(".payMethod").on("mouseleave",".help",function(){
        var Jthis = $(this);


        var _bland =   setTimeout(function(){
            Jthis.find(".helpTips").hide();
            Jthis.find('.triangle').hide();
            Jthis.closest('dl').css("zIndex",1);
        }, 500)
        Jthis.data("_bland",_bland);
    });

    $("#js_blockSH").on("click",function(){
        $(this).toggleClass('orderReviewUp');
        $("#js_orderReview").toggle();
    })
})()