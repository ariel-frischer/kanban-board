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
exports.HelloController = void 0;
const express_1 = require("express");
const quotes_1 = __importDefault(require("../model/quotes"));
const utils_1 = require("../utils");
class HelloController {
    getRouter() {
        const router = express_1.Router();
        router.get("/", this.getHello.bind(this));
        router.get("/getQuotes", this.getQuotes.bind(this));
        router.post("/updateQuotes", this.updateQuotes.bind(this));
        return router;
    }
    getHello(request, response) {
        response.send("Hello world").status(200);
        // I'm only adding this because npm run start does not seem to work on my system correctly (BE starts but FE doesn't).
        // Yes, I have already run a fresh `npm run build` on the frontend and backend.
        response.sendFile("../../../js-hiring-frontend/public/index.html");
    }
    getQuotes(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quotes = yield quotes_1.default.find().exec();
                if (quotes.length === 0) {
                    response.status(502).json("Quote list is empty...");
                    next();
                }
                const quoteMap = utils_1.createQuoteMap(quotes);
                response.status(200).json(quoteMap);
            }
            catch (error) {
                console.error(error);
                response.status(400).json(error);
            }
        });
    }
    updateQuotes(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quotes = JSON.parse(request.body.quotes);
                for (let index = 0; index < quotes.length; index++) {
                    const quote = quotes[index];
                    if (!quote._id) {
                        const mongooseQuote = new quotes_1.default(Object.assign({}, quote));
                        yield mongooseQuote.save();
                    }
                    else if (quote._id) {
                        yield quotes_1.default.findByIdAndUpdate(quote._id, Object.assign(Object.assign({}, quote), { author: Object.assign(Object.assign({}, quote.author), { colors: quote.author.colors }) })).exec();
                    }
                }
                const messages = yield quotes_1.default.find();
                console.log('messages.length', messages.length);
                // console.log('request', request)
                response.send("Successfully updated quotes!").status(200);
            }
            catch (error) {
                console.error(error);
                response.status(400).json(error);
            }
        });
    }
}
exports.HelloController = HelloController;
//# sourceMappingURL=hello.controller.js.map