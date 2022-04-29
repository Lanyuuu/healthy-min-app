const express = require("express");
const cors = require("cors");

const app = express();

app.set("secret", "b7afb7f6b6fab6f");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
require("./router/admin")(app);

app.listen(7750, () => {
  console.log("http://localhost:7750");
});
