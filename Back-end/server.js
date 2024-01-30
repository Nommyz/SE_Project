const express = require("express");
const connection = require("./db.js");
const app = express();
app.use(express.json());

app.use("/activity", require("./routes/api/activity"));
app.use("/student", require("./routes/api/student"));

app.listen(3000, () => console.log("Server is running on port 3000"));
