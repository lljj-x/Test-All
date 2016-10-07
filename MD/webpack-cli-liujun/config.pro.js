var merge = require('webpack-merge')
var webpack= require('webpack');
'use strict';

var webpack_config = require('./config.webpack.base.js');

module.exports = merge(webpack_config({debug:false}));