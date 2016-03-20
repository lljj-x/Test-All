/**
 * Created by LiuJun on 2016/3/19.
 */

define(function () {
    var Goods = function () {
        this.init();
    };
    Goods.prototype = {
        init: function () {
            this.getData();
        },
        getData: function () {
            console.log("goods getData");
        },
        setData: function () {
            console.log("goods setData");
        }
    };
    return Goods;
});