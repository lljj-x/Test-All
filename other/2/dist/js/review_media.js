/**
 * review.js            后台新管理管理js
 *
 * @author              mashanling(msl-138@163.com)
 * @date                2011-12-12
 * @last modify         2011-12-12 by mashanling
 */
$(function() {
    var msg = $.cookie(L.msg);
    $.cookie(L.msg, null);
    msg && Alert(msg, true); //提示信息
    REVIEW.action();
});

//新评论管理
var REVIEW = {
    url: 'review_media.php'
};

//专题
REVIEW.action = function() {
    var me = this;

    $('#selAction').change(function() {
        var el = $(this), opt = el.find('option:selected'), val = opt.val(), text = opt.text();
        var values = $('.cb-value:checked').map(function() {
            return this.value;
        }).get();

        if (val && me.doAction(val, values, text, '您确定要 ' + text + ' 选中评论?')) {
            el.attr('disabled', true);
        }
        else {
            el.val('');
        }
    });

    $('.r-action').click(function() {
        var cls = $(this).attr('class').split(' '), text = $(this).text();
        me.doAction(cls[1], cls[2].substr(2), text, '您确定要 ' + text + ' 该评论?');
    });
}

REVIEW.doAction = function(action, ids, msg, confirmText) {

    if (confirm(confirmText)) {
        $.post(REVIEW.url + '?act=' + action, 'checkboxes=' + ids, function(data) {
            var url = location.href;

            /*在具体产品的评论页面，点击“通过审核”或者不通过，待处理等操作后，评论列表 会自动的更新跳转到下面 未处理的评论. 同理，等 评论列表首页的操作选项*/
            //需求就是这样 by mashanling on 2013-04-11 15:13:20

            /*if (url.indexOf('?') > -1) {

                if (url.indexOf('status=') > -1) {
                    url = url.replace(/status=\d+/, 'status=0');
                }
                else {
                    url += '&status=0';
                }
            }
            else {
                url += '?status=0';
            }*/

            C.callback(data, url, msg + L.success);
        });

        return true;
    }
}