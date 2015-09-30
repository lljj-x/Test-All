// JavaScript Document
//定义空间命名
window.GLOBAL ={};
//*********************邮件验证
GLOBAL.checkmail=function(Email){
    var pattern=/^[\w][\.\w_-]+[\w]@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var flag=pattern.test(Email);
    if (flag){
        return true;
    }else{
        return false;
    }
};
//*********************订阅邮件
GLOBAL.newsletter = function(Obj){
    var $obj = $(Obj);
    var email= $.trim($obj.val()),
        options = {};

    if (!email){
        $obj.focus();
        return false;
    }

    if (!GLOBAL.checkmail(email)){
        options = {
            msg : jsLg.subscribe_3,
            typeTag :0
        }
        GLOBAL.PopObj.alert(options);
        $obj.focus();
        return false;
    }

    $.post('/m-cemails.html', {act:$("#js_eact").val(),action:$("#js_action").val(),txtEMail:email}, function(data) {
        /*optional stuff to do after success */

        if(data=="ok"){
            options = {
                msg : jsLg.subscribe_6,
                typeTag :1
            }
            GLOBAL.PopObj.alert(options);
        }
    });
    return false;
};
//*********************搜索相关
GLOBAL.Search = {
    check_seachText:function(kwVal){
        kwVal  = kwVal.replace(/\*/g,'~~');
        kwVal  = kwVal.replace(/\|/g,']]');
        kwVal  = kwVal.replace(/\=/g,'((');
        kwVal  = kwVal.replace(/\</g,'))');
        kwVal  = kwVal.replace(/\>/g,')))');
        kwVal  = kwVal.replace(/\?/g,'!!!');
        kwVal  = kwVal.replace(/\+/g,'__');
        kwVal  = kwVal.replace(/\-/g,'^^');
        kwVal  = kwVal.replace(/\//g,'..');
        kwVal  = kwVal.replace(/\\/g,'...');
        kwVal  = kwVal.replace(/\%/g,'!!');
        kwVal  = kwVal.replace(/\#/g,'~~~');
        kwVal  = kwVal.replace(/\>/g,'___');
        kwVal  = kwVal.replace(/\</g,'^^^');
        kwVal  = kwVal.replace(/\"/g,'[[');
        kwVal  = kwVal.replace(/\$/g,'[[[');
        kwVal  = kwVal.replace(/\s+/g, "-");
        //kwVal = kwVal.toLowerCase();
        kwVal = kwVal.replace(/\b\w+\b/g, function(word){
            return word.substring(0,1).toUpperCase()+word.substring(1);
        });

        return kwVal;
    },
    seach_submit : function($this){
        var $thatForm = $this.parents("form");
        //var reg = /[^\w\.]/g;
        var $kw = $thatForm.find("input.js_k2");
        var categoryVal = 0;
        var kwVal = this.check_seachText($.trim($kw.val()));

        
        // var categoryVal = $.trim($category.val());
        if (kwVal == ''){
            $kw.focus();
            return false;
        }else{
            //kwVal = kwVal.replace('%20','-');
            if (categoryVal == '0'){
                //window.location.href=DOMAIN+'/'+JS_LANG+'Wholesale-'+kwVal+'.html';
                $thatForm.attr('action',DOMAIN+'/'+JS_LANG+'Wholesale-'+kwVal+'.html');
                //$thatForm.submit();
                return true;
            }else{
                window.location.href=DOMAIN+'/'+JS_LANG+'Wholesale-'+kwVal+'-'+categoryVal+'.html';
            }
        }

    },
    autoComPlete:function(){
        var that = this;
        var JsearchForm = $(".js_topSeachForm");
        var JsearchInput = JsearchForm.find("input.js_k2");
        var width = JsearchForm.find(".top_seachBox").innerWidth();

        JsearchInput.autocomplete("/eload_admin/crontab/update_notice_keyword.php?action=show_word", {
            width:width,
          
            scroll:true,
            autoFill: false,
            selectFirst: false,
            formatItem: function(row, i, max) { 
                //$.each(row,function(index,val){})
                return  row[0] ;
            }
        }).result(function(event, item) {
            var val = item[0];
            var kwVal= that.check_seachText($.trim(val));
           
            window.location.href=DOMAIN+'/'+JS_LANG+'Wholesale-'+kwVal+'.html';
        });
    }

};

//*********************货币相关对象
GLOBAL.currency ={
    //页面打开调用函数改变币种
    change_houbi : function(bz, $wrapElm){
        var bizhong = $.cookie("bizhong") ;
        var icon;

        bizhong = bizhong ? bizhong : "USD";
        bizhong = arguments[0] ? arguments[0] : bizhong;

        $.cookie('bizhong',bizhong, {expires: 7, path: '/',domain:COOKIESDIAMON});


        $(".js_bzList:eq(0)").find('li').each(function(index, el) {
            var $this = $(this);

            if($this.data("bizhong") == bizhong){
                $(".js_showBZ").html($this.html());
                return;
            }
        });

        arguments.length>1 ? this.change_html(bizhong,$wrapElm) : this.change_html(bizhong);

    },

    //循环遍历币种列表，获取币种的符合
    getIcon : function(bizhong){
        var icon;
        var my_array_sign = new Array();
        my_array_sign['USD'] = '$';
        my_array_sign['EUR'] = '€';
        my_array_sign['GBP'] = '£';
        my_array_sign['AUD'] = 'AU$';
        my_array_sign['CAD'] = 'C$';
        my_array_sign['CHF'] = '₣';
        my_array_sign['HKD'] = 'HK$';
        my_array_sign['CNY'] = '¥';
        my_array_sign['NZD'] = 'NZ$';
        my_array_sign['JPY'] = '円';
        my_array_sign['RUB'] = 'руб.';
        my_array_sign['BRL'] = 'R$';
        my_array_sign['CLP'] = 'CLP $';
        my_array_sign['NOK'] = 'NOK';
        my_array_sign['DKK'] = 'DKK';
        my_array_sign['SEK'] = 'SEK';
        my_array_sign['KRW'] = '₩';
        my_array_sign['ILS'] = '₪';

        icon = my_array_sign[bizhong] ? my_array_sign[bizhong] : "$";

        // $(".js_bzList:eq(0)").find('li').each(function(index, el) {
        //     var $this = $(this);

        //     if($this.data("bizhong") == bizhong){
        //         icon = $this.data("icon");
        //         return;
        //     }
        // });
        return icon;
    },

    change_html : function(bz, $wrapElm){
        var $wrap = arguments.length>1 ?  $($wrapElm) : $("body"),
            $label = $wrap.find(".bizhong"),
            $price = $wrap.find(".my_shop_price"),
            bizhong = bz,
            cookie_bizhong = $.cookie("bizhong"),
            that = this;
        var orgp,price,icon;

        //如果没有传递币种，则读取cookie中的，如果cookie中没有币种，则默认为USD并写入cookie中
        if(!bizhong){

            if(!cookie_bizhong){
                $.cookie('bizhong',"USD", {expires: 7, path: '/',domain:COOKIESDIAMON});
            }
            bizhong = $.cookie("bizhong");
        }
        //$.cookie('bizhong',bizhong, {expires: 7, path: '/',domain:COOKIESDIAMON});
        $label.html(bizhong);
        $price.each(function(i,o){
            orgp = $(this).attr("orgp");
            price = (parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(2);

            that.processer($(o),orgp,bizhong)
        });
    },
    setMinNum : function(price){
        return price < 1 ? 1 : price;
    },
    processer : function($object,orgp,bizhong){
        var that = this;
        var huilv = parseFloat(my_array[bizhong]);
        var currency_img = '<span class="icon">'+this.getIcon(bizhong)+'</span>';

        if(bizhong == "JPY"){
            var price = (that.setMinNum(huilv * orgp)).toFixed(0);

           
            var jpy = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            $object.html(jpy + currency_img);

        }else if(bizhong == "RUB"){

            /*切换卢布时，产品价格取整数. 切换至卢布之后再四舍五入*/
            $object.html((that.setMinNum(huilv * orgp)).toFixed(0) + currency_img);

        }else if(bizhong == "BRL"){

            /*切换巴西货币的时候,小数点后第二位数字必须为0.倒数第一位数字根据倒数第二位原数字来四舍五入.例如BRL5.87要显示R$ 5.90*/
            $object.html(currency_img + (huilv*orgp).toFixed(1)+"0");

        }else if(bizhong == "CLP" || bizhong == "BEF"|| bizhong == "DJF"|| bizhong == "ESP" || bizhong == "GRD" || bizhong == "IDR"  || bizhong == "ITL" || bizhong == "KMF" || bizhong == "KRW" || bizhong == "LUF" || bizhong == "MGA" || bizhong == "PTE" || bizhong == "TRL" || bizhong == "VND" || bizhong == "XAF" || bizhong == "XOF" || bizhong == "XPF"){

            /*智利比索按照汇率. 取到小数点后第三位,中间不用空格*/
            $object.html(currency_img + (huilv*orgp).toFixed(0));

        }else if(bizhong == "DKK"){
            /*丹麦克朗上千后用.隔开.低于千用英文逗号隔开*/
            var dkkPrice = (huilv*orgp).toFixed(2);
            if(dkkPrice > 1000){
                dkkPrice = dkkPrice.replace('.', ',');
                dkkPrice = dkkPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            }else{
                dkkPrice = dkkPrice.replace('.', ',');
            }

            $object.html(currency_img +" "+ dkkPrice );

        }else if(bizhong == "NOK" || bizhong == "SEK"){
            /*挪威克朗/瑞典克朗取整,直接把小数点后面的去掉,无需四舍五入*/
            $object.html(currency_img + parseInt(that.setMinNum(huilv * orgp)));

        }else if(bizhong == "ILS"){
            /*以色列谢克尔,取整,直接把小数点后面的去掉,无需四舍五入*/
            $object.html(currency_img + parseInt(that.setMinNum(huilv*orgp).toFixed(2)));

        }else{

            if(bizhong == "HKD" || bizhong == "CHF" || bizhong == "NZD"){

                $object.html(currency_img + ((parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(2)));
            }else{
                $object.html(currency_img + ((parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(2)));
            }

        }

    },
    //英语版本根据浏览器默认语言选择货币,多语言版本根据语言设置货币,如果用户手动更改之后使用用更改之后的
    setDefaultBizhong:function(){
        var that = this;
        var cur_lang = JS_LANG==""  ?  'en'  :  JS_LANG.split("/")[0];
        var query_url = window.location.href;
        var bizhong = _GET('currency', query_url);
        var setbizhong = $.cookie("setbizhong");

        //如果地址中有货币设置字眼，则按照网页地址设置的设置币种
        if(bizhong !== ''){
            that.change_houbi(bizhong);
            $.cookie("setbizhong",1,{expires:7,path:"/",domain:COOKIESDIAMON});

        }else if((null==setbizhong || setbizhong == 2) && cur_lang == 'en'){
            //如果用户是第一次打开页面，默认语是英文且还没有手动选择过货币
            var url_lang="/fun/index.php?act=getbizhong";
            $.ajax({
                type:"GET",
                cache:!1,
                url:url_lang,
                success:function(data){
                    var bizhong = $.trim(data);

                    bizhong = bizhong=="" ? "USD" : bizhong;

                    that.change_houbi(bizhong);
                    $.cookie("setbizhong",3,{expires:7,path:"/",domain:COOKIESDIAMON})
                }
            })

        }else if((null==setbizhong || setbizhong == 3 || setbizhong == 2) && cur_lang != 'en'){
            //如果用户还没有设置过币种，且默认于也不是英文

            if(typeof(lang_currency_array[cur_lang]) != "undefined" && lang_currency_array[cur_lang]){
                bizhong = lang_currency_array[cur_lang];

            }else{
                bizhong = "USD";
            }

            that.change_houbi(bizhong);
            $.cookie("setbizhong",2,{expires:7,path:"/",domain:COOKIESDIAMON});

            //如果用户已经设置过币种
        }else{
            that.change_houbi();
        }
    }
};

//*********************动态加载js不支持回调函数
GLOBAL.LoadJS=function(src, id){
    var scriptTag = document.getElementById(id);
    var oScript = document.createElement("script");
    if(scriptTag) return;
    oScript.id = id;
    oScript.src = src;
    document.getElementsByTagName("body")[0].appendChild(oScript);
};

//*********************加入收藏夹和成功回调函数
/**
 * 加入收藏夹
 * @param {[type]} msg     [msg是ajx检测是否登录后，如果登录了，传过来的值]
 * @param {[type]} options [是一个对象，{url:收藏ajax地址,rebackPage:登录后，返回的页面,top:按钮当前top位置,left:按钮当前left位置};]
 */
GLOBAL.addTofavorite=function(msg,options){
    //如果登录成功了
    if(msg){

        $.get(options.url, function(data) {
            /*optional stuff to do after success */
            //cartAlert(jsLg.favoriteTips_1);
            if(data==1){
                GLOBAL.addTofavoriteCall(options);
            }else{
                GLOBAL.PopObj.confirm({
                    shade : [0.8 , '#000' , true],
                    area : ['auto','auto'],
                    title: jsLg.message,
                    closeBtn : [0 , false],
                    dialog : {
                        msg: jsLg.favoriteTips_1,
                        btns : 1,
                        type : 0,
                        btn : ['Ok'],
                        yes :  function(index){
                            layer.close(index);
                            //如果是购物车页面,reload页面
                            if(options.cartPage == 1){
                                options.carFavBtn.closest('ul.products').remove();
                                GLOBAL.cart.re_load( '/'+JS_LANG+'m-flow-a-cart.htm',"#cart_list");
                            }
                        }
                    }
                })
            }
        });

    }else{
        window.top.location.href = HTTPS_LOGIN_DOMAIN + "/" + JS_LANG + "m-users-a-sign.htm?ref="+options.rebackPage;
    }
}
/**
 * 加入收藏加回调函数
 * @param {[type]} options [是一个对象，{top:按钮当前top位置,left:按钮当前left位置};]
 */
GLOBAL.addTofavoriteCall = function(options){
    var $redHeart = $('<span></span').attr("class","redHeart");
    var top=0,left = options.left;

    top = options.top - 30;

    $redHeart.css({"top":options.top,"left":options.left,"zIndex":1000,"opacity":1})
        .appendTo('body');
    $redHeart.animate({"top":top ,"opacity":0}, 500 ,function(){
        $redHeart.remove();
        //如果是购物车页面,reload页面
        if(options.cartPage == 1){
            options.carFavBtn.closest('ul.products').remove();
            GLOBAL.cart.re_load( '/'+JS_LANG+'m-flow-a-cart.htm',"#cart_list");
        }

    })

};

//*********************弹出框相关对象
GLOBAL.PopObj = {
    openPop : function(options){
        var defaultOpts = {
            shade : [0.8 , '#000' , true],
            type : 1,
            area : ['auto','auto'],
            offset : ['100px' , '50%'],
            title : false,
            border : [1, 1, '#ddd', true],
            shadeClose : true,
            bgcolor : '#fff',
            closeBtn : [1 , true],
            page : {},
            close : function(index){
                layer.close(index);
            }
        }

        defaultOpts = $.extend(true,defaultOpts,options );
        return $.layer(defaultOpts);
    },
    iframe : function(options){
        var defaultOpts = {
            shade : [0.8 , '#000' , true],
            type : 2,
            title : false,
            shadeClose : true,
            bgcolor : '#fff',
            closeBtn : [1 , true],
            area : ['auto','auto'],
            offset : ['100px' , '50%'],
            border : [1, 1, '#ddd', true],
            iframe : {src : ''},
            close : function(index){
                layer.close(index);
            }
        }
        defaultOpts = $.extend(true,defaultOpts,options );
        return $.layer(defaultOpts);
    },
    confirm:function(options){
        var defaultOpts = {
            shade : [0.8 , '#000' , true], //不显示遮罩
            area : ['auto','auto'],
            title: jsLg.message,
            border : [1, 1, '#ddd', true],
            dialog : {
                msg:'',
                btns : 2,
                type : 4,
                btn : [jsLg.yes,jsLg.no],
                yes : function(){

                },
                no : function(index){
                    layer.close(index);
                }
            }
        }

        defaultOpts = $.extend(true,defaultOpts,options );
        return $.layer(defaultOpts);
    },
    /**
     * 模拟alert框
     * @param  {[type]} options.msg         文本 默认没有
     * @param  {[type]} options.title       标题 默认没有
     * @param  {[type]} options.shade       遮罩层 默认有
     * @param  {[type]} options.typeTag     弹出框信息类型0-15,-1不显示
     * @param  {[type]} options.callBack    确认按钮回调函数
     * @param  {[type]} options.callBackArg 确认按钮回调函数回调函数的参数
     * @return {[type]} null        [description]
     */
    alert:function(options){
        var defaultOpts = {
            shade : options.shade ? options.shade : [0.8 , '#000' , true],
            area : ['auto','auto'],
            title: options.title ? options.title : jsLg.message,
            border : [1, 1, '#ddd', true],
            dialog : {
                msg: options.msg ? options.msg : "",
                btns : 1,
                type : options.typeTag ? options.typeTag : 0,
                btn : [jsLg.ok],
                yes : function(index){
                    options.callBack ? options.callBack(options.callBackArg ? options.callBackArg : "") : "";
                    layer.close(index);
                }
            }
        }
        //defaultOpts = $.extend(true,defaultOpts,options );
        return $.layer(defaultOpts);
    },
    closePop : function(index){
        var id = "";
        id = arguments.length>0 ? index : "";
        layer.close(index);
    },
    tipsShow:function(options){
        var ThisOffset = options.Obj.offset(),
            thisLeft = ThisOffset.left-10,
            thisTop = ThisOffset.top+options.Obj.outerHeight()+10;

        var innerH = '<div id="popTips" style="position:absolute; font-size:12px; color:#666; border-radius:3px; border:1px solid #ddd; z-index:9999;left:'+thisLeft+'px;top:'+thisTop+'px;">';
        innerH += '<div style="position:relative;z-index:10003;padding:5px 10px;border-radius:3px; background-color:#fff;">'+options.msg+'</div>';
        innerH += '<i style="position:absolute;left:15px; top:-11px; z-index:10001; border:12px solid transparent; border-left-color:#ddd;"></i>';
        innerH += '<i style="position:absolute;left:16px; top:-9px;z-index:10002; border:10px solid transparent;border-left-color:#fff;border-left-color:#fff;"></i>';
        innerH += '</div>';

        $("body").append(innerH);
    },
    closeTipsShow:function(){
        $("#popTips").remove();
    }
};

//*********************图片懒加载
GLOBAL.lazyLoad = {
    scrollLazyLoad : function(selectBox){
        var $selectBox= $(selectBox);

        $selectBox.lazyload({
            threshold : 500,
            effect: "fadeIn",
            failure_limit : 60,
            skip_invisible : false
        });
    },

    tableLayout : function(selectBox){
        var $selectBox= $(selectBox);

        $selectBox.lazyload({
            effect : "fadeIn",
            event : "tabEvent"
        });
    },

    //动态创建dom元素
    creatEle : function(targetElm,callback){
        var $elem = $.type( targetElm ) == "string" ? $(targetElm) : $("textarea.js_addToDom"),
            $window = $(window),
            windowH = $window.height(),
            that = this;
        var _blank = null;

        that.eachElem($elem,$window.scrollTop(),windowH,callback);

        $window.scroll(function(){
            var scrollTop = $(this).scrollTop();

            if(_blank){
                clearTimeout(_blank);
            }
            _blank = setTimeout(function(){
                that.eachElem($elem ,scrollTop ,windowH ,callback);
            }, 300)
        })

    },
    //循环每一个指定textarea,如果在可见区域就写入html，如果有回调函数执行回调函数
    eachElem :function($elem,scollTop,windowH,callback){
        $elem.each(function(index, el) {
            var $this = $(el);
            var elemTop = $this.parent().offset().top;
            var htmls = $this.text();

            if((elemTop > scollTop-100) && (elemTop - scollTop < windowH)){
                if($this.data("addYet") != 1){
                    $this.parent().append(( htmls ));
                    $this.data("addYet","1");

                    GLOBAL.currency.change_html("",$this.parent());

                    if(callback && $.type( callback ) == "function" ){
                        callback(htmls,$this.parent());
                    }
                }
            }

        });
    }
};
//*********************liveChat显示隐藏,货币显示隐藏，用户中心显示隐藏，公用词函数
GLOBAL.toggleTopMenu  = function(){
    var $wrapBOx = $(".top_operate");
    $wrapBOx.each(function(index, val) {
        var $title = $("dt",$(this) );
        var $topMenuBox = $("dd",$(this));

        $(this).hover(function(){
            $(this).addClass("top_operate_hover");
            $topMenuBox.stop(true,true).show();
        },function(){
            $(this).removeClass("top_operate_hover");
            $topMenuBox.stop(true,true).hide();

        });

    });

};
//*********************顶部登录
GLOBAL.login = {
    getLoginBox : function(){
        // var $warp = $("#js_isNotLogin");
        // var $topLoginBox = $(".top_loginBox");

        // $warp.hover(function(){
        //  $topLoginBox.show();
        // },function(){
        //           $topLoginBox.hide();
        //       });

        //       $("body").click(function(event) {
        //           /* Act on the event */
        //           $topLoginBox.hide();
        //       });
        //       $warp.click(function(event) {
        //           /* Act on the event */
        //           event.stopPropagation();
        //       });
    },
    // isLogin:function(){
    //     var that = this;
    //     $.ajax({
    //         type: "GET",
    //         //cache:false,
    //         url: '/fun/index.php?act=chk_sign',
    //         success: function(msg){
    //           that.isLoginEnd(msg);
    //         }
    //     });
    // },
    isLogin:function(callBack,callbackArg){
        var that = this;
        $.ajax({
            type: "GET",
            //cache:false,
            url: '/fun/index.php?act=chk_sign',
            success: function(msg){
                // msg = eval('(' + msg + ')');
                if(msg){
                    that.isLoginEnd(msg);
                }
                if(callBack){
                    arguments.length>1 ? callBack(msg,callbackArg) : callBack(msg);
                }
            }
        });
    },
    isLoginEnd:function(msg){
        var $isLoginInfo = $("#js_isLoginInfo");
        var $isNotLogin = $("#js_isNotLogin");

        if (msg){//如果已经登录了
            $isLoginInfo.html('Hi&nbsp;<span>'+ msg +'</span>&nbsp;<a href="' + HTTPS_LOGIN_DOMAIN +'/'+JS_LANG+'m-users-a-logout.htm">'+jsLg.logout+'</a>').show();
            $isNotLogin.hide();
            //$("#signOffTips").fadeOut();

        }else{
            $isLoginInfo.html('').hide();
            $isNotLogin.show();
        }
    },
    sign:function($formBox,callBack){
        $formBox.validate({
            rules: {
                email: {
                    required: true,
                    maxlength: 60,
                    email: true
                },
                passwordsign: {
                    required: true,
                    minlength:6,
                    maxlength: 60
                }
            },
            messages: {
                email: {
                    required: jsLg.formMsg.email_require_msg,
                    email: jsLg.formMsg.email_require_msg,
                    maxlength: jsLg.formMsg.email_maxlength
                },
                passwordsign: {
                    required: jsLg.formMsg.password,
                    minlength: jsLg.formMsg.password_minlength,
                    maxlength: jsLg.formMsg.passwor_maxlength
                }
            },
            submitHandler: function() {
                if(callBack){
                    callBack();
                }
            },
            errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.appendTo(element.parent());

            },
            success: function(label) {
                label.remove();
            }
        })
    },
    register:function($formBox,callBack){

        $formBox.validate({
            rules: {
                email: {
                    required: true,
                    maxlength: 60,
                    email: true,
                    remote: '/'+JS_LANG+"index.php?m=users&a=check_email"
                },
                password: {
                    required: true,
                    maxlength: 60,
                    minlength: 6
                },
                password_confirm: {
                    required: true,
                    minlength: 6,
                    maxlength: 60,
                    equalTo: "#password"
                },
                agreement:{
                    required: true
                }
            },
            messages: {
                email: {
                    required:  jsLg.formMsg.email_require_msg,
                    email: jsLg.formMsg.email_require_msg,
                    maxlength: jQuery.format(jsLg.formMsg.email_maxlength),
                    remote: jQuery.format(jsLg.formMsg.email_in_user)
                },
                password: {
                    required:  jsLg.formMsg.password,
                    minlength: jQuery.format(jsLg.formMsg.password_minlength),
                    maxlength: jQuery.format(jsLg.formMsg.passwor_maxlength)
                },
                password_confirm: {
                    required:  jsLg.formMsg.password_repeat,
                    minlength: jQuery.format(  jsLg.formMsg.password_minlength),
                    maxlength: jQuery.format(jsLg.formMsg.passwor_maxlength),
                    equalTo:   jsLg.formMsg.password_equalTo
                },
                agreement: {
                    required : jsLg.formMsg.register_agreement
                }
            },
            // specifying a submitHandler prevents the default submit, good for the demo
            submitHandler: function() {
                if(callBack){
                    callBack();
                }
            },
            errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.appendTo(element.parent());

            },
            success: function(label) {
                label.remove();
            }
        });
    },
    getpassInput : function(popIndx){
        var v=$('#myInput').val();
        v = v.replace('-','=');
        if(v=='' || v.indexOf('@')<0 || v.indexOf('.')<0  )
            alert(jsLg.formMsg.email_require);
        else{
            window.location.href = '/m-users-a-send_pwd_email-e-'+v+'.htm';
            layer.close(popIndx);
        }

    }
};

//*********************浮动框
GLOBAL.FloatObj={
    goToUp:function(){
        var $backToTopTxt = "", winh = $(window).height();
        var html = '<div class="backToTop">';
            html += '<a class="gift" href="javascript:void(0);"></a>';
            html += '<a class="c_tagbg survey backTotop_icon" style="display: none" id="js_float_survey"  href="http://www.sammydress.com/'+JS_LANG+'m-article.htm?id=105" ><div class="text backTotop_box">'+jsLg.surveyText+'<i></i></div></a>';
            html += '<a href="javascript:void(0)" data-url="/fun/?act=error_report" class="c_tagbg errorExport js_errorReport"></a>';
            html += '<a href="javascript:void(0)" class="c_tagbg showQR backTotop_icon"><div class="qrImgWrap clearfix backTotop_box"><div class="qrImg"><p><img src="'+JS_IMG_URL+'images/mobile/app/mobileweb.jpg" width="100" height="100">Mobile Site</p><p><img src="'+JS_IMG_URL+'images/mobile/app/apprute.jpg" width="100" height="100">App</p></div><i>◆</i><span>◆</span></div></a>';
            html += '<a href="javascript:void(0)" class="c_tagbg gotoTop"></a>';
            html +='</div>';

        $backToTopEle = $(html).appendTo($("body")),
            $backToTopFun = function() {
                var st = $(document).scrollTop();
                (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
            };
        $backToTopEle.find("a.gotoTop").click(function() {$("html, body").animate({ scrollTop: 0 }, 120); });
        $(window).bind("scroll", $backToTopFun);

        GLOBAL.ErrorReportObj.ini($backToTopEle.find($(".js_errorReport")));
        $backToTopEle.find("a.gift").click(function() {
            GLOBAL.promoCodePop.show();
        });

        $backToTopEle.find('.backTotop_icon').hover(function(){
            var box = $(this).find('.backTotop_box');
            box.stop().show().animate({opacity: 1,right: 35},300);
        },function(){
            var box = $(this).find('.backTotop_box');
            box.stop().animate({opacity: 0,right: 60},300,function(){
                box.hide();
            });
        })
        //$(function() { $backToTopFun(); });
      
        if(JS_LANG == 'es/'){//如果是西语
            var esHtml = $('<div class="es_labelFloatBar" style="position:fixed ; top:50%; margin-top: -100px; right:10px; width:36px;   cursor: pointer; z-index:400; "><img src="'+JS_IMG_URL+'images/domeimg/label23.png"></div>');
            esHtml.on("click",function(){
                GLOBAL.promoCodePop.show();
            });
            esHtml.appendTo('body');
        }
    },
    saderBar:function(){
        $("#js_float_survey").show();
    }
};

/**
 * coupon弹出框，之后去掉改功能，这段代码可以删除
 * @author luoxh
 */
GLOBAL.promoCodePop = {
    show: function() {
        if (this.index != null) { // 存在，直接显示就行了
            layer.area(this.index, {top: ($(window).height()-590)/2}); // 每次打开调整垂直位置
            $("#xubox_shade" + this.index).show();
            $("#xubox_layer" + this.index).show();
        } else {
            var prefix = JS_LANG ? (JS_LANG.slice(0, -1) + "_") : "";

            this.index = $.layer({
                type: 2,
                title: false,
                closeBtn: [0, true],
                border: [0, 0, '', false],
                offset : [($(window).height()-590)/2 + 'px', ''],
                area: ['670px','514px'],
                iframe: {
                    src: DOMAIN + "/temp/skin4/promoCode/" + prefix + "promoCodePop.html?201504101" // 支持多语言
                },
                close: function(index) { // 自定义关闭函数，只是隐藏，避免每次和facebook通信
                    $("#xubox_shade" + index).hide();
                    $("#xubox_layer" + index).hide();
                }
            });

            $("#xubox_iframe" + this.index).height(590); // 设置内部iframe的最高高度，之后不需要再改变
        }   
    },
    setHeight: function(height, duration) {
        $("#xubox_layer" + this.index).animate({height: height}, duration);
    },
    index: null
};

//*********************定义一个错误报告的弹出框
GLOBAL.ErrorReportObj = {
    
    setPopHtml :function(){//动态生成html
        var html = '';
            html += '<section class="errorReportPop">';
        
            html +=     '<h3 class="clearfix"><p class="fl">Error Report</p><a href="/" class="fr" titel=" sammydress="" logo"=""><img src="'+JS_IMG_URL+'images/domeimg/logo.gif" width="248" height="40"></a></h3>';
            html +=     '<form action="'+this.g_form+'" id="errorReportForm">';
            html +=         '<section class="form-info">';
            html +=             '<h4>Please leave your comments and suggestions to help us do a better job.</h4>';
            html +=             '<div class="formText">If you find an error on SammyDress.com, let us know below. We\'ll check the information within 2 working days. The most helpful comments will receive some awesome rewards.';
            html +=             '</div>';
            html +=         '</section>';

            html +=         '<div class="forms">';
                    
            html +=         '<div class="form-group">';
            html +=             '<label class="control-label"><strong>*</strong>Your Email Address:</label>';
            html +=             '<input type="text" class="form-control" name="email"/>';
            html +=         '</div>';

            html +=         '<div class="form-group">';
            html +=             '<label class="control-label"><strong>*</strong>Details:</label>';
            html +=             '<textarea class="form-control" rows="3" name="details"></textarea>';
            html +=         '</div>';

            html +=         '<div class="form-group tips">';
            html +=             'For queries relating to orders, shipping and other pre-sale or after-sales issues, please submit a ticket on our <a href="http://support.sammydress.com:88/?lang=en">support page</a> instead.';
            html +=         '</div>';

            html +=         '<div class="form-group">';
            html +=             '<label class="control-label"></label>';
            html +=             '<button class="form-Button"><span class="allBtn">Submit</span></button>';
            html +=         '</div>';

            html +=     '</div>';
            html += '</form>';
            html += '</section>';
            return html;
    },
    gotoPop :function(){//弹出表单
        var that = this;
        var html = that.setPopHtml();

        that.dialogObj = $.layer({
            type: 1,
            title: false,
            closeBtn: [0, true],
            border: [0, 0, '', false],
            offset : [($(window).height()-450)/2 + 'px', ''],
            area: ['auto','450px'],
            page: {
                html:html
            },
            end: function() {
                //$('#priceMatchWrap').html(html);
            },
            success: function(index){ 
                //更改币种
                GLOBAL.currency.change_html("",$(".errorReportPop"));

                //弹出框表单验证
                that.checkForm();
            }
        });
    },
    checkForm : function(){//检查表单
        var that = this;
        var form = $("#errorReportForm");

        form.validate({
            rules: {
                email: {
                    required: true,
                    maxlength: 60,
                    email: true
                },
                details: {
                    required: true
                    
                }
            },
            messages: {
                email: {
                    required: jsLg.formMsg.priceMatch.emailRequire,
                    maxlength: jsLg.formMsg.email_maxlength_msg,
                    email: jsLg.formMsg.priceMatch.emailError
                }
            },
            success: function(label) {
                label.remove();
            },
            submitHandler: function(){ 
                var url = that.g_form;

                $.ajax({
                    url: url,
                    type: 'GET',
                    data: form.serialize()
                })
                .done(function(data) {
                    layer.close(that.dialogObj)
                    that.upFomrsuccess();
                })
            }
        });
    },
    //数据提交成功提示用户
    upFomrsuccess:function(){
        var that = this;

        $.layer({
            type: 1,
            title: false,
            shadeClose:true,
            border: [0, 0, '', false],
            offset : [($(window).height()-150)/2 + 'px', ''],
            area: ['410px','150px'],
            page: {
                html:'<div style="background:#fff;font-size:20px;white-space: nowrap; line-height:120px; padding:0 40px; "><i class="systyleMsg"></i>Your report has been sent!</div>'
            },
            end: function() {
                //$('#priceMatchWrap').html(html);
            },
            success: function(index){ 
                //更改币种
                GLOBAL.currency.change_html("",$(".errorReportPop"));

                
            }
        });
    },
    ini:function(obj){ 
        var that = this;
        // that.gotoPop();

        //that.upFomrsuccess();
        that.target =$(obj);
        that.g_form =that.target.data('url');

        that.target.click(function(event) {
            /* Act on the event */
            that.gotoPop();
        });
    }
};






//*********************购物车相关
GLOBAL.cart={
    //更新购物车数量
    cartItems:function(){
        var URL=DOMAIN_CART+'/fun/?act=cart_item&noscript=1&jsoncallback=?';
        $.getJSON(URL, function(data) {
            msg = data.ms;
            $("#js_cart_items").html(msg);
        })

    },
    //商品属性更改
    change_same_goods:function(obj){
        var goods_id = parseInt(obj.value);
        if(goods_id > 0) {
            window.location.href ='/'+JS_LANG+'product' + goods_id + '.html';
        }
    },
    //有货专区商品URL链接切换
    change_available_stock:function(obj)
    {
        var goods_id = parseInt(obj.value);
        if(goods_id > 0)
        {
            var url_title = $('#spec_available_stock_'+goods_id).attr("attr");
            window.location.href = url_title;
        }
    },
    //详细页面商品数量 每次加1
    add:function(){
        var $numbBox = $("#js_input_quantity");
        var orig = Number($numbBox.val());
        $numbBox.val(orig + 1);
        $numbBox.keyup();
    },
    //详细页面商品数量 每次减1
    reduce:function(){
        var $numbBox = $("#js_input_quantity");
        var orig = Number($numbBox.val());
        if(orig >1 ){
            $numbBox.val(orig - 1);
            $numbBox.keyup();
        }
    },
    //详细页面商品数量 直接填写
    input_quantity:function(obj){
        var $that = $(obj),
            $unitPrice = $("#unit_price"),
            goodNum  = parseInt($that.val()),
            Nprice = $unitPrice.attr("orgp"),
            orangNum,pkNum;

        //如果不是数字直接退出
        if(isNaN(goodNum) || goodNum <= 0){
            $that.val(1);
            //改变购物按钮上的数量，以便加入购物车数量正确
            $("#new_addcart").attr('num',1);
            return;
        }

        if (goodNum <= 9999){
            //当前购买数量与价格阶梯比较，看属于哪个阶梯范围
            $(".js_orangNum").each(function(){
                orangNum = parseInt(String($(this).data("val")).replace(/[\u4e00-\u9fa5]/g,""));

                if (goodNum >= orangNum ){
                    pkNum   = parseFloat($(this).data('atrp'));
                    Nprice = $("#pk"+pkNum).attr("orgp");
                }
            });
            //商品详情页面--单价赋值
            $unitPrice.attr("orgp",Nprice);

            

        }else{
            goodNum = 9999;

        }
        //购物车的其他操作
        $that.val(goodNum);

        //改变购物按钮上的数量，以便加入购物车数量正确
        $("#new_addcart").attr('num',goodNum);

        //改变币种
        GLOBAL.currency.change_html("",$unitPrice.parent());
    },
    //添加商品到购物车

    addcart:function(obj,is_custom,callback){

        var self = this;
        var is_custom = arguments[1]?arguments[1]:0 ;   //是否获取使用自定义尺寸（默认不使用）  arguments是JS默认参数设置，不设置第二格参数，默认值为0
        var select_custom_size = 0;     //默认没有选择自定义尺寸
        var srcpage = $(obj).attr('srcpage');//addtocart按钮页面来源

        if(is_custom)
        {
            if($(".js_custom_button").length>0 && $(".js_custom_button").get(0).checked == true){
                select_custom_size = 1;
            }
        }

        var gid = $(obj).attr('gid');
        var num = $(obj).attr('num');
        num = (num == undefined)?1:num;
        var reflash = $(obj).attr('ref');
        reflash = (reflash == undefined)?0:reflash;
        cartval =  '';
        var attrchage = $(obj).attr('attrchage');
        attrchage = (attrchage == undefined)?'':attrchage;
        var geshuxing = '';
        var error_msg = '';
        var is_kong_msg = '';
        var dijige = '';
        var error_num = 1;
        var temparr = new Array();

        var dinghuo = $(obj).attr('dinghuo');
        dinghuo = (dinghuo == undefined)?0:dinghuo;   //alert(dinghuo);
        if(dinghuo==1 && num<50){
            alert(jsLg.addCart_1);
            return false;
        }

        if(attrchage.indexOf('|')>0){
            attrchage = attrchage.split('|');
            $.each(attrchage,function(i,v){
                temparr[i] = new Array();
                var type = 'select-one';//$('.spec_'+v).attr('type');
                var lab_name = $('.spec_'+v).attr('lab_name');
                switch (type){
                    case 'select-one':
                        temparr[i] = $('.spec_'+v).val();
                        var isnes = $('.spec_'+v).attr('isnes');
                        if (isnes == '1'){
                            if (temparr[i] == "") {
                                is_kong_msg += error_num+"."+jsLg.addCart_2+lab_name+'!\n';
                                error_num++;
                                if (dijige==''){dijige = v;}
                            }
                        }
                    case 'checkbox':
                        $('.spec_'+v+':checked').each(function(j){
                            temparr[i][j] = $(this).val();
                            if (temparr[i][j] == "") {is_kong_msg += error_num+"."+jsLg.addCart_2+lab_name+'!\n';error_num++;}
                        });
                }

            });
        }else{
            if (attrchage!=''){
                dijige = attrchage;
                temparr[1] = new Array();
                var type = 'select-one';
                var lab_name = $('.spec_'+attrchage).attr('lab_name');
                switch (type){
                    case 'select-one':
                        temparr[1] = $('.spec_'+attrchage).val();
                        var isnes = $('.spec_'+attrchage).attr('isnes');
                        if (isnes == '1'){
                            if (temparr[1] == "") {is_kong_msg += ' '+jsLg.addCart_2+' '+lab_name+'!\n';}
                        }
                    case 'checkbox':
                        $('.spec_'+attrchage+':checked').each(function(j){
                            temparr[1][j] = $(this).val();
                            if (temparr[1][j] == "") {is_kong_msg += ' '+jsLg.addCart_2+' '+lab_name+'!\n';}
                        });
                }
            }else{
                temparr[1] =  $(this).attr('atrid');
                atrrid = $(this).attr('atrid');
            }
        }

        if (is_kong_msg!="") {alert(jsLg.addCart_3+'\n\n'+is_kong_msg);$('.spec_'+dijige).focus();return false;}
        cartval = temparr;
        target_div = $(this).attr('atrid')!=undefined?"#add_cart_msg"+gid+atrrid:"#add_cart_msg"+gid;
        if (error_msg !=''){ alert(error_msg);return false;}

        if(!$.trim(gid).length){
            return false;
        }

        var URL=DOMAIN_CART+'/'+JS_LANG+ "m-flow-a-add_to_cart.htm?jsoncallback=?&"+"goods_id="+gid+"&number="+num+"&spec="+cartval+"&attrchage="+attrchage+"&select_custom_size="+select_custom_size;
        // alert(URL)
        $.getJSON(URL, function(data) {
            // 由于直接在快速浏览页面提示错误，这里就不必关闭窗口操作了。
            // if(callback){
            // callback();
            // }
            msg = data.ms;
            if (msg.indexOf('Added To Cart')>0){  //当添加成功的时候执行并分解 1||Added To Cart
                var mag_arr = msg.split('||');
                cartnum = parseInt(mag_arr[0]);
                $(".all_red_cart_items").each(function(){$(this).html(cartnum);}); //刷新每一个
                if (reflash == "1" )
                {
                    // $(target_div).html(mag_arr[1]+'<br><a href="/m-flow-a-cart.htm" class="view_cart"> Cart & Checkout <span class="all_red_cart_items">'+cartnum+'</span>items(s)</a>');
                    if(srcpage == "1"){//快速购买页面加入购物车后的url
                        window.top.location.href= DOMAIN_CART +'/'+JS_LANG+ "m-flow-a-cart.htm?quickview";
                    }
                    else if(srcpage == "2"){//产品页面加入购物车后的url
                        window.top.location.href= DOMAIN_CART +'/'+JS_LANG+ "m-flow-a-cart.htm?products";
                    }
                    else{
                        window.top.location.href= DOMAIN_CART +'/'+JS_LANG+ "m-flow-a-cart.htm";
                    }

                }
                self.cartItems();
                if (reflash == "0" )    //异步执行
                {
                    var message_ok = '<table width="95%" border="0" cellspacing="0" cellpadding="0">';
                    message_ok += '<tr>';
                    message_ok += '<td width="26%" align="right" valign="middle"><img src="http://cloud4.faout.com/imagecache/S/ximages/dui.gif"/></td>';
                    message_ok += '<td width="74%" align="left" valign="middle" style="padding-left:10px;"><b>'+jsLg.addCart_4+'</b> </td>';
                    message_ok += '</tr>';
                    message_ok += '<tr>';
                    message_ok += '<td colspan="2" align="center" style="padding:10px 0px; line-height: 26px;" class="duibt"><a href="javascript:void(0);" onclick="ymPrompt.close();">&lt;&lt;'+jsLg.addCart_5+'</a>&nbsp;&nbsp;<a href="javascript:void(0);"  class="redBgBtn mr30 fr" onclick="ymPrompt.doHandler(\'ok\',false);" >'+jsLg.addCart_6+'</a></td>';
                    message_ok += '</tr>';
                    message_ok += '</table>';

                    ymPrompt.setDefaultCfg({okTxt:' Send ',cancelTxt:' Cancel ',closeTxt:'Close',minTxt:'Minimize',maxTxt:'Maximize',maskAlpha:0.5});
                    //ymPrompt.confirmInfo({icoCls:'',msgCls:'confirm',message:'Your item(s) have added to cart successful!</h1>' ,btn:[['Pay Now','ok'],['Continue Shopping','cancel']] ,titleBar:false,width:300, height:150,handler:go_to_cart_func,autoClose:false});
                    ymPrompt.win({icoCls:'',msgCls:'confirm',message:message_ok ,titleBar:false,width:350, height:140,handler:function(button_value){if(button_value == 'ok'){ window.location.href=DOMAIN_CART +'/'+JS_LANG+"m-flow-a-cart.htm"; } ymPrompt.close();},autoClose:false});
                }
                //添加成功才关闭快速预览窗口
                if(callback){callback();}
            }else{
                if(reflash == "1")
                {
                    if (msg.indexOf('OUT OF STOCK')>-1)
                    {
                        if($("#action_msg").length==0){
                            $(obj).parent().parent(".cart_handle").after('<div id="action_msg" style="display:none;height:25px;line-height:25px;color:red;font-size:14px; clear:both; font-size:12px;"></div>');
                        }
                        msg = jsLg.out_of_stock.replace('#num#', data.num);
                        $("#action_msg").html(msg);
                        $("#action_msg").fadeIn(1000);
                        // $("#action_msg").delay(2000).fadeOut(1000);
                    }
                    else
                    {
                        $(target_div).html(msg);
                    }
                }
                if (reflash == "0" )    //异步执行
                {
                    var message_error = '<table width="95%" border="0" cellspacing="0" cellpadding="0">';
                    message_error +='<tr>';
                    message_error +='<td width="26%" align="right" valign="middle"><img src="http://cloud4.faout.com/imagecache/S/ximages/cuo.gif"/></td>';
                    message_error +='<td width="74%" align="left" valign="middle" style="padding-left:10px;">'+jsLg.addCart_7+'</td>';
                    message_error +='</tr>';
                    message_error +='<tr>';
                    message_error +='<td colspan="2" align="center" style="padding:10px 0px;" class="duibt"><a href="javascript:void(0);"  class="redBgBtn" onclick="ymPrompt.close();" style="display: block; width:90px;">'+jsLg.addCart_8+'</a></td>';
                    message_error +='</tr>';
                    message_error +='</table>';

                    ymPrompt.setDefaultCfg({okTxt:' Send ',cancelTxt:' Cancel ',closeTxt:'Close',minTxt:'Minimize',maxTxt:'Maximize',maskAlpha:0.5});
                    //ymPrompt.errorInfo({icoCls:'',msgCls:'confirm',message:'Sorry!Your operation has failed!' ,btn:[['Confirm','cancel']] ,titleBar:false,width:300, height:150,autoClose:false});
                    ymPrompt.win({icoCls:'',msgCls:'confirm',message:message_error ,titleBar:false,width:300, height:140,autoClose:false});
                }
            }

        });
    },
    //异步刷新页面
    re_load:function(page_url,selectStr){
        var that = this;
        $.ajax({
            type: "GET",
            url: page_url,
            cache:false,
            success: function(msg){
                var stext = $(msg).find(selectStr).html();
                $(selectStr).html(stext);
                //更改币种
                GLOBAL.currency.change_html('',$(selectStr));
                //更新购物车中的数量
                that.cartItems();
            }
        });
    }
};
//读取浏览商品的历史记录
GLOBAL.browserHistories={
    /*return Array histories or null*/
    redBrowserHistories:function(){
        var histories = $.cookie('browserHistories3');
        if (histories) {
            histories = histories.split('EOT');
            return histories;
        }
        return null;
    },
    eachBrowserHistories:function(histories,callback){
        $.each(histories, function(index, item) {
            var  items = item.split('||');
            if(callback){
                callback(items)
            }
        });
    },
    //cart页面，动态生成商品的浏览记录
    cart_redBrowerHistories:function(callback){
        var histories = this.redBrowserHistories();
        if(histories){
            var html = '<ul class="slides">';
            this.eachBrowserHistories(histories,function(items){
                html +='<li class="tc">';
                html +='<a href="'+items[0]+'" class="i_proImg"><img height="216"  src="'+ items[1] +'" ></a>';
               // html +='<p class="proName"><a href="'+items[0]+'" title="'+items[1] +'">'+ items[1]+'...</a></p> ';
                html +='<p class="proPrice"><span class="bizhong"></span><span class="my_shop_price fb f14" orgp="'+ items[2] +'"></span></p>'
                html +='</li>' ;
            });
            html+='</ul>';

            $(".youRecentHistory").html(html);

            if(callback){
                callback($('.youRecentHistory'));
            }
        }
    }
};
//州和国家联动
GLOBAL.CountryChange = function(options){// options = {country_id:"当前城市的value"，address_id:"当前address在address list中对应的index",state_str:"表示是否有默认的州地址，可不空"}
    $.getJSON('/fun/?act=get_region_list', {type: 'province',id:options.country_id}, function(json, textStatus) {
       
        var state_str = options.state_str? options.state_str : "";
        var address_id = parseInt(options.address_id);
        var selectcountry = json ? json.data : "";
        var $codeBox =  $(".code_"+address_id);
        var $stateWrapBox = $('.state_'+address_id+'_'+address_id);

        if(json.code==0){
            var countryCode = json.countryCode;

            if(json.data.length){
                                            
                $stateWrapBox.html("<select id='states_"+address_id+"_"+address_id+"' name='province' class='choiceCountry'></select>"); 

                document.getElementById('states_'+address_id+'_'+address_id).options[document.getElementById('states_'+address_id+'_'+address_id).length] = new Option(jsLg.addCart_2, "");

                for(var i=0;i<selectcountry.length;i++){
                    
                    document.getElementById('states_'+address_id+'_'+address_id).options[document.getElementById('states_'+address_id+'_'+address_id).length] = new Option(selectcountry[i].id, selectcountry[i].name);
                    $('#states_'+address_id+'_'+address_id).val(state_str);
                }

            }else{//如果没有州，就显示输入框
                 $stateWrapBox.html("<input type='text' name='province' class='inputText i_table_w150' value='"+state_str+"' />");
                 
            }

            if(countryCode-0>0){
                //国家的区号
                $codeBox.html("+"+countryCode+"<input type='hidden' name='code' value='"+countryCode+"'>");
            }else{
                $codeBox.html("");
               
            }
        }


        // if(selectcountry){//如果查询的国家存在
        //     var state = selectcountry['state'];
        //     var code  = selectcountry['code'];
        //     //国家的区号
        //     $codeBox.html("+"+code+"<input type='hidden' name='code' value='"+code+"'>");

        //     //如果能查到该国家的州就循环出来，否则提供一个输入框，让用户自己输入
        //     if(state && state.length>0){
        //         $stateWrapBox.html("<select id='states_"+address_id+"_"+address_id+"' name='province' class='choiceCountry '></select>"); 
        //         var province ='';
        //         document.getElementById('states_'+address_id+'_'+address_id).options[document.getElementById('states_'+address_id+'_'+address_id).length] = new Option(jsLg.addCart_2, "");
        //         for(var i=0;i<state.length;i++){
        //             //var len = $('#states_'+address_id+'_'+address_id).length;
        //             province = state[i].replace('`',"'");
        //             document.getElementById('states_'+address_id+'_'+address_id).options[document.getElementById('states_'+address_id+'_'+address_id).length] = new Option(province, province);
        //             $('#states_'+address_id+'_'+address_id).val(state_str);
        //         }
        //     }else{
        //         $stateWrapBox.html("<input type='text' name='province' class='inputText i_table_w150 ' value='"+state_str+"' />");
        //     }
        // }else{//如果查询的国家不存在
        //     $codeBox.html("");
        //     $stateWrapBox.html("<input type='text' name='province' class='inputText i_table_w150 ' value='"+state_str+"' />");
        // }
    })
};
//检查信息（登录信息，购物车信息，记录商品详情页点击率,，每周特销时间）
//action = 1 普通登录信息，购物车信息检查 ， action = 2登录信息，购物车信息，记录商品详情页点击率 ， action = 3 登录信息，购物车信息，每周特销时间
function info_check(action){
    var url = "/fun/?act=info_check&action="+action;
    var query_url = window.location.href;   //当前页面URL地址
    //var lkid = _GET('lkid', query_url);     //获取URL地址中是否有lkid
    var lkid = _GET('lkid', location.hash.indexOf('lkid=') > 0 ? '?' + location.hash.substr(1) : null);
    if(lkid){
        var referrer_url = encodeURIComponent(document.referrer);   //来源URL地址
        url += "&lkid=" + lkid + "&referrer_url="+referrer_url;
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: {
            location_url: location.href
        },
        cache:false,
        success: function(msg){//msg={firstname:"",cart_items:"",LeftTime:""}
            $("#js_cart_items").html(parseInt(msg.cart_items,10) );

            GLOBAL.login.isLoginEnd(msg.firstname);
            
            //添加一个用户调查的入口
            if(!!msg.has_order && window.location.href.indexOf('user.sammydress') > 0){//如果用户下过单而且还是用户中心
                GLOBAL.FloatObj.saderBar();
            }
        
            //$(".index_time_coutDown").attr('data-time',msg.LeftTime);
        }
    });
}

/**
 * 获取URL参数(类似PHP的$_GET)
 *
 * @param {string} name 参数
 * @param {string} str  待获取字符串
 *
 * @return {string} 参数值
 */
function _GET(name, str) {
    var pattern = new RegExp('[\?&]' + name + '=([^&]+)', 'g');
    str = str || location.search;
    var arr, match = '';

    while ((arr = pattern.exec(str)) !== null) {
        match = arr[1];
    }

    return match;
};
// 检测用户名字不包含数字
if(jQuery.validator){
    jQuery.validator.addMethod("checkUserName", function(value, element) {
        var tel = /\d/;
        return this.optional(element) || (!tel.test(value));
    }, jsLg.formMsg.checkUserName);

    jQuery.validator.addMethod("checkAddress", function(value, element) {
        var tel = /\"/g;
        return this.optional(element) || (!tel.test(value));
    }, jsLg.formMsg.checkAddress);

}
$(function(){
    //liveChat显示隐藏
    GLOBAL.toggleTopMenu();
    //元素懒加载
    GLOBAL.lazyLoad.creatEle();
    //图片懒加载
    GLOBAL.lazyLoad.scrollLazyLoad(".js_lazy");

    //判断是否登录了
    info_check(1);
    //改变币种
    GLOBAL.currency.setDefaultBizhong();

    //顶部登录显示隐藏
    //GLOBAL.login.getLoginBox();

    //顶部登录判断
    // $("#js_topSignBtn").click(function(event) {
    //     /* Act on the event */
    //     GLOBAL.login.sign($("#js_topSign"),function(){});

    // });

    //邮件订阅
    $("#js_emailForm_subscribe").on("click","button",function(){
        var $txtEMail = $("#js_email_subscribe");

        if($.trim($txtEMail.val()) == $txtEMail.attr("placeholder")){
            $txtEMail.val("");
        }
        return GLOBAL.newsletter("#js_email_subscribe");
    });
    //搜索**提交表单
    // $("button.js_topSearch").click(function(){
    //     var $keyWord = $("input.js_k2");

    //     if($.trim($keyWord.val()) == $keyWord.attr("placeholder")){
    //         $keyWord.val("");
    //     }
    //     return GLOBAL.Search.seach_submit($(this));
    // });

    $(".js_topSeachForm").submit(function(event) {
        /* Act on the event */

        var $keyWord = $("input.js_k2");

        if($.trim($keyWord.val()) == $keyWord.attr("placeholder")){
            $keyWord.val("");
            return false;
        }

        return GLOBAL.Search.seach_submit($('button.js_topSearch'));

        //event.preventDefault();
    });
    //搜索自动完成
    GLOBAL.Search.autoComPlete();

    //搜索框获得焦点且没输入内容时，弹出关键字
    $('.js_topSeachForm .js_k2').focus(function(event) {
      if ($(this).val()==='') {
          $('.js_topSeachForm .hotKeyWord').slideDown();
      };
    }).keyup(function(event) {
      if ($(this).val() !==''){
         $('.js_topSeachForm .hotKeyWord').hide();
      }
    }).blur(function(event) {
        //延时执行，以便点击关键词搜索的进行。
        setTimeout(function(){$('.js_topSeachForm .hotKeyWord').slideUp();}, 500);
    });

    //单击弹出的关键词直接进行搜索
    $('.js_topSeachForm .hotKeyWord').on('click', 'p', function(event) { 
      var keyWord = $(this).find('strong').text();
      $('.js_topSeachForm .js_k2').val(keyWord);
      $('.js_topSeachForm').trigger('submit');
    });

    //选择币种
    $(".js_bzList").on("click",'li',function(){
        var bizhong = $(this).data("bizhong");
        GLOBAL.currency.change_houbi(bizhong);
        $(".js_bzList").hide();
        $.cookie("setbizhong",1,{expires:7,path:"/",domain:COOKIESDIAMON});
    });
    var _navBland = null;
    //导航
    $('#nav').on('mouseenter','li',function(){
        var $this = $(this),
            pleft = $this.position(),
            windW = $(window).width();
        _navBland = setTimeout(function(){
            var $subMenu = $this.find('div.sub_menu');

            if($subMenu.length){
                if(!$this.find('.point').length){
                    $this.append('<span class="point"><i class="triangle bord_tri"></i><i class="triangle bg_tri"></i></span>');
                }
                // if(liOffset.left < 95){
                //     $this.addClass('leftCate');
                // }else if(windW - liOffset.left - $this.outerWidth(true) < 95){
                //     $this.addClass('rightCate');
                // }
                if($subMenu.hasClass('big_sub_menu') || $subMenu.hasClass('small_sub_menu')){//让子菜单相对#nav 定位
                    $subMenu.css({"display":"block","opacity":"0"});
                   
                    if($subMenu.hasClass('big_sub_menu') && (pleft.left + $subMenu.outerWidth() > 1200)){
                         $subMenu.css("marginLeft",0-pleft.left)
                    }
                    if($subMenu.hasClass('small_sub_menu') && (pleft.left + $subMenu.outerWidth() > 1200)){
                        $subMenu.css("marginLeft",0-(pleft.left + $subMenu.outerWidth()-1200))
                    }

                    $subMenu.animate({"opacity":1},500);  
                    // $this.css("position","static");
                    // $this.find('.point').css({"left":$(this).position().left + $(this).outerWidth()/2})
                }else{
                    $this.find('div.sub_menu').fadeIn(500);      
                }

               // $this.find('div.sub_menu').stop().show();
            }
        },200);

    });
    $("#nav").on("mouseleave","li",function(){
        var $this = $(this),
            liOffset = $this.offset(),
            windW = $(window).width();
        if(_navBland){
            clearTimeout(_navBland);
        }
        // if(liOffset.left < 95){
        //     $this.removeClass('leftCate');
        // }else if(windW - liOffset.left - $this.outerWidth(true) < 95){
        //     $this.removeClass('rightCate');
        // }

        $this.find('div.sub_menu').hide();
    });
    //购物袋说明
    $("#js_topBagWarp").hover(function(){
        $(this).find("div").fadeIn();
    },function(){
        $(this).find('div').hide();
    });
    //回到顶部
    GLOBAL.FloatObj.goToUp();    
})