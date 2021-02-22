import { HelloController } from "./controller/hello.controller";
import express from "express";

export function createApp() {
  const helloController = new HelloController();

  const app = express();
//   app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.json());
// app.use(express.urlencoded());

  // Disable cors errors on my local machine.
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use("/", helloController.getRouter());
  return app;
}
