/**
 * Created by LiuJun on 2016/3/3.
 */

var proxy = function () {
    var args = arguments,
        argsLength = args.length,
        fn;

    if(argsLength === 0) return false;

    fn = args[0];
    return function () {
        fn.apply(this,args.length > 1 ? Array.prototype.slice.call(args,1).concat(Array.prototype.slice.call(arguments,0)) : arguments);
    }
};

var doSome = function (call) {
    call("call data");
};

var _callBack = function (type,data) {
    console.log(data);
    if (type === 1) {
        console.log("type =1 ")
    } else {
        console.log("type =2 ")
    }
};

doSome(proxy(_callBack,2));
