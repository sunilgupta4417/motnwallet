"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const web3_service_1 = tslib_1.__importDefault(require("./web3.service"));
const Constants = tslib_1.__importStar(require("../shared/constants"));
class BackofficeService {
    constructor() {
        this.web3Service = new web3_service_1.default();
    }
    /**
     *
     * @param toAddress
     * @param amount
     */
    async allocate(data) {
        if (data.toAddress != undefined) {
            const accountBalance = await this.web3Service.allocate(data.toAddress, data.amount);
            return accountBalance;
        }
        else {
            throw new HttpException_1.HttpException(500, Constants.errorMsg.depositIssue);
        }
    }
    async approve(data) {
        if (data.amount != undefined) {
            const accountBalance = await this.web3Service.approve(data.amount);
            return accountBalance;
        }
        else {
            throw new HttpException_1.HttpException(500, Constants.errorMsg.depositIssue);
        }
    }
}
exports.default = BackofficeService;
//# sourceMappingURL=backoffice.service.js.map