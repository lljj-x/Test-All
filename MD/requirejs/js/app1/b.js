/**
 * Created by Liu.Jun on 2016/7/4.
 */

define(["require", "a"], function (require,a) {
    return function (title) {

        console.log(require.toUrl('a'));

        debugger
        var a = require('./a');

        debugger
        console.log(a.name);

        return {
            name: 'Module b',
            title: title || 'Default title'
        };

    }
});

