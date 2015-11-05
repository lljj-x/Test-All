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
                            <a href="" class="current">帐户信息</a>
                        </li>
                    </ul>
                </div>

                <div class="form-warp">
                    <div class="avatar-warp">
                        <img src="../dist/images/domeimg/other/avatar.jpg" alt="头像名称"/>
                        <a href="#" class="fs12 mt10">编辑头像</a>
                    </div>
                    <form action="" id="user-profile-form" class="mt30 user-global-form">
                        <label>
                            <span class="form-label">用户昵称：</span>
                            <span>
                                <input type="text" name="nickname" value="" placeholder="长度不超过25个字符"/>
                            </span>
                        </label>

                        <label>
                            <span class="form-label">登陆密码：</span>
                            <span>
                                <input type="text" name="password" disabled placeholder="***************" value="***************">
                                <a href="#" class="color-increase ml10">修改密码 ></a>
                            </span>
                        </label>

                        <label>
                            <span class="form-label">绑定手机：</span>
                            <span class="verified">
                                13745602887 <span class="prompt">已验证</span>
                            </span>
                        </label>
                        <label>
                            <span class="form-label">绑定邮箱：</span>


                            <!-- 老板请在这里做判断  验证过-->
                                <!-- <span class="verified">-->
                                <!--     xxx@gmail.com <span class="prompt">已验证</span>-->
                                <!-- </span>-->
                            <!-- 老板请在这里做判断-->

                            <!-- 老板请在这里做判断 没验证-->
                            <span>
                                <input type="text" name="email" value="xxxx@mail.com" disabled placeholder="填写邮箱"/>

                                <!-- 这里添加 data-email -->
                                <a href="javascript:void (0);" class="js_verifyMailboxBtn verify-mailbox-btn btn btn-default ml20" data-email="xxxx@mail.com">验证邮箱</a>
                            </span>
                            <!-- 老板请在这里做判断-->

                        </label>
                        <label>
                            <span class="form-label">你的生日：</span>
                            <span>
                                <input type="text" id="js_birthday" name="birthday" value="" placeholder="填写生日有惊喜哦~"/>
                            </span>
                        </label>
                        <p>
                            <span class="form-label">比较感兴趣：</span>
                            <span class="interest-warp">
                                <a href="#" class="btn btn-outline selected js_selected">女人营养
                                    <input type="checkbox" name="interest[]" value="1" checked />
                                </a>
                                <a href="#" class="btn btn-outline js_selected">
                                    男人保健
                                    <input type="checkbox" name="interest[]" value="2" />
                                </a>
                                <a href="#" class="btn btn-outline js_selected">
                                    母婴用品
                                    <input type="checkbox" name="interest[]" value="3"/>
                                </a>
                                <a href="#" class="btn btn-outline js_selected">
                                    体育用品
                                    <input type="checkbox" name="interest[]" value="4" />
                                </a>
                                <a href="#" class="btn btn-outline js_selected">
                                    赛车
                                    <input type="checkbox" name="interest[]" value="5" />
                                </a>
                            </span>
                        </p>
                        <p class="label-right mt30">
                            <a class="btn btn-default js_submit" href="#">保存</a>
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
            USER.profile.profileForm($("#user-profile-form"));
        });
</script>

</body>
</html>