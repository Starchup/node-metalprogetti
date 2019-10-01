"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var Server = /** @class */ (function () {
    function Server(port, delegate) {
        var _this = this;
        http.createServer(function (request, response) {
            var processor;
            if (request.method === 'GET') {
                _this.parseGET(request).then(function (query) {
                    return delegate({
                        url: request.url,
                        method: request.method,
                        query: query
                    });
                }).then(function (res) {
                    response.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    response.write(res);
                    response.end();
                }).catch(function (err) {
                    response.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    response.write(err.message);
                    response.end();
                });
            }
            else if (request.method === 'POST') {
                _this.parsePOST(request).then(function (body) {
                    return delegate({
                        url: request.url,
                        method: request.method,
                        body: body
                    });
                }).then(function (res) {
                    response.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    response.write(res);
                    response.end();
                }).catch(function (err) {
                    response.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    response.write(err.message);
                    response.end();
                });
            }
            else
                return response.end();
        }).listen(port);
    }
    Server.prototype.parseGET = function (request) {
        if (!request.url)
            return Promise.resolve('');
        var hashes = request.url.slice(request.url.indexOf("?") + 1).split("&");
        var data = hashes.reduce(function (params, hash) {
            var _a, _b;
            var split = hash.indexOf("=");
            if (split < 0) {
                return Object.assign(params, (_a = {},
                    _a[hash] = null,
                    _a));
            }
            var key = hash.slice(0, split);
            var val = hash.slice(split + 1);
            return Object.assign(params, (_b = {},
                _b[key] = decodeURIComponent(val),
                _b));
        }, {});
        return Promise.resolve(data);
    };
    Server.prototype.parsePOST = function (request) {
        if (!request.headers['content-type']) {
            return Promise.reject(new Error('Request has no content type header'));
        }
        if (request.headers['content-type'].toLowerCase() !== 'application/json') {
            return Promise.reject(new Error('Request was not JSON'));
        }
        return new Promise(function (resolve, reject) {
            var body = '';
            request.on('data', function (chunk) {
                body += chunk.toString();
            });
            request.on('end', function () {
                resolve(JSON.parse(body));
            });
        });
    };
    return Server;
}());
exports.Server = Server;
