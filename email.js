const nodemailer = require("nodemailer");
const emailjs = require("emailjs");
module.exports = function email(options) {
  console.log(this)
  this.add("role:email,cmd:send", (args, done) => {
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
        to: "1261435326@qq.com,2756586632@qq.com",
        subject: "邮件微服务测试",
        text:
          "send the message and get a callback with an error or details of the message that was sent"
      },
      (err, msg) => {
        if (err) {
          done(null, { err });
          return;
        }
        done(null, { msg });
      }
    );
    //   var transporter = nodemailer.createTransport({
    //     service: "qq",
    //     auth: {
    //       user: "1187712426@qq.com",
    //       //授权码,通过QQ获取
    //       pass: "dqmwdlcyijtwbagi"
    //     }
    //   });
    //   var mailOptions = {
    //     from: "1187712426@qq.com",
    //     to: "1262435326@qq.com",
    //     subject: "nodemailer2.5.0邮件发送", //text: 'Hello world', // 文本 // 发送者 // 接受者,可以同时发送多个,以逗号隔开 // 标题
    //     html: `<h2>nodemailer基本使用:</h2><h3>
    //   <a href="http://blog.csdn.net/zzwwjjdj1/article/details/51878392">
    //   http://blog.csdn.net/zzwwjjdj1/article/details/51878392</a></h3>`
    // };

    //   transporter.sendMail(mailOptions, function(err, info) {
    //     if (err) {
    //       done(null, err);
    //       return;
    //     }
    //     done(null, { msg: "发送成功" });
    //   });
  });
  this.wrap("role:email", function(msg, respond) {
    // console.log(msg)
    this.prior(msg, respond);
  });
};
