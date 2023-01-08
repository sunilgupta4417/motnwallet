"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = require("../exceptions/HttpException");
const getAllNestedErrors = (error) => {
    if (error.constraints) {
        return Object.values(error.constraints);
    }
    return error.children.map(getAllNestedErrors).join(',');
};
const validationMiddleware = (type, value = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
    return (req, res, next) => {
        const obj = (0, class_transformer_1.plainToInstance)(type, req[value]);
        (0, class_validator_1.validate)(obj, { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors) => {
            if (errors.length > 0) {
                const message = errors.map(getAllNestedErrors).join(', ');
                next(new HttpException_1.HttpException(400, message));
            }
            else {
                next();
            }
        });
    };
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map