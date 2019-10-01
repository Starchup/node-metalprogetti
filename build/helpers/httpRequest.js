"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require('http');
function GET(url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function (resp) {
            var data = '';
            resp.on('data', function (chunk) {
                data += chunk;
            });
            resp.on('end', function () {
                resolve(JSON.parse(data));
            });
        }).on("error", function (err) {
            reject(err);
        });
    });
}
exports.GET = GET;
function POST(url, port, path, data) {
    return new Promise(function (resolve, reject) {
        var post_req = http.request({
            host: url,
            port: port,
            method: 'POST',
            path: path,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (res) {
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        }).on("error", function (err) {
            reject(err);
        });
        post_req.write(JSON.stringify(data));
        post_req.end();
    });
}
exports.POST = POST;
