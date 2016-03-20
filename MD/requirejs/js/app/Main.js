/**
 * Created by LiuJun on 2016/3/19.
 */

(function () {
    require(['user'], function (user) {
        user.say();
    });

    // 循环依赖
    var clickBtn =document.getElementById('js_clickMe');
    clickBtn.addEventListener('click', function () {
        require(['a'], function () {
            //alert('a a  a !');
        });
    });


})();