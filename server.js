// server.js
const Seneca = require("seneca");
const seneca = Seneca();
seneca
  .use("basic")
  .use("entity")
  .use("user")
  .use("mongo-store", {
    uri: "mongodb://127.0.0.1:27017/seneca"
  })
  .listen();
seneca.ready(() => {
  seneca.act(
    {
      role: "user",
      cmd: "register",
      name: "Tom",
      email: "test@163.com",
      password: "123"
    },
    function(err, out) {
      seneca.act(
        { role: "user", cmd: "login", email: "test@163.com", password: "012" },
        function(err, out) {
          console.log("login success: " + out.ok);

          seneca.act(
            {
              role: "user",
              cmd: "login",
              email: "test@163.com",
              password: "123"
            },
            function(err, out) {
              console.log("login success: " + out.ok);
              console.log("login instance: " + out.login);
            }
          );
        }
      );
    }
  );
});
