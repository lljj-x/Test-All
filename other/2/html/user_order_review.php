<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_review_top.htm'; ?>
</header>

<div class="wrap pb40">
    <div id="user-order-review" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap">

            <!--  顶部分来菜单-->
            <div class="user-action-menu-warp">
                <span class="bline"></span>
                <ul class="user-action-menu-list clearfix">
                    <li>
                        <a href="#" class="current">快速评价</a>
                    </li>
                </ul>
            </div>

            <form id="order-review-form" action="" class="user-global-form">
                <label>
                    <span class="form-label left-label"><span class="required">*</span>评价商品</span>
                    <span class="message-wrap">
                        <textarea name="xxxx" placeholder="亲，写点什么吧，你的意见对大家很有帮助" class="required js_parent" minlength="5" maxlength="300"></textarea>
                    </span>
                </label>
                <label>
                    <span class="form-label left-label"><span class="required">*</span>总体评价</span>
                    <span class="message-wrap">
                        <span class="start start_5 js_start js_parentStart"><i class="icon"></i></span>
                        <input name="x1" type="hidden" class="js_inputStart" value="100">
                    </span>
                </label>
                <p class="bold16 border-bottom pb10 pt10">商品评价</p>

                <!-- 循环-->
                <section class="review-warp">
                    <div class="goods-info">
                        <a href="#">
                            <p class="img">
                                <img src="../dist/images/domeimg/other/goods_205.jpg" alt="" width="150" height="150"/>
                            </p>
                            <p class="des">
                                【3罐装 单罐仅166元】Aptamil 德国爱他美婴儿奶粉 Pre段 800g/罐
                            </p>
                        </a>
                    </div>
                    <div class="goods-review">
                        <label>
                            <span class="form-label"><span class="required">*</span>评价商品</span>
                            <span class="message-wrap">
                                <textarea name="xdd" placeholder="亲，写点什么吧，你的意见对大家很有帮助！" class="required js_child" minlength="5" maxlength="300"></textarea>
                            </span>
                        </label>
                        <label>
                            <span class="form-label"><span class="required">*</span>总体评价</span>
                            <span class="message-wrap">
                                <span class="start start_5 js_start js_childStart"><i class="icon"></i></span>
                                <input name="sfd" type="hidden" class="js_inputStart" value="100">
                            </span>
                        </label>
                        <div class="mt10 mb10">
                            <span class="form-label">晒单图片</span>
                            <!-- 上传图片-->
                            <div class="file-warp js_fileWarp">
                                <div class="clearfix">
                                    <ul class="js_files files clearfix fl"></ul>
                                    <div class="file-upload-warp fl">
                                        <i class="icon-plus"></i>
                                        <input type="file" class="js_fileupload file-upload" name="files[]" data-id="xxxxx" multiple="">
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
                    </div>
                </section>
                <!-- 循环-->

                <section class="review-warp">
                    <div class="goods-info">
                        <a href="#">
                            <p class="img">
                                <img src="../dist/images/domeimg/other/goods_205.jpg" alt="" width="150" height="150"/>
                            </p>
                            <p class="des">
                                【3罐装 单罐仅166元】Aptamil 德国爱他美婴儿奶粉 Pre段 800g/罐
                            </p>
                        </a>
                    </div>
                    <div class="goods-review">
                        <label>
                            <span class="form-label"><span class="required">*</span>评价商品</span>
                            <span class="message-wrap">
                                <textarea name="fasdfasf" placeholder="亲，写点什么吧，你的意见对大家很有帮助！" class="required js_child" minlength="5" maxlength="300"></textarea>
                            </span>
                        </label>
                        <label>
                            <span class="form-label"><span class="required">*</span>总体评价</span>
                            <span class="message-wrap">
                                <span class="start start_5 js_start js_childStart"><i class="icon"></i></span>
                                <input name="fasdfasdfasdf" type="hidden" class="js_inputStart" value="100">
                            </span>
                        </label>
                        <div class="mt10 mb10">
                            <span class="form-label">晒单图片</span>
                            <!-- 上传图片-->
                            <div class="file-warp js_fileWarp">
                                <div class="clearfix">
                                    <ul class="js_files files clearfix fl"></ul>
                                    <div class="file-upload-warp fl">
                                        <i class="icon-plus"></i>
                                        <input type="file" class="js_fileupload file-upload" data-id = "xxxx" name="files[]" multiple="">
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
                    </div>
                </section>
                <p class="submit-warp">
                    <a href="#" class="btn btn-default js_submit">商品评价</a>
                    <span class="prompt ml30">
                        <span class="cart_icon1 icon-checkbox js_checkbox selected"></span>匿名
                        <input type="checkbox" class="js_inputCheckbox none" checked name="is-anonymous" value="1"/>
                    </span>
                </p>
            </form>
        </div>
    </div>
</div>

<footer id="footer" class="footer-bg">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("user.min.js").wait(function () {
        // 评论form
        if($("#order-review-form").length > 0){
            USER.reviewForm.checkForm("order-review-form");
        }
    })
    .script("fileUpload.min.js").wait(function () {
        $(".js_fileupload").fileupload({
            url : '/temp/skin1/html/uploadFile/index.php',
            maxFiles: 5
        });
    });
</script>

</body>
</html>