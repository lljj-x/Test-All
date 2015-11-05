<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="user-shipping-address" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap clearfix">
            <div class="user-conent-warp fr">
                <div class="user-action-menu-warp">
                    <span class="bline"></span>
                    <ul class="user-action-menu-list clearfix">
                        <li>
                            <a href="" class="current">收货地址</a>
                        </li>
                    </ul>
                </div>

                <table id="js_shippingAddressTable" class="table shipping-address-table tc mt30">
                    <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="25%">
                        <col width="12%">
                        <col width="23%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>收货人</th>
                            <th>实名认证</th>
                            <th>收货地址</th>
                            <th>电话号码</th>
                            <th>操作</th>
                            <th>默认地址</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>李明</td>
                            <td>已认证 <br/>458955***********56</td>
                            <td class="tl">
                                广东省深圳市南山区创业路中兴工业城7栋6楼
                            </td>
                            <td>13745685997</td>
                            <td><a href="#" data-address-id="xxx" class="js_eidt">修改</a><span class="split">|</span><a href="#" data-address-id="xxx" class="js_delete">删除</a></td>
                            <td><span class="cart_icon1 icon-checkbox js_setDefault selected" data-address-id="xxx"></span></td>
                        </tr>
                        <tr>
                            <td>李明</td>
                            <td class="color-increase">未认证</td>
                            <td class="tl">
                                广东省深圳市南山区创业路中兴工业城7栋6楼
                            </td>
                            <td>13745685997</td>
                            <td><a href="#" data-address-id="xxx" class="js_eidt">修改</a><span class="split">|</span><a href="#" data-address-id="xxx" class="js_delete">删除</a><span class="split">|</span><a href="#" data-address-id="xxx" data-username="李明" class="js_verified">实名认证</a></td>
                            <td><span class="cart_icon1 icon-checkbox js_setDefault" data-address-id="xxx"></span></td>
                        </tr>
                        <tr>
                            <td>李明</td>
                            <td class="color-increase">未认证</td>
                            <td class="tl">
                                广东省深圳市南山区创业路中兴工业城7栋6楼
                            </td>
                            <td>13745685997</td>
                            <td><a href="#" data-address-id="xxx" class="js_eidt">修改</a><span class="split">|</span><a href="#" data-address-id="xxx" class="js_delete">删除</a><span class="split">|</span><a href="#" data-address-id="xxx" data-username="liming" class="js_verified">实名认证</a></td>
                            <td><span class="cart_icon1 icon-checkbox js_setDefault" data-address-id="xxx"></span></td>
                        </tr>
                    </tbody>
                </table>

                <!-- 隐藏弹窗，-->
                <div id="js_pop" class="tc pl20 pr20 none">
                    <form action="" id="verified-form" class="user-global-form pt20">
                        <p class="prompt">根据海关规定，免税店、跨境直邮商品需要办理清关手续，需您提供收货人身份信息进行认证。以确保您购买的商品顺利通过海关检查。（五洲会承诺会对您的身份证信息加密保管，绝不对外泄露！）</p>
                        <p class="bold16 mt20">收货人姓名：<span class="js_name">李胡安</span></p>
                        <p class="mt20 card-warp">
                            <span>
                                <input type="hidden" name="address_id" class="js_addressId" value=""/>
                                <input type="text" name="card_id" placeholder="购买商品需谁收货人身份证信息"/>
                            </span>
                        </p>
                        <p class="mt50">
                            <a href="javascript:void (0)" class="js_verifiedBtn btn btn-default">认证</a>
                            <a href="javascript:void (0)" class="js_cancel btn btn-outline ml30">取消</a>
                        </p>
                    </form>
                </div>
                <!-- 隐藏弹窗，-->
                
                <form id="delivery_address_form" class="user-global-form mt30 js_edit" method="post">
                    <p class="bold16 border-bottom pb10">添加收货地址</p>
                    <label>
                        <span>
                            <input type="hidden" name="address_id" value=""/>
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
                        <div class="cart_icon1 icon-msg">
                            <div class="msg-drop-box idnumber-drop none">
                                根据海关规定，免税店、跨境直邮商品需要办理清关手续，需您提供收货人身份信息进行认证。以确保您购买的商品顺利通过海关检查。（五洲会承诺会对您的身份证信息加密保管，绝不对外泄露！）
                                <span class="triangle-left"><span class="triangle-left"></span></span>
                            </div>
                        </div>
                    </label>

                    <p class="label-right">
                        <span class="cart_icon1 icon-checkbox js_checkbox selected"></span>设置为默认收货地址
                        <input type="checkbox" class="js_inputCheckbox none" checked name="is_default_address" value="1">
                    </p>

                    <p class="label-right mt30">
                        <a class="address_confirm_submit btn btn-default" href="#">保存</a>
                    </p>
                </form>
            </div>

            <aside class="user-sidebar fl">
                <ul>
                    <li class="user-center-li"><a href="#" class="user-center">个人中心</a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-order"></i>我的订单</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-asset"></i>我的财富</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-sale"></i>售后管理</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-account"></i>账户信息</span></a></li>
                    <li><a href="#" class="current"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-address"></i>收货地址</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-commission"></i>佣金排名</span></a></li>
                </ul>
            </aside>
        </div>
    </div>
</div>

<footer id="footer">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("addressForm.min.js")
        .script("user.min.js")
        .wait(function () {
            // 表单事件
            new ADDRESSFORM($("#delivery_address_form"),function(){
                this.submit();
            });

            // 增删改 已经设置默认 +　默认表单事件
            USER.shippingAddrssManage.init($("#js_shippingAddressTable"));
        });
</script>

</body>
</html>