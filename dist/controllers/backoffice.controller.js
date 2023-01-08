"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackofficeController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const backoffice_service_1 = tslib_1.__importDefault(require("../services/backoffice.service"));
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const allocate_dto_1 = require("../dtos/allocate.dto");
const amount_dto_1 = require("../dtos/amount.dto");
let BackofficeController = class BackofficeController {
    constructor() {
        this.BackofficeService = new backoffice_service_1.default();
    }
    async allocateToken(data) {
        const allocatedData = await this.BackofficeService.allocate(data);
        return { data: allocatedData, message: ' Motion Token allocated Successfully' };
    }
    async mintToken(res, data) {
        const tokenDetails = await this.BackofficeService.approve(data);
        return { tokenDetails, message: 'Motion Token Approved for distribution though Saita contract' };
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/allocate'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Returns successfully Motion Token for end user account.',
    }),
    (0, routing_controllers_1.UseBefore)((0, validation_middleware_1.validationMiddleware)(allocate_dto_1.CreateAllocateDto, 'body')),
    (0, routing_controllers_1.HttpCode)(201),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [allocate_dto_1.CreateAllocateDto]),
    tslib_1.__metadata("design:returntype", Promise)
], BackofficeController.prototype, "allocateToken", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/approve'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Returns true for approval.',
    }),
    (0, routing_controllers_1.UseBefore)((0, validation_middleware_1.validationMiddleware)(amount_dto_1.CreateAmountDto, 'body')),
    (0, routing_controllers_1.HttpCode)(201),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, amount_dto_1.CreateAmountDto]),
    tslib_1.__metadata("design:returntype", Promise)
], BackofficeController.prototype, "mintToken", null);
BackofficeController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/backoffice')
], BackofficeController);
exports.BackofficeController = BackofficeController;
//# sourceMappingURL=backoffice.controller.js.map