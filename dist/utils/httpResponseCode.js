"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["SUCCESSFULLY_CREATED"] = 201] = "SUCCESSFULLY_CREATED";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCodes[StatusCodes["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(StatusCodes || (StatusCodes = {}));
exports.default = StatusCodes;
//# sourceMappingURL=httpResponseCode.js.map