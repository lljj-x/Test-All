/* gs lite v0.0.2-l */

/*==============================
 =            Plugin            =
 ==============================*/

var gulp = require("gulp");
var del = require('del');
var fileinclude = require('gulp-file-include');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var replace = require('gulp-replace-task');
var htmlmin = require('gulp-htmlmin');
var named = require('vinyl-named');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var RevAll = require('gulp-rev-all');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var babel   = require("gulp-babel");
var webpack = require('gulp-webpack');
var autoprefixer2 = require('autoprefixer');
var precss = require('precss');
//var postcssConfig = [autoprefixer2({ browsers: ['last 2 versions','ie >= 9','Firefox >= 10','last 3 Safari versions']}), precss];
var postcssConfig = [autoprefixer2(), precss];
// var filter = require('gulp-filter');

var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

/* path config */
var srcRoot = 'src/';
var buildRoot = 'build/';
var debugRoot = 'debug/';

var partRoot = {
    sass: 'scss/',
    css: 'css/',
    images: 'images/',
    js: 'js/',
    tpl: 'tpl/',
    html: 'html/',
    components: 'components/',
    webpack_js: 'webpack/',
    html_build: ''
};
var copyDir = ['src/static/**'];
var copyDirBasePath = 'src/static/';

var relevant = {
    sass: partRoot.sass + '**/*.scss',
    css: partRoot.css + '**/*.css',
    images: partRoot.images + '**/*.+(JPG|jpg|png|gif|svg)',
    js: partRoot.js + '**/*.js',
    tpl: partRoot.tpl + '**/*.html',
    tplinc: partRoot.tpl + 'inc/*.html',
    html: partRoot.html + '**/*.+(html|htm)',
    components: partRoot.components + '**/*.vue',
    webpack_js: partRoot.webpack_js + '**/*.js'
};

var tplLv2 = ['admin','chart','school','user'];
var tplLv2Rel = (function (list) {
    var result = [debugRoot + '*.html'];
    for (var i = 0; i < list.length; i++) {
        result.push(debugRoot + list[i] + '/*.html');
    }
    result.push('!**/_*');
    // console.log(result);
    return result;
})(tplLv2);

/* config */
var hbAttrWrapPair = [/\@[^=]*/, /\s?/,/\{\{(#|\^)[^}]+\}\}/,/\{\{\/[^}]+\}\}/,/\{\% if[^}]+\%\}/,/\{\%[^}]+endif \%\}/]

var conf = {
    autoprefixer: {
        //browsers: ['last 2 versions']
    },
    revManifest: {merge: true},
    htmlmin: {
        removeComments: true,
        collapseWhitespace: true,
        customAttrSurround: [
            hbAttrWrapPair
        ]
    },
    imagemin: {
        optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    },
    replace:{
        variables: {
            'sitename': '障碍跑',
            'version': new Date - 0,
            'skincss' : 'default'
        }
    },
    commonjs: [srcRoot + partRoot.js + '_common/base.js', srcRoot + partRoot.js + '_common/filters.js']
};

var path=require('path');
function webpackEntries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }
    return entries;
}

function namedCall(file) {
    return file.relative.substring(0, file.relative.lastIndexOf("."));
}
function getWebpackConfig(opt) {
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    var config = {
        module: {
            loaders   : [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        plugins: [
                            //'transform-es2015-typeof-symbol','transform-runtime'
                        ]
                    }
                },
                {test: /\.tpl/, loader: 'text-loader'},
                {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'},
                {test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'},
                {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
            ],
            preLoaders: [
                //{test: /\.js$/, loader: "amdcss-loader"}
            ]
        },
        postcss: function () {
            return postcssConfig;
        },
        resolve: {
            extensions: ['.js', "", ".css"],
            alias     : {
                wpproduct:path.resolve(__dirname,'./src/component/product/'),
                assetsplugins:path.resolve(__dirname,'./src/static/assets/global/plugins'),
                component:path.resolve(__dirname,'./src/component/'),
                oni :path.resolve(__dirname,'./src/component/oni/'),
                avalon     : path.resolve(__dirname,'./src/js/common/avalon.js'), //在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
                "../avalon": path.resolve(__dirname,'./src/js/common/avalon.js') //由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
            }
        },
        //devtool: '#source-map',
        //plugins : [
        //    new CommonsChunkPlugin({
        //        name: "common",
        //        minChunks: 2
        //    })
        //],
        output: {
            filename: '[name].wp.js'
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

// 合并 common.js
gulp.task('concatjs:debug', function() {
    return gulp.src(conf.commonjs)
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(concat('common.js'))
            .pipe(gulp.dest(debugRoot + partRoot.js))
            .pipe(livereload());
});
gulp.task('concatjs:watch', function () {
    console.log('concatjs:watch running...');
    gulp.start(['concatjs:debug']);
    gulp.watch(conf.commonjs, ['concatjs:debug']);
});

// sass
gulp.task('sass:debug', function () {
    return gulp.src([srcRoot + relevant.sass, '!**/_*'], {
        base: srcRoot + partRoot.sass
    }).pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(debugRoot + partRoot.css))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(conf.autoprefixer))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(debugRoot + partRoot.css))
        .pipe(livereload());
});
gulp.task('sass:watch', function () {
    console.log('sass:watch running...');
    gulp.start(['sass:debug']);
    gulp.watch(srcRoot + relevant.sass, ['sass:debug']);
});

// scripts
gulp.task('js:debug', function () {
    return gulp.src([srcRoot + relevant.js], {base: srcRoot + partRoot.js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(debugRoot + partRoot.js))
        //.pipe(sourcemaps.init())
        // do something
        //.pipe(babel({
        //    presets: ['es2015']
        //}))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(debugRoot + partRoot.js))
        .pipe(livereload());
});

// test scripts
gulp.task('js:testdebug', function () {
    return gulp.src([srcRoot + 'js/liutest/*.js'], {base: srcRoot + partRoot.js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        // do something
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(debugRoot + partRoot.js))
        .pipe(livereload());
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
    return gulp.src(copyDir, {base: copyDirBasePath})
        .pipe(gulp.dest(debugRoot));
});
gulp.task('copyDir:build', function () {
    return gulp.src(copyDir, {base: copyDirBasePath})
        .pipe(gulp.dest(buildRoot));
});

// tpl
gulp.task('tpl:debug', function () {
    return gulp.src([srcRoot + relevant.tpl, '!**/_*','!**/inc/**'], {base: srcRoot + partRoot.tpl})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(debugRoot + partRoot.html_build))
        .pipe(fileinclude())
        .pipe(rename({extname: ".html"}))
        .pipe(replace(conf.replace))
        .pipe(gulp.dest(debugRoot + partRoot.html_build))
        .pipe(livereload());
});
gulp.task('tpl:watch', function () {
    console.log('tpl:watch running...');
    gulp.start(['tpl:debug']);
    gulp.watch(srcRoot + relevant.tpl, ['tpl:debug']);
});

gulp.task('tplinc:debug', function () {
    return gulp.src([srcRoot + relevant.tpl, '!**/_*'], {base: srcRoot + partRoot.tpl})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(fileinclude())
        .pipe(rename({extname: ".html"}))
        .pipe(replace(conf.replace))
        .pipe(gulp.dest(debugRoot + partRoot.html_build))
        .pipe(livereload());
});
gulp.task('tplinc:watch', function () {
    console.log('tplinc:watch running...');
    gulp.watch(srcRoot + relevant.tplinc, ['tplinc:debug']);
});

// live reload
// tpl sass
gulp.task('livereload:watch', function () {
    console.log('livereload:watch running...');
    livereload.listen();
});

// webpack
gulp.task("webpack:debug", function () {
    return gulp.src([srcRoot + relevant.webpack_js, '!**/_*'], {base: srcRoot + partRoot.webpack_js})
        .pipe(plumber({errorHandler: notify.onError('webPackError: <%= error.message %>')}))
        .pipe(named(namedCall))
        .pipe(webpack(getWebpackConfig()))
        .pipe(gulp.dest(debugRoot + partRoot.js));
});
gulp.task("webpack:watch", function () {
    console.log('webpack:watch running...');
    gulp.start(['webpack:debug']);
    return gulp.src([srcRoot + relevant.webpack_js, '!**/_*'], {base: srcRoot + partRoot.webpack_js})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(named(namedCall))
        .pipe(webpack(getWebpackConfig({
            watch: true
        })))
        .pipe(gulp.dest(debugRoot + partRoot.js))
        .pipe(livereload());
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.start(['livereload:watch'],'webpack:watch','concatjs:watch', 'sass:watch', 'js:watch', 'tpl:watch','tplinc:watch');
});

// The debug task (called when you run `gulp debug` from cli)
gulp.task('debug', ['clean:debug'], function () {
    gulp.start(['concatjs:debug','sass:debug', 'js:debug', 'webpack:debug','images:debug','tpl:debug','copyDir:debug']);
});

gulp.task('debug2', ['clean:debug'], function () {
    gulp.start(['concatjs:debug','sass:debug', 'js:debug', 'webpack:debug','images:debug','tpl:debug','copyDir:debug']);
});

gulp.task('build:combine2',function () {
    var through2 = require('through2');
    var path = require('path');

    var revAll = new RevAll({
        dontRenameFile: [/^\/favicon.ico$/g, '.html'],
        dontGlobal: [ /^\/favicon.ico$/ ,'.bat','.txt'],
        dontUpdateReference: ['.html'],
        dontSearchFile:['.js'] // 待解决  字符串被替换
        // annotator : function(contents, path) {
        //     var fragments = [{'conten ts': (function (str) {
        //         var tempStr = '';
        //         return str;
        //     })(contents)}];
        //     return fragments;
        // }
    });
    var assets = useref.assets();

    // tplLv2Rel debugRoot + 'order/checkout.html'
    return gulp.src(tplLv2Rel, {
            base: debugRoot
        })
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref(
            { base: debugRoot }
        ))
        .pipe(gulpif('*.html', htmlmin(conf.htmlmin)))

        .pipe ((function (outFolder) {
            var c = function (file, enc, cb) {
                //  file.base = path.resolve(__dirname,'./debug/');
                // file.path = path.resolve(__dirname,file.path);
                file.base = path.resolve(file.cwd, outFolder);
                file.path = path.resolve(path.resolve(file.base, file.relative));
                cb(null, file)
            };
            return through2.obj(c);
        })(debugRoot))

        // md5
        .pipe(revAll.revision())
        .pipe(gulp.dest(buildRoot))

        //生成映射json文件
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(buildRoot));
});

gulp.task('build2', ['clean:build'], function () {
    gulp.start(['build:combine2','images:build', 'copyDir:build']);
});

gulp.task('build', ['clean:build'], function () {
    gulp.start(['build:combine2','images:build']);
});
