"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const hello_controller_1 = require("./controller/hello.controller");
const express_1 = __importDefault(require("express"));
function createApp() {
    const helloController = new hello_controller_1.HelloController();
    const app = express_1.default();
    //   app.use(bodyParser.urlencoded({
    //   extended: true
    // }));
    app.use(express_1.default.json());
    // app.use(express.urlencoded());
    // Disable cors errors on my local machine.
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use("/", helloController.getRouter());
    return app;
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map