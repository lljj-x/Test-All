var merge = require('webpack-merge')
var webpack= require('webpack');
'use strict';

var webpack_config = require('./config.webpack.base.js')
// console.log(webpack_config({debug:true}))

module.exports = merge(webpack_config({debug:true}));
// module.exports = merge(webpack_config({debug:false}));