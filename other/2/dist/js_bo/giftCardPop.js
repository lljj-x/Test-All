
/**
 * Created by Liu.Jun on 2015/10/6.
 */
(function ($) {
    "use strict";

    window.GiftCardForm = function (callBack) {
        this.callBack = callBack;
        return this;
    };

    GiftCardForm.prototype = {
        open : function () {
            var self = this;
            self.layerIndex = layer.open({
                title: "激活礼品卡",
                content: this.getForm(),
                area: ['450px', "290px"],
                end: function () {

                },
                type: 1,
                shadeClose: false
            }, true);
        },
        getForm : function () {
            if(typeof(this.form) == "undefined"){
                this.form = this.createForm();
            }
            return this.form;
        },
        createForm : function () {
            var $form = $("<form />");
            $form.attr({
                class : "gift-card-form none cart_global_form user-global-form"
            }).css({
                paddingLeft : "20px",
                paddingRight : "20px"
            })
            .html('<label><span class="form-label">礼品卡卡号：</span><span><input onkeyup="GLOBAL.otherGlobal.inputLimitedDigital(this)" maxlength="16" type="text" name="code" placeholder="请输入16位卡号"></span></label><label><span class="form-label">激活码：</span><span><input onkeyup="GLOBAL.otherGlobal.inputToUpperCase(this)" maxlength="6" type="text" name="pass" placeholder="请刮开礼品卡背面的激活码"></span></label><p class="mt20"><span class="form-label">&nbsp;</span><a class="btn btn-default js_submit" href="javascript:;" onclick="return false;">确定</a><a class="btn btn-outline js_cancel ml30" href="javascript:;" onclick="return false;">取消</a></p>');
            $form.appendTo("body"); // layer
            this.validate($form);    //表单验证
            return $form;
        },
        formReset : function ($form) {
            this.formValidate.resetForm();
            $form[0].reset();
        },
        validate : function ($form) {
            var self = this;
            $LAB.script("jquery.validate.min.js").wait(function () {
                $.validator.setDefaults({
                    debug: false,
                    success: "valid"
                });
                self.formValidate = $form.validate({
                    errorClass: "form-error",
                    wrapper: "p",
                    success: function(label) {
                        label.remove();
                    },
                    errorPlacement: function(error, element) {
                        element.parent().parent().find(".error").remove();
                        error.prepend('<span class="span-form-label">&nbsp;</span>');
                        error.addClass("error").appendTo(element.parent().parent());
                    },
                    rules:{
                        code : {
                            required:true,
                            rangelength: [16,16],
                            digits:true
                        },
                        pass :{
                            required:true,
                            rangelength: [6,6]
                        }
                    },
                    messages:{
                        code: {
                            required:"请输入礼品卡卡号",
                            rangelength: "请输入正确的礼品卡卡号",
                            digits : "礼品卡卡号为数字"
                        },
                        pass: {
                            required: "请输入礼品卡密码",
                            rangelength:"请输入正确的礼品卡密码"
                        }
                    }
                });

                // 取消
                $form.find(".js_cancel").click(function () {
                    self.formReset($form);
                    layer.close(self.layerIndex);
                });

                // 确定
                $form.find(".js_submit").on("click", function () {
                    if($form.valid()){
                        self.callBack.call($form,self.layerIndex);
                    }
                });
            });
        }
    }
})(jQuery);