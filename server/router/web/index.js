const { model } = require("mongoose");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const appid = "wx9aaa60d2f12bb63a";
const secret = "5cc7814b5fe99d8a7d58b88853470407";
const WXBizDataCrypt = require("./WXBizDataCrypt");

// mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',function(){
//   /* Drop the DB */
//   mongoose.connection.db.dropDatabase();
//   console.log("服务器已重置！");
// });

module.exports = (app) => {
  const express = require("express");
  const User = require("../../models/User");
  const Eat = require("../../models/Eat");
  const Current = require("../../models/Current");
  const Do = require("../../models/Do");
  const Sport = require("../../models/Sport");
  const router = express.Router({
    mergeParams: true,
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // 登录
  app.get("/web/api/login", async (req, res) => {
    axios
      .get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${req.query.code}&grant_type=authorization_code`
      )
      .then(async (request) => {
        const { session_key, openid } = request.data;
        const userInfo = await User.create({ session_key, openid });
        await Eat.create({
          openid,
          data: "2022-04-30",
          eat_score: 77,
          exercise: 1.37,
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
          score: {
            calorie_target: 1374,
            fat_target: 64,
            carbohydrate_target: 563,
            protein_target: 378,
            calorie_today: 1283,
            fat_today: 423,
            carbohydrate_today: 677,
            protein_today: 312,
          },
        });
        await Do.create({
          openid,
          exercise: 5000,
          sport: [],
          score: {
            first_target: 5000,
            second_target: 4000,
            third_target: 6000,
            fourth_target: 6000,
            first_step: 0,
            second_step: 0,
            third_step: 0,
            fourth_step: 0,
            first_date: "",
            second_date: "",
            third_date: "",
            fourth_date: "",
          },
        });
        res.send(userInfo);
      })
      .catch((err) => {
        res.state(400).send(err);
      });
  });

  // 获取运动步数
  app.post("/web/api/run", async (req, res) => {
    const { encryptedData, iv, code } = req.body;
    const { openid } = req.query;
    axios
      .get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
      )
      .then(async (request) => {
        const sessionKey = request.data.session_key;
        let pc = new WXBizDataCrypt(appid, sessionKey);

        let stepInfoList = pc
          .decryptData(encryptedData, iv)
          .stepInfoList.slice(-4);
        const model = stepInfoList.map((el) => {
          let date = getdate(el.timestamp);
          return {
            date,
            step: el.step,
          };
        });
        let assss = await Do.findOne({ openid });
        assss.score = {
          first_target: 5000,
          second_target: 4000,
          third_target: 6000,
          fourth_target: 6000,
          first_step: model[0].step,
          second_step: model[1].step,
          third_step: model[2].step,
          fourth_step: model[3].step,
          first_date: model[0].date,
          second_date: model[1].date,
          third_date: model[2].date,
          fourth_date: model[3].date,
        };
        const aaa = await Do.findOneAndUpdate({ openid }, assss);
        res.send(aaa);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // 更新数据
  router.put("/", async (req, res) => {
    const { openid } = req.query;
    // 找到数据并更新
    let model;
    if (req.Model.modelName === "Eat" && !req.body.data && req.body.type !== 1) {
      let data = await req.Model.findOne({ openid });
      switch (req.body.eat_type) {
        case 0:
          data.breakfast.push(req.body);
          break;
        case 1:
          data.lunch.push(req.body);
          break;
        case 2:
          data.dinner.push(req.body);
          break;
        default:
          data.snacks.push(req.body);
          break;
      }
      model = await req.Model.findOneAndUpdate({ openid }, data);
    } else if(req.body.type === 1) {
      let data = await Do.findOne({ openid });
      data.sport.push(req.body);
      model = await Do.findOneAndUpdate({ openid }, data);
    } else {
      model = await req.Model.findOneAndUpdate({ openid }, req.body);
    }
    res.send(model);
  });

  // 获取数据
  router.get("/", async (req, res) => {
    const { openid, q, id } = req.query;
    let model;
    if (req.Model.modelName === "Food") {
      if (q) {
        let list = await req.Model.find({ name: q });
        let type = 0;
        if(list.length === 0) {
          list = await Sport.find({ name: q });
          type = 1;
        }
        model = {
          list,
          total: list.length,
          type,
        };
      } else {
        model = await req.Model.findById(id);
        if(!model) {
          model = await Sport.findById(id);
        }
        await Current.create({
          name: model.name,
          id,
        });
      }
    } else if (req.Model.modelName === "Eat") {
      model = await req.Model.findOne({ openid });
    } else if (
      req.Model.modelName === "Rank" ||
      req.Model.modelName === "Current"
    ) {
      model = await req.Model.find({ openid });
    }
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

function getdate(time) {
  const now = new Date(time * 1000);
  const m = now.getMonth() + 1;
  const d = now.getDate();
  return (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d);
}
