"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const web3_1 = tslib_1.__importDefault(require("web3"));
const HttpException_1 = require("../exceptions/HttpException");
const Constants = tslib_1.__importStar(require("../shared/constants"));
const bronze_json_1 = tslib_1.__importDefault(require("../contracts/bronze.json"));
const platinum_json_1 = tslib_1.__importDefault(require("../contracts/platinum.json"));
const gold_json_1 = tslib_1.__importDefault(require("../contracts/gold.json"));
const silver_json_1 = tslib_1.__importDefault(require("../contracts/silver.json"));
class NftWeb3Service {
    /**
     * Query account balance
     * @param {string} account
     * @returns {string}
     * */
    async getBalance(account) {
        try {
            const bronzeAbi = bronze_json_1.default.abi;
            const platinumAbi = platinum_json_1.default.abi;
            const goldAbi = gold_json_1.default.abi;
            const silverAbi = silver_json_1.default.abi;
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env['WEB3_PROVIDER_MAINNET']));
            console.log('proivder', process.env['WEB3_PROVIDER']);
            const bronze_contract = new web3.eth.Contract(bronzeAbi, process.env['BRONZE_CONTRACT_ADDRESS']);
            const platinum_contract = new web3.eth.Contract(platinumAbi, process.env['PLATINUM_CONTRACT_ADDRESS']);
            const gold_contract = new web3.eth.Contract(goldAbi, process.env['GOLD_CONTRACT_ADDRESS']);
            const silver_contract = new web3.eth.Contract(silverAbi, process.env['SILVER_CONTRACT_ADDRESS']);
            const bronzeData = await this.IsNft(bronze_contract, account);
            const platinumData = await this.IsNft(platinum_contract, account);
            const goldData = await this.IsNft(gold_contract, account);
            const silverData = await this.IsNft(silver_contract, account);
            const result = {
                bronze: bronzeData,
                platinum: platinumData,
                gold: goldData,
                silver: silverData
            };
            return result;
        }
        catch (e) {
            throw new HttpException_1.HttpException(400, Constants.errorMsg.invalidToken);
        }
    }
    /**
     * Query allocate token
     * @param {any} contract
     * @param {string} account
     * @returns {string}
     * */
    async IsNft(contract, account) {
        return await contract.methods.balanceOf(account).call((err, result) => {
            if (err !== null) {
                return err;
            }
            return result;
        });
    }
}
exports.default = NftWeb3Service;
//# sourceMappingURL=nft.web3.service.js.map