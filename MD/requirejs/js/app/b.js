/**
 * Created by LiuJun on 2016/3/19.
 */
define(['require','a'],function () {
    alert('b');
    return function (title) {
        var a = require('a');
        console.log(a.hi);
        return {
            hi:'b'
        }
    };
});
