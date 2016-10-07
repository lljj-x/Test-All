/**
 * Created by Liu.Jun on 2016/9/13.
 */
var gulp = require('gulp');
var del = require('del');
var pkg = require('./package.json');

var copyDir = pkg.gulpConfig.copyDir;
var copyDirBasePath = pkg.gulpConfig.copyDirBasePath;
var buildDir = pkg.config.buildDir;

module.exports = function (options) {
    options = options || {};
    var DEBUG = options.debug != undefined ? options.debug : true;

    gulp.task('copyStatic',function(){
        console.log('复制静态文件');
        return gulp.src(copyDir, {base: copyDirBasePath})
                .pipe(gulp.dest(buildDir));
    });

    gulp.task('cleanBuild', function (cb) {
        console.log('删除 build 文件夹');
        del([buildDir],cb);
    });

    gulp.task('build', ['cleanBuild'], function () {
        console.log('复制文件');
        gulp.start(['copyStatic']);
    });

    gulp.task('build', ['cleanBuild'], function () {
        gulp.start(['copyStatic']);
    });

    // gulp build ,文件占用 无法删除，所以无法回调
    gulp.start(['copyStatic']);
};
