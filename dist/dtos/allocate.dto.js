"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAllocateDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateAllocateDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAllocateDto.prototype, "toAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateAllocateDto.prototype, "amount", void 0);
exports.CreateAllocateDto = CreateAllocateDto;
//# sourceMappingURL=allocate.dto.js.map