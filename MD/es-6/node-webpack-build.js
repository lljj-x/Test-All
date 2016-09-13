/**
 * Created by Liu.Jun on 2016/9/13.
 */

var webpack = require("webpack");
var config = require('./config.pro.js');
var compiler = webpack(config);

// webpack
compiler.run(function(err, stats) {
    // Do something...

});

// gulp run
var gulpTask = require('./config.gulp.base');
gulpTask({debug:false});
