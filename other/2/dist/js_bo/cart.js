(function($,window){
    window.CART ={
        getDataUrl : '/m-flow-a-get_cart.html',                 // 获取 json 数据地址 POST
        updateGoodsNumUrl : '/m-flow-a-update_cart.html',       // 更新购物车产品数量 POST: goodsNumber，cartId
        deleteGoodsUrl : '/m-flow-a-drop_goods.html',           // 删除单个产品 POST: cartId
        clearCartUrl : '/m-flow-a-clear.html',                  // 清空购物车 POST
        updateSelectStatusUrl : '/m-flow-a-checked_cart.html',  // 更新购物车选中状态 POST: cartId,selected ; 备注: selected  0 单个不选 1单个选中 2 全部选中 3全部不选

        maxGoodsNum : 999999,
        inputTimer : null,

        getCartAjaxPromise : function (ajaxOptions,isAutoCallBack) {
            // 直接返回pomise对象
            isAutoCallBack = ((arguments.length) > 1) ? isAutoCallBack : true;
            var defaults = {
                type: 'POST',
                global: true,
                dataType: 'json'
            };
            ajaxOptions = $.extend({},defaults,ajaxOptions);
            var promise = $.ajax(ajaxOptions);
            if (isAutoCallBack) {
                this.ajaxSuccessCall(promise);
            }
            return promise;
        },
        checkIsselectAll : function () {
            // 判断是否全选
            var $parent = $("#cart_form");
            var $selectItem = $parent.find(".js_select_tiem");
            if($selectItem.length ==  $selectItem.filter(".selected").length){
                $parent.find('.js_select_all').addClass("selected");
            }else{
                $parent.find('.js_select_all').removeClass("selected");
            }
        },
        init: function () {
            var that = this;
            var promise = this.getCartAjaxPromise({
                url : this.getDataUrl
            },false);
            promise.done(function (result) {
                switch (result.status){
                    case 0 :
                        that.render(result);
                        break;
                    default :
                        that.ajaxFailCall(result);
                        break;
                }
            })
            .fail(function(){
                layer.alert("获取购物车信息失败，点击确定重试",function(){
                    window.location.reload(true);
                });
            });

        },
        render :function (result) {
            // 渲染购物车列表
            var gettpl = document.getElementById('cart_tmp').innerHTML;

            // 更新顶部购物车产品
            if(typeof (result.data.cart_num) != "undefined") $("#js_topCartNum").text(result.data.cart_num);
            laytpl(gettpl).render(result.data, function(html){
                document.getElementById('cart_form').innerHTML = html;
            });
            this.checkIsselectAll();
        },
        checkGoodsNum : function(goodsNum){
            // 检查 goodsNum 0 - 9999
            return (parseInt(goodsNum) == goodsNum && goodsNum > 0 && goodsNum <= this.maxGoodsNum) ;
        },
        changeEvent : function (obj) {
            // 修改goodsNum 事件
            var that = this;
            var goodsNumber = obj.value;
            var cartId = $(obj).data('cart-id');
            clearTimeout(that.inputTimer);
            if(this.checkGoodsNum(goodsNumber)){
                this.inputTimer = setTimeout(function () {
                    that.changeNum(goodsNumber,cartId);
                },800);
            }else{
                obj.value = $(obj).data("value");
                // that.changeNum(goodsNumber,cartId);
            }
        },
        changeNum : function(goodsNumber,cartId){
            // 执行 ajax GoodsNum 更改操作
            this.getCartAjaxPromise({
                url : this.updateGoodsNumUrl,
                data: {cart_id: cartId, goods_number: goodsNumber}
            });
        },
        remove : function (cartId) {
            this.getCartAjaxPromise({
                url : this.deleteGoodsUrl,
                data: {cart_id: cartId}
            });
        },
        selectCart: function(cartId,selected) {
            var data = {selected: selected};
            if(selected == 0 || selected == 1){
                data.cart_id = cartId;
            }
            //console.log(data);
            this.getCartAjaxPromise({
                url : this.updateSelectStatusUrl,
                data: data
            });
        },
        ajaxSuccessCall: function(promise){
            var that = this;
            promise.done(function (result) {
                if(result.status != 0){
                    that.ajaxFailCall(result);
                }else{
                    that.render(result);
                }
            });
        },
        ajaxFailCall: function (result) {
            var errorMsg = result.msg;
            layer.alert(errorMsg,function(){
                window.location.reload(true);
            });

        }
    };

    $(function () {
        // get cart data
        CART.init();
        var $parentForm = $("#cart_form");
        $parentForm.on("click",".js_update_num", function (e) {
            e.preventDefault();
            var $cart_goods_num = $(this).siblings(".cart_goods_num");
            var currentNum = $cart_goods_num.val() || 1;
            var isPlus = $(this).hasClass("cart_goods_plus");
            var goodsNumber;
            if(isPlus){
                goodsNumber = ((++ currentNum) >= CART.maxGoodsNum) ? CART.maxGoodsNum : currentNum;
            }else{
                if (currentNum == 1) return;
                goodsNumber = -- currentNum;
            }
            $cart_goods_num.val(goodsNumber);
            var cartId = $cart_goods_num.data('cart-id');
            CART.changeNum(goodsNumber,cartId);
        });

        $parentForm.on("click",'.js_cart_remove', function (e) {
            e.preventDefault();
            CART.remove($(this).data('cart-id'));
        });

        $parentForm.on("click",'.js_select_checkbox', function (e) {
            $(this).toggleClass("selected");
            var selected;
            if($(this).hasClass("js_select_all")){
                if($(this).hasClass("selected")){
                    // 全选
                    $parentForm.find(".js_select_checkbox").addClass("selected");
                    selected = 2;
                }else{
                    // 全反选
                    $parentForm.find(".js_select_checkbox").removeClass("selected");
                    selected = 3;
                }
            }else{
                // 单个按钮
                selected = $(this).hasClass("selected") ? 1 : 0;
            }
            // console.log($(this).data('cart-id'),selected);
            CART.selectCart($(this).data('cart-id'),selected);
        });

    });

})(jQuery,window)