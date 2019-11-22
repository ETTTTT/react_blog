'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mysql = {
  enabled: true,  // 是否开启
  package:'egg-mysql'  // 连接的包
}
exports.cors = {
  enable: true,  // 是否开启
  package:'egg-cors'  // 连接的包
}