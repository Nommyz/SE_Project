const express = require("express");
const connection = require("../../db.js");
const router = express.Router();

// Add activity from instructor to database
router.post("/", async (req, res) => {
  const { act_name, instructor, description, date } = req.body;

  try {
    connection.query(
      "INSERT INTO activity(act_name,instructor,description,date) VALUES(?,?,?,?)",
      [act_name, instructor, description, date],
      (err, results, fields) => {
        if (err) {
          return res.status(400).json({
            message: "Error while inserting a activity into the database",
          });
        }
        return res
          .status(201)
          .json({ message: "New activity successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// Get all activity from instructor
router.get("/instructor", async (req, res) => {
  const instructor = req.query.name;

  try {
    connection.query(
      "SELECT * FROM activity WHERE instructor = ?",
      [instructor],
      (err, results, fields) => {
        let found = results.some((act) => act.instructor === instructor);
        if (!found) {
          return res.status(404).json({ msg: "Not found activity" });
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Get all activity that student participate in
router.get("/student", async (req, res) => {
  const student_id = req.query.id;

  try {
    connection.query(
      "SELECT act_name,description,instructor,date FROM student NATURAL JOIN activity WHERE std_id = ?",
      [student_id],
      (err, results, fields) => {
        let notfound = results.length === 0;
        if (notfound) {
          return res.status(404).json({
            msg: "Not found activity in this student",
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

//Delete single activity
router.delete("/", async (req, res) => {
  const activity_name = req.query.act_name;
  const instructor = req.query.instructor;

  //If activity was deleted it will automatically delete students in activity too
  try {
    connection.query(
      "DELETE FROM activity WHERE act_name = ? AND instructor = ?",
      [activity_name, instructor],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ msg: "Not found activity to deleted" });
        }
        return res.status(200).json({ msg: "Activity deleted successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
