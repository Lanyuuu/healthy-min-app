const { model } = require("mongoose");
const bodyParser = require("body-parser");

module.exports = (app) => {
  const express = require("express");
  const AdminUser = require("../../models/AdminUser");
  const jwt = require("jsonwebtoken");
  const router = express.Router({
    mergeParams: true,
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // 创建数据
  router.post("/", async (req, res) => {
    console.log(22222);
    console.log(req.body);
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 更新数据
  router.put("/:id", async (req, res) => {
    // 找到数据并更新
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除数据
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });


  // 获取数据
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName == "Category") {
      queryOptions.populate = "parent";
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100);
    res.send(items);
  });

  // 获取数据
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  // 增删改查
  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
  

  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    upload.single("file"),
    async (req, res, next) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    console.log(1111);
    console.log(req.body);
    const { username, password } = req.body;
    const user = await AdminUser.findOne({ username });
    if (!user) {
      return res.status(422).send({
        message: "用户或者密码错误!",
      });
    } else {
      userPassword = await AdminUser.findOne({ username }).select("+password");
      const isValid = require("bcrypt").compareSync(
        password,
        userPassword.password
      );
      if (!isValid) {
        return res.status(422).send({
          message: "用户或者密码错误!",
        });
      }
    }

    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token });
  });
};
