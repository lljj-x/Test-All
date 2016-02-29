/* gs lite v0.0.2-l */

/*==============================
 =            Plugin            =
 ==============================*/

var gulp = require("gulp");
var del = require('del');
var less = require('gulp-less');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
// var useref = require('gulp-useref');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

var sass = require('gulp-sass');

// 错误管理，避免错误后结束进程
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

/* path config */
var srcRoot = 'src/';
var buildRoot = 'build/';
var debugRoot = 'debug/';
var webpackbuildRoot = 'webpackbuild/';

var partRoot = {
    less: 'less/',
    sass: 'sass/',
    css: 'css/',
    images: 'images/',
    js: 'js/',
    tpl: 'tpl/',
    html: 'html/',
    components: 'components/',
    webpack_js: 'webpackjs/',
    html_build: ''
};
var copyDir = ['src/assets/**', 'src/javatemplates/**', 'src/dl/**'];

var relevant = {
    less: partRoot.less + '**/*.less',
    sass: partRoot.sass + '**/*.scss',
    css: partRoot.css + '**/*.css',
    images: partRoot.images + '**/*.+(JPG|jpg|png|gif|svg)',
    js: partRoot.js + '**/*.js',
    tpl: partRoot.tpl + '**/*.tpl',
    html: partRoot.html + '**/*.+(html|htm)',
    components: partRoot.html + '**/*.vue',
    webpack_js: partRoot.webpack_js + '**/*.js'
};

/* config */
var conf = {
    autoprefixer: {
        browsers: ['last 2 versions']
    },
    revManifest: {merge: true},
    htmlmin: {
        removeComments: true,
        collapseWhitespace: true
    },
    imagemin: {
        optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }
};

function getWebpackConfig(opt) {
    var config = {
        module: {
            loaders: [
                { test: /\.css$/, loader: 'style!css' },
                {test: /\.vue$/, loader: 'vue'},
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
                {
                    test: /\.js$/,
                    exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                    loader: 'babel'
                }
            ]
        },
        devtool: 'source-map',
        output: {
            filename: '[name].webpack.js',
            // path: './webpackbuild',
            // publicPath: partRoot.js
        },
        babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }
    };
    if (!opt) {
        return config
    }
    for (var i in opt) {
        if (opt.hasOwnProperty(i)) {
            config[i] = opt[i]
        }
    }
    return config
}


var version = +new Date();

/* task */

// clean
gulp.task('clean:css', function (cb) {
    del(debugRoot + partRoot.css,cb);
});
gulp.task('clean:js', function (cb) {
    del(debugRoot + partRoot.js,cb);
});
gulp.task('clean:images', function (cb) {
    del(debugRoot + partRoot.images,cb);
});
gulp.task('clean:debug', function (cb) {
    del([debugRoot],cb);
});
gulp.task('clean:build', function (cb) {
    del([buildRoot],cb);
});
gulp.task('clean', function (cb) {
    del([debugRoot, buildRoot],cb);
});

// less
gulp.task('less:debug', function () {
    return gulp.src([srcRoot + relevant.less, '!**/_*'], {
        base: srcRoot + partRoot.less
    }).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer(conf.autoprefixer))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(debugRoot + partRoot.css));
});
gulp.task('less:build', function () {
    return gulp.src([srcRoot + relevant.less, '!**/_*'], {
        base: srcRoot + partRoot.less
    }).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(autoprefixer(conf.autoprefixer))
        .pipe(minifyCss())
        .pipe(gulp.dest(buildRoot + partRoot.css));
});
gulp.task('less:watch', function () {
    console.log('less:watch running...');
    gulp.start(['less:debug']);
    gulp.watch(srcRoot + relevant.less, ['less:debug']);
});

// sass
gulp.task('sass:debug', function () {
    return gulp.src([srcRoot + relevant.sass, '!**/_*'], {
        base: srcRoot + partRoot.sass
    }).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(conf.autoprefixer))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(debugRoot + partRoot.css));
});
gulp.task('sass:build', function () {
    return gulp.src([srcRoot + relevant.sass, '!**/_*'], {
        base: srcRoot + partRoot.sass
    }).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(conf.autoprefixer))
        .pipe(minifyCss())
        .pipe(gulp.dest(buildRoot + partRoot.css));
});
gulp.task('sass:watch', function () {
    console.log('sass:watch running...');
    gulp.start(['sass:debug']);
    gulp.watch(srcRoot + relevant.sass, ['sass:debug']);
});

// scripts
gulp.task('js:debug', function () {
    return gulp.src([srcRoot + relevant.js, '!**/_*'], {base: srcRoot + partRoot.js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        // do something
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(debugRoot + partRoot.js));
});
gulp.task('js:build', function () {
    return gulp.src([srcRoot + relevant.js, '!**/_*'], {base: srcRoot + partRoot.js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(uglify())
        .pipe(gulp.dest(buildRoot + partRoot.js));
});

gulp.task('js:watch', function () {
    console.log('js:watch running...');
    gulp.start(['js:debug']);
    gulp.watch(srcRoot + relevant.js, ['js:debug']);
});

// images
gulp.task('images:debug', function () {
    return gulp.src([srcRoot + relevant.images, '!**/_*'], {base: srcRoot + partRoot.images})
        .pipe(gulp.dest(debugRoot + partRoot.images));
});
gulp.task('images:build', function () {
    return gulp.src([srcRoot + relevant.images, '!**/_*'], {base: srcRoot + partRoot.images})
        // .pipe(imagemin(conf.imagemin))
        .pipe(gulp.dest(buildRoot + partRoot.images));
});

// copyDir
gulp.task('copyDir:debug', function () {
    return gulp.src(copyDir, {base: srcRoot})
        .pipe(gulp.dest(debugRoot));
});
gulp.task('copyDir:build', function () {
    return gulp.src(copyDir, {base: srcRoot})
        .pipe(gulp.dest(debugRoot));
});

// tpl
gulp.task('tpl:debug', function () {
    return gulp.src([srcRoot + relevant.tpl, '!**/_*'], {base: srcRoot + partRoot.tpl})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(fileinclude())
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest(debugRoot + partRoot.html_build));
});
gulp.task('tpl:build', function () {
    return gulp.src([srcRoot + relevant.tpl, '!**/_*'], {base: srcRoot + partRoot.tpl})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(fileinclude())
        .pipe(rename({extname: ".html"}))
        .pipe(replace('?@@version', '?' + version))
        .pipe(htmlmin(conf.htmlmin))
        .pipe(gulp.dest(buildRoot + partRoot.html_build));
});
gulp.task('tpl:watch', function () {
    console.log('tpl:watch running...');
    gulp.start(['tpl:debug']);
    gulp.watch(srcRoot + relevant.tpl, ['tpl:debug']);
});

// webpack
gulp.task("webpack:debug", function () {
    return gulp.src([srcRoot + relevant.webpack_js, '!**/_*'], {base: srcRoot + partRoot.webpack_js})
        .pipe(plumber({errorHandler: notify.onError('webPackError: <%= error.message %>')}))
        .pipe(named())
        .pipe(webpack(getWebpackConfig()))
        .pipe(gulp.dest(debugRoot + partRoot.js));
});
gulp.task("webpack:build", function () {
    return gulp.src([srcRoot + relevant.webpack_js, '!**/_*'], {base: srcRoot + partRoot.webpack_js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(named())
        .pipe(webpack(getWebpackConfig()))
        .pipe(uglify())
        .pipe(gulp.dest(buildRoot + partRoot.js));
});
gulp.task("webpack:watch", function () {
    console.log('webpack:watch running...');
    return gulp.src([srcRoot + relevant.webpack_js, '!**/_*'], {base: srcRoot + partRoot.webpack_js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(named())
        .pipe(webpack(getWebpackConfig({
            watch: true
        })))
        .pipe(gulp.dest(debugRoot + partRoot.js));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.start(['less:watch', 'sass:watch','js:watch','tpl:watch']);
});

// The debug task (called when you run `gulp debug` from cli)
gulp.task('debug', ['clean:debug'], function () {
    // gulp.start(['less:debug', 'sass:debug', 'js:debug', 'webpack:debug', 'tpl:debug', 'images:debug', 'copyDir:debug']);
    gulp.start(['less:debug', 'sass:debug', 'js:debug','webpack:debug', 'tpl:debug', 'images:debug', 'copyDir:debug']);
});

// The build task (called when you run `gulp build` from cli)
gulp.task('build', ['clean:build'], function () {
    gulp.start(['less:build', 'sass:build', 'js:build', 'tpl:build', 'images:build', 'copyDir:debug']);
});
