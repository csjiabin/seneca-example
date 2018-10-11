const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const SenecaWeb = require("seneca-web");
const Seneca = require("seneca");
const seneca = Seneca();

const Routes = require("./routes");
app.use(bodyParser.json());
// app.use(SenecaWeb)

const config = {
  routes: Routes,
  adapter: require("seneca-web-adapter-express"),
  context: (() => {
    app.listen("4000", () => {
      console.log("server started on: 4000");
    });
    return app;
  })(),
  options: {
    parseBody: false
  }
};
seneca
  .use(SenecaWeb, config)
  .use("jwt", { key: "test" })
  .use("api", this)
  .client({
    port: 9000,
    host: "127.0.0.1",
    pin: "role:math"
  })
  .client({
    port: 9001,
    pin: "role:email"
  })
  .client({
    port: 9002,
    pin: "area:email"
  })
  .client({
    port: 9003,
    pin: "role:token"
  })

  .ready(() => {
    const server = seneca.export("web/context")();
    server.get("/", (req, res) => {
      res.send("<h1>Hello Word！</h1>");
    });
  });
