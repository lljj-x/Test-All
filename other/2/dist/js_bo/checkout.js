;(function($,window){
    /**
     * ajax 操作通过该对象
     * @type {{getAddressListUrl: string, saveAddressUrl: string, setDefaultAddressUrl: string, setCurrentUseAddressUrl: string, deleteAddressUrl: string, editAddressUrl: string, addressTmp: string, addressWrap: string, checkoutTmp: string, orderConfirmForm: string, getCartAjaxPromise: Function, ajaxSuccessCall: Function, ajaxSuccessFailCall: Function, render: Function}}
     */

    var directMail; //全局变量判断是否需要判断身份证

    window.GLOBALAJAX = {

        getAddressListUrl : '/m-flow-a-address_list.html',              // 默认获取地址列表地址
        saveAddressUrl : '/m-flow-a-consignee.html',                    // 保存地址列表post 地址
        setDefaultAddressUrl : '/m-flow-a-defaultaddress.html',         // 设置默认 地址
        deleteAddressUrl : '/m-flow-a-delete_address.html',             // 删除
        setCurrentUseAddressUrl : '/m-flow-a-currentaddress.html',      // 设置当前收货地址
        editAddressUrl : '/m-flow-a-edit_address.html',                 // 修改

        useGiftCartUrl : '/m-flow-a-use_giftcard.html',                 // 兑换礼品券
        bindGiftCartUrl : '/m-flow-a-bind_giftcard.html',                // 绑定礼品券
        getExchangeCoupon : '/m-flow-a-get_coupon.html',                    // 兑换优惠券
        getCartDataUrl : '/m-flow-a-get_cart.html',                         // 获取 json 数据地址 POST
        useCouponUrl : '/m-flow-a-coupon.html',                             // 优惠券 POST (code ? code : 0 )
        useCommissionUrl : '/m-flow-a-cash.html',                           // 佣金 POST (commission ？ commission : 0) (security_code ? security_code : 0)
        getSecurityCode : '/m-flow-a-send_message.html',                    // 获取手机验证码

        addressTmp : 'address_tmp',                         // 收货地址模板id
        addressWrap : 'js_address_warp',                    // 渲染完成放入 位置
        checkoutTmp : 'checkout_tmp',                       // 收货地址模板id
        orderConfirmForm : 'js_order_confirm_form',         // 渲染完成放入 位置

        userEditAddressUrl : 'm-users-a-user_address.htm?edit_address_id={address_id}',
        /**
         * 所有ajax 操作依赖该对象
         * @param ajaxOptions (ajax参数)
         * @param isAutoCallBack (bool 是否自动回调，自动回调默认方法)
         * @param renderParams  (array ['模板文件id','渲染位置id',callBack(ajaxResult)],如果自动回调，同时设置该参数，自动渲染模板, 设置自动回调，但没有该参数不进行 模板渲染)
         * @returns {} (返回ajax promise 对象，方便扩展)
         */

        getCartAjaxPromise : function (ajaxOptions,isAutoCallBack,renderParams) {    // 统一 ajax 请求，返回 def
            isAutoCallBack = ((arguments.length) > 1) ? isAutoCallBack : true;
            var defaults = {
                doneHasErrorIsReload : true,    // 默认刷新
                type: 'POST',
                global: true,
                dataType: 'json'
            };
            ajaxOptions = $.extend({},defaults,ajaxOptions);

            // 20151011 status != 0 ,msg 之后不刷新
            var doneHasErrorIsReload = ajaxOptions.doneHasErrorIsReload;    //

            delete ajaxOptions.doneHasErrorIsReload;    // 传入 ajax 前，删除

            var promise = $.ajax(ajaxOptions);
            if (isAutoCallBack) {
                this.ajaxSuccessCall(promise,renderParams,doneHasErrorIsReload);
            }
            return promise;
        },
        ajaxSuccessCall: function(promise,renderParams,doneHasErrorIsReload){
            // ajax 成功后自动回调
            var that = this;
            promise.done(function (result) {
                if(result.status != 0){
                    that.ajaxSuccessFailCall(result,doneHasErrorIsReload);
                }else{
                    if(typeof(renderParams) == "undefined") return;
                    that.render(result,renderParams);
                }
            });
        },
        ajaxSuccessFailCall: function (result,doneHasErrorIsReload) { // ajax 成功，返回数据 status !0 回调
            var errorMsg = result.msg,
                self = this;
            self.layerAlertId = layer.alert(errorMsg,function(){
                layer.close(self.layerAlertId);
                doneHasErrorIsReload && window.location.reload(true);
            });
        },
        render :function (result,renderParams) {
            // 渲染指定模板
            var gettpl = document.getElementById(renderParams[0]).innerHTML;
            if(typeof (result.data) == "undefined"){
                //
                layer.alert("亮老板数据返回错误 。。");
                return;
            }

            if(renderParams[0] == GLOBALAJAX.addressTmp){
                // 渲染地址模块
                if(result.data.address_list.length <= 0){
                    $(".js_add_aaddress,.js_address_confirm_cancel").hide();
                    $(ORDERADDRESS.addressFormId).show();

                    if(ORDERADDRESS.addressForm instanceof ADDRESSFORM){
                        ORDERADDRESS.addressForm.formReset();   // reset 错误及表单
                    }

                    // 判断是否需要实例化form事件
                    ORDERADDRESS.renderCallBack();
                }else{
                    $(".js_add_aaddress,.js_address_confirm_cancel").show();
                    $(ORDERADDRESS.addressFormId).hide();
                }
            }

            laytpl(gettpl).render(result.data, function(html){
                document.getElementById(renderParams[1]).innerHTML = html;
                renderParams[2] = renderParams[2] || $.noop;
                renderParams[2].call(ORDERADDRESS,result);    //this 混乱。。,渲染之后判断是否需要实例化 addressForm
            });

            if(renderParams[0] == GLOBALAJAX.checkoutTmp){
                // 渲染订单模块后 需要重新模拟 placeholder 样式
                GLOBAL.otherGlobal.myPlaceholder.init($("#" + GLOBALAJAX.orderConfirmForm).find(".js_myPlaceholder"),31);
            }
        }
    };

    /**
     * 所有 收货列表的操作，
     * @type {{addressForm: string, addressFormId: string, layerIndex: null, init: Function, renderCallBack: Function, allOperating: Function, initUseCurrentEvent: Function, stopPropagation: Function, setDefaultEvent: Function, deleteEvent: Function, editEvent: Function, showAllEvent: Function, checkIsJsonData: Function, bindFormData: Function, editOrAdd: Function}}
     */
    window.ORDERADDRESS = {
        // 针对地址的修改删除
        addressForm : '',   // 保证ADDRESSFORM 只会实例化一次
        addressFormId : '#delivery_address_form',
        layerIndex : null,

        init : function(){
            var that = this;
            var promise = GLOBALAJAX.getCartAjaxPromise({
                url : GLOBALAJAX.getAddressListUrl
            },true,[GLOBALAJAX.addressTmp,GLOBALAJAX.addressWrap,function(result){
                that.renderCallBack();
                that.checkPopVerified(result.data.verified);
            }]);
            promise.fail(function(){
                layer.alert("获取数据失败！",function(){
                    window.location.reload(true);
                });
            });

            // 设置当前地址 通过事件委托处理
            this.initUseCurrentEvent();
        },
        renderCallBack : function(result){
            var that = this;
            // 该方法实际只做收货form验证的实例化 。。
            if($(that.addressFormId).is(":visible") && !(that.addressForm instanceof ADDRESSFORM)){
                // 判断是否需要 ADDRESSFORM 对象
                that.addressForm = new ADDRESSFORM($(that.addressFormId), function () {
                    var data = $(that.addressFormId).serialize();
                    // ajax + 渲染
                    GLOBALAJAX.getCartAjaxPromise({
                        url : GLOBALAJAX.saveAddressUrl,
                        data : data
                    },true,[GLOBALAJAX.addressTmp,GLOBALAJAX.addressWrap,function(result){
                        layer.close(that.layerIndex);
                        if(result.status == 0){
                            that.checkPopVerified(result.data.verified);
                        }
                    }]).fail(function () {
                        layer.alert("保存失败！",function(){
                            window.location.reload(true);
                        });
                    });
                });
            }
        },
        allOperating : function (options) {
            // 所有操作调用ajax,渲染相同模板
            options = options || {};
            var self = this,ajaxPromise = GLOBALAJAX.getCartAjaxPromise(options,true,[GLOBALAJAX.addressTmp,GLOBALAJAX.addressWrap]);
            ajaxPromise.done(function(result){
                if(result.status == 0){
                    self.checkPopVerified(result.data.verified);
                }
            });
            return ajaxPromise;
        },
        setCurrentStyle : function ($elm) {
            // 设置当前样式操作
            $elm.closest(".js_addressTable").find(".js_address_label").removeClass("checked");
            $elm.addClass("checked");

        },
        setDefaultStyle : function ($elm) {
            // 设置默认样式操作
            // 取消原默认
            var $addressDefault = $("#" + GLOBALAJAX.addressWrap).find(".js_defaultWarp");
            $addressDefault.removeClass("js_defaultWarp");
            $addressDefault.find(".js_default").addClass("hidden");
            $addressDefault.find(".js_setDefault").removeClass("hidden");

            // 设置当前默认
            var $currentDefault = $elm.closest(".js_address_label");
            $currentDefault.addClass("js_defaultWarp");
            $currentDefault.find(".js_default").removeClass("hidden");
            $currentDefault.find(".js_setDefault").addClass("hidden");
        },
        setDefaultAndCurrent : function (options) {
            // 设置默认和当前单独，不重新渲染模板 ( 2015.08.04)
            options = $.extend({
                global:true
            },options);
            return GLOBALAJAX.getCartAjaxPromise(options,true);
        },
        openPop: function (options, isCloseBtn) {
            var $pop = $("#js_pop");
            var that = this;
            options = $.extend({}, {
                type: 1,
                shadeClose: false,
                title: "提示",
                area: ['500px', "350px"], //宽高
                content: $pop,
                end: function () {}
            }, options);
            that.layerIndex = layer.open(options);

            // 是否需要关闭按钮
            isCloseBtn = (arguments.length > 1) ? isCloseBtn : false;
            if (isCloseBtn) {
                $pop = options.content; // 只能传入 jquery 对象
                var $cancelBtn = $pop.find(".js_cancel");
                $cancelBtn.off("click");
                $cancelBtn.on("click", function (event) {
                    event.preventDefault();
                    layer.close(that.layerIndex);
                });
            }
        },
        checkPopVerified : function (verified) {
            var reBool = (directMail == "1") && (verified == 0) && $(".js_address_label").length > 0;
            if(reBool){
                var addressId = $(".js_address_label").filter(".checked").data("address-id"),
                    addressVerHref;

                // 当前地址未验证
                addressVerHref = (addressId == undefined) ? GLOBALAJAX.userEditAddressUrl.replace('?edit_address_id={address_id}','') : GLOBALAJAX.userEditAddressUrl.replace('{address_id}',addressId);
                $(".js_addressVer").attr("href",addressVerHref);
                this.openPop({
                    area: ['500px', "320px"]
                },true);
            }
            return !reBool;
        },

        initUseCurrentEvent : function(){
            // 设置当前使用地址
            var that = this;
            $("#js_address_warp").on("click",".js_address_label", function () {
                var $this = $(this);
                var address_id = $this.data("address-id") || 0;
                if($this.hasClass("checked")) return;
                that.setDefaultAndCurrent({
                    url : GLOBALAJAX.setCurrentUseAddressUrl,
                    data : {"address_id" : address_id}
                })
                    .fail(function () {
                        layer.alert("选择失败，点击确定重试",function(){
                            window.location.reload(true);
                        });
                    }).done(function (result) {
                        if(result.status == 0){
                            // 验证失败不修改当前默认
                            that.setCurrentStyle($this);
                            that.checkPopVerified(result.data.verified);
                        }
                    });
            });

            // 添加新地址事件
            $(".js_add_aaddress").on("click", function (e) {
                e.preventDefault();
                if($("#" + GLOBALAJAX.addressWrap).find(".js_address_label").length >= 9){
                    layer.alert("最多设置 9 个收货地址，请先删除");
                    return false;
                }
                that.editOrAdd();
            });

            // 弹窗取消按钮 关闭事件
            $(".js_address_confirm_cancel").click(function (event) {
                event.preventDefault();
                layer.close(that.layerIndex);
            });
        },
        stopPropagation: function (e) {
            // 阻止冒泡
            if (e && e.stopPropagation)
                e.stopPropagation()
            else window.event.cancelBubble = true
        },
        setDefaultEvent : function(elm,event,addressId){
            var that = this;
            that.stopPropagation(event);
            // 设置默认收货地址
            that.setDefaultAndCurrent({
                url : GLOBALAJAX.setDefaultAddressUrl,
                data : {"address_id" : addressId}
            }).fail(function () {
                layer.alert("设置当前默认失败，点击确定重试",function(){
                    window.location.reload(true);
                });
            }).done(function (result) {
                that.setDefaultStyle($(elm));
            });
        },
        deleteEvent : function(event,addressId){
            // 删除事件
            var that = this;
            this.stopPropagation(event);
            layer.confirm('确定要删除该收货地址吗？', {
                btn: ['确认','取消'], //按钮
                shade: 0.3
            }, function(){
                that.allOperating({
                    url : GLOBALAJAX.deleteAddressUrl,
                    data : {"address_id" : addressId}
                }).fail(function () {
                    layer.alert("删除失败，点击确定重试",function(){
                        window.location.reload(true);
                    });
                });
            }, function(){});
        },
        editEvent : function(event,addressId){
            // 修改需要单独处理
            var that = this;
            this.stopPropagation(event);
            GLOBALAJAX.getCartAjaxPromise({
                url : GLOBALAJAX.editAddressUrl,
                data : {"address_id" : addressId}
            },true)
                .done(function (result) {
                    if(result.status == 0){
                        return that.editOrAdd(result);
                    }else{
                        // status 状态不为 0
                    }
                })
                .fail(function () {
                    layer.alert("获取数据失败，点击确定重试",function(){
                        window.location.reload(true);
                    });
                });
        },
        showAllEvent : function(event){
            // 显示全部
            this.stopPropagation(event);
            $(".show_all").show();
            $(".js_showAllAddress").remove();
        },
        checkIsJsonData: function (obj) {
            var isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;

            if(isJson){
                return obj;
            }else{
                if((typeof (obj) == "string")){
                    try {
                        return $.parseJSON(obj);
                    }catch(e){
                        // 执行错误，非json 字符串
                        return false;
                    }
                }
            }
            // return isJson ? obj : ((typeof (obj) == "string") ? ($.parseJSON('('+obj+')')) : false);
        },
        bindFormData : function (jsonObj) {
            // 绑定 form 数据
            if(this.checkIsJsonData(jsonObj)){
                var $form = $(this.addressFormId);

                // bind input
                $form.find("input").each(function () {
                    this.value = (typeof (jsonObj.data[this.name]) == "undefined") ? "" : jsonObj.data[this.name];
                });

                // bind textarea
                $form.find("textarea").each(function () {
                    this.value = (typeof (jsonObj.data[this.name]) == "undefined") ? "" : jsonObj.data[this.name];
                });

                // bind 模拟样式框
                $form.find(".hidden-input").each(function () {
                    var isChecked = !(typeof (jsonObj.data[this.name]) == "undefined" || jsonObj.data[this.name] != 1);
                    this.checked = isChecked;
                    this.value = 1;
                    isChecked ? $(this).siblings(".icon_checkbox").addClass("selected") : $(this).siblings(".icon_checkbox").removeClass("selected");
                });

                // bind 城市数据
                $form.find("select").each(function () {
                    var listText = '<option value="default">' + $(this).find("option:first").text() + '</option>';
                    var dataList = jsonObj.data[this.name];
                    if(dataList.length > 0){
                        $(this).parent().show();
                        for(var i = 0; i < dataList.length; i++ ){
                            if((dataList[i].is_current == "1")){
                                listText += '<option selected="selected" value="' + dataList[i].id + '">' + dataList[i].value + '</option>';
                            }else{
                                listText += '<option value="' + dataList[i].id + '">' + dataList[i].value + '</option>';
                            }
                        }
                    }else{
                        return false;
                    }
                    $(this).html(listText);
                });
            }else{
                // 数据错误
                return false;
            }
        },
        editOrAdd : function (jsonObj) {
            var layerTitle;
            if(ORDERADDRESS.addressForm instanceof ADDRESSFORM){
                ORDERADDRESS.addressForm.formReset();   // 打开弹窗前，绑定表单数据前 reset 错误及表单
            }

            if(typeof jsonObj != "undefined"){
                layerTitle = "修改收货地址";
                this.bindFormData(jsonObj);
            }else{
                layerTitle = "添加收货地址";
                $(ORDERADDRESS.addressFormId).find("input[name=address_id]").val("");   //清空 address_id
            }

            // layer show form
            var currentHeight = $(window).height() * 0.8;
            currentHeight = ((currentHeight > 600) ? 600 : currentHeight) + "px";
            this.layerIndex = layer.open({
                type: 1,
                shadeClose : false,
                title:layerTitle,
                area: ['800px', currentHeight], //宽高
                content: $(this.addressFormId)
            });

            // 表单操作事件,首次加载自动 实例化
            this.renderCallBack();
        }
    };

    /**
     * 所有 checkout 优惠券 佣金的相关操作
     * @type {{selectTimer: null, setCheckBox: Function, init: Function, bindEvent: Function, getSecurityCodeEvent: Function, commissionChangeEvent: Function, inputCheckSecurityCodeEvent: Function, selectCouponEvent: Function, allOperating: Function}}
     */
    window.CHECKOUT ={
        selectTimer : null,
        codeTimer : null,
        countdownTimer : null,
        maxMenoy : {
            "use_gift_money" : 10,
            "use_commission_money" : 0
        },
        setCheckBox : function (eml) {          // 用来设置模拟 checkbox value
            $(eml).toggleClass("selected");
            var curCheckBox = $(eml).siblings(".hidden-input")[0];
            curCheckBox.checked = ! curCheckBox.checked;
        },
        encryptionGiftCard : function(cardNum){    // 加密礼品卡卡号
            cardNum != undefined && (cardNum = cardNum + '');

            var strLength = cardNum.length;

            if(strLength >=6){
                return cardNum.substr(0,3) + '******' + cardNum.substr(strLength - 3,3);
            }
            return cardNum;
        },
        init: function () {         //  页面加载完成 首次请求数据
            this.allOperating({
                url : GLOBALAJAX.getCartDataUrl
            })
                .fail(function(){
                    layer.alert("获取订单列表失败，点击确定重试",function(){
                        window.location.reload(true);
                    });
                });

            this.bindEvent();
        },
        bindEvent : function () {
            var that = this,
                $parent = $("#" + GLOBALAJAX.orderConfirmForm);

            $parent.on("click",".js_use_coupon,.js_use_commission",function () {
                var $this = $(this);
                $this.parent().siblings(".js_noneShow").toggleClass("none");

                if($this.hasClass("js_use_commission")){
                    var commissionInputDom = $(".js_useCommissionMoney")[0];
                    commissionInputDom.disabled = ! commissionInputDom.disabled;
                }

                clearTimeout(this.selectTimer);
                this.selectTimer = setTimeout(function () {
                    // 如果是取消选择 ajax 回去数据
                    if(! $this.hasClass("selected")){
                        if($this.hasClass("js_use_coupon")){
                            if($this.closest(".user_coupon_warp").find(".item-select").val() == "default") return;
                            that.allOperating({
                                url : GLOBALAJAX.useCouponUrl,
                                data : {code : 0}
                            }).fail(function(){
                                layer.alert("取消优惠券使用失败，点击确定重试",function(){
                                    window.location.reload(true);
                                });
                            });
                        }else{
                            $this.parent().parent().find(".form-error").remove();   // 可能会有表单错误提示
                            that.allOperating({
                                url : GLOBALAJAX.useCommissionUrl,
                                data : {commission : 0}
                            }).fail(function(){
                                layer.alert("取消使用佣金失败，点击确定重试",function(){
                                    window.location.reload(true);
                                });
                            });
                        }
                    }
                },100);
            });

            $parent.on("click",".js_get_commission_code", function (e) {
                e.preventDefault();
                var $this = $(this);
                if($this.hasClass("disabled")) return;
                GLOBALAJAX.getCartAjaxPromise({
                    url : GLOBALAJAX.getSecurityCode
                },true)
                    .done(function(result){
                        if(result.status == 0){
                            $this.addClass("disabled").data("default-text",$this.text());
                            $(".js_send_code_msg").show();
                            var tmpNum = 60;
                            clearInterval(that.countdownTimer);
                            that.countdownTimer = setInterval(function () {
                                $this.text(tmpNum);
                                tmpNum -- ;
                                if(tmpNum <= 0){
                                    $this.removeClass("disabled").text($this.data("default-text"));
                                    clearInterval(that.countdownTimer);
                                }
                            },1000);
                        }
                    })
                    .fail(function () {
                        layer.alert("获取验证码失败，点击确定重试",function(){
                            window.location.reload(true);
                        });
                    });

            });

            // 使用优惠码显示控制
            $parent.on("click",".js_userCoponCode", function () {
                $parent.find(".js_couponCodeWarp").toggle();
            });

            // 使用 礼品卡
            $parent.on("click",".js_useGiftCardBtn", function () {
                var $cardList = $(".js_cardList"),
                    $this = $(this),
                    isHasCard = ($cardList.length > 0);
                $cardList.toggle();

                if($this.hasClass("selected")){
                    if(! isHasCard){
                        // 没有礼品卡弹窗
                        that.setCheckBox(this);     // 取消选中状态
                        that.exChangeGiftCard();    // 弹窗
                    }else{
                        that.setCheckoutBtnDisabled($parent);
                    }
                }else{
                    that.removeCheckOutBtnDisabled($parent);
                    if(isHasCard){
                        // 取消礼品卡使用
                        var $selectGiftCard = $(".js_selectGiftCard");
                        if($selectGiftCard.val() != "default"){
                            $selectGiftCard.val("default");
                            that.selectGiftCartEvent($selectGiftCard[0]);
                        }
                    }
                }
            });

            // disabled 结算按钮 ，显示提示
            $parent.on("click",".js_submit",function(event){
                $(this).hasClass("disabled") && event.preventDefault();
            });

            // 添加新礼品卡
        },

        // 兑换礼品卡
        exChangeGiftCard: function(){
            var self = this;
            if( !(self.cardPop instanceof GiftCardForm)){
                self.cardPop = new GiftCardForm(function(layerIndex){
                    // this => 当前 form jQ对象
                    self.allOperating({
                        url : GLOBALAJAX.bindGiftCartUrl,
                        data : this.serialize(),
                        doneHasErrorIsReload : false
                    })
                    .fail(function(){
                        layer.alert("激活礼品卡失败，点击确定重试",function(){
                            // window.location.reload(true);
                        });
                    })
                    .always(function(){
                        layer.close(layerIndex);
                    })
                    .done(function (result) {
                        if(result.status !=0){
                            $(".js_selectGiftCard").val("default");
                        }
                    });
                });
            }
            self.cardPop.open();
        },
        checkCoupon : function (elm) {
            var $elm = $("#" + GLOBALAJAX.orderConfirmForm).find(".js_couponCode");
            var val = ($elm.val().length >= 8 && $elm.val().length <= 16) ? $elm.val() : false;
            if(!val){
                layer.alert("请输入正确的优惠券兑换码！", {
                    end : function () {
                        $elm.val("").focus();
                    }
                });
            }
            return val;
        },
        exchangeCoupon: function (elm) {
            // 兑换优惠券
            var code = this.checkCoupon();
            if(code){
                this.allOperating({
                    url : GLOBALAJAX.getExchangeCoupon,
                    data : {"coupon_code" : code}
                }).fail(function(){
                    layer.alert("兑换失败");
                });
            }
        },
        getSecurityCodeEvent : function () {
            // 获取优惠码事件

        },
        checkisNna : function (value) {
            return ! isNaN(value);
        },

        setMaxMenoy : function (result) {
            var currentMaxCanUseCommissionMenoy =  result.data.total.order_amount - 0 + result.data.commission_money,
                currentMaxCanUseGiftMenoy =  result.data.total.order_amount - 0 + (result.data.gift_money - 0),
                $selectOptions = $(".js_selectGiftCard").find("option:selected"),
                maxGiftMoney = ($selectOptions.val() != "default") ? ($selectOptions.length > 0 ? $selectOptions.data("over-money") : 0) : 0;

            // 最大使用佣金金额
            CHECKOUT.maxMenoy.use_commission_money = (result.data.commission_over > currentMaxCanUseCommissionMenoy) ? currentMaxCanUseCommissionMenoy : result.data.commission_over;

            // 最大使用礼品卡金额
            CHECKOUT.maxMenoy.use_gift_money = (maxGiftMoney > currentMaxCanUseGiftMenoy) ? currentMaxCanUseGiftMenoy : maxGiftMoney;

            // 设置礼品卡val
            $(".js_useGiftCardInput").val(parseFloat(CHECKOUT.maxMenoy.use_gift_money).toFixed(2));
        },
        getCurrentMaxMenoy : function (name) {
            return CHECKOUT.maxMenoy[name];
        },
        blurMenoyInput: function (elm) {
            // 保留两位小数
            elm.value = (elm.value == "") ? 0.00 : parseFloat(elm.value).toFixed(2);
        },
        checkMenoyMax : function (elm) {
            var maxMenoy = this.getCurrentMaxMenoy(elm.name);
            var useValue = parseFloat(elm.value);

            if(elm.value == '' || (this.checkisNna(useValue) && useValue <= maxMenoy)){
                // 允许为空
            }else{
                elm.value = maxMenoy;
            }
        },
        commissionChangeEvent : function (elm) {
            // 佣金使用金额
            var hasCommission =parseFloat($(elm).data("has-commission"));
            var useValue = parseFloat(elm.value);
            if(elm.value == '' || (this.checkisNna(useValue) && useValue <= hasCommission)){
                // 允许为空
            }else{
                elm.value = hasCommission;
            }
        },
        lengthValidate : function (elm,length) {
            // 当前只做长度为6验证
            length = length || 6;
            return elm.value.length == length;
        },

        getInputCodeEventConfig : function (inputSelector) {
            // 佣金，礼品 使用使用相同方法，参数不同,根据 inputSelector 做判断

            var returnObj ={};
            switch (inputSelector){
                case '.js_useCommissionMoney' :
                    // 佣金使用
                    returnObj = {
                        inputEmptyMsg : '请输入要使用的佣金金额',
                        instanceErrorMsg : '验证码长度为6位',
                        ajax:{
                            url : GLOBALAJAX.useCommissionUrl,
                            data : '{commission : $input[0].value,security_code : elm.value}',
                            failCallBack : function () {
                                layer.alert("使用佣金失败，点击确定重试",function(){
                                    window.location.reload(true);
                                });
                            }
                        }
                    };

                    break;

                case '.js_useGiftCardInput':
                    // 礼品卡使用
                    returnObj = {
                        inputEmptyMsg : '请输入要使用礼品卡付款金额',
                        instanceErrorMsg : '支付密码长度为6位',
                        ajax:{
                            url : GLOBALAJAX.useGiftCartUrl,
                            data : '{money : $input[0].value,pass : elm.value.toUpperCase(),code: $(".js_selectGiftCard").val()}',
                            failCallBack : function () {
                                layer.alert("礼品卡使用失败，点击确定重试",function(){
                                    window.location.reload(true);
                                });
                            }
                        }
                    };
                    break;

                default:
                    break;
            }

            return returnObj ;
        },
        inputCodeEvent: function (elm,inputSelector) {
            var that = this,
                $input = $(inputSelector),
                eventConfig = that.getInputCodeEventConfig(inputSelector);

            clearTimeout(this.codeTimer);
            that.codeTimer = setTimeout(function () {
                $(elm).removeClass("form-error");
                $(elm).closest(".js_errorWrap").find(".form-error").remove();

                if(that.lengthValidate(elm)){
                    if($input[0].value == ''){
                        layer.alert(eventConfig.inputEmptyMsg,{
                            end : function () {
                                $input.focus();
                            }
                        });
                        elm.value = "";
                        return false;
                    }

                    var ajaxData;
                    try{
                        eval('ajaxData = ' + eventConfig.ajax.data);
                    }catch(exception){
                        alert("error");
                        return false;
                    }
                    that.allOperating({
                        url : eventConfig.ajax.url,
                        data : ajaxData,
                        doneHasErrorIsReload : false
                    }).fail(function (){
                        eventConfig.ajax.failCallBack();
                    }).done(function (result) {
                        if(result.status != 0){
                            // 清空输入空，设置焦点
                            $(elm).val("").focus();
                        }
                    });
                }else{
                    $(elm).addClass("form-error").focus();
                    $(elm).closest(".js_errorWrap").append("<p class='form-error'>" + eventConfig.instanceErrorMsg + "</p>");
                }
            },1000);
        },

        selectCouponEvent : function (elm) {
            // 优惠券选择
            var code = (elm.value == "default") ? 0 : elm.value;
            // console.log("选择优惠券 " + code);

            this.allOperating({
                url : GLOBALAJAX.useCouponUrl,
                data : {code : code}
            })
            .fail(function(){
                layer.alert("选择优惠券失败，点击确定重试",function(){
                    window.location.reload(true);
                });
            });
        },
        selectGiftCartEvent : function (elm) {
            // 清空礼品卡，该操作不会重新渲染模板
            var self = this;
            if($(elm).val() == "new-card"){
                self.exChangeGiftCard();
                $(".js_hideUseGift").hide();
                return false;
            }
            GLOBALAJAX.getCartAjaxPromise({
                url : GLOBALAJAX.useGiftCartUrl,
                data : {code : 0}
            },false).done(function (result) {
                if(result.status == 0){
                    var $cardMoney = $(".js_hideUseGift");
                    $(".js_cardMoney").html(" -￥0");
                    $(".js_totalMoney").html(result.data.total.order_amount);
                    $(".js_useCommissionMoney").val(result.data.commission_over);
                    $(".js_commisonCanMoney").html(result.data.commission_over);
                    self.setMaxMenoy(result);
                    if($(elm).val() == "default"){
                        // 直接清空
                        $cardMoney.find("input").val("");
                        $cardMoney.hide();
                    }else{
                        // 选择新的卡
                        $cardMoney.show();
                        //$(".js_useGiftCardInput").val(CHECKOUT.maxMenoy.use_gift_money.toFixed(2));
                    }
                }
            })
            .fail(function(){
                layer.alert("选择礼品卡失败，点击确定重试",function(){
                    window.location.reload(true);
                });
            });
        },

        allOperating : function (options) {
            // 所有重新渲染 选择优惠操作
            options = options || {};
            var ajaxPromise =  GLOBALAJAX.getCartAjaxPromise(options,true,[GLOBALAJAX.checkoutTmp,GLOBALAJAX.orderConfirmForm]),
                self = this;

            ajaxPromise.done(function (result) {
                if(result.status == 0){
                    self.setMaxMenoy(result);
                }
            });
            return ajaxPromise;
        },

        setCheckoutBtnDisabled : function($parent){
            var $btn = $parent.find(".js_submit");
            $btn.addClass("disabled");
            $parent.find(".js_notice").show();
            //$btn.on("click.disabled",function(event){
            //    event.preventDefault();
            //});
        },
        removeCheckOutBtnDisabled : function($parent){
            $parent.find(".js_submit").removeClass("disabled");
            $parent.find(".js_notice").hide();
        }
    };

    $(function () {
        // ready
        directMail = $("#js_directMail").val();

        ORDERADDRESS.init();    // 加载收货地址数据

        CHECKOUT.init();     // 加载订单详情

    });

})(jQuery,window);
