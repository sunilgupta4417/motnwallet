"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const index_controller_1 = require("./controllers/index.controller");
const validateEnv_1 = tslib_1.__importDefault(require("./utils/validateEnv"));
const portfolio_controller_1 = require("./controllers/portfolio.controller");
const backoffice_controller_1 = require("./controllers/backoffice.controller");
(0, validateEnv_1.default)();
const app = new app_1.default([
    index_controller_1.IndexController,
    portfolio_controller_1.PortfolioController,
    backoffice_controller_1.BackofficeController,
]);
app.listen();
//# sourceMappingURL=server.js.map