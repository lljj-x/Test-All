/**
 * Created by Liu.Jun on 2016/7/4.
 */

require.config({
    baseUrl: 'js/app1',
    paths: {
        jquery: 'lib/jquery-1.9.1.min',
        a: 'a'
    }
});



// 测试 define 内require
/**
 *
    require(['jquery', 'app1/module1'], function ($, module1) {
        console.log("xx");
    });

*/


// 测试循环依赖关系
require(['a'], function (a) {
    console.log('---------  循环依赖  ---------');
    console.log('a =',a);
});

