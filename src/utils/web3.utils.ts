import Web3 from 'web3';
import { HttpException } from '@exceptions/HttpException';
import { errorMsg } from '@/shared/constants';

export class Web3Utils {
  public static instance(): Web3 {
    const provider = process.env['WEB3_PROVIDER'];
    if (provider === undefined) {
      throw new HttpException(500, errorMsg.web3providerUndefined);
    }
    if (process.env['WEB3_PROVIDER'].startsWith('https')) {
      const rpcOptions = {
        timeout: 30000, // ms

        clientConfig: {
          // Useful if requests are large
          maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
          maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

          // Useful to keep a connection alive
          keepalive: true,
          keepaliveInterval: 60000, // ms
        },

        // Enable auto reconnection
        reconnect: {
          auto: true,
          delay: 5000, // ms
          maxAttempts: 5,
          onTimeout: false,
        },
      };
      return new Web3(new Web3.providers.WebsocketProvider(provider, rpcOptions));
    } else {
      const Web3Quorum = require('web3js-quorum');
      const httpOptions = {
        keepAlive: true,
        withCredentials: false,
        timeout: 20000, // ms
        headers: [
          {
            name: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      };

      return new Web3Quorum(new Web3(new Web3.providers.HttpProvider(provider, httpOptions)));
    }
  }
}
