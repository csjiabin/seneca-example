module.exports = function api(options) {
    
    let validOps = {
      sum: 'sum',
      product: 'product'
    }
  
    this.add('role:api,cmd:test', function(msg, respond) {
      let operation = msg.args.params.operation
      let left = msg.args.query.left
      let right = msg.args.query.right
      this.act('role:math', {
        cmd: validOps[operation],
        left: left,
        right: right,
      }, respond)
    });
  
    // this.add('init:api', function(msg, respond) {
      this.act('role:web', {
        routes: {
          prefix: '/api',
          pin: 'role:api,cmd:*',
          map: {
            test: {
              GET: true,
              suffix: '/{operation}'
            }
          }
        }
      })
    // })
  
  }