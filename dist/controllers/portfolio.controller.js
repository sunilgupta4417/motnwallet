"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const portfolio_service_1 = tslib_1.__importDefault(require("../services/portfolio.service"));
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const portfolio_dto_1 = require("../dtos/portfolio.dto");
let PortfolioController = class PortfolioController {
    constructor() {
        this.portfolioService = new portfolio_service_1.default();
    }
    async getPortfolioOverview(data) {
        const userTokenList = await this.portfolioService.getAccountBalance(data);
        return { data: userTokenList, message: 'Portfolio Overview' };
    }
    async getAllocatedTokenOverview(data) {
        const userTokenList = await this.portfolioService.getAllocatedToken(data);
        return { data: userTokenList, message: 'Portfolio Overview' };
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Returns an overview of held tokens and its balances for the authorized user.',
    }),
    (0, routing_controllers_1.UseBefore)((0, validation_middleware_1.validationMiddleware)(portfolio_dto_1.CreatePortfolioDto, 'body')),
    (0, routing_controllers_1.HttpCode)(201),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [portfolio_dto_1.CreatePortfolioDto]),
    tslib_1.__metadata("design:returntype", Promise)
], PortfolioController.prototype, "getPortfolioOverview", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/allocation'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Returns an overview of held Allocated tokens  for the authorized user.',
    }),
    (0, routing_controllers_1.UseBefore)((0, validation_middleware_1.validationMiddleware)(portfolio_dto_1.CreatePortfolioDto, 'body')),
    (0, routing_controllers_1.HttpCode)(201),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [portfolio_dto_1.CreatePortfolioDto]),
    tslib_1.__metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAllocatedTokenOverview", null);
PortfolioController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/portfolio')
], PortfolioController);
exports.PortfolioController = PortfolioController;
//# sourceMappingURL=portfolio.controller.js.map