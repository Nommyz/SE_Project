const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

app.use("/activity", require("./routes/activity"));
app.use("/student", require("./routes/student"));
app.use("/skill", require("./routes/skill"));
app.use("/cmuOAuth", require("./routes/cmuOAuth"));
app.use("/basicInfo", require("./routes/basicInfo"));

db.sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
});
