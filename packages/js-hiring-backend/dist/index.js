"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
const app_1 = require("./app");
mongoose_1.connect("mongodb://treeline:treeline@localhost:27017/jshiring", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
dotenv_1.config();
const app = app_1.createApp();
const port = Number(process.env["PORT"]);
app.listen(port, () => console.log(`App listening on :${port}`));
//# sourceMappingURL=index.js.map