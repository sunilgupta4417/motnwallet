"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAmountDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateAmountDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateAmountDto.prototype, "amount", void 0);
exports.CreateAmountDto = CreateAmountDto;
//# sourceMappingURL=amount.dto.js.map