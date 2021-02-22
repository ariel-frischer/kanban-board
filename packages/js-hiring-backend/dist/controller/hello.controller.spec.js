"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe("HelloController", () => {
    it("returns 200 on GET /", (done) => {
        supertest_1.default(app_1.createApp()).get("/").expect(200, done);
    });
});
//# sourceMappingURL=hello.controller.spec.js.map