require("seneca")()
  // .use("jwt", { key: "superPassword" })
  .use("tok")
  .use('cache')
  .use('token')
  .listen({
    port: 9003,
    pin: "role:token"
  });