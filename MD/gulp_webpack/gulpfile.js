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
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');

// 错误管理，避免错误后结束进程
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');


/*============================
 =            Path            =
 ============================*/

/* path config */
var srcRoot = 'src/';
var buildRoot = 'build/';
var debugRoot = 'debug/';
var webpackbuildRoot = 'webpackbuild/';

var copyDir = ['src/assets/**','src/javatemplates/**','src/dl/**'];
var partRoot = {
    less: 'less/',
    css: 'css/',
    images: 'img/',
    js: 'js/',
    tpl: 'tpl/',
    html: 'html/',
    html_build: ''
};

var relevant = {
    less: partRoot.less + '**/*.less',
    css: partRoot.css + '**/*.css',
    images: partRoot.images + '**/*.+(jpg|png|gif|svg)',
    js: partRoot.js + '**/*.js',
    tpl: partRoot.tpl + '**/*.tpl',
    html: partRoot.html + '**/*.+(html|htm)'
};


/*==============================
 =            Config            =
 ==============================*/

var conf = {
    autoprefixer: {
        browsers: ['last 2 versions']
    },
    browsersync: {
        ui: {
            port: 3004
        },
        port: 3003,
        server: debugRoot
    },
    revManifest: {merge: true},
    htmlmin: {
        removeComments: true,
        collapseWhitespace: true
    }
};


/*============================
 =            temp            =
 ============================*/


var tplLv2 = ['checkout', 'rebate', 'groupon'];
var tplLv2Rel = (function (list) {
    var result = ['!_*'];
    for (var i = 0; i < list.length; i++) {
        result.push(debugRoot + list[i] + '/*.html');
    }
    return result;
})(tplLv2);


/*=================================
 =            Less Task            =
 =================================*/

/* gulp-less tack */

gulp.task('less', function () {
    return gulp.src([srcRoot + relevant.less, '!**/_*'], {base: srcRoot + partRoot.less})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest(debugRoot + partRoot.css));
});


gulp.task('less:all', ['css:clean'], function () {
    return gulp.src([srcRoot + relevant.less, '!**/_*'], {base: srcRoot + partRoot.less})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest(debugRoot + partRoot.css));
});


gulp.task('less:watch', function () {
    console.log('less:watch running...');
    gulp.start(['less']);
    gulp.watch(srcRoot + relevant.less, ['less']);
});

gulp.task('webpackcopy', function () {
    gulp.src(webpackbuildRoot + '**/*.*', {base: webpackbuildRoot})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))	// liu
        .pipe(gulp.dest(debugRoot + webpackbuildRoot));
})
/*===================================
 =            Script task            =
 ===================================*/

gulp.task('js', function () {


    gulp.src(webpackbuildRoot + '**/*.js', {base: webpackbuildRoot})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))	// liu
        .pipe(gulp.dest(debugRoot + partRoot.js));

    return gulp.src(srcRoot + relevant.js, {base: srcRoot + partRoot.js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))	// liu
        .pipe(gulp.dest(debugRoot + partRoot.js));
});


gulp.task('js:watch', function () {
    console.log('js:watch running...');
    gulp.start(['js']);
    gulp.watch(webpackbuildRoot + '**/*.js', ['js', 'webpackcopy']);
    gulp.watch(srcRoot + relevant.js, ['js']);
});


/*===================================
 =            Images task            =
 ===================================*/

gulp.task('images', function () {
    return gulp.src([srcRoot + relevant.images, '!**/_*'], {base: srcRoot + partRoot.images})
        .pipe(gulp.dest(debugRoot + partRoot.images));
});


/*=================================
 =            Html task            =
 =================================*/

gulp.task('html', function () {
    return gulp.src(srcRoot + relevant.html, {base: srcRoot + partRoot.html})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))	// liu
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest(debugRoot + partRoot.html_build));
});


gulp.task('html:watch', function () {
    console.log('html:watch running...');
    gulp.start(['html']);
    gulp.watch(srcRoot + relevant.html, ['html']);
});


/*=====================================
 =            Template task            =
 =====================================*/

gulp.task('tpl', function () {
    return gulp.src([srcRoot + relevant.tpl, '!**/_*'], {base: srcRoot + partRoot.tpl})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))	// liu
        .pipe(fileinclude())
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest(debugRoot + partRoot.html_build));
});


gulp.task('tpl:watch', function () {
    console.log('tpl:watch running...');
    gulp.start(['tpl']);
    gulp.watch(srcRoot + relevant.tpl, ['tpl']);
});


/*==================================
 =            Debug task            =
 ==================================*/

gulp.task('debug', ['clean'], function () {
    gulp.start(['html', 'images', 'webpack:build', 'js', 'webpackcopy', 'less', 'tpl', 'copyDir:debug']);
});


/*================================
 =            Copy dir            =
 ================================*/

gulp.task('copyDir:debug', function () {
    return gulp.src(copyDir, {
            base: srcRoot
        })
        .pipe(gulp.dest(debugRoot))
        ;
});

gulp.task('copyDir:build', function () {
    return gulp.src(copyDir, {
            base: srcRoot
        })
        .pipe(gulp.dest(buildRoot))
        ;
});


/*==================================
 =            Build task            =
 ==================================*/

gulp.task('build:assets', function () {
    return gulp.src([debugRoot + '/**/*.+(css|js)', '!**/_*'], {
            base: debugRoot
        })
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(buildRoot))
        ;
});
gulp.task('build:webpackbuild', function () {
    return gulp.src([debugRoot + webpackbuildRoot + '**/*.*'], {
            base: debugRoot + webpackbuildRoot
        })
        .pipe(gulp.dest(buildRoot + webpackbuildRoot))
        ;
});

gulp.task('build:combine', ['build:combineLv2'], function () {
    var version = new Date() - 0;
    var assets = useref.assets();
    return gulp.src([debugRoot + '*.html', '!_*'], {
            base: debugRoot
        })
        .pipe(replace('?@@version', '?' + version))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin(conf.htmlmin)))

        // 合并后再次替换
        // .pipe(replace('.css"', '.css?' + version + '"'))
        .pipe(replace('.js"', '.js?' + version + '"'))

        .pipe(gulp.dest(buildRoot));
});


gulp.task('build:combineLv2', function () {
    var version = new Date() - 0;
    var assets = useref.assets();
    return gulp.src(tplLv2Rel, {
            base: debugRoot + '**'
        })
        .pipe(replace('?@@version', '?' + version))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin(conf.htmlmin)))

        // 合并后再次替换
        // .pipe(replace('.css"', '.css?' + version + '"'))
        .pipe(replace('.js"', '.js?' + version + '"'))

        .pipe(gulp.dest(buildRoot + '**'));
});


gulp.task('build:other', function () {
    return gulp.src([debugRoot + relevant.images, '!**/_*'], {
            base: debugRoot
        })
        .pipe(gulp.dest(buildRoot))
        ;
});

gulp.task('build', ['clean:build'], function () {
    gulp.start(['build:assets', 'build:combine', 'build:other', 'copyDir:build', 'build:webpackbuild']);
});


/*==================================
 =            Watch task            =
 ==================================*/

gulp.task('watch', function () {
    gulp.start(['less:watch', 'html:watch', 'webpack:watch', 'js:watch', 'tpl:watch']);
});


/*====================================
 =            browser-sync            =
 ====================================*/

gulp.task('bs', ['watch'], function () {
    browserSync.init(conf.browsersync);
    gulp.watch([debugRoot + '/**/*.+(html|js|css)']).on('change', browserSync.reload);
});


/*==================================
 =            clean task            =
 ==================================*/

gulp.task('clean:css', function (cb) {
    del(debugRoot + partRoot.css, cb);
});
gulp.task('clean:js', function (cb) {
    del(debugRoot + partRoot.js, cb);
});
gulp.task('clean:images', function (cb) {
    del(debugRoot + partRoot.images, cb);
});
gulp.task('clean:debug', function (cb) {
    del([debugRoot], cb);
});
gulp.task('clean:build', function (cb) {
    del([buildRoot], cb);
});
gulp.task('clean', function (cb) {
    del([debugRoot, buildRoot], cb);
});


function getConfig(opt) {
    var config = {
        //resolve:{
        //    extensions:['','.js','.vue','.pcss'],
        //},
        module: {
            loaders: [
                {test: /\.vue$/, loader: 'vue'},
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
                {
                    test: /\.js$/,
                    exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                    loader: 'babel'
                }
            ]
        },
        output: {
            filename: '[name].build.js',
            //path: './webpackbuild',
            publicPath: "/"+webpackbuildRoot + '/',
        },
        babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        },
        plugins:[
            //new webpack.DefinePlugin({
            //    'process.env': {
            //        NODE_ENV: '"production"'
            //    }
            //}),
            //new webpack.optimize.UglifyJsPlugin({
            //    compress: {
            //        warnings: false
            //    }
            //}),
           // new webpack.optimize.OccurenceOrderPlugin()
        ]
    }
    if (!opt) {
        return config
    }
    for (var i in opt) {
        config[i] = opt[i]
    }
    return config
}
function namedCall(file) {
    return file.relative.substring(0, file.relative.lastIndexOf("."));
}
var webpackSrc = [
    //srcRoot + partRoot.js + "_index.js",
    srcRoot + partRoot.js + "_index.js",
    srcRoot + partRoot.js + "_search.js",
    srcRoot + partRoot.js + "_loginbyphone.js",
    srcRoot + partRoot.js + "_register.js",
    srcRoot + partRoot.js + "_sharepage.js",
    srcRoot + partRoot.js + "rebate/_share_found.js",
];
gulp.task('webpack:watch', function () {
    console.log('webpack:watch running...');
    return gulp.src(webpackSrc, {
            base: srcRoot + partRoot.js
        })
        .pipe(named(namedCall))
        .pipe(webpack(getConfig({
            watch: true
        })))
        .pipe(gulp.dest('webpackbuild/'));
});
gulp.task('webpack:build', function () {
    return gulp.src(webpackSrc, {
            base: srcRoot + partRoot.js
        })
        .pipe(named(namedCall))
        .pipe(webpack(getConfig()))
        .pipe(gulp.dest('webpackbuild/'));
});


/*====================================
 =            default task            =
 ====================================*/

gulp.task('default', function () {
    console.dir('****** Default task are not defined ******');
});

