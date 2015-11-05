(function($,window){
    window.CART ={
        getDataUrl : '/m-flow-a-get_cart.html',                 // 获取 json 数据地址 POST
        updateGoodsNumUrl : '/m-flow-a-update_cart.html',       // 更新购物车产品数量 POST: goodsNumber，cartId
        deleteGoodsUrl : '/m-flow-a-drop_goods.html',           // 删除单个产品 POST: cartId
        clearCartUrl : '/m-flow-a-clear.html',                  // 清空购物车 POST
        updateSelectStatusUrl : '/m-flow-a-checked_cart.html',  // 更新购物车选中状态 POST: cartId,selected ; 备注: selected  0 单个不选 1单个选中 2 全部选中 3全部不选

        maxGoodsNum : 999999,
        inputTimer : null,

        isRequesting : false,  // 请求中标识

        // 独立出来
        minCartTpl : '{{# if(d.cart_list.length <=0 ){ }}<div class="empty-cart min-cart-content"><p class="empty-text">您的购物车还是空的<br/>赶紧行动吧！</p><p class="total"><a href="/" class="checkout-btn btn btn-default btn-sm">去逛逛</a></p></div>{{# }else{ }}<div class="cart-list min-cart-content"><h4 class="title"><span>最近加入的商品</span></h4><ul class="list">{{#var cartList = d.cart_list,minCartLength=(d.cart_list.length >4) ? 4 : d.cart_list.length;for(var i = 0; i < minCartLength; i++){ }}<li><div class="goods-img"><a href="{{cartList[i].url}}"><img src="{{cartList[i].img}}" alt="{{cartList[i].title}}" width="58" height="58" /></a></div><div class="goods-info"><p class="goods-title"><a href="{{cartList[i].url}}" title="{{cartList[i].title}}">{{cartList[i].title}}</a></p><p class="goods-num"><a class="cart_goods_minus js_update_num" href="javascript:void (0)">-</a><input type="text" data-value="3" class="cart_goods_num" data-cart-id="{{cartList[i].cart_id}}" onkeyup="CART.changeEvent(this)" value="{{cartList[i].goods_num}}"><a class="cart_goods_plus js_update_num" href="javascript:void (0)">+</a></p></div><a class="icon-remove-sm icon js_cart_remove" href="javascript:void (0)" data-cart-id="{{cartList[i].cart_id}}"></a><div class="item-total">￥{{cartList[i].sub_total}}</div></li>{{# } }}</ul><p class="total"><span class="num">共 <span class="color-increase">{{(d.cart_num) ? d.cart_num : 0}}</span> 件商品</span><a href="/m-flow-a-cart.html" class="checkout-btn btn btn-default btn-sm">去购物车</a></p></div>{{# } }}',

        getCartAjaxPromise : function (ajaxOptions,isAutoCallBack) {
            // 直接返回pomise对象
            var self = this;
            isAutoCallBack = ((arguments.length) > 1) ? isAutoCallBack : true;
            var defaults = {
                type: 'POST',
                global: !this.isMinCart,
                dataType: 'json'
            };
            ajaxOptions = $.extend({},defaults,ajaxOptions);

            self.isRequesting = true;   //请求中

            var promise = $.ajax(ajaxOptions);
            if (isAutoCallBack) {
                self.ajaxSuccessCall(promise);
            }
            promise.always(function () {
                self.isRequesting = false;   //请求结束
            });
            return promise;
        },
        checkIsSelectAll : function () {
            var self = this;
            if(self.isMinCart) return;
            // 判断是否全选
            var $selectItem = self.$parentForm.find(".js_select_tiem");
            if($selectItem.length ==  $selectItem.filter(".selected").length){
                self.$parentForm.find('.js_select_all').addClass("selected");
            }else{
                self.$parentForm.find('.js_select_all').removeClass("selected");
            }
        },

        /**
         *
         * @param result 购物车json数据
         */
        firstCartTrack : function (result) {
            !function(w,d,e){
            var _money= 0.00;
            var _productList='';
            for(var i in result.data.cart_list)
            {
                _money = (_money - 0) + (result.data.cart_list[i].sub_total - 0);
                _productList += result.data.cart_list[i].goods_id+ ','+result.data.cart_list[i].goods_num+';';
            }
            var b=location.href,c=d.referrer,f,s,g=d.cookie,h=g.match(/(^|;)\s*ipycookie=([^;]*)/),i=g.match(/(^|;)\s*ipysession=([^;]*)/);if (w.parent!=w){f=b;b=c;c=f;};u='//stats.ipinyou.com/cvt?a='+e('M2s.nzs.iqilqD6VCH_iOBRqYEp9SP')+'&c='+e(h?h[2]:'')+'&s='+e(i?i[2].match(/jump\%3D(\d+)/)[1]:'')+'&u='+e(b)+'&r='+e(c)+'&rd='+(new Date()).getTime()+'&Money='+e(_money)+'&ProductList='+e(_productList)+'&e=';
            function _(){if(!d.body){setTimeout(_(),100);}else{s= d.createElement('script');s.src = u;d.body.insertBefore(s,d.body.firstChild);}}_();
            }(window,document,encodeURIComponent);
        },

        /**
         * 绑定事件
         */
        bindEvent : function () {
            // 20151026 min 购物车共用

            var self = this;
            self.$parentForm = $('#' + self.cartTmpId);

            if(self.$parentForm.length > 0){
                self.$parentForm.on("click",".js_update_num", function (e) {
                    e.preventDefault();
                    if(self.isRequesting) return false;

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

                self.$parentForm.on("click",'.js_cart_remove', function (e) {
                    e.preventDefault();
                    CART.remove($(this).data('cart-id'));
                });

                if(!self.isMinCart){
                    self.$parentForm.on("click",'.js_select_checkbox', function () {
                        $(this).toggleClass("selected");
                        var selected;
                        if($(this).hasClass("js_select_all")){
                            if($(this).hasClass("selected")){
                                // 全选
                                self.$parentForm.find(".js_select_checkbox").addClass("selected");
                                selected = 2;
                            }else{
                                // 全反选
                                self.$parentForm.find(".js_select_checkbox").removeClass("selected");
                                selected = 3;
                            }
                        }else{
                            // 单个按钮
                            selected = $(this).hasClass("selected") ? 1 : 0;
                        }
                        // console.log($(this).data('cart-id'),selected);
                        CART.selectCart($(this).data('cart-id'),selected);
                    });

                    self.$parentForm.on("click",".js_submit", function (event) {
                        if($(this).hasClass("disabled")) event.preventDefault();
                    });
                }
            }
        },

        /**
         *
         * @param isMinCart 是否为min 购物车
         * @param cartTmpId 渲染后放入位置
         * @param result    需要渲染的json 数据，未定义则自动请求
         */
        init: function (isMinCart,cartTmpId,result) {
            var that = this;
            that.isMinCart = isMinCart;
            that.cartTmpId = cartTmpId;

            that.bindEvent();

            if(result == undefined){
                // 重新请求
                var promise = this.getCartAjaxPromise({
                    url : this.getDataUrl
                },false);
                promise.done(function (result) {
                    if(status == 0){
                        that.render(result);
                        if(!that.isMinCart){
                            that.firstCartTrack(result);
                        }
                    }else{
                        that.ajaxFailCall(result);
                    }
                })
                .fail(function(){
                    layer.alert("获取购物车信息失败，点击确定重试",function(){
                        window.location.reload(true);
                    });
                });
            }else{
                // 直接渲染数据
                if(status == 0){
                    that.render(result);
                    if(!that.isMinCart){
                        that.firstCartTrack(result);
                    }
                }else{
                    that.ajaxFailCall(result);
                }
            }
        },

        getLaytpl : function (call) {
            if(typeof(laytpl) == "undefined"){
                $LAB.script("laytpl.min.js?2015101001")
                    .wait(function () {
                        call();
                    })
            }else{
                call();
            }
        },

        render :function (result) {
            var self = this;

            // 区分模板
            var getTpl;
            if(self.isMinCart){
                getTpl = self.minCartTpl;
            }else{
                getTpl = document.getElementById('cart_tmp').innerHTML;
            }

            // 更新顶部购物车产品
            if(typeof (result.data.cart_num) != "undefined") {
                $("#js_topCartNum,#js_leftCartNum").text(result.data.cart_num);
            }

            // 避免 min cart 页面没有加载laytpl
            self.getLaytpl(function () {
                laytpl(getTpl).render(result.data, function(html){
                    document.getElementById(self.cartTmpId).innerHTML = html;
                });
                self.checkIsSelectAll();
            });
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
})(jQuery,window);