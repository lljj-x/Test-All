/**
 * Created by Liu.Jun on 2016/7/4.
 */
define(['require','app1/module2'],function (require) {

    var module2 = require('./module2');

    console.log(module2.name);
    module2.name = 'xxxxxxx';


    var module3 = require('./module2');

    console.log(module3.name);

    console.log(require.toUrl('./module2'));


    return {
        name: 'test',
        age: 'age'
    }
});