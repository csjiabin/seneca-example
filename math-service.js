require("seneca")()
  .use('basic')
  .use('entity')
  .use("math")
  .use("mongo-store", {
    uri: "mongodb://127.0.0.1:27017/seneca"
  })
  .listen({
    port: 9000,
    host:'127.0.0.1',
    pin: "role:math"
  });