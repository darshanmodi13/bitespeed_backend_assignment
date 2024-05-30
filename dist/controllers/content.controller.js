"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const content_service_1 = require("../services/content.service");
var Routes;
(function (Routes) {
    Routes["ROOT"] = "/v1";
    Routes["IDENTIFY"] = "/identify";
})(Routes || (Routes = {}));
let ContentController = class ContentController {
    constructor() {
        this._contentService = new content_service_1.ContentService();
    }
    identify(req, res, body) {
        return this._contentService.identify(body);
    }
};
__decorate([
    (0, routing_controllers_1.Post)(Routes.IDENTIFY),
    (0, routing_controllers_openapi_1.OpenAPI)({
        description: 'Identify Route',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                            },
                            phoneNumber: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
    }),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "identify", null);
ContentController = __decorate([
    (0, routing_controllers_1.JsonController)(Routes.ROOT),
    __metadata("design:paramtypes", [])
], ContentController);
exports.default = ContentController;
//# sourceMappingURL=content.controller.js.map