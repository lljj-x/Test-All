/**
 * Created by Liu.Jun on 2016/9/13.
 */

var webpack = require("webpack");
var config = require('./config.pro.js');
var compiler = webpack(config);

// webpack
compiler.run(function(err, stats) {
    // Do something...
    if (err) {
        console.error('不知道什么错误的错误!!!');
        return ;
    }

    var jsonStats = stats.toJson();

    if (jsonStats.errors.length > 0){
        jsonStats.errors.forEach(function (v) {
            console.error('\n致命错误！' + v);
        });
        return ;
    }

    if (jsonStats.warnings.length > 0) {
        jsonStats.errors.forEach(function (v) {
            console.warn('\n警告！' + v);
        });
    }

    console.log('\n构建成功 !');
});

// gulp run
var gulpTask = require('./config.gulp.base');
gulpTask({debug:false});
