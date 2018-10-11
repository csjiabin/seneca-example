const emailjs = require("emailjs");
module.exports = function email(options) {
  this.add("area:email,action:send", (args, done) => {
    var server = emailjs.server.connect({
      user: "1187712426@qq.com",
      password: "dqmwdlcyijtwbagi",
      host: "smtp.qq.com",
      ssl: true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send(
      {
        from: "1187712426@qq.com",
        to: "1261435326@qq.com",
        subject: "邮件服务测试",
        text:"send the message and get a callback with an error or details of the message that was sent"
      },
      (err, msg) => {
        if (err) {
          done(null, { err });
          return;
        }
        done(null, { msg });
      }
    );
  });
  this.wrap("area:email", function(msg, respond) {
    this.prior(msg, respond);
  });
};
