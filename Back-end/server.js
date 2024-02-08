const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const db = require("./models");

app.use("/activity", require("./routes/activity"));
app.use("/student", require("./routes/student"));
app.use("/skill", require("./routes/skill"));
app.use("/cmuOAuthCallback", require("./routes/cmuOAuthCallback"));
app.use("/basicInfo", require("./routes/basicInfo"));
app.use("/login", require("./routes/login"));

db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
});
