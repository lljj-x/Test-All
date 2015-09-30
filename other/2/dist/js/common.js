/**
 * common.js            后台通用库
 * 
 * @author              mashanling(msl-138@163.com)
 * @date                2012-05-15 14:24:55
 * @last modify         2012-08-03 14:15:52 by mashanling
 */

$(function() {
    setLoading(false);
    var msg = $.cookie(L.msg);
    $.cookie(L.msg, null);
    msg && Alert(msg, true); //提示信息
    
    handleYesNo();//处理是否小图片事件 by mashanling on 2012-08-03 14:16:10
});

String.prototype.format = function() {

    if (arguments.length == 1) {//json形，如'a{a}b{b}'.format({a: 'a', b: 'b'}) => aabb
        var args = arguments[0], pattern = /\{(\w+)\}/g;
    }
    else {//数字形，如'a{0}b{1}'.format('a', 'b') => aabb
        var args = arguments, pattern = /\{(\d+)\}/g;
    }
    
    return this.replace(pattern, function(m, i) {
        return args[i];
    });
};

String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
};
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
};
String.prototype.trim = function() {
    return this.ltrim().rtrim();
};

var IS_LOCAL = document.location.hostname == 'www.everbuying.com' || document.location.hostname.indexOf('.178') > -1 ? false : true;

var C = {
    WEBSITE: 'http://' + document.location.host + '/',
    IMGCACHE_URL: IS_LOCAL ? '/temp/skin3/' : 'http://cloud4.faout.com/imagecache/EV02/',
    JSCACHE_URL: IS_LOCAL ? '/' : 'http://cloud4.faout.com/imagecache/EV02/',
    /**
     * ajax回调函数
     * 
     * @param {string}      responseText    返回信息
     * @param {string}      url             跳转地址
     * @param {string}      msg             跳转后将提示信息
     * @param {bool}        cancelLoading   取消处理中提示
     */
    callback: function(responseText, url, msg, cancelLoading){
        cancelLoading && setLoading(false);
        
        if (responseText) {
            setLoading(false);
            alert(responseText);
            return;
        }
        
        $.cookie(L.msg, msg);
        location.href = url;
    }
};

//常用语言
var L = {
    add: '添加',
    edit: '编辑',
    del: '删除',
    success: '成功',
    failure: '失败',
    
    yesno: ['否', '是'],
    openclose: ['关闭', '开启'],
    
    msg: '__msg__' //cookie __msg__
};

$.fn.disable = function(disable, value) {
    this.attr('disabled', !!disable);
    return this;
};
$.fn.post = function(cfg) {
    var cfg = cfg || {};
    
    if (typeof cfg.callback != 'function') {
        log('cfg.callback must be a function. ' + typeof(cfg.callback) + ' given');
        return this;
    }
    var btn = $('.disabled', this);
    var options = {
        url: this.attr('action'),
        type: this.attr('method') || 'POST',
        dataType: 'json',
        cache: false,
        data: this.serialize(),
        beforeSend: function() {
            btn.disable(true, true);
        },
        success: function(data) {
            cfg.callback(data, cfg);
        },
        complete: function(xhr, status) {
            status != 'success' && Alert(cfg.errorText || 'Operate Failed');
        }
    };
    options = $.extend(options, cfg);
    options.data = options.extraData ? options.data + '&' + options.extraData : options.data;
    $.ajax(options);
};

/**
 * 验证表单
 *
 * @param {array} json 待判断元素数组，数组值为json，形式为id: value; msg: msg
 *
 * @return {bool} 通过验证，返回true，否则返回false
 */
function checkPost(array) {
    var len = array.length, i, item, el, val;
    
    for (i = 0; i < len; i++) {
        item = array[i];
        el = $(item.selector);
        
        if (el.length < 1) {
            Alert(item.msg);
            return false;
        }
        
        value = el.val().trim();
        
        if (value == '' || value == item.value) {
            el.focus();
            item.alert ? alert(item.msg) : Alert(item.msg);
            return false;
        }
    };
    
    return true;
}

/**
 * console.log
 *
 * @return {void} 无返回值
 */
function log() {
    var len = arguments.length;
    
    if (typeof(console) != 'undefined') {
        var i = 0;
        
        for (i = 0; i < len; i++) {
            console.log(arguments[i]);
        }
    }
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
}//end Alert

function setLoading(msg) {
    msg === false ? Alert(false, false, true, false) : Alert(msg || '处理中...', 'loading', false, false);
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

/**
 * 去掉html标签
 *
 * @param {string} str 字符串
 * @param {bool}   img 是否保留img标签，默认false，不保留
 *
 * @return {string} 去掉html标签后的字符串
 */
function strip_tags(str, img) {
    str = String(str);
    var pattern = img ? /<(?!img)[^>]*>/ig : /<[^>]*>/gi;
    
    return str.replace(pattern, '');
}

/**
 * 转化为整数
 *
 * @param {mixed} str   需要转换的字符串
 * @param {int}   def   默认值
 * @param {int}   radix 进制，默认十进制
 *
 * @return {int} 转化后的整数
 */
function intval(str, def, radix) {
    radix = radix || 10;
    var str = parseInt(str, radix);
    
    return isNaN(str) ? parseInt(def == undefined ? 0 : def, radix) : str;
}

/**
 * 转化为浮点数
 *
 * @param {mixed} str   需要转换的字符串
 * @param {float} def   默认值
 *
 * @return {float} 转化后的浮点数
 */
function toFloat(str, def) {
    var str = parseFloat(str);
    
    return isNaN(str) ? parseFloat(def == undefined ? 0 : def) : str;
}

/**
 * 数字精确度
 *
 * @param {int} value     数字
 * @param {int} precision 小数点位数
 */
function toFixed(value, precision) {
    precision = precision === undefined ? 2 : precision;
    
    if ((0.9).toFixed() !== '1') {//IE下等于0
        var pow = Math.pow(10, precision);
        return (Math.round(value * pow) / pow).toFixed(precision);
    }
    
    return value.toFixed(precision);
}

/**
 * 使用另一个字符串填充字符串为指定长度
 *
 * @param string string     待填充字符串
 * @param int    lendgh     总长度，默认10
 * @param string pad        填充字符，默认' '
 * @param string padType    填充类型，默认左填充
 *
 * @return {string} 填充后的字符串
 */
function str_pad(str, length, pad, padType) {
    str = String(str);
    length = length ? length : 10;
    pad = pad == undefined ? ' ' : pad;
    
    while (str.length < length) {
        str = padType == 'right' ? str + pad : pad + str;
    }
    
    return str;
    
}

/**
 * html转码
 *
 * @param {string} str 待转换字符串
 *
 * @param {string} 转换后的字符串
 */
function htmlspecialchars(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;');
}

/**
 * 反转html
 *
 * @param {string} str 待转换字符串
 *
 * @param {string} 转换后的字符串
 */
function unhtmlspecialchars(str) {
    return str.replace(/\&lt;/g, '<').replace(/\&gt;/g, '>').replace(/\&quot;/g, '"').replace(/\&#39;/g, "'");
}

/**
 * 输入框获、失焦点处理
 *
 * @param {object} obj   html元素
 * @param {string} def   默认内容，默认为元素初始值
 * @param {string} color 获得焦点时，输入框字体颜色
 *
 * @return {object} html元素
 */
function setFocus(obj, def, color) {
    def = def || obj.defaultValue;
    obj.value.trim() == def ? obj.value = '' : '';
    
    obj.onblur = function() {
        obj.value.trim() == '' ? obj.value = def : '';
    };
    color ? obj.style.color = color : '';
    
    return obj;
}

/**
 * 格式化时间
 *
 * @param {string} format      格式
 * @param {mixed}  constructor 日期初始化参数
 *
 * @return {string} 格式化后的时间
 */
function date(format, constructor) {

    if (typeof(constructor) == 'object') {
        var datetime = constructor;
    }
    else {
        var datetime = constructor ? new Date(constructor) : new Date();
    }
    
    format = format || 'Y-m-d H:i:s';
    
    var o = {
        'Y': datetime.getFullYear(),
        'm': datetime.getMonth() + 1,
        'd': datetime.getDate(),
        'H': datetime.getHours(),
        'i': datetime.getMinutes(),
        's': datetime.getSeconds()
    };
    
    for (var i in o) {
        _s = i == 'Y' ? o[i] : str_pad(o[i], 2, '0');//不为年，补0
        format = format.replace(new RegExp(i, 'g'), _s);
    }
    
    return format;
}

/**
 * 获取参数
 *
 * @param {string} name 参数
 * @param {string} str  待获取字符串
 *
 * @return {string} 参数值
 */
function _GET(name, str) {
    var pattern = new RegExp('[\?&]' + name + '=([^&]+)', 'g');
    str = str || location.search;
    var arr, match = '';
    
    while ((arr = pattern.exec(str)) !== null) {
        match = arr[1];
    }
    
    return match;
}

/**
 *
 * @param {string} url     跳转地址
 * @param {bool}   replace 是否location.replace
 *
 * @return {void} 无返回值
 */
function redirect(url, replace) {
    url = decodeURIComponent(url);
    replace ? location.replace(url) : location.href = url;
}

/**
 * 全选，全不选
 * 
 * @param {object} cb  checkbox
 * @param {string} cls class
 * 
 * @return {void} 无返回值
 */
function checkAll(cb, cls) {
    cls = cls || 'checkbox';
    $('input.' + cls).attr('checked', cb.checked);
}

/**
 * 获取选中内容
 * 
 * @param {string} cls class
 * 
 * @return {string} 选中内容
 */
function getCheckedAll(cls, noCheckedMsg) {
    cls = cls || 'checkbox';
    var values = $('input.' + cls + ':checked').map(function() {
        return $(this).val();
    }).get().join(',');
    
    !values && noCheckedMsg === undefined && Alert(noCheckedMsg || '请至少选择一条记录');
    
    return values;
}

/**
 * 处理是否小图片事件，如上下架
 *
 * @author       mashanling(msl-138@163.com)
 * @date         2012-08-03 13:48:53
 * @last modify  2012-08-03 13:48:53 by mashanling
 *
 * @return {void} 无返回值
 */
function handleYesNo() {
    $('img.img-yesno').on('click', function() {
        setLoading();
        var me = $(this), imgUrl = me.attr('src'), state = imgUrl.indexOf('yes') == -1 ? 0 : 1;
        $.get('state.php?' + me.attr('data-opt') + state, function(data) {
            setLoading(false);
            me.attr('src', state ? imgUrl.replace('yes', 'no') : imgUrl.replace('no', 'yes'));
        });
    });
}
