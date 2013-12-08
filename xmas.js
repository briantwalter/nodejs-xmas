//
// xmas.js
//

var http_port = 8080;
var webcam = "http://motion.lan.walternet.us:8081";
var mproxy = require('mjpeg-proxy').MjpegProxy;
var express = require('express');
var app = express();

// set up mjpeg stream and html server
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/html'));
app.get('/live.jpg', new mproxy(webcam).proxyRequest);
app.listen(http_port);
console.log("Listening on port " + http_port);

// become daemon
require('daemon') ();
//console.log("Daemon started with PID: " + process.pid);
