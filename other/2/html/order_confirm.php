<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/cart_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_cart_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="order_confirm" class="hf pt20 pb50">
        <h1 class="title">填写并核对订单信息</h1>
        <p class="title2 clearfix">收货地址信息

            <span class="add_address fr <?php echo $_GET['display'] ? "none" : ""; ?>">
                <a href="#" class="js_add_aaddress">+新增地址</a>
            </span>
        </p>

        <div class="delivery_address_warp">

            <!-- 这里需要后台判断是否显示-->
            <form id="delivery_address_form" class="cart_global_form <?php echo $_GET['display'] ? "" : "none"; ?>">
                <label>
                    <span>
                        <input type="hidden" name="address_id"/>
                    </span>
                </label>

                <label class="js_select_address  select_address">
                    <span class="form-label"><span class="required">*</span>所在地址</span>
                    <span class="nselect_wrap">
                        <select name="province" class="selected_province item-select item-150">
                            <option value="default">--省/直辖市--</option>
                            <option value="110000">北京市</option>
                            <option value="120000">天津市</option>
                            <option value="130000">河北省</option>
                            <option value="140000">山西省</option>
                            <option value="150000">内蒙古自治区</option>
                            <option value="210000">辽宁省</option>
                            <option value="220000">吉林省</option>
                            <option value="230000">黑龙江省</option>
                            <option value="310000">上海市</option>
                            <option value="320000">江苏省</option>
                            <option value="330000">浙江省</option>
                            <option value="340000">安徽省</option>
                            <option value="350000">福建省</option>
                            <option value="360000">江西省</option>
                            <option value="370000">山东省</option>
                            <option value="410000">河南省</option>
                            <option value="420000">湖北省</option>
                            <option value="430000">湖南省</option>
                            <option value="440000">广东省</option>
                            <option value="450000">广西壮族自治区</option>
                            <option value="460000">海南省</option>
                            <option value="500000">重庆市</option>
                            <option value="510000">四川省</option>
                            <option value="520000">贵州省</option>
                            <option value="530000">云南省</option>
                            <option value="540000">西藏自治区</option>
                            <option value="610000">陕西省</option>
                            <option value="620000">甘肃省</option>
                            <option value="630000">青海省</option>
                            <option value="640000">宁夏回族自治区</option>
                            <option value="650000">新疆维吾尔自治区</option>
                        </select>
                    </span>
                    <span class="nselect_wrap none">
                        <select name="city" class="selected_city item-select item-150">
                            <option value="default">--市--</option>
                        </select>
                    </span>
                    <span class="nselect_wrap none">
                        <select name="district" class="selected_district item-select item-150">
                            <option value="default">--县--</option>
                        </select>
                    </span>
                </label>
                <label>
                    <span class="form-label"><span class="required">*</span>详细地址</span>
                    <span class="address_street_wrap">
                        <textarea name="addressline" class="address_street" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"></textarea>
                    </span>
                </label>
                <label>
                    <span class="form-label"><span class="required">*</span>收货人姓名</span>
            <span>
                <input type="text" name="username" class="username" placeholder="长度不超过25个字符"/>
            </span>
                </label>
                <label>
                    <span class="form-label"><span class="required">*</span>手机号码</span>
            <span>
                <input type="text" name="tel" class="phone" placeholder="电话号码、手机号码必须填一项"/>
            </span>
                </label>
                <label>
                    <span class="form-label">或固定电话</span>
                    <span><input type="text" name="areacode" class="areacode item-150" placeholder="区号"/></span>
                    <span><input type="text" name="telephone" class="telephone item-150" placeholder="电话号码"/></span>
                    <span><input type="text" name="ext" class="ext item-150" placeholder="分机号(可选)"/></span>
                </label>
                <label>
                    <span class="form-label">身份证号码</span>
                    <span><input type="text" name="card_id" class="idnumber" placeholder="请填写收货人身份证信息"/></span>

                    <div class="cart_icon1 icon_msg">
                        <div class="drop_box idnumber_drop none">
                            根据海关规定，免税店、跨境直邮商品需要办理清关手续，需您提供收货人身份信息进行认证。以确保您购买的商品顺利通过海关检查。（五洲会承诺会对您的身份证信息加密保管，绝不对外泄露！）
                            <span class="triangle-left"><span class="triangle-left"></span></span>
                        </div>
                    </div>
                </label>

                <p class="label-right">
                    <span class="cart_icon1 icon_checkbox" onclick="CHECKOUT.setCheckBox(this);"></span>设置为默认收货地址
                    <input type="checkbox" name="is_default_address" value="1" class="hidden-input none"/>
                </p>

                <p class="label-right mt30">
                    <a class="address_confirm_submit btn btn-default" href="#">保存</a>
                    <a class="js_address_confirm_cancel btn btn-outline none ml50" href="#">取消</a>
                </p>
            </form>

            <div id="js_address_warp">加载中....</div>
        </div>

        <div class="order_confirm_warp pt50">
            <p class="title2">确认订单信息</p>
            <form action="#" id="js_order_confirm_form" class="cart_global_form order_confirm_form">加载中....</form>
        </div>
    </div>
</div>

<footer id="footer" class="cart_footer">
    <?php include 'foot.php'; ?>
</footer><!--end #footer -->

<script type="text/html" id="address_tmp">
    {{# var listLength = d.address_list.length;

    if(listLength > 0){ }}
    <div class="delivery_address_list pt20">
        <table class="address_table" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
            {{#
                var defaultColumnNum = 3;
                var rowNum = Math.ceil(listLength / defaultColumnNum);
                var lastColumnNum = listLength % defaultColumnNum;
                for(var cr=1;cr<=rowNum;cr++){
            }}
            <tr class="{{# if (cr > 1){ }}show_all none{{#}}}">
                {{#
                    for(var cc=1; cc<=defaultColumnNum;cc++){
                        var currentNum = (cr - 1) * defaultColumnNum + cc;
                        if(currentNum > listLength) break;
                        var currentItemData = d.address_list[currentNum-1];
                }}
                <td class="{{# if(cc === 1){}}first{{#}}}{{#if(cc === defaultColumnNum){}}last{{#}}}">
                    <div class="address_wrap">
                        <div class="js_address_label address_label address_icon {{# if(currentItemData.is_current_address == 1){}}checked{{#}}}" data-address-id="{{currentItemData.address_id}}">
                            <p class="address_title bb clearfix">
                                <strong>{{currentItemData.username}}&nbsp;&nbsp;收</strong>

                                {{#if(currentItemData.is_default_address == 1){}}
                                <b class="default">默认地址</b>
                                {{# }else{}}
                                <b class="default set_default"><a href="#" onclick="ORDERADDRESS.setDefaultEvent(event,'{{currentItemData.address_id}}');return false;">设为默认</a></b>
                                {{# }}}
                            </p>
                            <p class="address_content">
                                <span class="addressText">{{currentItemData.province}}&nbsp;&nbsp;{{currentItemData.city}}&nbsp;&nbsp;{{currentItemData.district}}
                                    <br>
                                        {{currentItemData.addressline}}
                                    <br>
                                    <b>{{currentItemData.tel}}</b>
                                </span>
                            </p>
                            <p class="address_operate">
                                <a href="javascript:void(0)" class="mod" onclick="ORDERADDRESS.editEvent(event,'{{currentItemData.address_id}}');return false;">修改</a>
                                <a href="javascript:void(0)" class="del" onclick="ORDERADDRESS.deleteEvent(event,'{{currentItemData.address_id}}');return false;">删除</a>
                            </p>
                        </div>
                    </div>
                </td>
                {{# } }}
            </tr>
            {{# } }}
            {{# if(listLength > 3){ }}
            <tr>
                <td>
                    <p class="show_all_address js_showAllAddress ">
                        <a href="#" onclick="ORDERADDRESS.showAllEvent(event);return false;">+ 使用其它地址</a>
                    </p>
                </td>
            </tr>
            {{# }}}
            </tbody>
        </table>
    </div>
    {{# } }}
</script>

<script type="text/html" id="checkout_tmp">
    {{# var listLength = d.cart_list.length;
        if(listLength > 0){ }}

    <table class="cart_table order_confirm_table">
        <thead>
        <tr>
            <th class="first">商品信息</th>
            <th>重量（千克）</th>
            <th>单价（元）</th>
            <th>数量</th>
            <th class="last_item">金额</th>
        </tr>
        </thead>
        <tbody>
            {{#
                for(var cr=0; cr < listLength;cr++){
                    var currentItemData = d.cart_list[cr];
            }}
            <tr>
                <td class="first">
                    <div class="cart_goods_img">
                        <a href="{{currentItemData.url}}">
                            <img src="{{currentItemData.img}}" alt="{{currentItemData.title}}" width="100" height="100"/>
                        </a>
                    </div>
                    <div class="cart_goods_content tl ml15">
                        <p><a href="{{currentItemData.url}}" class="cart_goods_title">{{currentItemData.title}}</a></p>
                        <p class="cart_shipping_address cart_icon1">
                            <span class="cart_icon icon_shipping_address"></span>{{currentItemData.shipping_address}}
                        </p>
                    </div>
                </td>
                <td>{{currentItemData.weight}}</td>
                <td>
                    <p class="price">{{currentItemData.goods_price}}</p>
                    <p class="original_price">{{currentItemData.market_price}}</p>
                </td>
                <td>{{currentItemData.goods_num}}</td>
                <td class="last_item total">
                    {{currentItemData.sub_total}}
                </td>
            </tr>
            {{#} }}
        </tbody>
    </table>
    <div class="clearfix bb">
        <ul class="order_reduce_info">

            {{#
                var couponList = d.coupon_list;
                var isUseCoupon = d.isUseCoupon;
                if (couponList.length > 0){
            }}
            <!-- 有优惠券显示-->
            <li class="user_coupon_warp">
                <span class="ie7_span">
                    <span class="cart_icon1 icon_checkbox js_use_coupon {{# if (isUseCoupon == "1"){}}selected{{# }}}" data-cart-id="0" onclick="CHECKOUT.setCheckBox(this)""></span>使用优惠券
                    <input {{# if (isUseCoupon == "1"){}}checked{{# }}} name="is_use_coupon" type="checkbox" value="1" class="hidden-input none"/>
                </span>
                <div class="cart_icon1 icon_msg">
                    <div class="drop_box coupon_drop none">
                        每笔订单仅限使用一张优惠券，优惠券不可合并。若使用优惠券的订单发生退货行为，则优惠券不予返还。
                        <span class="triangle-bottom"><span class="triangle-bottom"></span></span>
                    </div>
                </div>
                <span class="nselect_wrap selected_coupon js_none_show {{# if(isUseCoupon =="0"){ }}none{{# }}}">
                    <select name="coupon" class="item-select coupon" onchange="CHECKOUT.selectCouponEvent(this);">
                        <option value="default">选择你要使用的优惠券</option>
                        {{#
                            for(var cuc=0;cuc < couponList.length; cuc++){
                        }}
                            <option {{# if(couponList[cuc].is_use =="1"){ }} selected{{# }}} value="{{couponList[cuc].code}}">{{ couponList[cuc].msg }}</option>
                        {{#
                            }
                        }}
                    </select>
                </span>
                <span class="coupon_money reduce_money"> -￥{{d.coupon_money}} </span>
            </li>

            {{#}}}


            <!--有佣金才显示使用佣金-->
            {{#
                var hasCommission = d.commission_over;
                var isUseCoupon = false;
                var useCommission = (d.commission_money == "0") ? false : d.commission_money;
                if(hasCommission != "0"){
            }}

            <li class="user_commission_warp">
                <div class="user_commission_form">
                    <span class="ie7_span use_commission_bg">
                        <span class="cart_icon1 icon_checkbox js_use_commission {{# if (useCommission){}}selected{{# }}}" data-cart-id="0" onclick="CHECKOUT.setCheckBox(this)"></span>使用佣金
                        <input {{# if (useCommission){}}checked{{# }}} name="is_use_commission" type="checkbox" value="1" class="hidden-input none"/>
                    </span>
                    <!--弹出框和弹出按钮-->
                    <div class="cart_icon1 icon_msg">
                        <div class="drop_box commission_drop none">
                            关注公众号，微信分享至朋友圈或好友，可能获得更多佣金
                            <span class="triangle-top"><span class="triangle-top"></span></span>
                        </div>
                    </div>
                    <!--弹出框和弹出按钮-->
                    <input name="use_commission_money"  {{# if (!useCommission){}}disabled{{# }}} class="js_use_commission_money" type="text" value="{{# if (!useCommission){}}{{hasCommission}}{{# }else{}}{{useCommission}}{{#}}}" placeholder="使用金额" onkeyup="CHECKOUT.commissionChangeEvent(this)" data-has-commission ="{{hasCommission}}"/>
                    <span class="commission_code_warp js_none_show {{# if (!useCommission){}}none{{# }}}">
                        <input name="commission_code" type="text" value="" onkeyup="CHECKOUT.inputCheckSecurityCodeEvent(this)" placeholder="输入验证码"/>
                        <a href="#" class="js_get_commission_code btn btn-default btn-sm">获取验证码</a>
                    </span>
                    <span class="commission_money reduce_money"> -￥{{d.commission_money}} </span>
                </div>
                <div class="user_commission_msg">
                    <span class="commission_money_over">（可用金额：{{hasCommission}}）</span>
                    <span class="send_code_num js_send_code_msg none">验证码已发送至{{d.tel}}</span>
                </div>
            </li>
            {{# }}}
            <!--有佣金才显示使用佣金-->
        </ul>
    </div>
    <div class="clearfix">
        <table class="cart_total_table order_confirm_pay_table">
            <tbody class="tr">
            <tr>
                <td>订单运费：</td>
                <td>￥<span>{{d.total.shipping}}</span></td>
            </tr>
            <tr>
                <td>订单关税：</td>
                <td>￥<span>{{d.total.tariff}}</span></td>
            </tr>
            <tr>
                <td>应付金额</td>
                <td class="cart_total_price color_increase">￥<span>{{d.total.total_price}}</span></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="cart_checkout pt20 cart_bottom_warp clearfix">
        <div class="back_home fl">
            <a href="#">< 返回购物车修改</a>
        </div>
        <div class="right_checkout fr clearfix">
            <div class="qr_code_warp fl clearfix">
                <span class="qr_code_img cart_icon fl"></span>
                                        <span class="qr_code_text fl">
                                            扫一扫 <br/>
                                            <span class="color_increase">手机购买更便宜</span>
                                        </span>
                <div class="qr_code_drop drop_box none">
                    <img src="../dist/images/domeimg/qr_code_app.jpg" alt=""/>
                    App首单减5元
                    <span class="triangle-right"><span class="triangle-right"></span></span>
                </div>
            </div>
            <a href="#" class="submit btn btn-default btn-xl fl">去结算</a>
        </div>
    </div>
    {{# }}}
</script>

<script>
    $LAB.script("laytpl.min.js")
        .wait()
        .script("addressForm.min.js")
        .script("checkout.min.js");
</script>

</body>
</html>