
/**
 * Created by LiuJun on 2016/6/5.
 */

var express = require('express');
var app = express();

app.get('/', function (req,res) {
    res.send('Hello Worldxxx!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening af http://%s:%s',host,port);
});
