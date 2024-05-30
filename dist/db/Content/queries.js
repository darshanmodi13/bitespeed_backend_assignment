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
exports.findRecords = exports.findAndUpdateSecondaryLinkPrecedence = exports.findPrimayLinkPrecendence = exports.createContentIfNew = exports.createContent = void 0;
const index_1 = require("../index");
const schema_1 = require("./schema");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
function createContent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.db
            .insert(schema_1.contentTable)
            .values(data)
            .returning();
    });
}
exports.createContent = createContent;
function createContentIfNew(id, email, phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let emailQuery = null;
        if (email) {
            emailQuery = yield index_1.db.select().from(schema_1.contentTable).where((0, drizzle_orm_1.eq)(schema_1.contentTable.email, email));
        }
        let phoneQuery = null;
        if (phoneNumber) {
            phoneQuery = yield index_1.db.select().from(schema_1.contentTable).where((0, drizzle_orm_1.eq)(schema_1.contentTable.phoneNumber, phoneNumber));
        }
        if ((email && (!emailQuery || emailQuery.length == 0)) || (phoneNumber && (!phoneQuery || phoneQuery.length == 0))) {
            return createContent({ email, phoneNumber, linkedId: id, linkPrecedence: 'secondary' });
        }
        return null;
    });
}
exports.createContentIfNew = createContentIfNew;
function findPrimayLinkPrecendence(email, phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const conditions = [];
        if (email) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.contentTable.email, email));
        }
        if (phoneNumber) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.contentTable.phoneNumber, phoneNumber));
        }
        return index_1.db
            .select()
            .from(schema_1.contentTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.or)(...conditions), (0, drizzle_orm_1.isNull)(schema_1.contentTable.deletedAt)))
            .orderBy((0, drizzle_orm_1.asc)(schema_1.contentTable.createdAt))
            .limit(1);
    });
}
exports.findPrimayLinkPrecendence = findPrimayLinkPrecendence;
function findAndUpdateSecondaryLinkPrecedence(id, email, phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const conditions = [];
        if (email) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.contentTable.email, email));
        }
        if (phoneNumber) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.contentTable.phoneNumber, phoneNumber));
        }
        return index_1.db
            .update(schema_1.contentTable)
            .set({ linkedId: id, linkPrecedence: 'secondary' })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.or)(...conditions), (0, drizzle_orm_1.eq)(schema_1.contentTable.linkPrecedence, 'primary'), (0, drizzle_orm_1.isNull)(schema_1.contentTable.deletedAt), (0, drizzle_orm_1.ne)(schema_1.contentTable.id, id)))
            .returning();
    });
}
exports.findAndUpdateSecondaryLinkPrecedence = findAndUpdateSecondaryLinkPrecedence;
function findRecords(email, phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const conditions = [];
        const parentContentTable = (0, pg_core_1.alias)(schema_1.contentTable, 'parentContentTable');
        if (email) {
            conditions.push((0, drizzle_orm_1.eq)(parentContentTable.email, email));
            conditions.push((0, drizzle_orm_1.eq)(schema_1.contentTable.email, email));
        }
        if (phoneNumber) {
            conditions.push((0, drizzle_orm_1.eq)(parentContentTable.phoneNumber, phoneNumber));
            conditions.push((0, drizzle_orm_1.eq)(schema_1.contentTable.phoneNumber, phoneNumber));
        }
        return index_1.db
            .select()
            .from(parentContentTable)
            .fullJoin(schema_1.contentTable, (0, drizzle_orm_1.eq)(parentContentTable.id, schema_1.contentTable.linkedId))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.or)(...conditions), (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(parentContentTable.linkPrecedence, 'primary'), (0, drizzle_orm_1.isNull)(parentContentTable.linkedId))));
    });
}
exports.findRecords = findRecords;
//# sourceMappingURL=queries.js.map