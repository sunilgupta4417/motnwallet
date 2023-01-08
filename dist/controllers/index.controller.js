"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
let IndexController = class IndexController {
    index() {
        return 'OK';
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], IndexController.prototype, "index", null);
IndexController = tslib_1.__decorate([
    (0, routing_controllers_1.Controller)()
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=index.controller.js.map