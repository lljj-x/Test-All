/**
 * Created by LIU.JUN on 2015/12/24.
 */
- function (Hammer) {
    "use strict";

    var imageEditer = {
        config : {
            elCanvas : document.querySelector('.j-myCanvas'),
            elUploadBtn : document.querySelector('.j-uploadBtn')
        },
        data :{
            configBgImg : 'image/candle.png',
            width : 350,
            height : 600
        },
        init : function () {
            this.getUserParams();


            this.flush();
        },
        flush : function () {
            // 清空画布
            this.clearCanvas();

            // 绘制默认配置图像和用户上传图片
            this.drawConfigImage();
        },
        getUserParams : function () {

            
        },
        bindEvent : function () {
            // 缩放
            var canvasHammer = new Hammer(this.config.elCanvas);

            canvasHammer.on('pinch', function () {
                console.log(deltaX);
            });

            // 移动
            canvasHammer.on('pan', function (ev) {
                console.log(ev.deltaX);
            });

            // 旋转
            canvasHammer.on('rotate', function () {
                console.log(deltaX);
            });
            
        },
        getCtx : function () {
            if(this.ctx == undefined){
                if(this.config.elCanvas.getContext){
                    this.ctx = this.config.elCanvas.getContext('2d')
                }
            }

            return this.ctx;
        },
        drawConfigImage : function () {
            var self = this,
                img = new Image(),
                defaultWH = self.data.width / self.data.height,
                imgWh,
                imgW,
                imgH,
                curW,
                curH;

            img.onload = function () {
                imgW = img.width;
                imgH = img.height;
                imgWh = imgW / imgH;
                if(imgWh > defaultWH){
                    // 图片比画布宽
                    curW = self.data.width;
                    curH = imgW / imgWh;
                }else{
                    // 图片比画布高
                    curH = self.data.height;
                    curW = curH * imgWh;
                }
                self._drawImg(img,0,0,curW,curH);
             };
            img.src = this.data.configBgImg;
        },
        clearCanvas : function () {

        },
        uploadImgEvent : function (event) {
            // 上传图片


        },
        _drawImg : function () {
            var args = arguments;
            if(args.length > 0){
                CanvasRenderingContext2D.prototype.drawImage.apply(this.getCtx(),Array.prototype.slice.call(args,0));
                return false;
            }
        },
        _draw : function () {

        },
        // 更改头像图片
        changeImg:function(){
            var self = this;
            if (self.isSubmit) return;
            if(typeof FileReader == "undefined"){
                tip.show("你的浏览器不支持上传图片，请下载新版浏览器");
                return;
            }

            var file = self.elChangeImgIpt[0].files[0];

            if(file.type.match(/image.*/)) {

                var reader = new FileReader();
                reader.onload = function (readerEvent) {
                    var image = new Image();
                    image.onload = function (imageEvent) {

                        var canvas = document.createElement('canvas'),
                            max_size = 100,
                            width = image.width,
                            height = image.height;
                        // 按比例缩放
                        if (width > height) {
                            if (width > max_size) {
                                height *= max_size / width;
                                width = max_size;
                            }
                        } else {
                            if (height > max_size) {
                                width *= max_size / height;
                                height = max_size;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                        var dataUrl = canvas.toDataURL('image/jpeg');
                        var idx = dataUrl.indexOf(',');
                        dataUrl = dataUrl.substring(idx+1);
                        self.isSubmit = true;
                        $.ajax({
                            type: 'POST',
                            url: self.cgi.changeavater,
                            data: {img:dataUrl},
                            // dataType: "json",
                            success: function(result){
                                if (result && result.errCode === 0) {
                                    tip.show('更新头像成功');
                                    var src = (result.obj && result.obj.headImgUrl) ? result.obj.headImgUrl : '';
                                    self.renderHeadImg(src);
                                } else {
                                    var errMsg = result.errMsg || '更新头像失败';
                                    tip.show(errMsg);
                                }
                                self.isSubmit = false;
                            },
                            error: function() {
                                self.isSubmit = false;
                            }
                        });
                    };
                    image.src = readerEvent.target.result;
                };
                reader.readAsDataURL(file);
            }else{
                tip.show("请选择图片格式文件");
            }
        }
    };
    imageEditer.init();
}(Hammer);