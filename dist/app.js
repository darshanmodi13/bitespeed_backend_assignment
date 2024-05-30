"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const env_1 = require("./config/env");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const HTTPErrorHandler_1 = require("./middlewares/HTTPErrorHandler");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.env = env_1.NODE_ENV;
        this.port = env_1.PORT || 8989;
        this.initializeMiddleWare();
        this.initializeRoutes();
        this.initializeSwagger();
        this.notListedRoutesHandler();
    }
    initializeRoutes() {
        (0, routing_controllers_1.useExpressServer)(this.app, {
            controllers: [__dirname + '/controllers/**/*.controller.ts', __dirname + '/controllers/**/*.controller.js'],
            defaultErrorHandler: false,
            middlewares: [HTTPErrorHandler_1.HTTPErrorHandler],
        });
    }
    initializeMiddleWare() {
        this.app.use((0, morgan_1.default)('tiny'));
        this.app.use((0, cors_1.default)());
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({
            limit: '50mb',
            extended: true,
            parameterLimit: 50000,
        }));
        this.app.use((0, cookie_parser_1.default)());
    }
    notListedRoutesHandler() {
        this.app.all('*', (req, res) => {
            if (!res.headersSent)
                throw new routing_controllers_1.NotFoundError('Route Not Found');
        });
    }
    initializeSwagger() {
        return __awaiter(this, void 0, void 0, function* () {
            const metadataArgsStorage = (0, routing_controllers_1.getMetadataArgsStorage)();
            const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(metadataArgsStorage);
            const swaggerSpec = Object.assign(Object.assign({}, spec), { info: Object.assign(Object.assign({}, spec.info), { title: 'Documentation' }), servers: [
                    {
                        url: `http://localhost:${this.port}/api`,
                    },
                    {
                        url: `https://bitespeed-backend-assignment-kj3f.onrender.com/api`,
                    },
                ] });
            this.app.use('/api/docs', swagger_ui_express_1.default.serve);
            this.app.get('/api/docs', swagger_ui_express_1.default.setup(swaggerSpec));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            var _a;
            console.info(`:: [EXPRESS] Server Stared :: Environment :: ${(_a = this.env) === null || _a === void 0 ? void 0 : _a.toUpperCase()} :: PORT :: ${this.port}`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map