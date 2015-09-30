(function(){
    /**
     * 删除购物车一个产品
     * @param  {String} pageUrl  ajax地址
     * @param  {Jquery 对象} $tobj   被点击的元素
     * @param  {Jquery 对象} $tobjL  要删除的一列元素
     * @param  {String} popIndex lay弹出框的id
     * @return {null}          [description]
     */
    function list_load(pageUrl,$tobj,$tobjL,popIndex){
        var msg_json="";
        $.ajax({
            type: "GET",
            url: pageUrl,
            beforeSend:function(){$tobj.html('<span style="font-size:12px; padding-right:15px">'+jsLg.addToCartPage_2+'</span>');},
            success: function(msg){
                msg_json = eval("("+msg+")");
                if (msg_json.result_msg=='Deleted'){
                    $tobjL.slideUp();
                    GLOBAL.cart.re_load( '/'+JS_LANG+'m-flow-a-cart.htm',"#cart_list");
                }
                else if(msg_json.result_msg=='Deleted_token'){
                    $tobjL.slideUp();
                    GLOBAL.cart.re_load( '/'+JS_LANG+'m-flow-a-cart.htm?token='+msg_json.token+'&PayerID='+msg_json.PayerID,"#cart_list");
                }
               // $tobj.html(msg_json.result_msg);

                if(popIndex){
                    layer.close(popIndex);
                }
            }
        });
    }
    /**
     * 删除元素前弹出选择框
     * @param  {String} pageUrl  ajax地址
     * @param  {Jquery 对象} $tobj   被点击的元素
     * @param  {Jquery 对象} $tobjL  要删除的一列元素
     * @param  {String} popIndex lay弹出框的id
     * @return {null}          [description]
     */
    function cartConfim(delmsg,pageUrl,$tobj,$tobjL){
        GLOBAL.PopObj.confirm({
            shade : [0.8 , '#000' , true],

            dialog : {
                msg:delmsg,
                yes : function(index){
                   list_load(pageUrl,$tobj,$tobjL,index);
                },
                no : function(index){
                    layer.close(index);
                }
            }
        });
    }
     /**
     * 检测是否有要选中的商品列表
     * @return {Array} 返回选择商品的id
     */
    function cheackSelectPro(){
        var goodIdArr = [];

        $(".js_selectGoods").each(function(index, el) {
            if(this.checked == true ){
                goodIdArr.push($(this).data("goods_id"));
            }
        });
        return goodIdArr;
    }

    //提示信息
    function cartAlert(msg){
        GLOBAL.PopObj.confirm({
            shade : [0.8 , '#000' , true],
            area : ['auto','auto'],
            title: jsLg.message,
            closeBtn : [0 , false],
            dialog : {
                msg:msg,
                btns : 1,
                type : 0,
                btn : ['Ok'],
                yes :  function(index){
                    layer.close(index);
                }
            }
        })
    }

    //检查use Copon code
    function checkcode(obj){
        var obj = $(obj);
        var objvalue = encodeURIComponent(obj.val());
        var huance   = obj.attr('huance');  //huan chun zong jia
        var isApply  = obj.attr('isapply');  //huan chun shi fou yingyong
        var huancode = obj.attr('huancode');  //huan chun cu xiao ma , yongyu panduan cuxiaoma sfou you gaidong
        var total_obj = $('span[entry="all_total_price"]');
        var total_p = parseFloat(huance).toFixed(2);

        if (isApply == "1") {

            if (objvalue!=huancode){
                total_obj.html(total_p);
                total_obj.attr('orgp',total_p);
                obj.attr('isApply','0');
                obj.attr('huance','0');
                cartAlert(jsLg.addToCartPage_3);
            }
        }
    }

    //提交use Copon code
    function codeApply(obj_str){
        var obj = $("#"+obj_str);
        var objvalue = encodeURIComponent(obj.val());

        if  (objvalue.length == 0) {
            obj.focus();
            return false;
        }

        if (objvalue.length > 40){
            cartAlert(jsLg.addToCartPage_4);
            return false;
        }

        var hitnum = 1;
        $('#apply_msg').html(jsLg.addToCartPage_5);

        GLOBAL.cart.re_load( '/'+JS_LANG+'m-flow-a-cart.htm?pcode='+objvalue,"#cart_list");
    }

    var changeNumBlank=null;
    //更新数量
    $("#cart_list").on("keyup","input.js_goods_number",function(){
        var $this = $(this);
        var num =  $this.val();

        if (!num) return false;
        
        if(num > 9999){
            num = 9999;
            $this.val(num);
        }

        var rid = ( $this.data('gid') != undefined) ? $this.data('gid'):'';
        var PayerID = ( $this.data('payer_id')!=undefined) ? $this.data('payer_id'):'';
        var token = ( $this.data('token')!=undefined) ? $(this).data('token'):'';

        var $msgBox = $("#num"+rid);
        var msg_json="";
        if(changeNumBlank){
            clearTimeout(changeNumBlank);
        }
        changeNumBlank = setTimeout(function(){
            $.ajax({
                type: "POST",
                url: '/'+JS_LANG+'m-flow-a-update_cart.htm',
                data:'rid='+rid+'&goods_number='+num+'&token='+token+'&PayerID='+PayerID,
                beforeSend:function(){$msgBox.addClass('loading');},
                success: function(msg){
                    msg_json = eval("("+msg+")");
                    if (msg_json.result_msg=='Updated'){
                        $msgBox.removeClass('loading');
                        GLOBAL.cart.re_load(  '/'+JS_LANG+'m-flow-a-cart.htm',"#cart_list");
                    }
                    else if(msg_json.result_msg=='Updated_token'){
                        $msgBox.removeClass('loading');
                        GLOBAL.cart.re_load(  '/'+JS_LANG+'m-flow-a-cart.htm?token='+msg_json.token+'&PayerID='+msg_json.PayerID,"#cart_list");
                    }else{
                        var  msg = jsLg.out_of_stock.replace('#num#', /(\d)+/.exec(msg_json.result_msg)[0]);
                        $msgBox.removeClass('loading').html(msg);
                    }
                }
            });
        },800);
    });


    //购物车中数量减一
    $("#cart_list").on("click","span.js_cart_reduce",function(){
        var rec_id = $(this).data("gid");
        var item = $('#goods_number_' + rec_id);
        var orig = Number(item.val());

        if(orig > 1){
            item.val(orig - 1);
            item.keyup();
        }
    });

    //购物车中数量加一
    $("#cart_list").on("click","span.js_cart_add",function(){
        var rec_id =$(this).data("gid");
        var item = $('#goods_number_' + rec_id);
        var orig = Number(item.val());
        var num = orig + 1;

        if(num > 9999){
            num = 9999;
        }

        item.val(num);

        item.keyup();
    });

    //全选联动
    $("#cart_list").on("change","#selected_allGoods",function(){
        /* Act on the event */
        var that = this;
        $("input.js_selectGoods").each(function(index, el) {
            this.checked = that.checked ? that.checked : false ;
        });

    });

    $("#cart_list").on("change","input.js_selectGoods",function(){
         /* Act on the event */
        var _flag = true;

        $("input.js_selectGoods").each(function(index, el) {
            if(!this.checked){
                _flag = false;
            }
        });

        $("input#selected_allGoods").get(0).checked = _flag ;
    });


    //删除购物车一个商品
    $("#cart_list").on("click","a.js_del_action",function(){
        var $this = $(this);
        var delatr = ($this.data('delatr') != undefined) ? $this.data('delatr') : '';  //删除连接
        var gid  = ($this.data('gid') != undefined) ? $this.data('gid') : '';
        var delmsg = ($this.data('delmsg') != undefined) ? $this.data('delmsg') : jsLg.addToCartPage_1; //确认信息

        if(delatr != ''){
            cartConfim(delmsg,delatr,$this.parent(),$this.parents("ul"));
        }
        // if ((confirm(delmsg)) && (delatr != '')){
        //     list_load(delatr,$this.parent(),$this.parents("tr"));
        // }
    });

    //添加到收藏加
    $("#cart_list").on("click","a.favorite",function(){
        var $this = $(this);
        var options = {
            url:$this.attr("data-src"),
            rebackPage:window.location.href,
            top:$this.offset().top,
            left:$this.offset().left,
            cartPage:1,
            carFavBtn:$this
        };
        GLOBAL.login.isLogin(GLOBAL.addTofavorite,options);
        return false;
    });

    //清空购物车
    $("#cart_list").on("click","#del_all_action",function(){
        var delatr = ($(this).attr('delatr')!=undefined)?$(this).attr('delatr'):'';  //删除连接
        var delmsg = ($(this).attr('delmsg')!=undefined)?$(this).attr('delmsg'):jsLg.addToCartPage_1; //确认信息
        var goodId = cheackSelectPro();
        var trList =[];

        if(goodId.length>0){
            if(delatr != ''){
                $.each(goodId,function(index, el) {
                    trList.push("#js_cartListTr_"+el);
                });

                delatr += '?id='+goodId.join(",");
                cartConfim(delmsg,delatr,$(this).parent(),$(trList.join(",")))
            }
            // if ((confirm(delmsg)) && (delatr!='')){
            //     list_load(delatr,$(this).parent(),$("ul.cartList_l"));
            //     //cart_items();
            // }
        }else{
            cartAlert(jsLg.addToCartPage_6)
        }
    });

    //save for later 函数
    function saveForLater(msg,options){
        var goodStr = options.goodId.join(",");
        if(msg){
            $.get(options.url+"?id="+goodStr,function(data){
                if(data){
                    cartAlert(jsLg.saveForLater);
                }
            })
        }else{
            window.location.href = HTTPS_LOGIN_DOMAIN + "/" + JS_LANG + "m-users-a-sign.htm?ref="+window.location.href;
        }
    };
    //save for later
    $("#cart_list").on("click","#add_to_save",function(){
        var goodId = cheackSelectPro();
        var trList =[];
        var options = {
            goodId : goodId,
            url:$(this).attr("data-src")
        }

        if(goodId.length>0){
            GLOBAL.login.isLogin(saveForLater,options);

        }else{
            cartAlert(jsLg.addToCartPage_6)
        }
        return false;
    });

    //根据国家查看运费
    $("#cart_list").on("change","#selcountries",function (){
        var country = $(this).val();
        var $loading = $("#load_ajax_msg"),$shipajax = $('#shipajax');

        if (country == '') return false;

        $.ajax({
            type: "POST",
            url:  '/'+JS_LANG+'m-flow-a-cart.htm?country='+country,
            beforeSend:function(){$loading.show().html(jsLg.addToCartPage_2); },
            success: function(msg){
                $loading.hide();
                var stext = $(msg).find('#shipajax').html();
                $shipajax.html(stext);
                GLOBAL.currency.change_html("",$shipajax);
            }
        });
    });

    //useCopon input keyUp
    $("#cart_list").on("keyup","#promotion_code",function(){
        checkcode(this);
    });
    $("#cart_list").on("click",".applyBtn",function(){
        codeApply("promotion_code");
    });

    //tips提示
    $(".js_tips").hover(function() {
        var $this = $(this);

        GLOBAL.PopObj.tipsShow({
            Obj : $this,
            msg : $this.data("tips")
        })
    }, function() {
        /* Stuff to do when the mouse leaves the element */
        GLOBAL.PopObj.closeTipsShow();
    });
})();

// Coupon码
(function(){
      

    $("#cart_list").on("click",'#promotion_code',function(){
        if($(this).data('coupon-event')==1){
            $('#coupon').css("width",$("#promotion_code").width()).slideDown('fast');
        }
    });
    $("#cart_list").on('mouseleave',"#js_couponWrap",function(event) {
        /* Act on the event */
        $('#coupon').hide();
    });
   

    $("#cart_list").on('click','#coupon li',function(){
        $('#promotion_code').val($(this).data('coupon'));
        $('#js_couponWrap').find("a.applyBtn").trigger('click');
    });
 
})()