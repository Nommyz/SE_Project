const express = require("express");
const connection = require("../../db.js");
const router = express.Router();

router.get("/activitytable", (req, res) => {
  let sql =
    "CREATE TABLE ACTIVITY (act_name VARCHAR(255), instructor VARCHAR(255),description VARCHAR(255) NOT NULL,DATE date NOT NULL,PRIMARY KEY(act_name,instructor))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("activity table created successfully");
  });
});

router.get("/studenttable", (req, res) => {
  let sql =
    "CREATE TABLE STUDENT (act_name VARCHAR(255),instructor VARCHAR(255),std_fname VARCHAR(255) NOT NULL, std_lname VARCHAR(255) NOT NULL,std_id int NOT NULL,PRIMARY KEY(act_name,instructor),FOREIGN KEY(act_name,instructor) REFERENCES ACTIVITY(act_name,instructor))";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("student table created successfully");
  });
});

module.exports = router;
