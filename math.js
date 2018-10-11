module.exports = function math(options) {
  this.add("role:math,cmd:sum", function sum(msg, respond) {
    let user = this.make$("sys/login");
    user
      .list$({}, (err, data) => {
        console.log("err", err);
        console.log("data:", data);
      })
      .native$((err, db) => {
        // var aggregateQuery = [{ $group: {} }, { $match: {} }];
        var collection = db.collection("sys_login");
        collection.aggregate([], function(err, list) {
          respond(null, {
            sum:
              Number(msg.args.query.left || 0) +
              Number(msg.args.query.right || 0),
            msg,
            list
          });
          console.log("Found records:", list);
        });
      });
  });

  this.add("role:math,cmd:product", function product(msg, respond) {
    respond(null, {
      product:
        Number(msg.args.query.left || 0) * Number(msg.args.query.right || 0),
      msg
    });
  });

  this.wrap("role:math", function(msg, respond) {
    msg.left = Number(msg.args.query.left).valueOf();
    msg.right = Number(msg.args.query.right).valueOf();
    this.prior(msg, respond);
  });
};
// 数据持久化
// 一个真实的系统，肯定需要持久化数据，在Seneca中，你可以执行任何您喜欢的操作，使用任何类型的数据库层，但是，为什么不使用模式匹配和微服务的力量，使你的开发更轻松？

// 模式匹配还意味着你可以推迟有关微服务数据的争论，比如服务是否应该"拥有"数据，服务是否应该访问共享数据库等，模式匹配意味着你可以在随后的任何时间重新配置你的系统。

// seneca-entity 提供了一个简单的数据抽象层（ORM），基于以下操作：

// load：根据实体标识加载一个实体；
// save：创建或更新（如果你提供了一个标识的话）一个实体；
// list：列出匹配查询条件的所有实体；
// remove：删除一个标识指定的实体。
// 它们的匹配模式分别是：

// load： role:entity,cmd:load,name:<entity-name>
// save： role:entity,cmd:save,name:<entity-name>
// list： role:entity,cmd:list,name:<entity-name>
// remove： role:entity,cmd:remove,name:<entity-name>
// 任何实现了这些模式的插件都可以被用于提供数据库（比如 MySQL）访问。

// 当数据的持久化与其它的一切都基于相同的机制提供时，微服务的开发将变得更容易，而这种机制，便是模式匹配消息。

// 由于直接使用数据持久性模式可能变得乏味，所以 seneca 实体还提供了一个更熟悉的 ActiveRecord 风格的接口，要创建记录对象，请调用 seneca.make 方法。 记录对象有方法 load$、save$、list$ 以及 remove$（所有方法都带有 $ 后缀，以防止与数据字段冲突），数据字段只是对象属性。

// 通过 npm 安装 seneca-entity， 然后在你的应用中使用 seneca.use() 方法加载至你的 seneca 实例。
// seneca-basic，它是 seneca-entity 依赖的插件。
