"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const _config_1 = require("./config");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
/* import cors for outside request */
const cors_1 = tslib_1.__importDefault(require("cors"));
// API keys and Passport configuration
// import * as passportConfig from "./middlewares/passportHandler.middleware";
class App {
    constructor(Controllers) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || 'development';
        this.port = _config_1.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes(Controllers);
        this.initializeSwagger(Controllers);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes(controllers) {
        (0, routing_controllers_1.useExpressServer)(this.app, {
            cors: {
                origin: _config_1.ORIGIN,
                credentials: _config_1.CREDENTIALS,
            },
            controllers: controllers,
            defaultErrorHandler: false,
        });
    }
    initializeSwagger(controllers) {
        const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
            refPointerPrefix: '#/components/schemas/',
        });
        const routingControllersOptions = {
            controllers: controllers,
        };
        const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
        const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, routingControllersOptions, {
            components: {
                schemas,
                securitySchemes: {
                    basicAuth: {
                        scheme: 'bearer',
                        type: 'http',
                        bearerFormat: 'jwt',
                    },
                },
            },
            info: {
                description: 'Generated with `routing-controllers-openapi`',
                title: 'Token Platform API',
                version: '1.0.0',
            },
        });
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map