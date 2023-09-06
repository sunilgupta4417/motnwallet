"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const nft_web3_service_1 = tslib_1.__importDefault(require("./nft.web3.service"));
const Constants = tslib_1.__importStar(require("../shared/constants"));
class NftService {
    constructor() {
        this.web3Service = new nft_web3_service_1.default();
    }
    async getAccountBalance(account) {
        try {
            const accountBalance = await this.web3Service.getBalance(account.address);
            if (accountBalance != undefined || accountBalance != null) {
                return accountBalance;
            }
            else {
                throw new HttpException_1.HttpException(500, `unable to fetch balance.`);
            }
        }
        catch (e) {
            throw new HttpException_1.HttpException(400, Constants.errorMsg.somethingWentWrong);
        }
    }
}
exports.default = NftService;
//# sourceMappingURL=nft.service.js.map