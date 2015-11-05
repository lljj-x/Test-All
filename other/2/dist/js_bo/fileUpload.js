/**
 * Created by Liu.Jun on 2015/7/21
 */

(function ($,window) {
    $.fn.fileupload = function (options) {
        var $elms = this;
        options = $.extend({},{
            maxFiles: 2,    // 最大数量
            parentSelector :".js_fileWarp",
            fileUploadDoneCall : $.noop,
            fileUploadDoneBeforeCall : $.noop,
            isUploadAvatar:false,   // （区分修改头像页面）
            url: 'http://www.wzhouhui.egocdn.com/temp/skin1/html/uploadFile/index.php',
            dataType: 'json',
            maxFileSize: 5242880,   //5M
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp)$/i
        },options);
        
        var removeError = function ($parent) {
            $parent.find(".error").hide();
        };

        var setError = function ($parent,errorText) {
            $parent.find(".error").html('<span class="form-error" style="display: inline;">' + errorText + '</span>').show();
        };
        
        var addImages = function ($parent,files,name) {
            var text = '';
            if(options.isUploadAvatar){
                // 上传头像
                $.each(files, function (index, file) {
                    text += '<li><img id="clipBigImg" src="' + file.url + '" alt="' + file.name + '"/><input type="hidden" name="avatar" value="' + file.url + '"/></li>';
                });
                $parent.find('.js_files').html(text);
            }else{
                if(typeof name == "undefined"){
                    // 售后
                    $.each(files, function (index, file) {
                        text += '<li><i class="user-icon icon-remove js_remove remove" data-delete-url = ' + file.deleteUrl + '></i><img src="' + file.url + '" alt="' + file.name + '"/><input type="hidden" name="' + 'file[]" value="' + file.url + '"/></li>';
                    });
                }else{
                    // 评论
                    $.each(files, function (index, file) {
                        text += '<li><i class="user-icon icon-remove js_remove remove" data-delete-url = ' + file.deleteUrl + '></i><img src="' + file.url + '" alt="' + file.name + '"/><input type="hidden" name="' + 'file[' + name + '][]" value="' + file.url + '"/></li>';
                    });
                }
                $parent.find('.js_files').append(text);
            }
        };

        $LAB.script("jQuery-File-Upload/js/vendor/jquery.ui.widget.js")
            .script("jQuery-File-Upload/js/jquery.iframe-transport.js")
            .script("jQuery-File-Upload/js/jquery.fileupload.js")
            .script("jQuery-File-Upload/js/jquery.fileupload-process.js")
            .script("jQuery-File-Upload/js/jquery.fileupload-validate.js")

            .wait(function () {
                $elms.each(function () {
                    var $parent = $(this).closest(options.parentSelector),
                        $upbtnWrap = $(this).closest(".file-upload-warp"),
                        name = $(this).data("id");

                    //删除图片
                    $parent.on("click",".js_remove", function () {
                        removeError($parent);
                        USER.userAjax.getAjaxPromise({
                            url: $(this).data("delete-url"),
                            type: "GET",
                            global: false
                        }, false);
                        $(this).parent("li").fadeOut(300, function () {
                            $(this).remove();
                            $upbtnWrap.show();
                        });
                    });

                    $(this).fileupload(options)
                        .on('fileuploadchange', function (e, data) {

                            removeError($parent);
                            var fileCount = data.files.length + $parent.find('.js_files').children("li").length;
                            if (fileCount > options.maxFiles) {
                                setError($parent,'最多只能上传 ' + options.maxFiles + ' 张图片，请先删除');
                                // data.abort();
                                return false;
                            }
                            fileCount == options.maxFiles && $upbtnWrap.hide();
                        })
                        .on('fileuploadadd', function (e, data) {
                            //
                        })
                        .on('fileuploadprocessalways', function (e, data) {
                            var index = data.index;
                            var file = data.files[index];
                            if (file.error) {
                                $upbtnWrap.show();
                                setError($parent,file.error);
                            }
                        })
                        .on('fileuploadprogressall', function (e, data) {
                            // 进度条
                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            $parent.find('.progress-bar').css('width',progress + '%');
                        })
                        .on('fileuploaddone', function (e, data) {
                            // 上传完成
                            options.fileUploadDoneBeforeCall(); //添加图片之前
                            addImages($parent,data.result.files,name);
                            options.fileUploadDoneCall();       // 添加图片之后
                        }).on('fileuploadfail', function (e, data) {
                            // 上传失败
                            $parent.find(".progress").fadeOut();
                            setError($parent,"图片上传失败，请重试");
                        })
                        .on('fileuploadstart', function (e) {
                            $parent.find(".progress").fadeIn();
                        })
                        .on('fileuploadstop', function (e) {
                            $parent.find(".progress").fadeOut();
                        })
                        .prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                });

            });
    };
})(jQuery,window);



