"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const nft_service_1 = tslib_1.__importDefault(require("../services/nft.service"));
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const nft_dto_1 = require("../dtos/nft.dto");
let NftController = class NftController {
    constructor() {
        this.nftService = new nft_service_1.default();
    }
    async getNftOverview(data) {
        const nftData = await this.nftService.getAccountBalance(data);
        return { data: nftData, message: 'NFT Overview' };
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Returns an overview of held NFT and its balances for the authorized user.',
    }),
    (0, routing_controllers_1.UseBefore)((0, validation_middleware_1.validationMiddleware)(nft_dto_1.CreateNftDto, 'body')),
    (0, routing_controllers_1.HttpCode)(201),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [nft_dto_1.CreateNftDto]),
    tslib_1.__metadata("design:returntype", Promise)
], NftController.prototype, "getNftOverview", null);
NftController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/nft')
], NftController);
exports.NftController = NftController;
//# sourceMappingURL=nftController.js.map