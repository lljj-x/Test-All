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
    <div id="user-profile" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="pb50 clearfix">
            <div class="user-conent-warp fr">
                <div class="user-action-menu-warp">
                    <span class="bline"></span>
                    <ul class="user-action-menu-list clearfix">
                        <li>
                            <a href="" class="current">修改密码</a>
                        </li>
                    </ul>
                </div>

                <div class="form-warp">
                    <form action="" id="user-change-pass-form" class="mt30 user-global-form">
                        <label>
                            <span class="form-label"><span class="required">*</span>当前密码：</span>
                            <span>
                                <input type="text" name="current_passwrod" value="" placeholder="请输入当前密码"/>
                            </span>
                        </label>

                        <label>
                            <span class="form-label"><span class="required">*</span>新密码：</span>
                            <span>
                                <input type="text" name="passwrod" value="" placeholder="请输入新密码" id="js_password"/>
                            </span>
                        </label>
                        <label>
                            <span class="form-label"><span class="required">*</span>确认新密码：</span>
                            <span>
                                <input type="text" name="password_confirm" value="" placeholder="确认新密码"/>
                            </span>
                        </label>
                        <label>
                            <span class="form-label"><span class="required">*</span>验证码：</span>
                            <span>
                                <input type="text" name="security_code" value="" placeholder="请输入验证码"/>
                                <span class="js_refresh refresh inline-block vem">
                                    <span class="code-warp">
                                        <img id="img-verifycode" data-src="/fun/?act=verify" src="/fun/?act=verify">
                                    </span>
                                    <a href="javascript:void(0);" id="js_refreshVerifycode" class="word_fresh">看不清</a>
                                </span>
                            </span>
                        </label>
                        <p class="label-right mt30">
                            <a class="btn btn-default js_submit" href="#">确认</a>
                        </p>
                    </form>
                </div>

            </div>

            <aside class="user-sidebar fl">
                <ul>
                    <li class="user-center-li"><a href="#" class="user-center">个人中心</a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-order"></i>我的订单</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-asset"></i>我的财富</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-sale"></i>售后管理</span></a></li>
                    <li><a href="#" class="current"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-account"></i>账户信息</span></a></li>
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
            USER.profile.changePassForm($("#user-change-pass-form"));
        });
</script>

</body>
</html>