"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNftDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateNftDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateNftDto.prototype, "address", void 0);
exports.CreateNftDto = CreateNftDto;
//# sourceMappingURL=nft.dto.js.map