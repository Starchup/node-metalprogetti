"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./classes/Server");
/**
 * Main server implementation
 */
var server = new Server_1.Server(443, function (request) {
    // Handle Status method
    if (request.method === 'GET' && request.url === '/') {
        return Promise.resolve('OK');
    }
    throw new Error('Method or URL invalid');
});
