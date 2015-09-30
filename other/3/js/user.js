$(function(){
    
    /*
        上传头像
    */

    $('#imgUpload').hover(function(){
        $('#hintUpload').slideDown();
    },function(){
        $('#hintUpload').slideUp();
    });
    
    
    $('#imgUpload').click(function(){
        var host = window.location.host;
        var hostIndex = host.indexOf('.') + 1;
        document.domain = host.substr(hostIndex);
        var layerApi = $.layer({
            type : 2,
            title : false,
            shade : [0.8 , '#000' , true],
            border : [1, 1, '#ddd', true],
            offset : [($(window).height()-530)/2 - 20 + 'px', ''],
            area : ['870px' , '530px'],
            iframe:{src: $("#pop_upImg").attr("href")}
            
        });
        
        $('#new_bumen_cancel').click(function(){
            layer.close(layerApi);
        });

        return false;
    });
    
    /*
        My Account
    */
    $('#myAccount .title li').click(function(){
        $('#myAccount .title li').removeClass('on');
        $(this).addClass('on');
        var index = $(this).index();
        $('#myAccount .cnt').hide();
        $('#myAccount .cnt').eq(index).fadeIn();
    });
    
    $("#js_userNameText").hover(function(){
            var offset = $(this).offset();

            if(offset && $(this).width() >= 280){
                $('body').append('<div class="tooltip-inner" style="position:absolute; left:'+(offset.left+10+ $(this).width())+'px;top:'+ offset.top+'px;' +' padding: 3px 8px; background-color:#fff; color:#333; border-radius:4px; border:1px solid #ccc;"><div style="position:absolute; top:50%; left:-5px; margin-top:-5px; width:0; height:0; border-width:5px 5px 5px 0; border-style:solid; border-color:transparent #999 transparent transparent;"></div><div style="position:absolute; top:50%; left:-4px; margin-top:-5px; width:0; height:0; border-width:5px 5px 5px 0; border-style:solid; border-color:transparent #fff transparent transparent;"></div>'+ $(this).data("text") +'</div>');
            }
    },function(){
        $('body').find('.tooltip-inner').hide();
    })
    
    
    //my order page===================================
    //删除订单
    $(".js_cancelOrder").click(function(){
        var $this = $(this);
        var orderId = $this.attr("data-orderid");
        var url='m-users-a-cancel_order-order_id-'+orderId;
        delOrderPop(url);
    });
    //取消删除订单
    $("body").on("click",".cancelOrder_btns .no",function(){
        layer.close(delOrderPopIndex);
    });
    //确认删除
    $("body").on("click",".cancelOrder_btns .yes",function(){
        var reason = $("#delOrderReason").val();
        if(reason==0){
            $("p.cancleOrderMsg").html("Please select a reason!");
        }else{
            window.location.href=$(this).attr("data-url")+'-reason_id-'+reason+'.htm';
        }
    });
    //选择原因
    $("body").on("change","#delOrderReason",function(){
        $(".cancleOrderMsg").html('');
    });
    //删除已经取消的订单
    $(".js_deleteOrder").on("click",function(){
        var $thisBtn = $(this);
        var url ='/'+ JS_LANG +'m-users-a-delete_order.htm?order_id='+$thisBtn.attr('data-orderid');
        var options = {
            title: jsLg.user.deletCancleOrdeTitle,
            area : ['460px', 'auto'],
            dialog : {
                msg:jsLg.user.deletCancleOrde,
                btns : 2,
                type : 4,
                btn : [jsLg.yes,jsLg.no],
                yes : function(index){ 
                    location.href=url;
                },
                no : function(index){
                    layer.close(index);
                }
            }
        }

        GLOBAL.PopObj.confirm(options);
    });
    //订单详情页面，buyer's show
    function popUpbox(url,width,height){
        
    }
    $(".js_showBuyerShow").on("click",function(){
        var url = $(this).attr('href');
       
        $.layer({
            type : 2,
            title : ['',false],
            iframe : {src : url},
            shade : [0.8 , '#000' , true],
            border:[0],
            area : ['700px' , '400px'],
            offset : [($(window).height()-400)/2 +"px", ''],
            close : function(index){
                layer.close(index);
            }
        });
        return false;

        
    })
    
    //Account Setting page===================================
    //个人信息验证
    if ($("#checkprofile").length>0){
        $("#checkprofile").validate({
            rules: {
                firstname: {
                    required: true,
                    maxlength: 60
                }
            },
            messages: {
                firstname: {
                    required: jsLg.formMsg.firstname_msg,
                    maxlength: jsLg.formMsg.firstname_maxlength_msg
                }
            },
            errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.attr("class","error").appendTo(element.parent());

            },
            success: function(label) {
                label.html("").attr("class","checked");
            }
        });
    }
    
    /*邮箱验证*/
    if ($("#email_confirmed").length>0){
        $("#email_confirmed").validate({
            rules: {
                email: {
                    required: true,
                    maxlength: 60,
                    email: true
                }
            },
            messages: {
                email: {
                    required: jsLg.formMsg.email_msg,
                    maxlength: jsLg.formMsg.email_maxlength_msg
                }
            },
            errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.attr("class","error").appendTo(element.parent());

            },
            success: function(label) {
                label.html("").attr("class","checked");
            },

            submitHandler: function() {
                var $inputCode = $('#input_code');
                var $inputInit = $('#init_send');
                var $inputEmeil = $('#input_user_email');
                var $strongEmeil = $('#email_confirmed .user_email');
                $('#email_code').slideDown();
                $inputCode.focus();
                $('#click_here').click(function(){//点击重发email
                    $inputCode.val('').focus();
                    $inputInit.val('1');
                    $strongEmeil.html($inputEmeil.val());
                });
                if($inputEmeil.val() != $strongEmeil.html()) {//更改了用户email重发
                    $inputCode.val('').focus();
                    $inputInit.val('1');
                    $strongEmeil.html($inputEmeil.val());
                }
                var init = $inputInit.val();
                $.post(DOMAIN + '/m-users-a-edit_email.htm', $('#email_confirmed').serialize(), function(data) {
                    if (init != '1') {
                        data = eval('(' + data + ')');
                        if (data.success == '0') {//失败
                            alert(data.error);
                        } else {
                            window.location.href = DOMAIN + '/my-profile.html';//成功后刷新当前页
                        }
                    }
                    $inputInit.val('0');
                });
            }
            
        });
    }
    
    
    
    //更改密码
    if($("#modpassword").length>0){
         $("#modpassword").validate({
            rules: {
                old_password: {
                    required: true,
                    maxlength: 60,
                    minlength: 6
                },
                new_password: {
                    required: true,
                    maxlength: 60,
                    minlength: 6
                },
                comfirm_password: {
                    required: true,
                    minlength: 6,
                    maxlength: 60,
                    equalTo: "#new_password"
                }
            },
            messages: {
                old_password: {
                    required: jsLg.formMsg.password,
                    minlength: jsLg.formMsg.password_minlength,
                    maxlength: jsLg.formMsg.passwor_maxlength
                   
                },
                new_password: {
                    required: jsLg.formMsg.password,
                    minlength: jsLg.formMsg.password_minlength,
                    maxlength: jsLg.formMsg.passwor_maxlength
                },
                comfirm_password: {
                    required: jsLg.formMsg.password_repeat,
                    minlength:jsLg.formMsg.password_minlength,
                    maxlength:jsLg.formMsg.passwor_maxlength,
                    equalTo: jsLg.formMsg.password_equalTo
                }
            },errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.attr("class","error").appendTo(element.parent());

            },
            success: function(label) {
                label.html("").attr("class","checked");
            }
        });
    }
    
    var addrObject = {
        billAction:"m-users-a-edit_billing_address.htm",
        shipAction:"m-users-a-edit_address.htm"
    };
    //通讯地址
    //添加一个billing address
    $("#addBillingAddr").click(function(){
        var options={
            showSameShipAddr:1,
            formAction:addrObject.billAction,
            scrollElemt:"#shipping_address_wrap"
        }
        $('#bill_address_checkbox').attr('checked', false);;
        //显示编辑框
        showEditBillForm(options);
        $("#address_id").val(0);
    });
    
    
    //添加一个Shipping address
    $("#addShipAddr").click(function(){
        var options={
            showSameShipAddr:0,
            formAction:addrObject.shipAction,
            scrollElemt:"#shipping_address_wrap"
        }
        var $ship_addr_btns = $("#ship_addr_list").find(".addr_list_btns");
        //如果编辑和删除按钮隐藏了，显示出来
        if(!$ship_addr_btns.is(":visible")){
            $ship_addr_btns.show();
        }
        //显示编辑框
        showEditBillForm(options);
        $("#address_id").val(0);
    });
    
    
    //编辑address
    $(".js_attr_editBtn").click(function(){
        $('.theAddressForm').find('label').remove();
        var type = $(this).attr("data-type");
        var options={
            showSameShipAddr:type,
            formAction:(type==1)?addrObject.billAction : addrObject.shipAction,
            scrollElemt:"#shipping_address_wrap"
        };
        var addrInfo = null;
        //显示编辑框
        showEditBillForm(options);
        //获得地址信息
        addrInfo=getAddrInfo($(this).parents(".list"));
        //编辑地址信息
        editAddrInfo(addrInfo);
        $('.info .list').removeClass('list_on');
        $(this).parents(".list").addClass("list_on");
    });
    
    //删除address
    $('.js_attr_deleteBtn').click(function(){
        if (confirm(jsLg.user.deleteAddress)) {
            var addrId = $(this).attr('data-addrId');
            window.location.href='m-users-a-drop_consignee-id-'+addrId+'.htm';
        }
    });
    
    
    $(".choiceCountry").each(function(i,v){
        $(this).change(function(){
            $(this).parent().find("label.error ").remove();
            GLOBAL.CountryChange({country_id:this.value,address_id:$(this).data("key")})
        });
    });
     //收获地址验证
    $(".theAddressForm").each(function(){
         $(this).validate({
            rules: {
                firstname: {
                    required: true,
                    maxlength: 35,
                    checkUserName:true,
                    minlength:2
                },
                lastname: {
                    required: true,
                    maxlength: 35,
                    checkUserName:true,
                    minlength:2
                },
                tel:{
                    required: true,
                    digits:true,
                    maxlength: 15,
                    minlength: 7
                },
                email: {
                    required: true,
                    maxlength: 60,
                    email: true
                },
                //addressline1: {required: true,maxlength: 120},
                addressline1: {
                    required: true,
                    checkAddress:true,
                    maxlength: 35
                },
                addressline2: {
                    checkAddress:true,
                    maxlength: 35
                },
                city: {
                    required: true,
                    maxlength: 35
                },
                province: {
                    required: true,
                    maxlength: 35
                },
                country: {
                    required: true
                },
                zipcode: {
                    required: true,
                    maxlength: 10
                }
            },
            messages: {
                firstname: {
                    required: jsLg.formMsg.firstname_msg,
                    maxlength: jsLg.formMsg.firstname_maxlength_msg,
                    minlength: jsLg.formMsg.Enter_at_least
                },
                lastname: {
                    required: jsLg.formMsg.lastname_msg,
                    maxlength: jsLg.formMsg.lastname_maxlength_msg,
                    minlength: jsLg.formMsg.Enter_at_least
                },
                tel: {
                    required: jsLg.formMsg.tel_msg,
                    digits:jsLg.formMsg.digits,
                    maxlength: jsLg.formMsg.tel_maxlength_msg,
                    minlength: jsLg.formMsg.tel_minlength_msg
                },
                email: {
                    email: jsLg.formMsg.email_require_msg,
                    required: jsLg.formMsg.email_require_msg,
                    maxlength: jsLg.formMsg.email_maxlength
                },
                //addressline1: {required: addressline1_msg,maxlength: addressline1_maxlength_msg},
                addressline1: {
                    required: jsLg.formMsg.addressline1_msg,
                    maxlength: jsLg.formMsg.addressline1_maxlength_msg
                },
                addressline2: {
                    maxlength: jsLg.formMsg.addressline2_maxlength_msg
                },
                city: {
                    required: jsLg.formMsg.city_msg,
                    maxlength: jsLg.formMsg.city_maxlength_msg
                },
                province: {
                    required: jsLg.formMsg.province_msg,
                    maxlength: jsLg.formMsg.province_maxlength_msg
                },
                country: {
                    required:jsLg.formMsg.country_msg
                },
                zipcode: {
                    required: jsLg.formMsg.zipcode_msg,
                    maxlength: jsLg.formMsg.zipcode_maxlength_msg
                }
            },errorPlacement:function(error,element){
        

                element.parent().find("label.checked").remove();
                element.parent().find('label.error1').remove();
                error.attr("class","error").appendTo(element.parent());

            },
            success: function(label) {
                
                label.not('label.error1').remove();
            }
        });
    }); //收获地址验证结束
        function SetAddress(obj,maxSize,errorMsg){
            this.obj = $(obj);
            this.maxSize = maxSize;
            this.msg = errorMsg;
            this.ini();
        }
        SetAddress.prototype.ini = function(){
            var that = this;

            $.each(this.obj, function(index, val) {
                /* iterate through array or object */

                $(val).keyup(function(event) {

                    var $this = $(this),
                        thisParent = $this.parent();
                    var val = $this.val();

                    

                    //限制最大字符数
                    $this.prop("maxlength",that.maxSize+1);
                    
                    //如果输入超出最大字符数
                    if($.trim(val).length>=that.maxSize){

                        //移除验证插件的提示
                        thisParent.find('label.error').remove();

                        //保证只插入一次提示语
                        if(thisParent.find('label.error1').length<1){
                            $('<label class="error1" style="color:#f37172;font-weight:bold;">'+that.msg+'</label>').appendTo(thisParent);

                            //2500毫秒后隐藏
                            setTimeout(function(){
                                thisParent.find('label.error1').fadeOut(function(){
                                    $(this).remove();
                                })
                            }, 2500);

                        }
                    }else{

                        thisParent.find('label.error1').remove();
                    }

                    
                })
            });
        };

        new SetAddress($("input[name=addressline1]"),36,jsLg.formMsg.adres1_to_adres2);

    
    //是否开启同步shipping address
    $("#bill_address_checkbox").click(function(){
        addrObject.sameShipFlag = this.checked;
        var $ship_addr_btns = $("#ship_addr_list").find(".addr_list_btns");
        //如果开启
        if(addrObject.sameShipFlag){
            //隐藏Shipping Address编辑和删除按钮
            $ship_addr_btns.hide();
            
            //如果shipping address有地址了，默认把第一个地址赋值给表单,否则清空表单
            if($("#ship_addr_list").find('.list').length>0){
                $("#ship_addr_list").find('.list').eq(0).trigger("click");
                scrollToElem("#ship_addr_list");
            }else{
                clearFom("#addressfrom");
            }
            
        //如果不开启
        }else{
            //显示Shipping Address编辑和删除按钮
            $ship_addr_btns.show();
            if($(".js_billingAttr_edit").length>0){
                $(".js_billingAttr_edit").eq(0).trigger("click");
            }else{
                clearFom("#addressfrom");
            }
            scrollToElem("#shipping_address_wrap");
        }

    });
    
    
    //如果开启了同步shipping address功能，点击shipping address列表直接赋值
    $("#ship_addr_list").find('.list').click(function(){
        if(addrObject.sameShipFlag){
            var options={
                showSameShipAddr:1,
                formAction:addrObject.billAction,
                scrollElemt:"#shipping_address_wrap"
            };
            var addrInfo = null;
            //显示编辑框
            showEditBillForm(options);
            //获得地址信息
            addrInfo=getAddrInfo($(this));
            //编辑地址信息
            editAddrInfo(addrInfo);
            $(this).addClass("list_on");
            
        }
    });
    
    //更改邮箱
    if ($("#changUserEmailForm").length>0){
        $("#changUserEmailForm").validate({
            rules: {
                existing_password: {
                    required: true,
                    minlength:6,
                    maxlength: 60
                },
                new_email:{
                    required: true,
                    maxlength: 60,
                    email: true
                }
            },
            messages: {
                existing_password: {
                    required: jsLg.formMsg.password,
                    minlength: jsLg.formMsg.password_minlength,
                    maxlength: jsLg.formMsg.passwor_maxlength
                },
                new_email: {
                    required: jsLg.formMsg.email_require_msg,
                    email: jsLg.formMsg.email_require_msg,
                    maxlength: jsLg.formMsg.email_maxlength
                }
            },
            errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.attr("class","error").appendTo(element.parent());

            },
            success: function(label) {
                label.html("").attr("class","checked");
            }
        });
    }
    
    $('#helpDom').hover(function(){
        $('#helpBox').show();
    },function(){
        $('#helpBox').hide();
    });
    
    $('#helpBox').hover(function(){
        $(this).show();
    },function(){
        $(this).hide();
    });
    
    /*分享*/
    $(".js_shareLink").find(".share").click(function(){
        setSharefun($(this));
        return false;
    });
    
    /*my share free 问答*/
    $('.js_FAQs').find('a').click(function(){
        var $parent = $(this).parent();
        $parent.find('.cnt_down').slideToggle();
        return false;
    });
    
    
    
    //元素懒加载
    GLOBAL.lazyLoad.creatEle("textarea.js_slideFav",scrollCallBackFav);
    function scrollCallBackFav(){
        $(".scrollFav").flexslider({
            namespace:"",
            animation: "slide",
            selector: ".slides > li",
            pauseOnAction:false,
            controlNav:false,
            itemWidth: 100,
            animationLoop:false,
            minItems: 4,
            maxItems: 6
        });
    }
    
    //元素懒加载
    GLOBAL.lazyLoad.creatEle("textarea.js_slideShows",scrollCallBackShows);
    function scrollCallBackShows(){ 
        $(".scrollShows").flexslider({
            namespace:"",
            animation: "slide",
            selector: ".slides > li",
            pauseOnAction:false,
            controlNav:false,
            itemWidth: 100,
            animationLoop:false,
            minItems: 1,
            maxItems: 3
           
        });
    }
    
    //元素懒加载
    GLOBAL.lazyLoad.creatEle("textarea.js_slideHistory",scrollCallBackHistory);
    function scrollCallBackHistory(){
        $(".scrollHistory").flexslider({
            namespace:"",
            animation: "slide",
            selector: ".slides > li",
            pauseOnAction:false,
            controlNav:false,
            itemWidth: 110,
            animationLoop:false,
            minItems: 9,
            maxItems: 20
        });
    }
    
    //元素懒加载
    GLOBAL.lazyLoad.creatEle("textarea.js_slideSimilar",scrollCallBackSimilar);
    function scrollCallBackSimilar(){
        $(".similarBox").flexslider({
            namespace:"",
            animation: "slide",
            selector: ".slides > li",
            pauseOnAction:false,
            controlNav:false,
            animationLoop:false,
            slideshow:false,
            itemWidth: 160,
            minItems: 3,
            maxItems: 4
        });
    }
    
    $('.js_useDown').hover(function(){
        $(this).parents('.ico').find('.useDown').show();
    }, function(){
        $(this).parents('.ico').find('.useDown').hide();
    });
    $('.useDown').hover(function(){
        $(this).show();
    }, function(){
        $(this).hide();
    });
    
    /*
        reviews
    */
    $('.js_review').click(function(){
        $('.js_wReview').slideUp();
        $(this).parents('.list').find('.js_wReview').slideToggle();
    });
    
    
    //buyer's show
    
    (function(){
        var $js_ptoTagBox = $(".js_ptoTagBox");
        $js_ptoTagBox.click(function(){
                var url = $(this).attr('href');
                var uploadmsg_goods_id = $(this).attr('uploadmsg_goods_id');
                if (uploadmsg_goods_id!=null && uploadmsg_goods_id!=""){
                    uploadmsg_setCookie('uploadmsg_goods_id',uploadmsg_goods_id,3);
                    console.log(uploadmsg_getCookie('uploadmsg_goods_id'));
                }
                popUpbox(url,'700px','400px');
                return false;
            });

        

        function popUpbox(url,width,height){
            $.layer({
                type : 2,
                title : ['',false],
                iframe : {src : url},
                shade : [0.8 , '#000' , true],
                border:[0],
                area : [width , height],
                offset : ['50px', ''],
                close : function(index){
                    layer.close(index);
                }
            });
        }
        
        //上传图片回调函数
        function set_review_pics(data,pic_src){
            if(!data){
                alert(jsLg.user.anError);
                return;
            }
            $js_ptoTagBox.parents('.reviewForm').find(".uploadmsg").text(jsLg.successed);
            $js_ptoTagBox.parents('.reviewForm').find(".pics").val(data);
            $js_ptoTagBox.parents('.reviewForm').find(".pic_src").val(pic_src);//{*图片来源  1:本地, 2:facebook, 3:相册*}
        }

    })();
    
    //评论验证
    $('.reviews').find('.submitBtn').click(function(){
        $(this).parents('.list').find('.reviewForm').validate({
            rules: {
                rate_overall:{required: true},
                pros: {
                    required: true,
                    maxlength: 3000,
                    minlength: 30
                },
                subject:{
                    required: true
                },
                nickname:{
                    required: true
                }
            },
            messages: {
                rate_overall:{required: jsLg.formMsg.vote},
                nickname:{required: jsLg.formMsg.nickname},
                subject:{required: jsLg.formMsg.required},
                pros: {
                    required: jsLg.formMsg.required,
                    maxlength: jQuery.format(jsLg.formMsg.exceedChar),
                    minlength: jQuery.format(jsLg.formMsg.leastChar)
                }
            },
            ingore:""
        });
    });
    
    //提问验证
    $('#questionsForm').validate({
        rules: {
            i_nickname:{required: true},
            pre_sale:{required: true},
            i_content: {
                required: true,
                maxlength: 3000,
                minlength: 30
            }
        },
        messages: {
            i_nickname:{required: jsLg.formMsg.nickname},
            pre_sale:{required: jsLg.formMsg.required},
            i_content: {
                required: jsLg.formMsg.required,
                maxlength: jQuery.format(jsLg.formMsg.exceedChar),
                minlength: jQuery.format(jsLg.formMsg.leastChar)
            }
        }                         
    });
    
    //输入限制
    $(".js_content").keyup(function(){
        var l_pros = $(this).val().length;
        var chars = ((3000-l_pros))<=0 ? 0 : 3000-l_pros;
        $(this).parents('.list').find(".characerts_length").html(chars);
    });
    
    //评分
    (function(){
        var _this = $('.rate5').find('b');
        _this.click(function(){
      
            var index = $(this).index() + 1;
            rateSet(index, this); 
            $(this).parents('.user_rate').find("label.error").remove();
            $(this).parents('.user_rate').find('.startRate').val($(this).index()+1);
        });
        // _this.mouseover(function(){
        //     var _this = this;
        //     var index = $(_this).index() + 1;
        //     rateSet(index, _this);
        // });
        

        // $(_this).parents('.rates').mouseleave(function(){
        //     var startRateVal = parseInt($(this).parent('.user_rate').find('.startRate').val()); 

        //     if( !startRateVal){
        //         $(this).find('.big_rate_up').width(0);
        //     }else{
        //         rateSet(startRateVal, _this);
        //     }
        // });

        

       
        
        function rateSet(index, _this) {
            var width = (16 * index) + 'px';
            var $rates = $(_this).parents('.rates');
            var $big_rate_up = $rates.find('.big_rate_up');
            $big_rate_up.width(width);
            // $rates.find('b').click(function(){
            //  $(".user_rate").find("label.error").remove();

            //  $rates.find('.startRate').val(index.toString());
            // });
            
        }
    })();
    
    
    //order_detail
    if(document.getElementById('js_operation')){
        toolbar('js_operation');
    }
    
    function toolbar(el) {
        el = typeof el == 'string' ? document.getElementById(el) : el;
        var wrap = document.getElementById('operationWrap');
        var elTop = wrap.offsetTop;
        var sTop = 0;
        window.onscroll = function () {
            sTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (sTop > elTop) {
                el.style.top = "0";
                el.style.position = "fixed";
                $('#js_operation').width($('#operationWrap').width()).resize(function(){
                    $('#js_operation').width($('#operationWrap').width());
                });
            } else {
                el.style.top = elTop + 'px';
                el.style.position = "static";
            }
        }
    }
    
    $('#js_Paypal').hover(function(){
        $('#js_PaypalDown').show();
    }, function(){
        $('#js_PaypalDown').hide();
    });

    $('#js_Paypal').on("click","a.allBtn",function(){
        var JupBtn = $('#js_Paypal').find(".formsubbotton");

        if(JupBtn.length){
           JupBtn.trigger('click');
        }
        return false;
    });
    
    //全选
    $('#selectAll').click(function(){
        var _this = this;
        $('.proWrap').find('.checkbox').each(function() {
            this.checked = _this.checked ? true : false;
        });
    });
    
    //删除商品
    //单删
    $('.js_deletePro').click(function(){
        if (confirm(jsLg.user.confirmDelete)) {
            var goodsId = [];
            var $listObj = [];
            var url = '';
            var $list = $(this).parents('.list');
            $listObj.push($list);
            goodsId.push($list.data('objid'));
            url = $list.data('url');
            deleteProAjax(url, goodsId, $listObj, function(){
                if($(".proWrap").find(".list").length){ 
                    window.location.reload();
                }else{
                    window.location.href= "/" + JS_LANG + "m-users-a-collection_list.htm";
                }
            
            });
        }
    });
    
    //点击单个时去掉多选
    $('.proWrap').find('.checkbox').click(function() {
        var _flag = true;
        $('.proWrap').find('.checkbox').each(function() {
            if(!this.checked){
                _flag = false;
                return false;
            }
        });
        $('#selectAll').get(0).checked = _flag ;
    });
    
    //多删
    $('.js_deleteProALL').click(function(){
        //先判断是否有选中商品
        var flag = 0; 
        $('.proWrap').find('.checkbox').each(function() {
            if(this.checked==true){
                flag = 1;
                return false;
            }
        });
        
        //有选中商品
        if(flag == 1){
            if (confirm(jsLg.user.confirmDelete)) {
                var goodsId = [];
                var $listObj = [];
                var url = '';
                $('.proWrap').find('.checkbox').each(function() {
                    if(this.checked==true){
                        var $list = $(this).parents('.list');
                        $listObj.push($list);
                        goodsId.push($list.data('objid'));
                        if(url == ''){
                            url = $list.data('url');
                        }
                    }
                });
                deleteProAjax(url, goodsId, $listObj,function(){
                    if($(".proWrap").find(".list").length){ 
                        window.location.reload();
                    }else{
                        window.location.href= "/" + JS_LANG + "m-users-a-collection_list.htm";
                    }
                });
            }
        } else {
            alert(jsLg.user.noSelect);
        }
        
    });
    
    function deleteProAjax(url,goodsId, $listObj, callBack){
        $.ajax({
            type: "POST",
            url: url,
            data: "objid=" + goodsId,
            success: function(msg){
              if(msg == 'ok'){
                for(var i = 0; i < $listObj.length; i++){
                    $listObj[i].remove();
                }
                // if($('.proWrap .list').size() == 0){
                //     var $showsWrap = $('.showsWrap');
                //     var emptyHtml = '<div class="empty">' + $showsWrap.find('.js_empty').data('not') + '</div>';
                //     $showsWrap.html(emptyHtml);
                // }

                if(callBack &&  typeof(callBack)=='function'){
                    callBack(msg);
                }
              }
            }
        });
    }
    
    
    //itry_blog page===================================
    $(".itrySub").click(function(){
        return check_myform();
    });
    function check_myform(){
            var str='';
            var url=$("#blog_url").val();
            if(url==''){str+=jsLg.user.check_myform_1+'\n';alert(str);return false;}
            var s1 = url.indexOf("http");
            if(s1!=-1){str+=jsLg.user.check_myform_2+' "http"! '+jsLg.user.check_myform_2_2+'\n';alert(str);return false;}
            var  s2 = url.indexOf("www");
            if(s2!=-1){str+=jsLg.user.check_myform_2+' "www"! '+jsLg.user.check_myform_2_2+'\n';alert(str);return false;}
            
           var  yumi='.com|.ae|.af|.ag|.ai|.al|.am|.an|.ao|.aq|.ar|.as|.at|.au|.aw|.az|.ba|.bb|.bd|.be|.bf|.bg|.bh|.bi|.bj|.bm|.bn|.bo|.br|.bs|.bt|.bv|.bw|.by|.bz|.ca|.cc|.cf|.cg|.ch|.ci|.ck|.cl|.cm|.cn|.co|.cq|.cr|.cu|.cv|.cx|.cy|.cz|.de|.dj|.dk|.dm|.do|.dz|.ec|.ee|.eg|.eh|.es|.et|.ev|.fi|.fj|.fk|.fm|.fo|.fr|.ga|.gb|.gd|.ge|.gf|.gh|.gi|.gl|.gm|.gn|.gp|.gr|.gt|.gu|.gw|.gy|.hk|.hm|.hn|.hr|.ht|.hu|.id|.ie|.il|.in|.io|.iq|.ir|.is|.it|.jm|.jo|.jp|.ke|.kg|.kh|.ki|.km|.kn|.kp|.kr|.kw|.ky|.kz|.la|.lb|.lc|.li|.lk|.lr|.ls|.lt|.lu|.lv|.ly|.ma|.mc|.me|.md|.mg|.mh|.ml|.mm|.mn|.mo|.mp|.mq|.mr|.ms|.mt|.mv|.mw|.mx|.my|.mz|.na|.nc|.ne|.nf|.ng|.ni|.nl|.no|.np|.nr|.nt|.nu|.nz|.om|.pa|.pe|.pf|.pg|.ph|.pk|.pl|.pm|.pn|.pr|.pt|.pw|.py|.qa|.re|.ro|.ru|.rw|.sa|.sb|.sc|.sd|.se|.sg|.sh|.si|.sj|.sk|.sl|.sm|.sn|.so|.sr|.st|.su|.sy|.sz|.tc|.td|.tf|.tg|.th|.tj|.tk|.tl|.tm|.tn|.to|.tp|.tr|.tt|.tv|.tw|.tz|.ua|.ug|.uk|.us|.uy|.va|.vc|.ve|.vg|.vn|.vu|.wf|.ws|.ye|.yu|.za|.zm|.zr|.zw';
           var  yumi_arr=yumi.split("|");
           var  n=yumi_arr.length;
           var j=0;
            for (var i = 0; i < n; i++){
               j = url.indexOf(yumi_arr[i]);
               if(j>0)break;
            }
            if(j==-1){alert(jsLg.user.check_myform_3+'\n');return false;}

            if(str==''){$("#myform").submit();}else{alert(str);}
    }  
    
    




var delOrderPopIndex = '';
function delOrderPop(url){
    var html ='<div id="cancelOrder" ><h4  class="fb">' + jsLg.user.deteTips_2 + '</h4><select id="delOrderReason"><option  value="0">' + jsLg.user.deteTips_1 + '</option><option value="1">' + jsLg.user.deteTips_3 + '</option><option value="2">' + jsLg.user.deteTips_4 + '</option><option value="3">' + jsLg.user.deteTips_5 + '</option><option value="4">' + jsLg.user.deteTips_6 + '</option><option value="5">' + jsLg.user.deteTips_7 + '</option><option value="6">' + jsLg.user.deteTips_8 + '</option></select><p class="cancleOrderMsg"></p><div class="cancelOrder_btns"><a href="javascript:void(0);" class="allBtn yes" data-url="'+url+'">' + jsLg.user.yes + '</a><a href="javascript:void(0);" class="hBtn no">' + jsLg.user.no + '</a></div></div>';     
    delOrderPopIndex = $.layer({
        type: 1,
        title: jsLg.user.deteTips_9,
        offset : [($(window).height()-185)/2 - 20 + 'px', ''],
        area: ['450px','185px'],
        shade : [0.8 , '#000' , true],
        border : [1, 1, '#ddd', true],
        page: {
            html: html
        }
    });
}


//显示编辑框
//options={showSameShipAddr:0,formAction:actionUrc,scrollElemt:"#shipping_address_wrap"}
// showSameShipAddr： 表示是否显示开启同步shipping address的选择框 1：显示， 0 : 隐藏
//formAction: 表示编辑的表单提交的地址
//scrollElemt: 窗口要滚动到页面那个元素哪儿
function showEditBillForm(options){
    $("#shipping_address_wrap").show();
    //是否显示 同步shipping address元素
    if(options.showSameShipAddr==1){
        $("#bill_address_p").show();
    }else{//如果不开启，隐藏shipping address元素,并且关闭开启功能
        $("#bill_address_p").hide();
        $("#bill_address_p").find("input").data("checked",false); 
        addrObject.sameShipFlag =false;
    }
    $("#addressfrom").attr("action",options.formAction);
    clearFom("#addressfrom");
    $(".js_choiceCountry").val(0).trigger("change");
    scrollToElem(options.scrollElemt);
}

//清空表单
function clearFom(formElem){
    $(".info .list").removeClass("list_on");
    $(formElem)[0].reset();
}

//页面滚动到某个元素的位置
function scrollToElem(elemt){
    $("html,body").stop().animate({scrollTop:$(elemt).offset().top-50},500);
}

//获得地址信息
function getAddrInfo(elemt){
    var that = $(elemt);
    var addrInfoObj ={
        firstName : that.find(".js_firstName").text(),
        lastName : that.find(".js_lastName").text(),
        addrLine1 : that.find(".js_addrLine1").text(),
        addrLine2 : that.find(".js_addrLine2").text(),
        city : that.find(".js_city").text(),
        province : that.find(".js_province").text(),
        zipcode : that.find(".js_zipcode").text(),
        country : that.find(".js_country").val(),
        tel :  that.find(".js_tel").text(),
        email :  that.find(".js_email").text(),
        address_id :that.find(".js_attr_editBtn").attr("data-address_id")
    }
    return addrInfoObj
}

//编辑地址信息
function editAddrInfo(options){
    $("#firstname").val(options.firstName);
    $("#lastname").val(options.lastName);
    $("#email").val(options.email);
    $("#addressline1").val(options.addrLine1);
    $("#addressline2").val(options.addrLine2);
    $("#city").val(options.city);
    $("#tel").val(options.tel);
    $("#zipcode").val(options.zipcode);
    //针对国家和州的不同处理
    GLOBAL.CountryChange({country_id:options.country,address_id:0,state_str:options.province});
    $(".js_choiceCountry").val(options.country);
    if(options.address_id && document.getElementById("bill_address_checkbox").checked==false){
        $("#address_id").val(options.address_id);
    }
    
}

//分享
function setSharefun($that){

    var gUrl = $that.parents(".js_shareLink").data("url");
    var gImg = $that.parents(".js_shareLink").data("img");
    var iWidth=650;                          //弹出窗口的宽度;
    var iHeight=500;                        //弹出窗口的高度;
    var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2;        //获得窗口的水平位置;
    var url;
    switch($that.attr("data-stype")){
        case "faceBook" :
            url = $that.attr("data-href")+encodeURIComponent(gUrl);
            break;
        case "Twitter" :
            url = $that.attr("data-href")+encodeURIComponent(gUrl)+'&text='+$that.attr("data-text");
            break;
        case "pinit" :
            url = $that.attr("data-href")+encodeURIComponent(gUrl)+'&media='+gImg+'&description='+$that.attr("data-text");
            break;
        case "google" :
            url = $that.attr("data-href")+encodeURIComponent(gUrl)+"&t="+$that.attr("data-text");
            break;
    }
    window.open(url,'', 'width='+iWidth+',height='+iHeight+',top='+iTop+',left='+iLeft);
}


function update_avatar(avatar){
    if(!avatar){
        return;
    }
    $("#my_avatar").attr('src',DOMAIN_IMG+"/"+avatar);
    $.ajax({
       type: "POST",
       url: "/m-users-a-update_avatar.htm",
       data: "avatar="+avatar,
       dataType: 'json',
       success: function(msg){
         if(!msg.status){
            alert(jsLg.user.anError);
         }
       }
    });
}

function submit_review(goods_id, title, content, pics, pic_src){
    if(!goods_id || !title || !content || !pics){
        alert("An Error Was Encountered.");
        return;
    }
    $.getJSON(DOMAIN+"/m-review-a-submit_review.htm?title="+title+"&content="+content+"&pics="+pics+"&goods_id="+goods_id+"&pic_src="+pic_src+"&jsoncallback=?", function(msg){
         if(!msg.status){
            alert(jsLg.user.anError);
         }else{
            $("a.xubox_close").trigger("click");
            alert(jsLg.user.thanksMsg);
            window.location.href = window.location.href;
         }
       }
    );
}
});      
// 邮箱认证
(function(){
var _blank = null;
var $resendEmail = $(".resendEmail");

if( !$resendEmail.find("a.icon").hasClass("ok") ){
    $(".resendEmail").mouseover(function(){
        if(_blank){
            clearTimeout(_blank);
        }
         $(this).find("div.text").fadeIn();
    }).mouseout(function(){
        var $this = $(this);
        _blank = setTimeout(function(){
            $this.find("div.text").fadeOut();
        },500)
    })
}
})();

(function() {
    var rsendEmailIndx;
    $(".resendEmailBtn").add("#js_resendEmailBtn").click(function(event) {
        event.preventDefault();
        sendEmailFn();

    })

    function sendEmailFn(){
        $.ajax({
            type: "POST",
            url: "/" + JS_LANG + "m-users-a-resend_verify_email.htm",
            dataType: "json",
            success: function(msg) {
                if (!msg.status) {GLOBAL.PopObj.alert({ msg : msg.msg,typeTag :0});
                }else rsendEmailIndx = $.layer({
                    type: 1,
                    area: ["345px", "auto"],
                    title: jsLg.sendEmaix,
                    move: [".xubox_title", true],
                    shade: [.8, "#000", true],
                    border: [5, .5, "#333", false],
                    page: {
                        dom: ".resendEmmailPop"
                    },
                    close: function(index) {
                        layer.close(index)
                    }
                })
            }
        });

       
        $(".resendEmmailPop").find("a").click(function() {
            layer.close(rsendEmailIndx);
        })       
    }

    $("#js_confirmBtn").click(function(event) {
        /* Act on the event */
        $.ajax({
            type: "POST",
            url: "/" + JS_LANG + "m-users-a-resend_verify_email.htm",
            dataType: "json",
            success: function(msg) {
                
            }
        });

        $(".verified_1").hide();
         $(".verified_2").show();
    });
})();      
        


(function(){
    //加入购物车
    window.GLOBAL.popAddCart = {
        wrap : $("#js_popAddCart"),

        loadingHtml : function(goodsId,num){
            var that = this;
            that.wrap.css("background","none").html("");

            $.get('/'+JS_LANG+'m-users-a-collection_goods_info.htm',{goodsId : goodsId,goodNum:num}, function(data) {
                /*optional stuff to do after success */
                that.wrap.html(data);

                that.openPopIndx ?( layer.area(that.openPopIndx, {height:that.wrap.outerHeight(),top: ($(window).height()-that.wrap.outerHeight())/2}) ) : "";
            });
        },
        successPopHtml : function(){
            var html = "";
                html += '<div class="popAddCartSuc" id="js_popAddCartSuc"><p><i></i>'+jsLg.addCart_4+'</p><div class="btn clearfix"><a href="'+DOMAIN_CART+'/'+JS_LANG+'m-flow-a-cart.htm">'+jsLg.addCart_9+'</a><a href="javascript:void(0);" onclick="layer.closeAll()" class="blokBtn">'+jsLg.addCart_5+'</a></div></div>';

                return html;
        },
        ini:function(){
            var that = this;
            that.openPopIndx = null;

            that.wrap.on("click",".js_attr li",function(e){//点击size或者color
                var Jthat = $(this);

                if(!Jthat.hasClass('product_out')){
                    var gooddId =  Jthat.data("goods_id"),
                        num = $("#js_Popinput_quantity").val();

                    that.loadingHtml(gooddId,num);
                }
            });

            that.wrap.on("click",".btn_add",function(e){//加一
               var Jquantity = $("#js_Popinput_quantity");

               var orig = Number(Jquantity.val());
               Jquantity.val(orig - 0 + 1);
               $(".order_q_box input").trigger('keyup');
            });

            that.wrap.on("click",".btn_reduce",function(e){//减一
                var Jquantity = $("#js_Popinput_quantity");
                var orig = Number(Jquantity.val());

                if(orig >1 ){
                    Jquantity.val(orig - 1);
                }
                $(".order_q_box input").trigger('keyup');
            });

            that.wrap.on("keyup",".order_q_box input",function(e){//直接填写
                var Jquantity = $(this);
                var goodNum =  parseInt(Jquantity.val(),10);
            
                //如果不是数字直接退出
                if(isNaN(goodNum) || goodNum <= 0){
                    goodNum = 1;
                }else if(goodNum > 9999){
                    goodNum = 9999;
                }
                Jquantity.val(goodNum);
                return false;
            });
          
            that.wrap.on("click","#js_popAddTopCart",function(e){//点击购买按钮
                var Jthat = $(this);
                var goodsId = Jthat.data("goos_id"),
                    num = $("#js_Popinput_quantity").val();
                
                var attrchage = Jthat.data("attrchage");
                
                var select_custom_size = 0;  
                //获取属性
                var cartval = [];
                $.each($(".js_attr"),function(i,v){
                    cartval.push($(v).find("li.selected").data("value"));
                });
                cartval = cartval.length ? cartval.join(",") : "";

                var URL=DOMAIN_CART+'/'+JS_LANG+ "m-flow-a-add_to_cart.htm?jsoncallback=?&"+"goods_id="+goodsId+"&number="+num+"&spec="+cartval+"&attrchage="+attrchage+"&select_custom_size="+select_custom_size;
                // alert(URL)
                $.getJSON(URL, function(data) {
                    var  msg = data.ms;
                    if (msg.indexOf('Added To Cart')>0){//加入购物车成功
                        if(that.openPopIndx){
                            GLOBAL.PopObj.closePop(that.openPopIndx);
                            var sucHtmls = that.successPopHtml();
                            var popIndex = GLOBAL.PopObj.openPop({border:[0],offset : ['auto' , '50%'],page : {html:sucHtmls}});
                           
                            popIndex ? ( layer.area(popIndex, {top: ($(window).height()-150)/2}) ) : "";
                         }
                    }else{
                        if (msg.indexOf('OUT OF STOCK')>-1){
                            msg = jsLg.out_of_stock.replace('#num#', data.num);
                            $("#js_popAddTopCartMsg").html(msg);
                        }else{
                            $("#js_popAddTopCartMsg").html(msg);
                        }
                    }
                })                                   
                
            });

            $(".js_icon_addCart").click(function(event) {
                /* Act on the event */
                var goods_id = $(this).data("goods_id"),
                    num = 1;

                that.openPopIndx = GLOBAL.PopObj.openPop({border:[0],offset : ['auto' , '50%'],page : {dom:'#js_popAddCart'}});
                that.loadingHtml(goods_id,num);
            });
        }
    }

    GLOBAL.popAddCart.ini();
})();


(function(){
    $("div.js_showImg").on("click","a",function(){
        var windowH = $(window).height();
        var html = '<div style="width:1000px; height:568px;white-space: nowrap;"><img src="'+$(this).find("img").attr("src")+'" width="100%" height="100%"/></div>';
        //var html = '<div style="width:800px; height:'+ (windowH-50) + 'px;">sdfsdf</div>'
        GLOBAL.PopObj.openPop({offset : [($(window).height()-568)/2+'px' , '50%'],page : {html:html}})
    });

    //查看物流信息
    $(".js_showtrackInfo").click(function(){
        var $this = $(this);

        var html = '';
        var key = $this.data('key');
        var $targetBox = $("#js_trackingInfoBox"+key);

        if($this.data("isShow") != 1){

            $this.data("isShow",1);

            $.get('/fun?act=get_tracking',{trackno:$(this).attr("data-trackno")}, function(data) {
                /*optional stuff to do after success */
                if(data.status && data.list){
                    html += '<ul>';
                    $.each(data.list, function(index, val) {
                         /* iterate through array or object */
                         html += '<li><span class="mr15">'+ val.ondate +'</span>'+ val.status;
                         if($.trim(val.area) != 'null'){
                            html += ' <strong class="ml15 fb">'+ val.area +'</strong>';
                         }
                         html += '</li>'
                         
                    });
                    
                    html += '</ul>';

                }else{ 
                    html = '<p style="font-size:20px; text-align: center; margin:50px 0;">'+ jsLg.trackingInfo +'</p>';
                }

                $targetBox.slideDown()
                          .find('dd').html(html);
            },'jsonp');
                
        }else{
            $targetBox.slideToggle();
        }

    })
})($);




