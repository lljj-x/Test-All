var path = require('path');
var glob = require('glob');
var util = require('util');
var autoprefixer = require('autoprefixer');

// 移动端
// var pxtorem = require('postcss-px2rem');
// var mPstcssConfig = [autoprefixer({ browsers:["android 4", "iOS 6"]}), pxtorem({ remUnit: 75 })];

// pc config
var pcPostcssConfig = [autoprefixer({ browsers:  ['last 3 versions','> 5%','ie >= 8','Firefox >= 10','last 3 Safari versions']})];

var webpack= require('webpack');
var pkg=require("./package.json");

var ExtractTextPlugin = require('extract-text-webpack-plugin'); //提取文本
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成 html 模板
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //丑化
//引入路径
var node_modules = path.resolve(__dirname, 'node_modules');

// webpack/hot/only-dev-server 如果你喜欢手动更新
var webpackHot='webpack/hot/dev-server';
var webpackClient='webpack-dev-server/client?http://'+pkg.config.devHost+':'+pkg.config.devPort;

/**
 * 获得路径
 * @param globPath: str
 * @param pathDir: str 对比路径
 * @returns {{}}
 */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        templates = {},
        entry, dirname, basename, pathname, extname,outFileName;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];

        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname,  basename));
        pathDir = path.normalize(pathDir);
        outFileName = path.normalize(dirname);
        if(pathname.startsWith(pathDir)){
            pathname = pathname.substring(pathDir.length)
        }

        if(outFileName.startsWith(pathDir)){
            outFileName = outFileName.substring(pathDir.length)
        }else{
            outFileName = pathname;
        }

        // path window和liunx斜线相反 ...
        pathname = pathname.replace(/\\/g,'/');
        outFileName = outFileName.replace(/\\/g,'/');

        entries['webpack/' + outFileName] = ['./' + entry];
        templates[pathname] = {
            skin:pkg.skin,
            chunks: [
                'webpack/' + outFileName,
                'common/common-lib',
                'common/common-wp',
                // 'common-css'
            ],
            filename: '' + outFileName + '.html',
            template: './src/pages/' + pathname + '.ejs',
            inject: 'body',
            chunksSortMode: 'dependency',
            hash: false,
            /*
             * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
             * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
             * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
             * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
             */

            // minify: { //压缩HTML文件
            //     removeComments: true, //移除HTML中的注释
            //     collapseWhitespace: false //删除空白符与换行符
            // }
        }
    }
    return {
        entries:entries,
        templates:templates
    };
}

module.exports=function (options) {
    options = options || {};
    var DEBUG = options.debug !==undefined ? options.debug :true;

    //生成路径字符串
    var _path = pkg.config.buildDir;

    var allEntries = getEntry('src/pages/**/*.js', 'src/pages/');
    var htmlWebpackPluginConfig = (function (templates) {
        var config = [];
        for(var key in templates){
            if(templates.hasOwnProperty(key)){
                config.push(new HtmlWebpackPlugin(templates[key]));
            }
        }
        return config;
    })(allEntries.templates);

    // 获取js
    var entries = allEntries.entries;
    //用entries 获取 html 多模块入口文件
    var pages = Object.keys(entries);

    //#如果需要 ie8~9 下调试注释这里 ie8~9 不支持热调试
    // if(DEBUG){
    //     pages.forEach(function (e) {
    //         entries[e].unshift(webpackClient,webpackHot)
    //     });
    // }
    //#end

    var config = {
        entry: Object.assign(entries, {
            // 用到什么公共lib css（例如jquery.js），就把它加进common去，目的是将公用库单独提取打包
            'common/common-lib': [
                'jquery',
                'avalon2',
                path.resolve(__dirname, 'src/sass/common.scss')
            ],
            // 'common-css':[
            //     // 全局样式
            //     path.resolve(__dirname, 'src/sass/common.scss')
            // ]
        }),
        output: {
            path: path.join(__dirname, _path),
            publicPath: '/',
            // filename: '[name].[hash].js',
            // filename: '[name].js',
            filename: '[name].js?[chunkhash]',  // chunkhash是根据具体模块文件的内容计算所得的hash值，所以某个文件的改动只会影响它本身的hash指纹，不会影响其他文件

        },
        module: {
            loaders: [
                {
                    test: /\.(mjs|js)$/,
                    // excluding some local linked packages.
                    // for normal use cases only node_modules is needed.
                    exclude: /node_modules|dev\/avalon|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                    loader: 'babel',
                    query: {
                        presets: ['es2015'],
                        plugins: [
                            'transform-runtime',
                            // 'transform-es2015-typeof-symbol'
                        ],
                    }
                },

                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
                },
                {
                    test: /\.html$/,
                    loader: "html?-minimize" //避免压缩html,https://github.com/webpack/html-loader/issues/50
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=_fonts/[name].[ext]' //这里前缀路径 publicPath 参数为基础
                }
            ]
        },
        postcss:function () {
            return pcPostcssConfig;
        },
        resolve: {
            extensions: ['', '.js', '.json'],
            alias: {
                'jquery': path.resolve(__dirname, 'src/lib/jquery-1.9.1.min.js'),
                'avalon':path.resolve(__dirname,'app/lib/avalon.js'),

                'scss': path.resolve(__dirname, 'src/sass'),
                "components": path.resolve(__dirname, 'src/components'),
                "images": path.resolve(__dirname, 'src/images')

                // 'avalon2':path.resolve(node_modules,'avalon2/dist/avalon.js')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery', //加载$全局
                jQuery: 'jquery' //加载$全局
            }),

        ].concat(htmlWebpackPluginConfig),
        //使用webpack-dev-server，提高开发效率
        //启用热服务有两种 如果是 api 启动方式, 这里只是一个配置目录,不会被webpack读取,
        //只有命令行才会读取这个参数
        devServer: {
            contentBase: path.resolve( pkg.config.buildDir),
            host:pkg.config.devHost,
            port: pkg.config.devPort,
            hot: true,
            noInfo: false,
            inline: true,
            stats: { colors: true }
        }
    };

    !DEBUG && (config.plugins = config.plugins.concat([
        new ExtractTextPlugin('css/[name].css?[contenthash]', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common/common-wp',     // 将公共模块提取，生成名为`common`的chunk
            chunks: pages,      //提取哪些模块共有的部分
            minChunks: pages.length
        }),
        new UglifyJsPlugin({ //压缩代码
            sourceMap: false,
            drop_console: true,
            compress: {
                warnings: false
            },
            except: [ '$', 'exports', 'require'] //排除关键字
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]));

    config.module.loaders = config.module.loaders.concat(DEBUG ? [
        {
            test: /\.css$/,
            loader: 'style!css!postcss'
        },
        {
            test:/\.scss$/,
            loader: 'style!css!postcss!sass'
        }
    ] : [{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
    },
    {
        test:/\.scss$/,
        loader: ExtractTextPlugin.extract('style','css!postcss!sass')
        // loader: 'style!css!sass'
    }]);

    return config
};


