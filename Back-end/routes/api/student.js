const express = require("express");
const connection = require("../../db.js");
const router = express.Router();

// Add student into activity
router.post("/", async (req, res) => {
  const { act_name, instructor, std_fname, std_lname, std_id } = req.body;

  //If the activity hasn't been created, you can't add student into activity
  try {
    connection.query(
      "INSERT INTO student(act_name,instructor, std_fname, std_lname, std_id) VALUES(?,?,?,?,?)",
      [act_name, instructor, std_fname, std_lname, std_id],
      (err, results, fields) => {
        if (err) {
          return res.status(400).json({
            message: "Error while inserting a activity into the database",
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
router.get("/all", async (req, res) => {
  const activity_name = req.query.act_name;
  const instructor = req.query.instructor;

  try {
    connection.query(
      "SELECT std_fname,std_lname,std_id FROM student WHERE instructor = ? AND act_name = ?",
      [instructor, activity_name],
      (err, results, fields) => {
        let notfound = results.length === 0;
        if (notfound) {
          return res.status(404).json({
            msg: "Not found student",
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

//Delete student by using student id
router.delete("/", async (req, res) => {
  const student_id = req.query.id;
  const instructor = req.query.instructor;
  const activity_name = req.query.act_name;

  try {
    connection.query(
      "DELETE FROM student WHERE std_id = ? AND instructor = ? AND act_name = ?",
      [student_id, instructor, activity_name],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ msg: "Not found student to deleted" });
        }
        return res.status(200).json({ msg: "Student deleted successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Delete all student
router.delete("/all", async (req, res) => {
  const activity_name = req.query.act_name;
  const instructor = req.query.instructor;

  try {
    connection.query(
      "DELETE FROM student WHERE act_name = ? AND instructor = ?",
      [activity_name, instructor],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ msg: "Not found student to deleted" });
        }
        return res
          .status(200)
          .json({ msg: "All Student deleted successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
