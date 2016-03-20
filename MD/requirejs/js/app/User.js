/**
 * Created by LiuJun on 2016/3/19.
 */

define(['goods'], function (Goods) {
    var goods = new Goods();
    goods.setData();
    console.log('User init');
    return {
        say : function () {
            console.log('Hello word !!!');
        }
    };
});