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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const content_type_1 = require("../types/content.type");
const queries_1 = require("../db/Content/queries");
class ContentService {
    formateResponse(data) {
        if (!data || !data.length || !data[0].parentContentTable) {
            return null;
        }
        const emails = new Set();
        const phoneNumbers = new Set();
        const res = {
            contact: {
                primaryContatctId: data[0].parentContentTable.id,
                emails: [],
                phoneNumbers: [],
                secondaryContactIds: [],
            },
        };
        data.map((d) => {
            if (d.parentContentTable) {
                emails.add(d.parentContentTable.email);
                phoneNumbers.add(d.parentContentTable.phoneNumber);
            }
            if (d.Content) {
                emails.add(d.Content.email);
                phoneNumbers.add(d.Content.phoneNumber);
                res.contact.secondaryContactIds.push(d.Content.id);
            }
        });
        res.contact.emails = [...emails];
        res.contact.phoneNumbers = [...phoneNumbers];
        return res;
    }
    identify(body) {
        return __awaiter(this, void 0, void 0, function* () {
            content_type_1.ContentBodyAttr.parse(body);
            const primaryRecord = yield (0, queries_1.findPrimayLinkPrecendence)(body.email, body.phoneNumber);
            if (!primaryRecord || primaryRecord.length == 0) {
                const response = yield (0, queries_1.createContent)(Object.assign(Object.assign({}, body), { linkPrecedence: 'primary' }));
                return this.formateResponse([{ Content: null, parentContentTable: response[0] }]);
            }
            const newInsertedContent = yield (0, queries_1.createContentIfNew)(primaryRecord[0].id, body.email, body.phoneNumber);
            const secondaryRecords = yield (0, queries_1.findAndUpdateSecondaryLinkPrecedence)(primaryRecord[0].id, body.email, body.phoneNumber);
            const records = yield (0, queries_1.findRecords)(body.email, body.phoneNumber);
            return this.formateResponse(records);
        });
    }
}
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map