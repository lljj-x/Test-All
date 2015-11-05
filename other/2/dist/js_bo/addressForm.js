/**
 * Created by Liu.Jun on 2015/7/20.
 */

/**
 * 联动菜单
 * @param options
 */
$.fn.setCityMenu = function (options) {
    options = $.extend({},{
        ajaxUrl : '/fun/index.php?act=GetAddressList',
        elmProvince : ".selected_province",
        elmCity : ".selected_city",
        elmDistrict : ".selected_district"
    },options);
    var $province = $(this).find(options.elmProvince);
    var $city = $(this).find(options.elmCity);
    var $district = $(this).find(options.elmDistrict);

    var renderElm  = function(jQelm,dataList){
        var listText = '<option value="default">' + jQelm.find("option:first").text() + '</option>';

        for(var i = 0; i < dataList.length; i++ ){
            listText += '<option value="' + dataList[i].id + '">' + dataList[i].value + '</option>';
        }
        jQelm.html(listText );
    };

    var getData = function(cid,successCall){
        $.ajax({
            url : options.ajaxUrl,
            type: 'POST',
            global: false,
            data: {id: cid},
            dataType: 'json'
        })
            .done(function (result) {
                if(result.status == 0){
                    successCall(result);
                }else{
                    layer.alert(result.msg,function(){
                        window.location.reload(true);
                    });
                }
            })
            .fail(function () {
                layer.alert("获取城市列表失败, 点击确定刷新重试",function(){
                    window.location.reload(true);
                });
            });
    };

    $province.change(function (e) {
        var value = this.value;
        if(value === "" || value == "default" ){
            $city.parent().hide();
        }else{
            getData(value, function (result) {
                    renderElm($city,result.data.city_list);
                    $city.parent().show();
                }
            );
        }
        $district.parent().hide();
    });

    $city.change(function (e) {
        var value = this.value;
        if(value !="" && value != "default" ){
            getData(value, function (result) {
                    renderElm($district,result.data.city_list);
                    if(result.data.city_list.length <= 0){
                        $district.val("default").parent().hide();
                    }else{
                        $district.parent().show();
                    }
                }
            );

        }else{
            $district.parent().hide();
        }
    });
};

/**
 * 单独 user 公用
 * 收货地址form，需要使用的时候实例化改对象
 * @param jQaddressForm (form jQ 对象)
 * @returns {window.ADDRESSFORM}
 * @constructor
 */
window.ADDRESSFORM = function(jQaddressForm,callBack){
    // debug
    // address form 表单，包括了保存方法
    if(jQaddressForm.length <= 0) return;

    this.form = jQaddressForm;
    this.callBack = callBack || $.noop;
    this.formValidate = "";
    this.submitBtn = this.form.find(".address_confirm_submit");
    var that = this;

    $LAB.script("jquery.validate.min.js")
        .wait(function () {
            that.init();
        });
    return this;
};
ADDRESSFORM.prototype = {
    init : function () {
        this.validate();        // 表单验证
        this.bindSaveEvent();   // 表单事件
        this.form.find(".select_address").setCityMenu();    // 菜单联动
    },

    bindSaveEvent : function () {
        var that = this;
        this.submitBtn.on("click", function (e) {
            e.preventDefault();
            var a = that.form.valid();
            var b = that.selectValidate();
            if(a && b){
                //修改为 验证成功后回调
                that.callBack.call(that.form[0]);
            }
        })
    },
    selectValidate : function () {
        var $parent = $(".js_select_address");
        $parent.find(".form-error").removeClass("form-error");
        $parent.find('p.error').remove();
        var isError = true;

        $parent.find(".item-select").each(function () {
            var $this = $(this);
            if($this.is(":visible") && (this.value == "default" )) {    // 傻缺 ie9
                $this.addClass("form-error");
                $this.parent().parent().append('<p class="error"><span class="span-form-label">&nbsp;</span><label class="form-error" style="display: inline;">请选择</label></p>');
                isError = false;
                return false;
            }
        });
        return isError; 
    },
    selectChangeValidate : function () {
        var that = this;
        $(".item-select").change(function () {
            setTimeout(function () {
                that.selectValidate();
            },80);
        })
    },
    validate : function(){
        // 收货表单验证
        // 手机
        this.selectChangeValidate(); //待修改

        jQuery.validator.addMethod("mobile", function(value, element) {
            var length = value.length;
            var mobile =  /^(((13[0-9]{1})|(15[0-9]{1})|(17[6-8]{1})|(14[5-7]{1})|(18[0-9]{1}))+\d{8})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "手机号码格式错误");

        // 身份证
        jQuery.validator.addMethod("idnumber", function(value, element) {
            var idnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return this.optional(element) || (idnumber.test(value));
        }, "身份证号码格式错误");

        // 电话
        //jQuery.validator.addMethod("telphone", function(value, element) {
        //    var telphone = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
        //    return this.optional(element) || (telphone.test(value));
        //}, "电话号码格式错误");

        $.validator.setDefaults({
            debug: false,
            success: "valid",
            ignore: ".item-select"
        });

        this.formValidate = this.form.validate({
            errorClass: "form-error",
            wrapper: "p",
            success: function(label) {
                label.remove();
            },
            groups: {
                // city: "province city district",
                num:"areacode telephone ext"
            },
            errorPlacement: function(error, element) {
                element.parent().parent().find(".error").remove();
                error.prepend('<span class="span-form-label">&nbsp;</span>');
                error.addClass("error").appendTo(element.closest(".js_formRow"));
            },
            rules:{
                //province:{
                //    required: true
                //},
                //city: {
                //    required:  true
                //},
                //district: {
                //    required: true
                //},
                addressline : {
                    required:true,
                    rangelength: [5,50]
                },
                username:{
                    required:true,
                    rangelength: [2,15]
                },
                tel :{
                    required: function () {
                        return ($("input[name=telephone]").val() == "") ;
                    },
                    mobile : true,
                    rangelength: [11,11]
                },
                areacode: {
                    required: function () {
                        return ! ($("input[name=telephone]").val() == "") ;
                    },
                    digits:true,
                    rangelength: [3,4]
                },
                telephone: {
                    required: function () {
                        return ! ($("input[name=areacode]").val() == "") ;
                    },
                    rangelength: [7,8]
                },
                ext: {
                    digits:true,
                    rangelength: [1,4]
                },
                "card_id":{
                    required:true,
                    idnumber:true
                }

            },
            messages:{
                //province:{
                //    required:"请选择地址1"
                //},
                //city: {
                //    required:"请选择地址2"
                //},
                //district: {
                //    required:"请选择地址3"
                //},
                addressline : {
                    required: "请输入详细地址",
                    rangelength: "详细地址长度在 5 - 50 个字符",
                    maxlength:"详细地址长度在 5 - 50 个字符"
                },
                username : {
                    required: "请输入名字",
                    rangelength: "姓名长度在2 - 15 个字符",
                    maxlength:"姓名长度在2 - 15 个字符"
                },
                tel:{
                    required: "请输入手机号码",
                    mobile : "请输入正确的电话号码",
                    rangelength:"请输入正确的电话号码",
                    maxlength:'请输入正确的电话号码'
                },

                areacode: {
                    required : "请输入区号",
                    digits:"请输入正确的区号",
                    rangelength: "请输入正确的区号",
                    maxlength:"请输入正确的区号"
                },
                telephone: {
                    rangelength: "请输入正确的电话号码",
                    required: "请输入电话号码",
                    maxlength:"请输入正确的电话号码"
                },
                ext: {
                    digits:"请输入正确的分机号码",
                    maxlength:"请输入正确的分机号码",
                    rangelength: "请输入正确的分机号码"
                },
                "card_id": {
                    required: "请输入身份证号码",
                    idnumber: "请输入正确的身份证号码",
                    maxlength:"请输入正确的身份证号码"
                }
            }
        })
    },
    formReset: function(){
        // 单独 select
        $(ORDERADDRESS.addressFormId)[0].reset(); // reset 表单数据
        var $isDefaultInput = $(ORDERADDRESS.addressFormId).find("input[name=is_default_address]");
        var $isDefault = $isDefaultInput.siblings(".icon_checkbox");
        ($isDefaultInput[0].checked) ? $isDefault.addClass("selected") : $isDefault.removeClass("selected");

        var $parent = $(".js_select_address");
        $parent.find(".form-error").removeClass("form-error");
        $parent.find('p.error').remove();
        $parent.find(".nselect_wrap").not(":first").hide();
        $parent.find(".selected_province")[0].value = "default";

        this.formValidate.resetForm();
    }

    /*  // 修改为返回完整json
     formToJson: function (data) {
     data=data.replace(/&/g,"\",\"");
     data=data.replace(/=/g,"\":\"");
     data="{\""+data+"\"}";
     return data;
     },

     // 保存成功后的回调
     // data= decodeURIComponent(data,true);    // 防止中文乱码
     // var json=this.formToJson(data);         // 转化为json
     GLOBALAJAX.render(result,[]);           //
     }
     */
};

$(function () {
    // 模拟
    GLOBAL.otherGlobal.myPlaceholder.init($(".js_myPlaceholder"),31);
});
