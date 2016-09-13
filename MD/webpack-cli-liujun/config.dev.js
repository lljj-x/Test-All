var merge = require('webpack-merge')
var webpack= require('webpack');
'use strict';

var webpack_config = require('./config.webpack.base.js')
// console.log(webpack_config({debug:true}))
module.exports = merge(webpack_config({debug:true}), {
    devtool : "#source-map"
    //#如果需要 ie8~9 下调试注释这里 ie8~9 不支持热调试
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
});