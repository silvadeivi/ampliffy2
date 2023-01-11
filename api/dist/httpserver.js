"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
});
server.listen(port, hostname, function () {
    console.log("El servidor se est\u00E1 ejecutando en http://".concat(hostname, ":").concat(port, "/"));
});
