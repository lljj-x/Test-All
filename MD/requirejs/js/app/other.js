/**
 * Created by LiuJun on 2016/3/19.
 */
define(['require'],function () {

    alert("wo shi other");

    require(['a'], function () {

        alert('other load a.js');
    });
    return {

    }
});
