const express = require("express");
const connection = require("../../db.js");
const router = express.Router();

// Add student into activity
router.post("/add", async (req, res) => {
  const { act_name, instructor, std_fname, std_lname, std_id } = req.body;

  try {
    connection.query(
      "INSERT INTO student(act_name,instructor, std_fname, std_lname, std_id) VALUES(?,?,?,?,?)",
      [act_name, instructor, std_fname, std_lname, std_id],
      (err, results, fields) => {
        if (err) {
          return res.status(400).json({
            message: "Error while inserting a student into the database",
          });
        }
        return res
          .status(201)
          .json({ message: "New student added successfully " });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Get all student from activity
router.get("/get/from/:instructor/:activity_name", async (req, res) => {
  const instructor = req.params.instructor;
  const activity_name = req.params.activity_name;

  try {
    connection.query(
      "SELECT std_fname,std_lname,std_id FROM student WHERE instructor = ? AND act_name = ?",
      [instructor, activity_name],
      (err, results, fields) => {
        let notfound = results.length === 0;
        if (notfound) {
          return res.status(400).json({
            msg: `No student in ${activity_name} activity which is created by ${instructor}`,
          });
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
