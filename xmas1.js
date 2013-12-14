//
// xmas.js
//

var http_port = 8081;
var webcam = "http://motion.lan.walternet.us:8081";
var mproxy = require('mjpeg-proxy').MjpegProxy;
var rest_client = require('node-rest-client').Client;
var rest_base = "http://relay.lan.walternet.us:8000/GPIO";
var rest_out = rest_base + "/25/function/out";
var rest_val = rest_base + "/25/value";
var express = require('express');

// main app 
var app = express();

// set up mjpeg stream and html server
app.set("view options", {layout: false});
app.use(express.static(__dirname + '/html'));
app.use(express.urlencoded());
app.get('/live.jpg', new mproxy(webcam).proxyRequest);
app.listen(http_port);
console.log("Listening on port " + http_port);

// logic for light switch
app.post('/lights', function(request, response){
 //console.log("DEBUG got POST switch value is: " + request.body.switch);
 // if the button is pressed on the html form do stuff
 if ( request.body.switch == "true" ) {
  // create the new REST client object
  var client = new rest_client();
  // always set mode to GPIO output
  client.post(rest_out, function(request, response) {
   //console.log("DEBUG made REST call on: " + rest_out);
  });
  // use a GET to check current on/off state
  client.get(rest_val, function(request, response) {
   //console.log("DEBUG made REST call on: " + rest_val);
   //console.log("DEBUG got request of: " + request);
   // if lights are on turn them off
   if ( request == "1" ) {
    client.post(rest_val + "/0", function(request, response) {
     //console.log("DEBUG turing lights off with: " + rest_val + "/0");
    });
   }
   // if lights are off turn them on
   if ( request == "0" ) {
    client.post(rest_val + "/1", function(request, response) {
     //console.log("DEBUG turing lights on with: " + rest_val + "/1");
    });
   }
  });
 }
 // redirect back to the main page to see the lights change
 // response.redirect(301,	'/');
 // send json response although the browser will ignore
 response.send( "{ switch: "+ request.body.switch + "}");
});

// become daemon
require('daemon') ();
//console.log("Daemon started with PID: " + process.pid);
