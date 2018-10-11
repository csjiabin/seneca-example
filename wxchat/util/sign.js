const jsSHA = require('jssha');
const raw = args => {
  let keys = Object.keys(args);
  keys = keys.sort()
  let newArgs = {};
  keys.forEach(key => {
    newArgs[key.toLowerCase()] = args[key];
  });

  let str = '';
  for (let k in newArgs) {
    str += '&' + k + '=' + newArgs[k];
  }
  str = str.substr(1);
  return str;
};

/**
* @synopsis 签名算法
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
const sign = (jsapi_ticket, url) => {
  let ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: Math.random().toString(36).substr(2, 15),
    timestamp: parseInt(new Date().getTime() / 1000) ,
    url: url
  };
  ret.signature = new jsSHA(raw(ret), 'TEXT').getHash('SHA-1', 'HEX');
  return ret;
};

module.exports = sign;
