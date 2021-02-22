"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.QuoteSchema = new mongoose_1.default.Schema({
    title: String,
    cow: String,
    description: String,
    status: String,
    author: {},
});
const QuoteDoc = mongoose_1.default.model("Quote", exports.QuoteSchema);
exports.default = QuoteDoc;
//# sourceMappingURL=quotes.js.map