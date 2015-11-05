<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/imgareaselectcss/imgareaselect-default.css"/>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
    <script src="../dist/minjs/jquery.imgareaselect.pack.js"></script>
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
                            <a href="" class="current">修改头像</a>
                        </li>
                    </ul>
                </div>

                <div class="form-warp">
                    <form action="cartData.json" id="user-upload-avatar-form" class="mt30 user-global-form" method="post">
                        <div class="file-warp js_formWarp">
                            <p class="">
                                <span>从您的电脑上选择图片：</span>
                                <span class="btn-default btn file-upload-warp">上传图片<input type="file" id="fileupload" class="file-upload"/></span>
                                <span class="prompt fs12 pl10">仅支持JPG、GIF、PNG格式，文件小于4M。（使用高质量图片，可生成高清头像哦~）</span>
                            </p>
                            <p class="error none"></p>
                            <ul class="js_files files mt30 clearfix">
                                <li>
                                    <img src="../dist/images/domeimg/other/350.jpg" alt="avatar" id="clipBigImg"/>
                                    <input type="hidden" name="avatar" value="../dist/images/domeimg/other/350.jpg"/>
                                </li>
                            </ul>

                            <input type="hidden" id="x1" name="x1" value="0">
                            <input type="hidden" id="y1" name="y1" value="0">
                            <input type="hidden" id="x2" name="x2" value="70">
                            <input type="hidden" id="y2" name="y2" value="70">
                            <input type="hidden" id="w" name="w" value="70" >
                            <input type="hidden" id="scale" name="scale" value="" >

                            <div class="progress-warp">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success"></div>
                                </div>
                            </div>
                            <p class="mt30">
                                <a class="btn btn-default js_submit" href="#">保存</a>
                            </p>
                        </div>

                        <div id="clipImg_thumb"></div>
                    </form>
                </div>
                <!-- 隐藏弹窗，提现提示-->

                <div id="js_pop" class="to-cash-pop tc none">
                    <p class="title mt50">头像保存成功！</p>
                    <p class="mt30"><a href="http://www.baidu.com" class="js_getUrl btn btn-default">现在查看</a></p>
                </div>
                <!-- 隐藏弹窗，提现提示-->

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
        .script("fileUpload.min.js").wait(function () {
            var num = 0;
            var slipImgObj;
            $("#fileupload").fileupload({
                isUploadAvatar : true,
//                url : '/m-users-a-avatar.htm',
                maxFiles: 10000000,     // 允许无限上传
                maxFileSize: 4000000,   //4M
                parentSelector :".js_formWarp",   //当前上传框的父级,
                fileUploadDoneBeforeCall : function () {
                    if(typeof slipImgObj != "undefined"){
                        slipImgObj.removeImgArea();
                    }
                },
                fileUploadDoneCall : function () {
                    var img = document.getElementById('clipBigImg');
                    img.onload = function () {
                        if(num == 0){
                            slipImgObj = new SlipImg();
                        }else{
                            slipImgObj.setThumbImg();
                            slipImgObj.selectImgArea();
                        }
                        num ++;

                        slipImgObj.setScale(img); // 计算缩放比例
                    };

                }
            });
        });

    ;(function(window){
        function SlipImg(){
            this.init();
            this.setThumbImg();
            this.selectImgArea();
            return this;
        }
        SlipImg.prototype = {
            scale : 1,  //计算出缩放比例
            init : function () {
                $(".js_submit").click(function(event) {
                    event.preventDefault();
                    USER.userAjax.getAjaxPromise({
                        url : $("#user-upload-avatar-form").attr("action"),
                        data : $("#user-upload-avatar-form").serialize()
                    },true)
                        .done(function (result) {
                            if(result.status == 0){
                                USER.otherGlobal.layerAlertReload("图像修改成功",'/m-users-a-profile.htm');
                            }
                        })
                        .fail(function(){
                            USER.otherGlobal.layerAlertReload("头像保存失败");
                        });
                });
            },

            /* 写入缩略图 */
            setThumbImg : function(){
                $('#clipImg_thumb').html("");
                $('<div><img src="' + $("#clipBigImg").attr("src") + '" style="position: relative;" /><div>')
                    .css({
                        position: 'relative',
                        overflow: 'hidden',
                        width: '200px',
                        height: '200px'
                    })
                    .appendTo($('#clipImg_thumb'));
            },

            /* 随着控制柄的变化，改版缩略图的视角 */
            preview : function(img, selection) {
                var scaleX = 200 / (selection.width || 1);
                var scaleY = 200 / (selection.height || 1);
                var imgWidth = parseInt($('#clipBigImg').width(),10);
                var imgHeight =  parseInt($('#clipBigImg').height(),10);

                $('#clipImg_thumb').find("img").css({
                    width: Math.round(scaleX * imgWidth) + 'px',
                    height: Math.round(scaleY * imgHeight) + 'px',
                    marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
                    marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
                });
            },

            /* 裁剪完成对四个角赋值 */
            getImgSelectPoint : function (img, selection){
                $("#x1").val(selection.x1);
                $("#y1").val(selection.y1);
                $("#x2").val(selection.x2);
                $("#y2").val(selection.y2);
                $("#w").val(selection.width);
            },

            /* 调用imgareaSelect插件进行裁剪 */
            selectImgArea : function (){
                var that = this;
                $('#clipBigImg').imgAreaSelect({
                    handles: true,
                    hide:false,
                    show: true,
                    aspectRatio: "1:1",
                    minHeight:50,
                    minWidth: 50,
                    x1: 0, y1:0, x2: 70, y2:70,
                    onSelectChange: that.preview,
                    onSelectEnd: that.getImgSelectPoint
                });
            },
            /* 添加remove方法 ，重新上传图片的时候需要重新计算尺寸*/
            removeImgArea : function () {
                var imgAreaSelectData = $('#clipBigImg').data('imgAreaSelect');
                if (typeof (imgAreaSelectData) != "undefined"){
                    imgAreaSelectData.remove();
                }
            },

            // 计算出缩放比例
            setScale:function(imgObj){
                var theImage = new Image();
                theImage.src = imgObj.src;
                var originalWidth = theImage.width;
                var originalHeight = theImage.height;
                var xx = originalWidth / originalHeight;
                if(originalHeight > 350 || originalWidth > 350){
                    this.scale = (xx >= 1) ? originalWidth / 350 : originalHeight / 350;
                }else{
                    this.scale = 1;
                }
                $("#scale").val(this.scale);
            }
        };
        window.SlipImg = SlipImg;
    })(window);
</script>

</body>
</html>