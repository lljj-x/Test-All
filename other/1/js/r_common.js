(function($){
    // 招聘页面 通用js
    $.supports = function(prop){
        var div = document.createElement('div'),
            vendors = 'Khtml O Moz Webkit'.split(' '),
            len = vendors.length;
        if ( prop in div.style ) return true;
        if ('-ms-' + prop in div.style) return true;
        prop = prop.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });
        while(len--) {
            if ( vendors[len] + prop in div.style ) {
                return true;
            }
        }
        return false;
    };
})(jQuery);