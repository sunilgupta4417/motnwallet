"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const HttpException_1 = require("../exceptions/HttpException");
const Constants = tslib_1.__importStar(require("../shared/constants"));
const moti_json_1 = tslib_1.__importDefault(require("../contracts/moti.json"));
const motion_json_1 = tslib_1.__importDefault(require("../contracts/motion.json"));
class Web3Service {
    /**
     * Query account balance
     * @param {string} account
     * @returns {string}
     * */
    async getBalance(account) {
        try {
            const abi = moti_json_1.default.abi;
            const motion_abi = motion_json_1.default.abi;
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env['WEB3_PROVIDER']));
            console.log('proivder', process.env['WEB3_PROVIDER']);
            const contract = new web3.eth.Contract(motion_abi, process.env['MOTION_CONTRACT_ADDRESS']);
            return await new Promise(async (resolve, reject) => {
                await contract.methods.balanceOf(account).call((err, result) => {
                    if (err !== null) {
                        reject(err);
                    }
                    resolve(web3.utils.fromWei(result, 'ether'));
                });
            });
        }
        catch (e) {
            throw new HttpException_1.HttpException(400, Constants.errorMsg.invalidToken);
        }
    }
    /**
   * Query account balance
   * @param {string} account
   * @returns {string}
   * */
    async getAllocatedAmount(account) {
        try {
            const abi = moti_json_1.default.abi;
            const motion_abi = motion_json_1.default.abi;
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env['WEB3_PROVIDER']));
            console.log('proivder', process.env['WEB3_PROVIDER']);
            const contract = new web3.eth.Contract(abi, process.env['MOTI_CONTRACT_ADDRESS']);
            return await new Promise(async (resolve, reject) => {
                await contract.methods.balance(account).call((err, result) => {
                    if (err !== null) {
                        reject(err);
                    }
                    resolve(web3.utils.fromWei(result, 'ether'));
                });
            });
        }
        catch (e) {
            throw new HttpException_1.HttpException(400, Constants.errorMsg.invalidToken);
        }
    }
    /**
     * Query allocate token
     * @param {string} address
     * @param {number} amount
     * @returns {string}
     * */
    async allocate(toAddress, amount) {
        const abi = moti_json_1.default.abi;
        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env['WEB3_PROVIDER']));
        const contract = new web3.eth.Contract(abi, process.env['MOTI_CONTRACT_ADDRESS']);
        console.log('>>>>', web3.utils.toWei(amount.toString()));
        const tx = {
            from: process.env['WEB3_CONTRACT_OWNER_ACCOUNT'],
            to: process.env['MOTI_CONTRACT_ADDRESS'],
            gas: 0x37825,
            // this encodes the ABI of the method and the arguments
            data: contract.methods.allocate(toAddress, web3.utils.toWei(amount.toString())).encodeABI(),
        };
        return await this.submitTransaction(tx);
    }
    /**
      * Query Approve Motion token
     * @param {number} amount
     * */
    async approve(amount) {
        const abi = motion_json_1.default.abi;
        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env['WEB3_PROVIDER']));
        const contract = new web3.eth.Contract(abi, process.env['MOTION_CONTRACT_ADDRESS']);
        const tx = {
            from: process.env['WEB3_CONTRACT_OWNER_ACCOUNT'],
            to: process.env['MOTION_CONTRACT_ADDRESS'],
            gas: 0x37825,
            // this encodes the ABI of the method and the arguments
            data: contract.methods.approve(process.env['MOTI_CONTRACT_ADDRESS'], web3.utils.toWei(amount.toString())).encodeABI(),
        };
        return await this.submitTransaction(tx);
    }
    /**
     * Helper method
     * Signs given transaction and submits it to the network
     * @param tx
     * @private
     */
    async submitTransaction(tx) {
        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env['WEB3_PROVIDER']));
        let signerKey;
        if (process.env['NODE_ENV'] === 'development') {
            signerKey = process.env['PRIVATEKEY'];
        }
        else if (process.env['NODE_ENV'] === 'production') {
            signerKey = process.env.PRIVATEKEY;
        }
        else {
            return await new Promise(resolve => {
                resolve(null);
            });
        }
        console.log('signerKey', signerKey);
        const signPromise = await web3.eth.accounts.privateKeyToAccount(signerKey).signTransaction(tx);
        // raw transaction string may be available in .raw or
        // .rawTransaction depending on which signTransaction
        // function was called
        const txHash = await web3.eth
            .sendSignedTransaction(signPromise.rawTransaction)
            .then(result => {
            return result.transactionHash;
        })
            .catch(err => {
            return err;
        });
        return await new Promise(resolve => {
            resolve(txHash);
        });
    }
}
exports.default = Web3Service;
//# sourceMappingURL=web3.service.js.map