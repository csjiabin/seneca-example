require("seneca")()
  .use("basic")
  .use("entity")
  .use("email")
  .use("mongo-store", {
    uri: "mongodb://127.0.0.1:27017/seneca"
  })
  .listen({
    port: 9002,
    pin: "area:email"
  });
