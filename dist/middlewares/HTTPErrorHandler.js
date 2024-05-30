"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const zod_1 = require("zod");
let HTTPErrorHandler = class HTTPErrorHandler {
    error(error, request, response, next) {
        if (error instanceof routing_controllers_1.HttpError) {
            response.status(error.httpCode).json({
                name: error.name,
                message: error.message,
            });
        }
        else if (error instanceof zod_1.ZodError) {
            response.status(400).json({
                name: error.errors[0].code,
                message: error.errors[0].message,
            });
        }
        else {
            response.status(500).json({
                name: 'InternalServerError',
                message: 'Something went wrong!',
            });
        }
    }
};
exports.HTTPErrorHandler = HTTPErrorHandler;
exports.HTTPErrorHandler = HTTPErrorHandler = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after' })
], HTTPErrorHandler);
//# sourceMappingURL=HTTPErrorHandler.js.map