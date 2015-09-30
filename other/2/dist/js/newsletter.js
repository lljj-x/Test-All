/**
 * newsletter.js        邮件期刊管理js
 * 
 * @author              mashanling(msl-138@163.com)
 * @date                2012-07-11 15:39:40
 * @last modify         2012-08-03 14:16:40 by mashanling
 */

var NEWSLETTER = {//邮件期刊管理
    url: 'newsletter.php'
};

NEWSLETTER.list = {//列表
    /**
     * 绑定事件
     * 
     * @return {object} 邮件期刊对象
     */
    bindEvents: function() {
        var me = this;
        
        $('.a-delete').click(function() {//删除
            me['delete'](this.id.split('-').pop(), '此');
            return false;
        });
        
        $('#btn-delete').click(function() {//删除按钮 by mashanling on 2012-08-03 14:16:34
            var ids = getCheckedAll();
            ids && me['delete'](ids)
        });
        
        return this;
    },//end bindEvents
    
    /**
     * 删除
     * 
     * @param {string} ids        id串
     * @param {string} confirmMsg 确认信息
     * 
     * @return {void} 无返回值
     */
    'delete': function(ids, confirmMsg) {
        
        if (confirm('您确定要删除' + (confirmMsg || '选中') + '记录？')) {
            setLoading();
            
            $.post(NEWSLETTER.url + '?act=delete', 'ids=' + ids, function(data) {
                C.callback(data, location.href, L.del + L.success);
            });
        }
    }
};

NEWSLETTER.checkArr = [{//提交表单验证数组
    selector: '#txt-title',
    msg: '请输入标题'
}, {
    selector: '#txt-description',
    msg: '请输入描述'
}, {
    selector: '#txt-date',
    msg: '请选择日期'
}, {
    selector: '#txt-body',
    msg: '请输入html代码'
}];

NEWSLETTER.add = function() {//添加邮件期刊
    var me = this;
    var form = $('#form').submit(function () {
        
        setLoading();
    });
    
    $('#btn-preview').click(function () {//生成预览 by mashanling on 2012-07-31 11:42:42
        

        
        setLoading();
        $.post(NEWSLETTER.url + '?act=preview', form.serialize(), function(data) {//保存
            setLoading(false);
             $('#span-preview').html(data);
        });
       
        return false;
    });
    
    return this;
};

function setLoading(msg) {
    msg === false ? Alert(false, false, true, false) : Alert(msg || '处理中...', 'loading', false, false);
}

/**
 * 友好提示
 *
 * @param {string} msg      提示内容
 * @param {bool}   success  是否成功提示，默认不是
 * @param {bool}   cancel   是否清除提示，默认不是
 * @param {int}    timeout  提示停留时间，单位毫秒，默认1500
 *
 * @param {void} 无返回值
 */
function Alert(msg, success, cancel, timeout) {
    var div = $('#div-alert');
    
    if (!cancel) {
        if (success === 'loading') {
            var background = '#ff8', color = '#333';
        }
        else {
            var color = '#fff', background = success ? '#16960e' : '#d90000';
        }
        
        if (div.length == 0) {
            div = $('<div/>').html(msg).attr('id', 'div-alert').css({
                'background-color': background,
                color: color,
                left: '50%',
                'z-index': 10000,
                position: 'absolute',
                padding: '4px 8px'
            }).appendTo('body').hide().mouseenter(function() {
                $(this).fadeIn(500);
                clearInterval(window.AlertTimeout);
            }).mouseout(function() {
                hideAlert(timeout);
            });
        }
        else {
            div.html(msg).width('auto').css({
                'background-color': background,
                color: color
            });
        }
        
        var width = div.width();
        width = width < 100 ? 100 : (width > 600 ? 600 : width);
        div.show().css({
            height: 'auto',
            width: width <= 100 ? 100 : width,
            'margin-left': -width / 2,
            top: $.browser.msie ? $('html').scrollTop() : window.scrollY,
            'text-align': width >= 600 ? 'left' : 'center'
        });
        hideAlert(timeout);
    }
    
    else {
        div.hide();
    }
}

/**
 * 隐藏友好提示
 *
 * @param {int}    timeout  提示停留时间，单位毫秒，默认1500
 *
 * @param {void} 无返回值
 */
function hideAlert(timeout) {
    
    if (timeout !== false) {
        this.AlertTimeout = setTimeout(function() {
            Alert(false, false, true);
        }, timeout || 1500);
    }
}