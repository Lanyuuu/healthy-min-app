const { model } = require("mongoose");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const axios = require("axios");
const appid = "wx9aaa60d2f12bb63a";
const secret = "5cc7814b5fe99d8a7d58b88853470407";

// mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',function(){
//   /* Drop the DB */
//   mongoose.connection.db.dropDatabase();
//   console.log("已清空数据！");
// });

module.exports = (app) => {
  const express = require("express");
  const User = require("../../models/User");
  const router = express.Router({
    mergeParams: true,
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());



  // 登录
  app.get("/web/api/wx/login", async (req, res) => {
    axios
      .get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${req.query.code}&grant_type=authorization_code`
      )
      .then(async (request) => {
        const { session_key, openid } = request.data;
        const userInfo = await User.create({ session_key, openid });
        res.send(userInfo);
      }).catch(err => {
        res.state(400).send(err);
      });
  });

  // 创建数据
  // router.post("/", async (req, res) => {
  //   const { openid } = req.query;
  //   const model = await req.Model.create(req.body);
  //   res.send(model);
  // });

  // 更新数据
  router.put("/", async (req, res) => {
    const { openid } = req.query;
    console.log(req.query);
    console.log(req.body);
    // 找到数据并更新
    console.log(await req.Model.findOne({ openid }));
    const model = await req.Model.findOneAndUpdate({ openid }, req.body);
    console.log(model);
    res.send(model);
  });

  // 删除数据
  router.delete("/", async (req, res) => {
    const { openid } = req.query;
    await req.Model.findOneAndReplace({ openid }, req.body);
    res.send({
      success: true,
    });
  });

  // 获取数据
  router.get("/", async (req, res) => {
    const { openid } = req.query;
    const model = await req.Model.findOne({ openid })
    console.log(model);
    res.send(model);
  });

  // 增删改查
  app.use(
    "/web/api/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
};
