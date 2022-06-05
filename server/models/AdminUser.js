const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  avatar: { type: String },
  password: {
    // 字符串类型
    type: String,
    // 禁止查询数据
    select: false,
    set(val) {
      // 使用 bcrypt 散列加密,可以说除了你自己,谁都不知道你设的什么密码
      return require("bcrypt").hashSync(val, 10);
    },
  },
});
module.exports = mongoose.model("AdminUser", schema);
