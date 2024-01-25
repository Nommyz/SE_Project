const express = require("express");
const connection = require("../../db.js");
const router = express.Router();

// Add activity from organizer to database
router.post("/add", async (req, res) => {
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
router.get("/get/from/:instructor", async (req, res) => {
  const instructor = req.params.instructor;

  try {
    connection.query(
      "SELECT * FROM activity WHERE instructor = ?",
      [instructor],
      (err, results, fields) => {
        let found = results.some(
          (act) => act.instructor === req.params.instructor.toString()
        );
        if (!found) {
          return res
            .status(404)
            .json({ msg: `No activity data from ${req.params.instructor}` });
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
router.get("/get/in/:student_id", async (req, res) => {
  const student_id = req.params.student_id;

  try {
    connection.query(
      "SELECT act_name,description,instructor,date FROM student NATURAL JOIN activity WHERE std_id = ?",
      [student_id],
      (err, results, fields) => {
        let notfound = results.length === 0;
        if (notfound) {
          return res.status(404).json({
            msg: `No activity in this student`,
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

router.delete("/:activity_name", async (req, res) => {
  const activity_name = req.params.activity_name;

  try {
    connection.query(
      "DELETE FROM activity WHERE act_name = ?",
      [activity_name],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ msg: "No activity with that organizer" });
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
