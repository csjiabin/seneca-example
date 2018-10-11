// prefix：URL 前缀
// pin： 需要映射的模式集
// map：要用作 URL Endpoint 的 pin 通配符属性列表
module.exports = [
  {
    prefix: "/api",
    postfix: "/?param=true",
    pin: "role:math,cmd:*",
    map: {
      sum: {
        GET: true,
        POST: true,
        alias: "/sum"
      },
      product: {
        GET: true,
        POST: true,
        alias: "/product"
      }
    }
  },
  {
    prefix: "/api",
    postfix: "/?param=true",
    pin: "role:email,cmd:*",
    map: {
      send: {
        GET: true,
        POST: true,
        alias: "/email/send"
      }
    }
  },
  {
    prefix: "/api",
    postfix: "/?param=true",
    pin: "role:token,cmd:*",
    map: {
      send: {
        GET: true,
        POST: true,
        alias: "/token"
      },
      verify: {
        GET: true,
        POST: true,
        alias: "/verify"
      }
    }
  }
];
