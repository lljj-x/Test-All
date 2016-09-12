var util = require('util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var opn = require('opn'); //打开浏览器
var pkg = require('./package.json');
//获取端口
var port = pkg.config.devPort;
var host = pkg.config.devHost;

var configPath = './dev.config';
var config = require(configPath);

//如果使用这种模式启动 服务 webpack.devServer, 只是一个配置目录并不依赖
/*var devServer={
    .....
}
这样引入到下面的函数里面也一样
*/
var server = new WebpackDevServer(
  webpack(config),
  config.devServer
);

server.listen(port, host, function (err) {
  if (err) { console.log(err); }
  var url = util.format('http://%s:%d', host, port);
  // console.log('Listening at %s', url);
  // opn(url+'/_views');
});
