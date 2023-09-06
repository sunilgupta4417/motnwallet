"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Utils = void 0;
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const HttpException_1 = require("../exceptions/HttpException");
const constants_1 = require("../shared/constants");
class Web3Utils {
    static instance() {
        const provider = process.env['WEB3_PROVIDER'];
        if (provider === undefined) {
            throw new HttpException_1.HttpException(500, constants_1.errorMsg.web3providerUndefined);
        }
        if (process.env['WEB3_PROVIDER'].startsWith('https')) {
            const rpcOptions = {
                timeout: 30000,
                clientConfig: {
                    // Useful if requests are large
                    maxReceivedFrameSize: 100000000,
                    maxReceivedMessageSize: 100000000,
                    // Useful to keep a connection alive
                    keepalive: true,
                    keepaliveInterval: 60000, // ms
                },
                // Enable auto reconnection
                reconnect: {
                    auto: true,
                    delay: 5000,
                    maxAttempts: 5,
                    onTimeout: false,
                },
            };
            return new web3_1.default(new web3_1.default.providers.WebsocketProvider(provider, rpcOptions));
        }
        else {
            const Web3Quorum = require('web3js-quorum');
            const httpOptions = {
                keepAlive: true,
                withCredentials: false,
                timeout: 20000,
                headers: [
                    {
                        name: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            };
            return new Web3Quorum(new web3_1.default(new web3_1.default.providers.HttpProvider(provider, httpOptions)));
        }
    }
}
exports.Web3Utils = Web3Utils;
//# sourceMappingURL=web3.utils.js.map