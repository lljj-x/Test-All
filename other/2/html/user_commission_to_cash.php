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
    <div id="user-commission-to-cash" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap clearfix">
            <div class="user-conent-warp fr">
                    <!-- 提现表单-->
                <p class="bold16 border-bottom pb10">提起现金</p>
                <form action="" id="to-cash-form" class="user-global-form">
                    <label>
                        <span class="form-label"><span class="required">*</span>开户姓名</span>
                        <span class="username-wrap">
                            <input name="username" class="username" placeholder="请输入开户姓名">
                        </span>
                    </label>
                    <label>
                        <span class="form-label"><span class="required">*</span>银行</span>
                        <span class="bank-wrap">
                            <select name="bank" class="selected-bank">
                                <option value="">选择银行</option>
                                <option value="1">工商</option>
                                <option value="2">平安</option>
                                <option value="3">中国</option>
                            </select>
                        </span>
                    </label>
                    <label>
                        <span class="form-label"><span class="required">*</span>银行卡号</span>
                        <span class="bank-num-wrap">
                            <input name="bank-num" class="bank-num" placeholder="请输入银行卡号">
                        </span>
                    </label>
                    <label>
                        <span class="form-label"><span class="required">*</span>开户行</span>
                        <span class="bank-name-wrap">
                            <input name="bank-name" class="bank-name" placeholder="请输入开户行">
                        </span>
                        <div class="cart_icon1 icon-msg">
                            <div class="msg-drop-box bank-name-drop none">
                                根据海关规定，免税店、跨境直邮商品需要办理清关手续，需您提供收货人身份信息进行认证。以确保您购买的商品顺利通过海关检查。（五洲会承诺会对您的身份证信息加密保管，绝不对外泄露！）
                                <span class="triangle-left"><span class="triangle-left"></span></span>
                            </div>
                        </div>
                    </label>
                    <label>
                        <span class="form-label"><span class="required">*</span>转出金额</span>
                        <span class="money-wrap">
                            <input name="money" class="money" placeholder="请输入转出金额">
                        </span>
                    </label>
                    <p class="label-right mt10">
                        <a class="btn btn-default js_toCash" href="#" onclick="return false;">确认提现</a>
                    </p>
                </form>

                <!-- 隐藏弹窗，提现提示-->
                <div id="js_pop" class="to-cash-pop tc none">
                    <p class="title mt50">申请成功！</p>
                    <p>财务人员会在1~2个工作日内审核批准，请留意提款帐户变化</p>
                    <p class="mt50"><a href="http://www.baidu.com" class="js_getUrl btn btn-default">查看提现记录</a></p>
                </div>
                <!-- 隐藏弹窗，提现提示-->
            </div>

            <aside class="user-sidebar fl">
                <ul>
                    <li class="user-center-li"><a href="#" class="user-center">个人中心</a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-order"></i>我的订单</a></span></li>
                    <li><a href="#" class="current"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-asset"></i>我的财富</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-sale"></i>售后管理</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-account"></i>账户信息</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-address"></i>收货地址</span></a></li>
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
    $LAB.script("user.min.js")
        .wait(function () {
            // 用户中心佣金提现表单
            if($("#to-cash-form").length > 0){
                USER.commissionForm.checkForm("to-cash-form");
            }
        });
</script>

</body>
</html>