<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_order_sale_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="user-sale-apply" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <p class="title">申请售后</p>

        <form id="sale-apply-form" action="">
            <div class="user-index-wrap clearfix">
            <div class="user-sale-conent-warp fr">
                <div class="user-action-menu-warp">
                    <span class="bline"></span>
                    <ul class="user-action-menu-list clearfix">
                        <li>
                            <a href="#">退货退款</a>
                        </li>
                        <li>
                            <a href="#" class="current">仅退款</a>
                        </li>
                    </ul>
                </div>

                <div class="form-warp user-global-form">
                    <label>
                        <span class="form-label"><span class="required">*</span>货物状态</span>
                        <span class="reason-wrap">
                            <select name="status">
                                <option value="">请选择货物状态</option>
                                <option value="1">未发货</option>
                                <option value="2">运输中</option>
                                <option value="3">已收货</option>
                            </select>
                        </span>
                    </label>

                    <label>
                        <span class="form-label"><span class="required">*</span>退款原因</span>
                        <span class="reason-wrap">
                            <select name="reason">
                                <option value="">请选择退货原因</option>
                                <option value="1">假冒品牌</option>
                                <option value="2">不喜欢/不想要</option>
                                <option value="3">收到商品描述不符</option>
                                <option value="3">商品质量问题</option>
                                <option value="3">其他</option>
                            </select>
                        </span>
                    </label>

                    <label>
                        <span class="form-label"><span class="required">*</span>退款金额</span>
                        <span class="money-wrap">
                            <input name="money" placeholder="请输入退款金额" disabled value="9999"> <span class="prompt">（最多 499 元，含发货邮费0.00元）</span>
                        </span>
                    </label>

                    <label>
                        <span class="form-label"><span class="required">*</span>退款说明</span>
                        <span class="message-wrap">
                            <textarea name="message" placeholder="最多200字"></textarea>
                        </span>
                    </label>

                    <div class="mt10 mb10">
                        <span class="form-label">上传图片</span>
                        <!-- 上传图片-->
                        <div class="file-warp js_fileWarp">
                            <div class="clearfix">
                                <ul class="js_files files clearfix fl"></ul>
                                <div class="file-upload-warp fl">
                                    <i class="icon-plus"></i>
                                    <p>上传凭证 <br/>（最多三张）</p>
                                    <input type="file" id="fileupload" class="file-upload" name="files[]" multiple="">
                                </div>
                            </div>
                            <p class="error none"></p>
                            <div class="progress-warp">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 上传图片-->
                    </div>

                    <p class="label-right prompt">每张图片大小不超过5M，最多3张，支持GIF、JPG、PNG、BMP格式</p>

                    <p class="label-right mt30">
                        <a class="btn btn-default js_submit" href="#" onclick="return false;">提交申请</a>
                    </p>
                </div>
            </div>


            <aside class="user-sale-sidebar fl">
                <ul>
                    <li>
                        <h2 class="bold16">退货/退款商品信息</h2>
                        <div class="content">
                            <p>
                                <a href="#">
                                    <img class="img border" src="../dist/images/domeimg/other/other801.jpg" alt="商品名称" width="80" height="80"/>
                                    <span class="text">Aptamil 德国爱他美婴儿奶粉 Pre段800g/罐查看宝贝6plus手机壳..</span>
                                </a>
                            </p>
                            <p class="mt30">单 价：￥49.49</p>
                            <p><span class="vem">数 量：</span>
                                <span class="modified-box-warp clearfix">
                                    <a class="minus-box modified-box js_modifiedBox js_minusBox disabled" href="javascript:void (0)">-</a>

                                    <!-- 这里需要后台传入  最大退货数量 data-max -->
                                    <input type="text" name="num" class="num-box modified-box js_numBox" value="1" placeholder="输入数量" data-max = "5">
                                    <a class="plus-box modified-box js_modifiedBox js_plusBox" href="javascript:void (0)">+</a>
                                </span>
                            </p>
                            <p>小 计：￥499</p>
                            <p><a href="#" class="color-increase">查看订单信息></a></p>
                        </div>
                    </li>
                    <li>
                        <h2 class="bold16">订单详情</h2>
                        <div class="content">
                            <p><span class="left">订单编号：</span> 968722131181956</p>
                            <p><span class="left">商品总额：</span>998元</p>
                            <p><span class="left">运费：</span> 0.00元</p>
                            <p><span class="left">优惠券：</span>-100元</p>
                            <p><span class="left">佣金：</span>-20元</p>
                            <p><span class="left">实付金额：</span>878元</p>
                            <p><span class="left">成交时间：</span>2015-06-18 12:43</p>
                        </div>
                    </li>
                </ul>
            </aside>
        </div>
        </form>
    </div>
</div>

<footer id="footer" class="footer-bg">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("user.min.js")
        .wait(function () {
            // 申请售后form
            if($("#sale-apply-form").length > 0){
                USER.saleApplyForm.checkForm("sale-apply-form");
            }
        })
        .script("fileUpload.min.js").wait(function () {
            $("#fileupload").fileupload({
                url : 'http://www.wzhouhui.egocdn.com/temp/skin1/html/uploadFile/index.php',
                maxFiles: 3
            });
        });
</script>

</body>
</html>