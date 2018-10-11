module.exports = function web(options) {
  this.add('role:api,path:email', (msg, res) => {
    this.act('area:email,action:send', res)
  })
  this.add("init:api", (msg, res) => {
    this.act("role:web", {
      use: {
        prefix: "/api",
        pin: "area:email,path:*",
        map: {
          send: {
            GET: true,
            POST: true
          }
        }
      }
    }, res);
  });
};