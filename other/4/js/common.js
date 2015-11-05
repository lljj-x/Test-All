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
        }else{
             options = {
                msg : data,
                typeTag :1
            }
            GLOBAL.PopObj.alert(options);
        }
    });
     return false;
};
//*********************搜索相关
GLOBAL.Search = {
    // seach_submit : function($this){
    //     var $thatForm = $this.parents("form");
    //     //var reg = /[^\w\.]/g;
    //     var $kw = $thatForm.find("input.js_k2");
    //     var categoryVal = 0;
    //     var kwVal= $.trim($kw.val());

    //     kwVal  = kwVal.replace(/\*/g,'~~');
    //     kwVal  = kwVal.replace(/\|/g,']]');
    //     kwVal  = kwVal.replace(/\=/g,'((');
    //     kwVal  = kwVal.replace(/\</g,'))');
    //     kwVal  = kwVal.replace(/\>/g,')))');
    //     kwVal  = kwVal.replace(/\?/g,'!!!');
    //     kwVal  = kwVal.replace(/\+/g,'__');
    //     kwVal  = kwVal.replace(/\-/g,'^^');
    //     kwVal  = kwVal.replace(/\//g,'..');
    //     kwVal  = kwVal.replace(/\\/g,'...');
    //     kwVal  = kwVal.replace(/\%/g,'!!');
    //     kwVal  = kwVal.replace(/\#/g,'~~~');
    //     kwVal  = kwVal.replace(/\>/g,'___');
    //     kwVal  = kwVal.replace(/\</g,'^^^');
    //     kwVal  = kwVal.replace(/\"/g,'[[');
    //     kwVal  = kwVal.replace(/\$/g,'[[[');
    //     kwVal  = kwVal.replace(/\s+/g, "-");
    //     kwVal = kwVal.toLowerCase();
    //     //kwVal = kwVal.replace(/\b\w+\b/g, function(word){
    //     //    return word;
    //     //});
    //    // var categoryVal = $.trim($category.val());
    //     if (kwVal == ''){
    //         $kw.focus();
    //         return false;
    //     }else{
    //         //kwVal = kwVal.replace('%20','-');
    //         if (categoryVal == '0'){
    //             //window.location.href=DOMAIN+'/'+JS_LANG+'Wholesale-'+kwVal+'.html';
    //             $thatForm.attr('action',DOMAIN+'/'+JS_LANG+'tag/'+kwVal+'.html');
    //             $thatForm.submit();
    //         }else{
    //             window.location.href=DOMAIN+'/'+JS_LANG+'tag/'+kwVal+'-'+categoryVal+'.html';
    //         }
    //     }

    // },

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

        if (kwVal == ''){
            $kw.focus();
            return false;
        }else{
            //kwVal = kwVal.replace('%20','-');
            if (categoryVal == '0'){
                //window.location.href=DOMAIN+'/'+JS_LANG+'Wholesale-'+kwVal+'.html';
                $thatForm.attr('action',DOMAIN+'/'+JS_LANG+'tag/'+kwVal+'.html');
                // $thatForm.submit();
                return true;
            }else{
                window.location.href=DOMAIN+'/'+JS_LANG+'tag/'+kwVal+'-'+categoryVal+'.html';
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
           
            window.location.href=DOMAIN+'/'+JS_LANG+'tag/'+kwVal+'.html';
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
        bizhong = bizhong.toUpperCase();   
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
            my_array_sign['AUD'] = 'AUD$';
            my_array_sign['CAD'] = 'CAD$';
            my_array_sign['CHF'] = '₣';
            my_array_sign['HKD'] = 'HK$';
            my_array_sign['CNY'] = '¥';
            my_array_sign['NZD'] = 'NZ$';
            my_array_sign['JPY'] = '円';
            my_array_sign['RUB'] = 'руб.';
            my_array_sign['BRL'] = 'R$';
            my_array_sign['CLP'] = 'CLP $';
            my_array_sign['NOK'] = 'NOK';
            my_array_sign['DKK'] = 'kr.';
            my_array_sign['SEK'] = 'Kr';
            my_array_sign['KRW'] = '₩';
            my_array_sign['ILS'] = '₪';
            my_array_sign['MXN'] = '$MXN';
            my_array_sign['ARS'] = 'AR$';

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
    processer : function($object,orgp,bizhong){
        var huilv = parseFloat(my_array[bizhong]);
        var currency_img = '<span class="icon">'+this.getIcon(bizhong)+'</span>';
        /*  
        if(bizhong == "JPY"){
            var price = (huilv * orgp).toFixed(0);
            var jpy = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            $object.html(jpy + currency_img);

        }else if(bizhong == "RUB"){

            //切换卢布时，产品价格取整数. 切换至卢布之后再四舍五入
            $object.html((huilv*orgp).toFixed(0) + currency_img);

        }else if(bizhong == "BRL"){

            //切换巴西货币的时候,小数点后第二位数字必须为0.倒数第一位数字根据倒数第二位原数字来四舍五入.例如BRL5.87要显示R$ 5.90
            $object.html(currency_img + (huilv*orgp).toFixed(1)+"0");

        }else if(bizhong == "CLP"){

            //智利比索按照汇率. 取到小数点后第三位,中间不用空格
            $object.html(currency_img + (huilv*orgp).toFixed(3));

        }else if(bizhong == "DKK"){
            //丹麦克朗上千后用.隔开.低于千用英文逗号隔开
            var dkkPrice = (huilv*orgp).toFixed(2);
            if(dkkPrice > 1000){
                dkkPrice = dkkPrice.replace('.', ',');
                dkkPrice = dkkPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

            }else{
                dkkPrice = dkkPrice.replace('.', ',');
            }

            $object.html(currency_img +" "+ dkkPrice );

        }else if(bizhong == "NOK" || bizhong == "SEK"){
            //挪威克朗/瑞典克朗取整,直接把小数点后面的去掉,无需四舍五入
            $object.html(currency_img + parseInt((huilv*orgp)));

        }else if(bizhong == "ILS"){
            //以色列谢克尔,取整,直接把小数点后面的去掉,无需四舍五入
            $object.html(currency_img + parseInt((huilv*orgp).toFixed(2)));

        }else{
        */
            if(bizhong == "JPY"){
                var price = (huilv * orgp).toFixed(0);
                var jpy = price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                $object.html(jpy + currency_img);
            }else if(bizhong == "BEF" || bizhong == "CLP" || bizhong == "DJF" || bizhong == "ESP" || bizhong == "GRD" || bizhong == "IDR"|| bizhong == "ITL" || bizhong == "KMF" || bizhong == "KRW" || bizhong == "LUF" || bizhong == "MGA" || bizhong == "PTE" || bizhong == "TRL"|| bizhong == "VND" || bizhong == "XAF" || bizhong == "XOF" || bizhong == "XPF" ){
                
                $object.html(currency_img + ((parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(0)));
            }else{

                // if(bizhong == "HKD" || bizhong == "CHF" || bizhong == "NZD"){

                //     $object.html(currency_img + ((parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(2)));
                // }else{
                //     $object.html(currency_img + ((parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(2)));
                // }
                currency_img += bizhong == "MXN" ? "&nbsp;" : ""; // MIX货币加多一个空格，作为分隔符
                $object.html(currency_img + ((parseFloat(my_array[bizhong]) * parseFloat(orgp)).toFixed(2)));
            }



        //}

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
        $redHeart.remove()
        //如果是购物车页面,reload页面
        options.cartPage == 1 ? options.carFavBtn.closest('ul.products').remove() : '';
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

            if(elemTop - scollTop < windowH){
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
            $("#js_joinUsTips").attr("href",DOMAIN_USER+"/m-users.htm");


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
        var html = "";
            html += '<div class="backToTop">';
            html +=     '<a id="js_showPromocode" href="javascript:;" class="invite-gift"></a>';
            html +=     '<a href="' + DOMAIN + '/invite_friends.html" class="invite"></a>';
           
            if($("#appDownControl").attr("content") != 1){
            html +=      '<a href="javascript:void(0)" class="backTotop_icon showQR"><i class="c_tagbg "></i><div class="qrImgWrap clearfix backTotop_box" style="width:100px;" ><div class="qrImg"><p><img src="'+JS_IMG_URL  +'images/domeimg/app/web_microcode.png" width="90" height="90">Mobile Site</p></div><i>◆</i><span>◆</span></div></a>';
            }else{
            html +=     '<a href="javascript:void(0)" class="backTotop_icon showQR"><i class="c_tagbg "></i><div class="qrImgWrap clearfix backTotop_box" ><div class="qrImg"><p><img src="'+JS_IMG_URL  +'images/domeimg/app/web_microcode.png" width="90" height="90">Mobile Site</p><p><img src="'+JS_IMG_URL  +'images/domeimg/app/approut.png" width="90" height="90">App</p></div><i>◆</i><span>◆</span></div></a>';
            }
            
            html +=     '<a href="javascript:void(0)" class="c_tagbg gotoTop"></a>';
            html += '</div>';


        $backToTopEle = $(html).appendTo($("body")),
        $backToTopFun = function() {
            var st = $(document).scrollTop();
            (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
        };

        $backToTopEle.find("a.gotoTop").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120); 
        });
        
        $backToTopEle.find('.backTotop_icon').hover(function(){
            var box = $(this).find('.backTotop_box');
            box.stop().show().animate({opacity: 1,right: 48},300);
        },function(){
            var box = $(this).find('.backTotop_box');
            box.stop().animate({opacity: 0,right: 60},300,function(){
                box.hide();
            });
        });
        
        $(window).bind("scroll", $backToTopFun);
        //$(function() { $backToTopFun(); });
    }
};

//*********************购物车相关
GLOBAL.cart={
    //更新购物车数量
    cartItems:function(){
      var URL=DOMAIN_CART+'/fun/?act=cart_item&noscript=1&callback=?';
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
            $("#bottom_new_addcart").attr('num',goodNum);
            //改变币种
            GLOBAL.currency.change_html("",$unitPrice.parent());
       
    },
    //添加商品到购物车

    addcart:function(obj,is_custom,callback){

        var uping_addCartBtn = $(".order_btn").find('.redBtn');
        uping_addCartBtn.addClass('uping');
        setTimeout(function(){
            uping_addCartBtn.removeClass('uping');
        }, 3000);

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
        var bottom_target_div;

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
        bottom_target_div = $(this).attr('atrid')!=undefined?"#bottom_add_cart_msg"+gid+atrrid:"#bottom_add_cart_msg"+gid;
        if (error_msg !=''){ alert(error_msg);return false;}

        var URL=DOMAIN_CART+'/'+JS_LANG+ "m-flow-a-add_to_cart.htm?jsoncallback=?&"+"goods_id="+gid+"&number="+num+"&spec="+cartval+"&attrchage="+attrchage+"&select_custom_size="+select_custom_size;
        // alert(URL)
        $.getJSON(URL, function(data) {
            msg = data.ms;
            if (msg.indexOf('Added To Cart')>0){  //当添加成功的时候执行并分解 1||Added To Cart
                var mag_arr = msg.split('||');
                cartnum = parseInt(mag_arr[0]);
                $(".all_red_cart_items").each(function(){$(this).html(cartnum);}); //刷新每一个
                if (reflash == "1" ){

                    var shipsText = $('#ships_text');
                    if(shipsText.length){
                        $.layer({
                            type: 1,
                            page: {
                                html: '<div style="padding:10px 20px;margin:0 30px;">'+ shipsText.html() +'</div>'
                            },
                            shade: [0.2, '#000', true],
                            title: false, 
                            closeBtn: false,
                            time: 2,
                            offset: [(window.innerHeight-35)/2 + 'px' , (window.innerWidth-300)/2 + 'px'],
                            area: ['400px' , 'auto'],
                            success: function(layer){
                                layer.css('text-align', 'center')
                                layer.find('.xubox_page span').removeClass('pl30');
                            },
                            end: function(){
                                runMiniCart();
                            }
                        })
                    }else{
                        runMiniCart();
                    }

                    function runMiniCart(){
                        var _mini_cart = $('#mini_cart');                    
                        _mini_cart.fadeIn('fast');
                        GLOBAL.cart.miniCart(function(){
                            if(typeof goodsCartBlank!="undefined" && goodsCartBlank){
                                clearTimeout(goodsCartBlank);
                            }
                            goodsCartBlank = setTimeout(function(){
                                _mini_cart.fadeOut('fast');
                            },5000)
                        });
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
                        $("#action_msg").delay(2000).fadeOut(1000);
                    }
                    else
                    {
                        $(target_div).html(msg);
                        $(bottom_target_div).html(msg);
                        
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
    re_load:function(page_url,selectStr,callBack){
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

                if(callBack && typeof(callBack)=='function'){
                    callBack();
                }
            }
        });
    },

    //更新mini购物车数据
    miniCart: function(callBack){
        var _mini_cart = $('#mini_cart');       
        $.ajax({
            url: '/fun/index.php?act=cart_get_list',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            var goodsItem = data.goods_list;
            $("html,body").animate({scrollTop:0}, 500);//回到顶部

            $('#js_cart_items').html(data.total_goods_number);
            if(data.total_goods_number == 0){
                _mini_cart.empty();
                if($('#null_minicart').length == 0){
                    _mini_cart.append('<p id="null_minicart" class="tc" style="line-height:50px; color:#000; font-family:Verdana; font-size:14px;">Your Shopping Bag is Empty.</p><i class="triangle bord_tri"></i><i class="triangle bg_tri"></i>');
                }
            }else{          
                var goodsHtml = "";
                
                goodsHtml += '<ul>';
                for (var i = 0; i < goodsItem.length; i++) {
                    var saleStatus ='';
                    var canBuyStatus = '';//下架状态或缺货状态
                    //判断预售还是非预售
                    if(goodsItem[i].is_presale!==undefined){
                        switch(goodsItem[i].is_presale){
                            case 0:
                            saleStatus = '';
                            break;
                            case 1:
                            saleStatus='<span class="big_sale">PRESALE</span>';
                            break;
                        }
                    }
                    //判断清仓还是非清仓
                    if(goodsItem[i].is_clearance!==undefined){
                        switch(goodsItem[i].is_clearance){
                            case 0:
                            saleStatus = (saleStatus === "" ) ? '' : saleStatus;
                            break;
                            case 1:
                            saleStatus='<span class="big_sale">CLEARANCE</span>';
                            break;
                        }
                    }
                    //判断促销还是非促销
                    if(goodsItem[i].is_sale!==undefined){
                        switch(goodsItem[i].is_sale){
                            case 0:
                            saleStatus = (saleStatus === "" ) ? '' : saleStatus;
                            break;
                            case 1:
                            saleStatus='<span class="big_sale">SALE</span>';
                            break;
                        }
                    }
                    //判断售完还是非售完
                    if(goodsItem[i].is_soldout!==undefined){
                        switch(goodsItem[i].is_soldout){
                            case 0:
                            saleStatus = (saleStatus === "" ) ? '' : saleStatus;
                            canBuyStatus = (canBuyStatus === "" ) ? '' : canBuyStatus;
                            break;
                            case 1:
                            saleStatus='<span class="big_sale">SOLD OUT</span>';
                            canBuyStatus = 'canBuyThisPro';
                            break;
                        }
                    }
                    //判断下架还是非下架
                    if(goodsItem[i].is_outofstock!==undefined){
                        switch(goodsItem[i].is_outofstock){
                            case 0:
                            saleStatus = (saleStatus === "" ) ? '' : saleStatus;
                            canBuyStatus = (canBuyStatus === "" ) ? '' : canBuyStatus;
                            break;
                            case 1:
                            saleStatus='<span class="big_sale">OUT OF STOCK</span>';
                            canBuyStatus = 'canBuyThisPro';
                            break;
                        }
                    }

                    goodsHtml += '<li class="item '+ canBuyStatus + ' clearfix"><a class="itempic" href="'+goodsItem[i].url_title+'"><img class="js_loadingimg" src="'+goodsItem[i].goods_thumb+'" height="100" title="'+goodsItem[i].goods_name+'">' + saleStatus +'</a>';
                    goodsHtml += '<div class="itemtext"><h5 class="tit"><a href="'+goodsItem[i].url_title+'">'+goodsItem[i].goods_name+'</a></h5><p class="sizecolor">'+goodsItem[i].goods_attr+'</p><p class="p_qty">QTY: '+goodsItem[i].goods_number+'</p><p class="tatal">UNIT PRICE:<span class="bizhong">USD</span><span class="my_shop_price fb" orgp="'+goodsItem[i].goods_price+'">'+goodsItem[i].goods_price+'</span></p></div>';
                    goodsHtml += '<a href="javascript:;" class="itemDel js_del c_tagbg none" data-gid="'+goodsItem[i].rec_id+'" title="Delete"></a></li>';              
                };
                if(data.gift != ''){
                    goodsHtml += '<li class="item clearfix giftItem"><a class="itempic" href="'+data.gift.url_title+'"><img class="js_loadingimg" src="'+data.gift.goods_thumb+'" height="100" title="'+data.gift.goods_name+'"></a>';
                    goodsHtml += '<div class="itemtext"><h5 class="tit"><a href="'+data.gift.url_title+'">'+data.gift.goods_name+'</a></h5><p class="sizecolor">'+data.gift.goods_attr+'</p><p class="p_qty">QTY: '+data.gift.goods_number+'</p><p class="tatal">UNIT PRICE:<span class="bizhong">USD</span><span class="my_shop_price fb" orgp="'+data.gift.goods_price+'">'+data.gift.goods_price+'</span></p></div>';
                    goodsHtml += '<a href="javascript:;" class="itemDel js_del_mz c_tagbg none" data-gid="'+data.gift.rec_id+'" data-mz_id="'+data.gift.manzeng_id+'" title="Delete"></a></li>';    
                }
                goodsHtml += '</ul>';
                goodsHtml += '<div id="nextCheckout" class="none pl10 pr10">';
                goodsHtml += '<p class="tr f18 lh200 p10 p_subtotal">GRAND TOTAL: <span class="my_shop_price fb" orgp="'+data.subtotal+'">'+data.subtotal+'</span></p>';
                // goodsHtml += data.tags ? '<p class="tc pb20 f14">'+data.tags+'</p>': '';
                goodsHtml += '<p class="tc mb10"><a href="'+DOMAIN_CART+'/m-flow-a-cart.htm" class="checkoutBtn">View My Bag / Check Out</a></p>';
                goodsHtml += '</div>';
                goodsHtml += '<i class="triangle bord_tri"></i><i class="triangle bg_tri"></i>';


                _mini_cart.html(goodsHtml);
                 GLOBAL.currency.change_html($.cookie('bizhong'),_mini_cart);   
                $('#nextCheckout').show();
            
                _mini_cart.on('mouseenter', 'li', function() {
                    $(this).find('.itemDel').stop(false,true).fadeIn('fast');
                }).on('mouseleave', 'li', function() {
                    $(this).find('.itemDel').stop(false,true).fadeOut('fast');
                });
            }
            if(callBack){
                callBack();
            }
        })
    },

    //操作mini购物车
    controlMiniCart: function(){
        var _mini_cart = $("#mini_cart");
        var miniCartBlank = null;
        if($("#cart_list").length > 0 || $("#checkout_list").length > 0){//如果是购物车页面、支付页面，不显示购物袋
            return false;
        }else{//否则，显示购物袋
            $("#js_topCart").parent().hover(function() {
                if(miniCartBlank){
                    clearTimeout(miniCartBlank);
                }
                if(typeof goodsCartBlank!="undefined" && goodsCartBlank){
                    clearTimeout(goodsCartBlank);
                }

                _mini_cart.fadeIn('fast');
                if(!_mini_cart.find('li').length && !_mini_cart.find('#null_minicart').length){
                    GLOBAL.cart.miniCart();
                }
            }, function() {
                miniCartBlank = setTimeout(function(){
                    _mini_cart.fadeOut('fast');
                },300)
                
            });
        }

        //删除一个普通商品
        _mini_cart.on('click', '.js_del', function() {
            var rec_id = $(this).data('gid');
            $.ajax({
                url: DOMAIN_CART+'/m-flow-a-drop_goods-id-'+rec_id+'.htm',
                type: 'GET',
                dataType: 'jsonp'
            })
            .done(function() {
                if($('#cart_list').length){
                    location.reload();
                }else{
                    GLOBAL.cart.miniCart();
                }
            })
        });
       
         //删除一个满赠商品
        // _mini_cart.on('click', '.js_del_mz', function() {
        //  var MZId = $(this).data('mz_id');
        //  $.ajax({
        //      url: DOMAIN_CART+'m-flow-a-drop_manzeng_gift-manzeng_id-'+MZId+'.htm',
        //      type: 'GET',
        //      dataType: 'jsonp'
        //  })
        //  .done(function() {
        //      if($('#cart_list').length){
        //          location.reload();
        //      }else{
        //          GLOBAL.cart.miniCart();
        //      }
        //  })
        // });

        // _mini_cart.find('.checkoutBtn').addClass('loadBar').text('Loading...');

    }
};
//读取浏览商品的历史记录
GLOBAL.browserHistories={
    /*return Array histories or null*/
    redBrowserHistories:function(){
        var histories = $.cookie('browserHistories');
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
                html +='<li>';
                html +='<a href="'+items[0]+'" title="'+ items[1] +'" class="i_proImg"><img height="216" alt="'+ items[1] +'" src="'+ items[2] +'" ></a>';
                html +='<p class="proName"><a href="'+items[0]+'" title="'+items[1] +'">'+ items[1]+'...</a></p> ';
                html +='<p class="proPrice"><span class="bizhong"></span><span class="my_shop_price fb f14" orgp="'+ items[3] +'"></span></p>'
                html +='</li>' ;
            });
            html+='</ul>';

            $(".youRecentHistory").html(html);

            if(callback){
                callback();
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
                 $stateWrapBox.html("<input type='text' name='province' class='choiceCountry inputText long' value='"+state_str+"' />");
                
            }

            if(countryCode){
                //国家的区号
                // $codeBox.parent("div").css("paddingLeft",'50px');
                $codeBox.html("+"+countryCode+"<input type='hidden' name='code' value='"+countryCode+"'>");
            }else{
                $codeBox.html("");
                // $codeBox.parent("div").css("paddingLeft",0);
            }
        }
    })
    
    // var country = $("#country_json").val();//获得国家的json数据
    // if(country){
    //      var countrys = eval('(' + country + ')');
    // }
    // var state_str = options.state_str? options.state_str : "";
    // var address_id = parseInt(options.address_id);
    // var selectcountry = countrys[options.country_id] ;
    // var $codeBox =  $(".code_"+address_id);
    // var $stateWrapBox = $('.state_'+address_id+'_'+address_id);

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
    //              province = state[i].replace('`',"'");
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
};
//检查信息（登录信息，购物车信息，记录商品详情页点击率,，每周特销时间）
//action = 1 普通登录信息，购物车信息检查 ， action = 2登录信息，购物车信息，记录商品详情页点击率 ， action = 3 登录信息，购物车信息，每周特销时间
function info_check(action){
    var url = "/fun/?act=info_check&action="+action;
    var query_url = window.location.href;   //当前页面URL地址

    //var lkid = _GET('lkid', query_url);     //获取URL地址中是否有lkid
    var lkid = _GET('lkid', location.hash.indexOf('lkid=') > 0 ? '?' + location.hash.substr(1) : null);
    var cij7 = query_url.indexOf('cij7');
    var cij6 = query_url.indexOf('cij6');
    var cij8 = query_url.indexOf('cij8');
    lkid = cij7 > 0 ? 34857 : cij6 > 0 ? 34856 : cij8 > 0 ? 34858 : lkid;

    if(lkid){
        var referrer_url = encodeURIComponent(document.referrer);   //来源URL地址
        url += "&lkid=" + lkid + "&referrer_url="+referrer_url;
    }
     $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        data: {
            location_url: location.href
        },
        cache:false,
        success: function(msg){//msg={firstname:"",cart_items:"",LeftTime:"",has_order:""}
            $("#js_cart_items").html(parseInt(msg.cart_items,10) );

            GLOBAL.login.isLoginEnd(msg.firstname);
            if(msg.has_order == 1){
                $(".js_index_right_banner").show();
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

    //操作mini購物車
    GLOBAL.cart.controlMiniCart();

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

    //导航
    $("#nav").on("mouseenter","li",function(){
        var $this = $(this),
            liOffset = $this.offset(),
            windW = $(window).width();

        if(liOffset.left < 95){
           $this.addClass('leftCate');
        }else if(windW - liOffset.left - $this.outerWidth(true) < 95){
            $this.addClass('rightCate');
        }

        $this.find('div.sub_menu').stop().show();

    });
    $("#nav").on("mouseleave","li",function(){
        var $this = $(this),
            liOffset = $this.offset(),
            windW = $(window).width();

        if(liOffset.left < 95){
           $this.removeClass('leftCate');
        }else if(windW - liOffset.left - $this.outerWidth(true) < 95){
            $this.removeClass('rightCate');
        }

       $this.find('div.sub_menu').stop().hide();
    });
    //回到顶部
    GLOBAL.FloatObj.goToUp();


    //js_showPromocode
    var getPopTop = function(height){
        var wH = $(window).height();
        return (wH - height) / 2;
    };

    $("#js_showPromocode").click(function () {
        var offsetTop = getPopTop(535) + 'px';
        GLOBAL.PopObj.iframe({
            iframe : {src : DOMAIN + '/temp/skin3/promoCode/promocodePop.html?2015102201'},
            area : ['670px','535px'],
            shade : [0.3 , '#000' , true],
            shadeClose : false,
            offset : [offsetTop , '50%']
        })

    });
});