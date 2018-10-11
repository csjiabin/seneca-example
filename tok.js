const Uuid = require("node-uuid");
const jwt = require("jsonwebtoken");
const Moment = require('moment')
module.exports = function(options) {
  this.add("role:token,cmd:send", (msg, res) => {
    let tokenSign = jwt.sign(
      {
        data: "foobar"
      },
      "secret",
      { expiresIn: 5 }
    );
    let tokenVerify = jwt.verify(tokenSign, "secret");
    res({
      v1: Uuid.v1(),
      v4: Uuid.v4(),
      tokenSign,
      tokenVerify
    });
  });
  this.add("role:token,cmd:verify", (msg, res, body) => {
    const expiration = Moment().add(1, 'hours').toISOString()
    this.act(
      {
        role: "token",
        cmd: "generate",
        data: {
          role: "token"
        },
        cache: true,
        expired_at: expiration
      },
      (err, data) => {
        this.act(
          {
            role: "token",
            cmd: "check",
            token: data.token,
            cache: true
          },
          function(err, respond) {
            res({ generate: data, check: respond, expiration });
          }
        );
      }
    );
  });
};
