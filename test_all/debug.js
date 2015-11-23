/**
 * Created by LIU.JUN on 2015/11/23.
 */
var root = window;

var Base = {};

var domain = 'allpyra.com';

var _spliter = /^(\S+)\s*(.*)$/;

var _hasprop = Object.prototype.hasOwnProperty;

var _slice = Array.prototype.slice;

var _concat = Array.prototype.concat;

var _getType = function(o) {
    return Object.prototype.toString.call(o);
};

var _isFunction = function(o) {
    return _getType(o) === '[object Function]';
};

var _isObject = function(o) {
    return _getType(o) === '[object Object]';
};

var _isArray = function(o) {
    return _getType(o) === '[object Array]';
};

var _isString = function(o) {
    return _getType(o) === '[object String]';
};

var proxy = function() {
    if (arguments.length === 0) return;

    var args = arguments,
        fn = args[0],
        context = args.length === 1 ? this : (_isObject(args[1]) && args[1]);

    return function() {
        console.log(arguments);

        var xx = _concat.call(_slice.call(args, 2), _slice.call(arguments));


        return fn.apply(context, args.length > 2 ? _concat.call(_slice.call(args, 2), _slice.call(arguments)) : arguments);
    }
};


var fun = proxy(function(){
    alert("xxx");
},window,'test1','test2','test3');

fun();