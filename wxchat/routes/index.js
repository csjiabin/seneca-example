var express = require('express');
var router = express.Router();
var axios = require('axios')
var sign = require('../util/sign.js');
/* GET home page. */
let wxApi = 'https://api.weixin.qq.com/cgi-bin'
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
let token = {
  access_token: '',
  expires_in: 0
}
let params = {
  appid: 'wx4e65b3b78fd6703a',
  secret: '161e39f0fbad7cf7143f80ff47c64473'
}
router.get('/token', (req, res, next) => {
  axios.get(`${wxApi}/token`, {
    params: {
      grant_type: 'client_credential',
      appid: 'wx4e65b3b78fd6703a',
      secret: '161e39f0fbad7cf7143f80ff47c64473'
    }
  }).then(data => {
    token = data.data
    // console.log(res.data)
  }).then(() => {
    axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket',
      {
        params: {
          access_token: token.access_token,
          type: 'jsapi'
        }
      }
    ).then(data => {
      // sign(data.data.ticket,'http://www.nicewish.top')
      console.log()
      res.status(200).json(token = Object.assign(token,params,sign(data.data.ticket,'http://www.nicewish.top')))
    })
  })

})
module.exports = router;
