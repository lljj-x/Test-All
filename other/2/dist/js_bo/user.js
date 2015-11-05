/**
 * Created by Liu.Jun on 2015/7/17.
 */

;(function ($,window,$LAB) {
    /**
     * 统一所有用户中心操作 通过 USER 对象
     * @type {{allAjaxUrl: {commissionToCashUrl: string}, userAjax: {getAjaxPromise: Function, ajaxSuccessCall: Function, ajaxSuccessFailCall: Function}, commissionForm: {form: string, validate: Function, checkForm: Function}, order: {delete: Function}, otherGlobal: {setTopStep: Function}}}
     */
    window.USER = {
        allAjaxUrl: {
            // 获取手机验证码接口
            getPhoneCodeUrl : '/m-users-a-giftsms.html',

            // 银行卡提现post 地址
            commissionToCashUrl: '/m-users-a-take_cash.htm',

            // 修改密码
            changePasswordUrl: '/m-users-a-do_change_password.htm',

            // 取消订单
            removeOrderUrl: '/m-users-a-cancel_order.htm',

            // 订单再次购买
            buyAgainUrl:'/m-flow-a-add_to_cart.html',

            // 订单物流信息
            shippingViewUrl : '/m-users-a-shipping.htm',
            shippingViewMoreUrl : '/m-users-a-shippingbylogis.htm',

            // 订单确认收货
            confirmReceipt : '/m-users-a-order_confirm_json.html',

            // 收货地址删除
            shippingAddressdeleteUrl: '/m-users-a-drop_consignee.htm',

            // 设置默认
            shippingAddressSetDefaultUrl: '/m-users-a-set_user_address.htm',

            // 实名认证
            shippingAddressVerifiedUrl: '/m-users-a-verified_cardid.htm', //实名验证
            getVerifiedDataUrl : '/temp/skin1/html/address.json',    // 获取实名认证信息

            // 售后管理
            applyListUrl : '/m-users-a-apply_list.htm',
            // 购物车地址
            cartUrl : '/m-flow-a-cart.html',
            // 登录地址
            loginUrl:'/m-users-a-sign.html'

        },
        userAjax: {
            // ajax 方法
            getAjaxPromise: function (ajaxOptions, isAutoCallBack) {    // 统一 ajax 请求，返回 def
                isAutoCallBack = ((arguments.length) > 1) ? isAutoCallBack : true;
                var defaults = {
                    type: 'POST',
                    global: true,
                    dataType: 'json'
                };
                ajaxOptions = $.extend({}, defaults, ajaxOptions);
                var promise = $.ajax(ajaxOptions);
                if (isAutoCallBack) {
                    this.ajaxSuccessCall(promise);
                }
                return promise;
            },
            ajaxSuccessCall: function (promise) {
                // ajax 成功后自动回调
                var that = this;
                promise.done(function (result) {
                    if (result.status != 0) {
                        that.ajaxSuccessFailCall(result);
                    }
                });
            },
            ajaxSuccessFailCall: function (result) { // ajax 成功，返回数据 status !0 回调
                var errorMsg = result.msg;
                USER.otherGlobal.layerAlertReload(errorMsg);
            }
        },
        commissionForm: {
            // 佣金提现表单
            form: '',
            validate: function () {
                USER.otherGlobal.getMyValidate(this.form,{
                    rules: {
                        username: {
                            required: true,
                            rangelength: [2, 10]
                        },
                        bank: {
                            required: true
                        },
                        "bank-num": {
                            required: true,
                            digits: true
                        },
                        "bank-name": {
                            required: true,
                            rangelength: [5, 50]
                        },
                        money: {
                            required: true,
                            number: true
                        }
                    },
                    messages: {
                        username: {
                            required: "请输入名字",
                            rangelength: "姓名格式错误"
                        },
                        bank: {
                            required: "请选择银行"
                        },
                        "bank-num": {
                            required: "请输入银行卡号",
                            digits: "请输入正确的银行卡号"
                        },
                        "bank-name": {
                            required: "请输入开户行",
                            rangelength: "长度不符号"
                        },
                        money: {
                            required: "请输入提现金额",
                            digits: "请输入正确的提现金额"
                        }
                    }
                });
            },
            checkForm: function (formId) {
                // 佣金提现 方法
                var that = this;
                that.form = $("#" + formId);
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        that.validate();
                        $(".js_toCash").on("click", function () {
                            if (that.form.valid()) {
                                USER.userAjax.getAjaxPromise({
                                    url: USER.allAjaxUrl.commissionToCashUrl,
                                    data: that.form.serialize()
                                }, true)
                                .done(function (result) {
                                    if (result.status == 0) {
                                        // 提现成功
                                        USER.otherGlobal.openPop({
                                            end: function () {
                                                window.location.href = $("#js_pop").find(".js_getUrl").attr("href");
                                            }
                                        });
                                    }
                                })
                                .fail(function () {
                                    USER.otherGlobal.layerAlertReload("佣金提现失败，点击确定重试！");
                                });
                            }
                        });
                    });
            }
        },
        saleApplyForm: {
            // 售后form
            form: '',
            validate: function () {
                var that = this;
                USER.otherGlobal.getMyValidate(this.form,{
                    rules: {
                        status: {
                            required: true
                        },
                        reason: {
                            required: true
                        },
                        money: {
                            required: true,
                            number: true,
                            min: 0
                        },
                        message: {
                            required: true
                        },
                        num: {
                            number: true,
                            min: 1,
                            max: that.form.find(".js_numBox").data("max")
                        }
                    },
                    messages: {
                        status: {
                            required: "请选择货物状态"
                        },
                        reason: {
                            required: "请选择退款原因"
                        },
                        money: {
                            required: "请输入退款金额",
                            number: "请输入正确的退款金额",
                            min: "请输入正确的退款金额"
                        },
                        message: {
                            required: "请输入退款说明"
                        },
                        num: {
                            number: "请输入正确的退款数量",
                            min: "请输入正确的退款数量",
                            max: "请输入数量少于 {0}"
                        }
                    }
                });
            },
            bindNumModifiedEvent: function () {
                // 售后 修改数量事件
                var that = this;
                var $inputElm = that.form.find(".js_numBox");
                if($inputElm.length <=0) return;    // 暂时取消 修改数量操作
                if($inputElm[0].value == 1) that.form.find(".js_modifiedBox").addClass("disabled");

                this.form.find(".js_modifiedBox").on("click", function () {
                    if ($(this).hasClass("disabled")) return false;

                    var num;
                    var currentNum = $inputElm.val() || 1;

                    that.form.find(".js_modifiedBox").removeClass("disabled");

                    if ($(this).hasClass("js_minusBox")) {
                        // -
                        num = --currentNum;
                        if (currentNum == 1) that.form.find(".js_minusBox").addClass("disabled");
                    } else {
                        // +
                        num = ((++currentNum) >= $inputElm.data("max")) ? $inputElm.data("max") : currentNum;
                        if (currentNum == $inputElm.data("max")) {
                            that.form.find(".js_plusBox").addClass("disabled");
                        }
                    }
                    $inputElm[0].value = num;
                });

            },
            checkForm: function (formId) {
                // 售后form事件
                var that = this;
                that.form = $("#" + formId);
                that.bindNumModifiedEvent();
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        that.validate();
                        that.form.find(".js_submit").on("click", function (event) {
                            event.preventDefault();
                            if (that.form.valid()) {
                                that.form[0].submit();
                            }
                        });
                    });
            }
        },

        applyDetail : {
            // 售后详细页
            undoFormId :'',
            form: '',
            validate: function () {
                // 撤销售后验证
                USER.otherGlobal.getMyValidate(this.form,{
                    rules: {
                        cencel: {
                            required: true
                        }
                    },
                    messages: {
                        cencel: {
                            required: "请选择撤销原因"
                        }
                    }
                });
            },
            checkUndoForm: function () {
                // 撤销售后事件
                var that = this;
                that.form = $("#" + this.undoFormId);
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        that.validate();
                        $(".js_submit").on("click", function () {
                            if (that.form.valid()) {
                                USER.userAjax.getAjaxPromise({
                                    url: that.form.attr("action"),
                                    type: "GET",
                                    data:that.form.serialize()
                                }, true)
                                    .done(function (result) {
                                        if (result.status == 0) {
                                            USER.otherGlobal.layerAlertReload("撤销成功",USER.allAjaxUrl.applyListUrl);
                                        }
                                    })
                                    .fail(function(){
                                        USER.otherGlobal.layerAlertReload("撤销失败",USER.allAjaxUrl.applyListUrl);
                                    });
                            }
                        });
                    });
            },
            imgEvent : function () {
                // 图片
                $(".js_saleDetail").on("click",".img", function (event) {
                    event.preventDefault();
                    $(this).addClass("zoom");
                    $(this).siblings(".zoom").removeClass("zoom").find("img").stop().width(80).height(80 / 0.75);
                    var currentWidth = $(this).width();
                    currentWidth = (currentWidth == 80) ? 200 : 80;
                    $(this).find("img").stop().animate({
                        width : currentWidth + 'px',
                        height : (currentWidth / 0.75) + 'px'
                    },500);
                });
            },
            detailInit : function(undoFormId){
                // init
                this.undoFormId = undoFormId;
                this.checkUndoForm();
                this.imgEvent();
                $(".js_undo").on("click", function (event) {
                    // 撤销售后
                    event.preventDefault();
                    USER.otherGlobal.openPop({
                        title:"撤消售后申请",
                        area: ['500px', "330px"]
                    },true);
                });
            }
        },
        reviewForm: {
            // 评论form
            form: '',
            validate: function () {
                USER.otherGlobal.setValidateCnMessage();
                USER.otherGlobal.getMyValidate(this.form,{
                    rules: {},
                    messages: {}
                });
            },
            setStart: function ($elm, num) {
                var inputObj = $elm.siblings(".js_inputStart")[0];
                var itemValue = 20;
                $elm.removeClass("start_" + inputObj.value / itemValue).addClass("start_" + num);
                inputObj.value = num * itemValue;
            },
            bindEvent: function () {
                // 星星评分事件
                var that = this;
                var startW = 25;
                var timer = null;
                that.form.find(".js_start").click(function (event) {
                    var parentPageLeft = $(this).offset().left;
                    var xx = event.pageX - parentPageLeft;
                    var num = Math.ceil(xx / startW);
                    that.setStart($(this), num);

                    // 坑爹的快速评价星星同步
                    if ($(this).hasClass("js_parentStart")) {
                        that.form.find(".js_childStart").each(function () {
                            that.setStart($(this), num);
                        });
                    }
                });

                // 坑爹的快速评价内容同步
                that.form.find(".js_parent").keyup(function () {
                    var parentValue = this.value;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        that.form.find(".js_child").val(parentValue);
                    }, 200);
                });
            },
            checkForm: function (formId) {
                var that = this;
                that.form = $("#" + formId);
                that.bindEvent();
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        that.validate();
                        $(".js_submit").on("click", function () {
                            if (that.form.valid()) {
                                that.form[0].submit();

                                // do ....
                            }
                        });
                    });
            }
        },
        order: {
            // 订单相关操作
            /**
             *
             * @param $form 订单Sn
             */
            cancelOrderFormValidate : function ($form) {
                // 表单验证
                // alert("只会执行一次");
                var that = this;
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        that.cancelOrderFormValidateObj = USER.otherGlobal.getMyValidate($form,{
                            rules: {
                                cencel: {
                                    required: true
                                }
                            },
                            messages: {
                                cencel: {
                                    required: "请选择取消原因"
                                }
                            }
                        });
                        $form.find(".js_submit").on("click", function () {
                            if ($form.valid()) {
                                // 取消订单操作
                                USER.userAjax.getAjaxPromise({
                                    url: USER.allAjaxUrl.removeOrderUrl,
                                    type: "GET",
                                    data:$form.serialize()
                                }, true)
                                .done(function (result) {
                                    if (result.status == 0) {
                                        USER.otherGlobal.layerAlertReload("取消成功");
                                    }
                                })
                                .fail(function(){
                                    USER.otherGlobal.layerAlertReload("取消失败");
                                });
                            }
                        });
                    });
            },
            createCancelOrderForm : function () {
                // 创建表单jquery 对象
                var $form = $("<form />");
                $form.attr({
                    class : "user-global-form cancel-order-form none"
                }).html('<input type="hidden" name="is_auto" value="0"/><input type="hidden" name="order_sn" class="js_orderSn" value=""/><label><span class="form-label"><span class="required">*</span>取消原因</span><span class="reason-wrap"><select name="cencel"><option value="">请选择取消原因</option><option value="我不想买了">我不想买了</option><option value="信息填写错误，重新拍">信息填写错误，重新拍</option><option value="付款遇到困难">付款遇到困难</option><option value="4">拍错了</option><option value="重复下单">重复下单</option><option value="忘记使用优惠券">忘记使用优惠券</option><option value="其他原因">其他原因</option></select></span></label><p class="mt20"><span class="form-label">&nbsp;</span><a class="btn btn-default js_submit" href="javascript:;" onclick="return false;">确定</a><a class="btn btn-outline js_cancel ml30" href="javascript:;" onclick="return false;">取消</a></p>');

                $form.appendTo("body"); // layer
                this.cancelOrderFormValidate($form);    //表单验证
                return $form;
            },
            getCancelOrderForm : function () {
                // 获取取消表单对象
                if(typeof(this.cancelOrderForm) == "undefined"){
                    this.cancelOrderForm = this.createCancelOrderForm();
                }
                this.cancelOrderForm.find(".js_orderSn").val(this.orderSn);
                return this.cancelOrderForm;
            },
            remove: function (orderSn,isAuto) {
                if(! orderSn) return;
                this.orderSn = orderSn;
                if(isAuto){
                    // 自动取消
                    USER.userAjax.getAjaxPromise({
                        url: USER.allAjaxUrl.removeOrderUrl,
                        type: "GET",
                        data:{order_sn:this.orderSn,is_auto:1,cencel:'订单超时，系统自动处理为取消订单！'},
                        global: false
                    }, false);
                }else{
                    // 手动取消
                    var that = this;
                    USER.otherGlobal.openPop({
                        title: "取消订单",
                        content: this.getCancelOrderForm(),
                        area: ['500px', "240px"], //宽高
                        end: function () {
                            USER.otherGlobal.resetForm(that.cancelOrderForm[0],that.cancelOrderFormValidateObj);
                        }
                    }, true);
                }
            },
            buyAgain: function (orderSn) {
                // 再次购买
                if(! orderSn) return;

                USER.userAjax.getAjaxPromise({
                    url: USER.allAjaxUrl.buyAgainUrl,
                    data : {order_sn:orderSn},
                    type: "POST"
                }, true)
                .done(function (result) {
                    if(result.status == 0){
                        // 跳转购物车页面
                        window.location.href = USER.allAjaxUrl.cartUrl;
                    }
                })
                .fail(function(){
                    USER.otherGlobal.layerAlertReload("再次购买失败");
                });
            },
            /**
             * 未付款倒计时提示
             * @param elm 要放入的 dom 对象，
             * @param sytime 时间戳
             * @param orderSn 订单id，过期取消订单
             */
            expirationTime : function(elm,sytime,orderSn){
                // 未付款倒计时
                var that = this;
                var $this = $(elm);
                var currentT = GLOBAL.otherGlobal.getTime(sytime);
                if(currentT == false){
                    // 过期 取消订单
                    $this.parent().html('<span class="color-increase color_increase">订单已过期，被自动取消</span>');
                    that.remove(orderSn,true);
                    return false;
                }else{
                    $this.html(' <span class="color-increase">' + currentT.hours + '</span> 小时 <span class="color-increase">' + currentT.minutes + '</span> 分 <span class="color-increase">' + currentT.seconds + '</span> 秒');
                }
                sytime --;
                setTimeout(function () {
                    USER.order.expirationTime(elm,sytime,orderSn);
                },1000);
            },
            /**
             * 物流信息 20150915 ，区分订单多物流
             */
            shippingView: function (orderSn,shippingName,shippingNo) {
                var url,data;
                if(orderSn == undefined) {
                    // 多物流
                    url = USER.allAjaxUrl.shippingViewMoreUrl;
                    data = {
                        shipping_name : shippingName,
                        shipping_no : shippingNo
                    }
                }else{
                    url = USER.allAjaxUrl.shippingViewUrl;
                    data = {order_sn:orderSn}
                }
                USER.userAjax.getAjaxPromise({
                    url: url,
                    type: "POST",
                    data : data
                }, true)
                    .done(function (result) {
                        if (result.status == 0) {
                            if(result.msg == undefined || result.msg ==''){
                                layer.alert("物流单号有误，请联系客服！");
                                return false;
                            }
                            layer.open({
                                type: 2,
                                title: '物流信息 ' + '<span style="padding-left: 10px;font-size: 14px;">' + result.shipping + '</span>',
                                shadeClose: false,
                                shade: 0.8,
                                area: ['550px', '400px'],
                                content: result.msg,
                                success: function(layero){
                                    var $layerDiv = $("<div />").css({
                                        display: "block",
                                        position: "absolute",
                                        width: "476px",
                                        height: "65px",
                                        backgroundColor: "#FFF",
                                        bottom: "22px",
                                        left: "35px",
                                        zIndex: "99"
                                    });
                                    $(layero).find(".layui-layer-content").append($layerDiv);
                                }
                            });
                        }
                    })
                    .fail(function () {
                        USER.otherGlobal.layerAlertReload("获取数据失败，刷新重试");
                    });
            },
            // 确认收货
            confirmReceipt : function(orderId){
                USER.userAjax.getAjaxPromise({
                    url: USER.allAjaxUrl.confirmReceipt,
                    type: "POST",
                    data : {order_id : orderId}
                }, true).done(function (result) {
                    if(result.status == 0){
                        USER.otherGlobal.windowReload();
                    }
                })
            }
        },
        coupon: {
            getCoupon: function () {
                // 用户中心 去掉获取优惠券功能
                var url = $(this).attr("href");
                USER.userAjax.getAjaxPromise({
                    url: url,
                    type: "GET"
                }, true)
                .done(function (result) {
                    if (result.status == 0) {
                        // 领取优惠券成功提示
                        USER.otherGlobal.openPop({
                            title: "提示",
                            area: ['500px', "300px"], //宽高
                            end: function () {
                                USER.otherGlobal.windowReload();
                            }
                        }, false);
                    }
                });
            },
            exchangeCoupon: function (event) {
                // 兑换优惠券
                event.preventDefault();
                var $form = $("#exchange-coupon-form");
                if($form.find(".coupon-input").val() == ""){
                    layer.alert("请输入兑换码");
                }else{
                    USER.userAjax.getAjaxPromise({
                        url: $form.attr("action"),
                        data: $form.serialize()
                    }, true)
                    .done(function (result) {
                        if (result.status == 0) {
                            USER.otherGlobal.layerAlertReload("恭喜你兑换成功");
                        }
                    }).fail(function () {
                        USER.otherGlobal.layerAlertReload("兑换失败");
                    })
                }
            }
        },
        shippingAddrssManage: {
            // 收货地址管理
            parent: "",
            editClass: "js_edit",
            editFormId: 'delivery_address_form',
            verifiedFormId: 'verified-form',
            isEdit: function () {
                if ($("." + this.editClass).length > 0) {
                    $('html,body').scrollTop($("#" + this.editFormId).offset().top);
                }
            },
            init: function ($parent) {
                var that = this;
                this.parent = $parent;

                this.verifiedForm();  // 认证表单验证
                this.isEdit(); // 是否为edit 页面

                $parent.on("click", ".js_delete", function (event) {
                    // 删除
                    event.preventDefault();
                    that.deleteAddress($(this)[0], event);
                });
                $parent.on("click", ".js_verified", function (event) {
                    // 验证
                    event.preventDefault();
                    that.verified($(this)[0], event);
                });
                $parent.on("click", ".js_editVerified", function (event) {
                    // 验证
                    event.preventDefault();
                    that.editVerified($(this)[0], event);
                });

                $parent.on("click", ".js_setDefault", function (event) {
                    // 设置默认
                    event.preventDefault();
                    if($(this).hasClass("selected")) return false;
                    that.setDefault($(this)[0], event);
                });
            },
            deleteAddress: function (elm, event) {
                var that = this;
                layer.confirm('确定该条删除地址 ？', {
                    btn: ['确认', '取消'], //按钮
                    shade: 0.3 //不显示遮罩
                }, function () {
                    that.operate({
                        url: USER.allAjaxUrl.shippingAddressdeleteUrl,
                        data: {"address_id": $(elm).data("address-id")}
                    }).done(function (result) {
                        if (result.status == 0) {
                            // 删除收货地址成功
                            window.location.href = '/m-users-a-user_address.htm';
                        }
                    });
                }, function () {
                });
            },
            editVerified : function(elm, event){
                var self = this;

                /*
                USER.userAjax.getAjaxPromise({
                    url : USER.allAjaxUrl.getVerifiedDataUrl
                }).done(function (result) {
                    if(result.status == 0){
                        // 弹窗
                        self.verified(elm, event,result);
                    }
                })
                */
                self.verified(elm, event,$(elm).data("img-list"));
            },
            verified: function (elm, event,result) {
                var $parent = $("#js_pop");
                $parent.find(".js_name").text($(elm).data("username"));
                $parent.find(".js_cardId").text($(elm).data("card-id"));
                $parent.find(".js_cardId2").val($(elm).data("card-id"));
                $parent.find(".js_addressId").val($(elm).data("address-id"));

                if(result != undefined){
                    // 修改实名验证
                    (typeof(result) != "object") && (result = $.parseJSON(result));
                    var insertText = '',imgList = result;
                    for(var i=0;i<imgList.length;i++){
                        insertText += '<li><i class="user-icon icon-remove js_remove remove" data-delete-url = ' + imgList[i].delete_url + '></i><img src="' + imgList[i].img_url + '"/><input type="hidden" name="' + 'file[]" value="' + imgList[i].img_url + '"/></li>';
                    }
                    $parent.find('.js_files').append(insertText);
                }
                ($parent.find(".js_files").find("li").length >= 2) ? $parent.find(".file-upload-warp").hide() : $parent.find(".file-upload-warp").show();
                USER.otherGlobal.openPop({
                    title: "实名认证",
                    area: ['530px', "430px"], //宽高
                    end: function () {
                        // 只有新添加才执行图片删除操作
                        if(result == undefined){
                            $parent.find(".js_remove").each(function () {
                                USER.userAjax.getAjaxPromise({
                                    url: $(this).data("delete-url"),
                                    type: "GET",
                                    global: false
                                }, false);
                            });
                        }
                        $parent.find(".js_files").empty();
                        $parent.find(".error").hide();
                    }
                }, true);
            },
            setDefault: function (elm, event) {
                var bool = $(elm).hasClass("selected");
                this.parent.find(".js_setDefault").filter(".selected").removeClass("selected");
                $(elm).toggleClass("selected");
                var that = this;
                that.operate({
                    url: USER.allAjaxUrl.shippingAddressSetDefaultUrl,
                    data: {"address_id": $(elm).data("address-id"), "is_default": !bool}
                }).done(function (result) {
                    if (result.status == 0) {
                        // 修改默认成功
                        USER.otherGlobal.layerAlertReload("修改成功","/m-users-a-user_address.htm");
                    }
                });
            },
            operate: function (data) {
                data = $.extend({}, {type: "GET"}, data);
                var promise = USER.userAjax.getAjaxPromise(data, true);
                promise.fail(function () {
                    // 操作失败
                    layer.alert("操作失败，点击确定重试", function () {
                        window.location.reload(true);
                    });
                });
                return promise;
            },
            verifiedForm: function () {
                var that = this;
                $(".js_verifiedBtn").on("click", function () {
                    var $form = $("#verified-form");

                    if ($form.find(".js_remove").length == 2) {
                        // 提交数据
                        that.operate({
                            url: USER.allAjaxUrl.shippingAddressVerifiedUrl,
                            data: $("#" + that.verifiedFormId).serialize()
                        }).done(function (result) {
                            if (result.status == 0) {
                                // 认证成功
                                USER.otherGlobal.layerAlertReload("认证成功");
                            }
                        });
                    }else{
                        $form.find(".error").html('<span class="form-error" style="display: inline;">' + '请先上传身份证正反面2张照片' + '</span>').show();
                    }
                });
            }
        },
        profile: {
            profileFormObj: '',       // jQuery 对象
            changePassFormObj: '',    // jQuery 对象

            profileValidate: function () {
                USER.otherGlobal.getMyValidate(this.profileFormObj,{
                    rules: {
                        nickname: {
                            rangelength: [2, 25]
                        },
                        email: {
                            email: true
                        }
                    },
                    messages: {
                        nickname: {
                            rangelength: $.validator.format("昵称长度在 {0} 和 {1} 之间")
                        },
                        email: {
                            email: "请输入正确的邮箱地址"
                        }
                    }
                });
            },
            profileForm: function ($form) {
                var that = this;
                that.profileFormObj = $form;
                $form.find(".js_selected").on("click", function (event) {
                    event.preventDefault();
                    $(this).toggleClass("selected");
                    var childCheckbox = $(this).find("input").eq(0)[0];
                    childCheckbox.checked = !childCheckbox.checked;
                });

                $LAB.script("jquery.validate.min.js")
                    .script("laydate/laydate.dev.js")
                    .wait(function () {
                        that.profileValidate();

                        // var now = new Date();
                        // var max = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' 00:00:00';
                        
                        that.profileFormObj.find("#js_birthday").focus(function () {
                            laydate({
                                elem: '#js_birthday',
                                start:"1990-1-1 00:00:00",
                                max: laydate.now() //最大日期
                            });
                        });

                        $(".js_submit").on("click", function (event) {
                            event.preventDefault();
                            if (that.profileFormObj.valid()) {
                                that.profileFormObj[0].submit();
                                // do ....
                            }
                        });
                    });

            },
            changePassValidate: function () {
                USER.otherGlobal.getMyValidate(this.changePassFormObj,{
                    rules: {
                        current_password: {
                            required: true,
                            rangelength: [6, 16]
                        },
                        password: {
                            required: true,
                            rangelength: [6, 16],
                            notEqualTo: "#js_currentPass"
                        },
                        password_confirm: {
                            required: true,
                            rangelength: [6, 16],
                            equalTo: $("#js_password")
                        },
                        security_code: {
                            required: true
                        }
                    },
                    messages: {
                        current_password: {
                            required: "请输入当前密码",
                            rangelength: $.validator.format("密码长度在 {0} 到 {1} 个字符之间")
                        },
                        password: {
                            required: "请输入新密码",
                            rangelength: $.validator.format("密码长度在 {0} 到 {1} 个字符之间"),
                            notEqualTo: "请设置不同的密码"
                        },
                        password_confirm: {
                            required: "请确认密码",
                            rangelength: $.validator.format("密码长度在 {0} 到 {1} 个字符之间"),
                            equalTo: '请确认两次输入密码相同'
                        },
                        security_code: {
                            required: "请输入验证码"
                        }
                    }
                });
            },
            changePassEvent: function () {
                // 刷新验证码
                this.changePassFormObj.find(".js_refresh").click(function () {
                    var img = document.getElementById('img-verifycode');
                    img.src = img.getAttribute('data-src') + "&" + (new Date()).getTime();
                });
            },
            changePassForm: function ($form) {
                var that = this;
                that.changePassFormObj = $form;
                that.changePassEvent();
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        that.changePassValidate();
                        $(".js_submit").on("click", function (event) {
                            event.preventDefault();
                            if (that.changePassFormObj.valid()) {
                                // do ....
                                USER.userAjax.getAjaxPromise({
                                    url: USER.allAjaxUrl.changePasswordUrl,
                                    data: that.changePassFormObj.serialize()
                                }, true)
                                    .done(function (result) {
                                        if (result.status == 0) {
                                            USER.otherGlobal.openPop({
                                                area: ['500px', "300px"], //宽高
                                                end: function () {
                                                    USER.otherGlobal.windowReload(USER.allAjaxUrl.loginUrl);
                                                }
                                            });
                                        }
                                    })
                                    .fail(function () {
                                        USER.otherGlobal.layerAlertReload("密码修改失败，点击确定重试！");
                                    });
                            }
                        });
                    });
            },
            paymentForm: function ($form) {
                $LAB.script("jquery.validate.min.js")
                    .wait(function () {
                        jQuery.validator.addMethod("mobile", function(value, element) {
                            var length = value.length;
                            var mobile =  /^(((13[0-9]{1})|(15[0-9]{1})|(17[6-8]{1})|(14[5-7]{1})|(18[0-9]{1}))+\d{8})$/;
                            return (length == 11 && mobile.test(value));
                        }, "手机号码格式错误");

                        // 只做纯数字和纯字母判断
                        jQuery.validator.addMethod("passwordStrength", function(value, element) {
                            return (!(/^\d+$/.test(value)) && !(/^[a-zA-Z]+$/.test(value)));
                        }, "密码过于简单，请输入数字字母组合");

                        USER.otherGlobal.getMyValidate($form,{
                            rules: {
                                password: {
                                    required: true,
                                    maxlength: 6,
                                    notEqualTo: "#js_currentPass",
                                    passwordStrength : true
                                },
                                password_confirm: {
                                    required: true,
                                    maxlength: 6,
                                    equalTo: $("#js_password")
                                },
                                security_code: {
                                    required: true
                                },
                                phone:{
                                    required: true,
                                    mobile : true
                                },
                                phone_code:{
                                    required: true
                                }
                            },
                            messages: {
                                password: {
                                    required: "请输入新密码",
                                    maxlength: "密码长度必须6位",
                                    notEqualTo: "请设置不同的密码"
                                },
                                password_confirm: {
                                    required: "请确认密码",
                                    maxlength: "密码长度必须6位",
                                    equalTo: '两次输入密码不一致！'
                                },
                                security_code: {
                                    required: "请输入验证码"
                                },
                                phone:{
                                    required: "请输入手机号码"
                                },
                                phone_code:{
                                    required: "请输入短信验证码"
                                }
                            }
                        });

                        // 显示form
                        $(".js_showForm").on("click", function () {
                             $form.show();
                        });

                        // 刷新验证码
                        $form.find(".js_refresh").click(function () {
                            var img = document.getElementById('img-verifycode');
                            img.src = img.getAttribute('data-src') + "&" + (new Date()).getTime();
                        });

                        // 手机 + 验证码 获取短信
                        var $cElm = $(".js_phoneNum,.js_securityCode");
                        var $getPhoneCode = $(".js_getPhoneCode");
                        $cElm.keyup(function () {
                            var hasError = false; // 默认没有错误
                            $cElm.each(function () {
                                if($(this).val() == ''){
                                    hasError = true;
                                    return false;
                                }
                            });
                            // 上面验证通过验证手机
                            if(!hasError){
                                var mobile =  /^(((13[0-9]{1})|(15[0-9]{1})|(17[6-8]{1})|(14[5-7]{1})|(18[0-9]{1}))+\d{8})$/;
                                hasError = !(mobile.test($(".js_phoneNum").val()));
                            }

                            hasError ? $getPhoneCode.addClass("disabled") : $getPhoneCode.removeClass("disabled");
                        });

                        var codeTimer = null;
                        // 获取手机码
                        $getPhoneCode.on("click", function () {
                            if($(this).hasClass("disabled")){
                                return false;
                            }else{
                                USER.userAjax.getAjaxPromise({
                                    url : USER.allAjaxUrl.getPhoneCodeUrl,
                                    data : {
                                        phone:$form.find(".js_phoneNum").val(),
                                        type:1,
                                        code:$form.find(".js_securityCode").val()
                                    }
                                },false).done(function(result){
                                    if(result.status != 0){
                                        layer.alert(result.msg);
                                    }else{
                                        // 傻缺需求 ...
                                        var $codeLabel = $(".js_codeLabel");
                                        $getPhoneCode.addClass("disabled");
                                        $codeLabel.slideUp(200);
                                        var timer = 60;
                                        codeTimer = setInterval(function(){
                                            $getPhoneCode.text(timer);
                                            (timer == 0) && (clearInterval(codeTimer),$getPhoneCode.removeClass("disabled").text('获取短信验证码'),$codeLabel.slideDown(200));
                                            timer --;
                                        },1000);
                                    }
                                }).fail(function () {
                                    layer.alert("获取验证码失败");
                                });
                            }
                        });

                        // form submit
                        $form.find(".js_submit").on("click", function (event) {
                            event.preventDefault();
                            if ($form.valid()) {
                                USER.userAjax.getAjaxPromise({
                                    url: $form.attr("action"),
                                    data: $form.serialize()
                                }, true)
                                    .done(function (result) {
                                        if (result.status == 0) {
                                            USER.otherGlobal.layerAlertReload(result.msg);
                                        }
                                    })
                                    .fail(function () {
                                        USER.otherGlobal.layerAlertReload("修改支付密码失败，点击确定重试！");
                                    });
                            }
                        });
                    });
            }

        },
        otherGlobal: {
            layerIndex: "",    // 控制 弹窗关闭
            // window reload
            windowReload: function (url) {
                url = url || "";
                if (url === "") {
                    window.location.reload(true);
                } else {
                    window.location.href = url;
                }
            },

            layerAlertReload: function (msg, url) {
                url = url || "";
                layer.alert(msg, {
                    end: function () {
                        USER.otherGlobal.windowReload(url);
                    }
                }, function () {
                    USER.otherGlobal.windowReload(url);
                });
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
            // 其它后台操作
            setTopStep: function () {
                var $tmp = $(".js_topStepCurrent");
                var index = $tmp.index();
                $tmp.parent().children('span:lt(' + (index + 1) +')').addClass("active");
                var w = $tmp.offset().left - $tmp.siblings().eq(0).offset().left;
                $(".js_stepLine").width(w + 2);
            },

            setCheckBox: function () {
                // 模拟 checkbox 事件
                $(".js_checkbox").click(function () {
                    var o = $(this).siblings(".js_inputCheckbox")[0];
                    $(this).toggleClass("selected");
                    o.checked = !o.checked;
                });
            },
            // 中文提示错误
            setValidateCnMessage: function () {
                $.extend($.validator.messages, {
                    required: "请输入评价商品",
                    remote: "请修正该字段",
                    email: "请输入正确格式的电子邮件",
                    url: "请输入合法的网址",
                    date: "请输入合法的日期",
                    dateISO: "请输入合法的日期 (ISO).",
                    number: "请输入合法的数字",
                    digits: "只能输入整数",
                    creditcard: "请输入合法的信用卡号",
                    equalTo: "请再次输入相同的值",
                    accept: "请输入拥有合法后缀名的字符串",
                    maxlength: $.validator.format("请输入一个长度最多是 {0} "),
                    minlength: $.validator.format("请输入一个长度最少是 {0} "),
                    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间"),
                    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
                    max: $.validator.format("请输入一个最大为 {0} 的值"),
                    min: $.validator.format("请输入一个最小为 {0} 的值")
                });
            },

            // validator 默认设置
            getMyValidate : function ($form,options) {
                // 默认validate 方法
                jQuery.validator.addMethod("notEqualTo",function(value, element, param) {
                        return this.optional(element) || value!=$(param).val();
                    },"Each element should have a different value"
                );

                jQuery.validator.setDefaults({
                    debug: false,
                    success: "valid",
                    ignore: ""
                });

                options = $.extend({
                    errorClass: "form-error",
                    wrapper: "p",
                    success: function (label) {
                        label.remove();
                    },
                    errorPlacement: function (error, element) {
                        element.parent().parent().find(".error").remove();
                        error.prepend('<span class="span-form-label">&nbsp;</span>');
                        error.addClass("error").appendTo(element.parent().parent());
                    }
                },options);

                return $form.validate(options);
            },

            /**
             * reset validete 错误和表单
             * @param formObj 表单dom对象
             * @param formValidate validate对象
             */
            resetForm : function(formObj,formValidate){
                formObj.reset();            // form reset
                formValidate.resetForm();   // validate reset
            }
        }
    };

    $(function () {
        // 取消订单操作
        $(".js_deleteOrder").on("click", function (event) {
            event.preventDefault();
            USER.order.remove($(this).data("order-sn"));
        });

        // 再次购买操作
        $(".js_buyAgain").on("click", function (event) {
            event.preventDefault();
            USER.order.buyAgain($(this).data("order-sn"));
        });

        // 顶部步骤进度
        if($(".js_topStepCurrent").length > 0){
            USER.otherGlobal.setTopStep();
        }

        // 所有模拟 checkbox样式统一
        USER.otherGlobal.setCheckBox();

        // 未付款订单倒计时
        $(".js_syTime").each(function () {
            var $this = $(this);
            USER.order.expirationTime(this,$this.data("sytime"),$this.data("order-sn"));
        });

        // 查看物流
        $(".js-view-shipping").on("click", function () {
            USER.order.shippingView($(this).data("order-sn"),$(this).data("shipping-name"),$(this).data("shipping-no"));
        });

        // 确认收货
        $(".js_confirmReceipt").on("click", function () {
            var orderId = $(this).data("order-id");
            layer.confirm('确认收货 ？', {
                btn: ['确认','取消'],
                shade: 0.3
            }, function(){
                USER.order.confirmReceipt(orderId);
            }, function(){});
        });
    });

})(jQuery,window,$LAB);