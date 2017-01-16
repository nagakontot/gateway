"use strict"

var express         = require('express'); 
var favicon         = require('serve-favicon');
var path            = require("path");
var compression     = require('compression');
var helmet          = require('helmet');
var forceSSL        = require('express-force-ssl');
var fs              = require('fs');
var http            = require('http');  
var https           = require('https');

var apiProxy        = require('http-proxy').createProxyServer({target: 'ws://172.18.0.4:3000',ws: true});

var app             = express();

var tgt             = [ 'http://172.18.0.2:3001',  //login
                        'http://172.18.0.4:3000',  //rchat
                        //'http://172.18.0.2:10000'  //ide
                        //'http://localhost:3002',  //s1
                        //'http://localhost:3003',  //s2
                        //'http://localhost:3004',  //s3
                        //'http://localhost:3005'   //lobby
                      ];

    http.globalAgent.maxSockets     = Infinity;  
    https.globalAgent.maxSockets    = Infinity; 

    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(compression());
    app.use(helmet());
    app.use(forceSSL);
    app.use(express.static(__dirname + '/public'));
    
    app.set('forceSSLOptions', {enable301Redirects:true,trustXFPHeader:false,httpsPort:443,sslRequiredMessage:'SSL Required.'});

    app.all("/",                function(req, res) {apiProxy.web(req, res, {target: tgt[0]});});
    //app.all("/s1",            function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});
    //app.all("/s2",            function(req, res) {apiProxy.web(req, res, {target: tgt[2]});});
    //app.all("/s3",            function(req, res) {apiProxy.web(req, res, {target: tgt[3]});});
    //app.all("/lobby",         function(req, res) {apiProxy.web(req, res, {target: tgt[4]});});
    
    //login stuff
    //app.all("/login*",        function(req, res) {apiProxy.web(req, res, {target: tgt[0]});});    
    //app.all("/user*",           function(req, res) {apiProxy.web(req, res, {target: tgt[0]});});    

    
    //rocketchat stuff
    //app.all("/rchat*",          function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
/*    
    app.all("/login*",          function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/home*",           function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/account*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/changeavatar*",   function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/admin*",          function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/channel*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/history*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/livechat*",       function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/pakages*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/_oauth*",         function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/terms-of-service*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/privacy-policy*", function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/room*",           function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/fxos*",           function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/register*",       function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/sockjs*",         function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
*/    
    //cloud9 stuff
    //app.all("/ide*",            function(req, res) {apiProxy.web(req, res, {target: tgt[2]});});    

    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    

    //app.all("/rchat*",              function(req, res) {apiProxy.web(req, res, {hostnameOnly: true,target: tgt[1]});});    //<--error!!
    //app.all("/rchat*",                function(req, res) {apiProxy.web(req, res, {target: tgt[1],router: {'/rchat': '172.18.0.4:3000'}});});  
    
    //app.all("*",                function(req, res) {apiProxy.web(req, res, {target: tgt[1],router: {'/rchat': '172.18.0.4:3000'}});});  

    //app.all("*",                function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});  
    
    app.all('*',                function(req, res) {res.redirect("/");});
    

//|///////////////////////////////////////|
//|     create servers                    |
//|///////////////////////////////////////|
var ssl_options =   {   key:    fs.readFileSync(path.join(__dirname + '/key/key.pem')),
                        cert:   fs.readFileSync(path.join(__dirname + '/key/cert.pem')),
                        ca:     fs.readFileSync(path.join(__dirname + '/key/ca-crt.pem'))
                    };

var wsproxyServer = http.createServer(app);
wsproxyServer.on('upgrade', function (req, socket, head) 
{   apiProxy.ws(req, socket, head);
});
wsproxyServer.listen(3000);

var wssproxyServer = https.createServer(ssl_options,app);
wssproxyServer.on('upgrade', function (req, socket, head) 
{   apiProxy.ws(req, socket, head);
});
wssproxyServer.listen(3443);


//http.createServer(app).listen(3000);
//https.createServer(ssl_options,app).listen(3443);
