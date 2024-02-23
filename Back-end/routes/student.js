const express = require("express");
const student = express.Router();
const { Student } = require("../models");
const { Activity } = require("../models");

// Add student into activity
student.post("/", async (req, res) => {
  const student = req.body;

  try {
    await Student.create(student);
    return res.status(201).json({
      success: true,
      message: "New student added successfully ",
      student: student,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while inserting a activity into the database",
    });
  }
});

//Get all student from activity
student.get("/all", async (req, res) => {
  const activity_name = req.query.act_name;
  const instructor_id = req.query.instructor_id;

  try {
    const listOfStudent = await Student.findAll({
      where: { instructor_id: instructor_id, act_name: activity_name },
      attributes: ["std_fname", "std_lname", "std_id"],
    });
    let notfound = listOfStudent.length === 0;
    if (notfound) {
      return res.status(404).json({
        msg: "Not found student",
      });
    }
    return res.status(200).json(listOfStudent);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Delete student by using student id
student.delete("/", async (req, res) => {
  const student_id = req.query.id;
  const instructor_id = req.query.instructor_id;
  const activity_name = req.query.act_name;

  try {
    await Student.destroy({
      where: {
        act_name: activity_name,
        instructor_id: instructor_id,
        std_id: student_id,
      },
    }).then(function (rowDeleted) {
      if (rowDeleted === 1) {
        return res.status(200).json({ msg: "Student deleted successfully" });
      } else {
        return res.status(404).json({ msg: "Not found student to deleted" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Delete all student
student.delete("/all", async (req, res) => {
  const instructor_id = req.query.instructor_id;

  try {
    await Student.destroy({
      where: {
        instructor_id: instructor_id,
      },
    }).then(function (rowDeleted) {
      if (rowDeleted >= 1) {
        return res
          .status(200)
          .json({ msg: "All Student deleted successfully" });
      } else {
        return res.status(404).json({ msg: "Not found student to deleted" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = student;
