const express = require("express");
const activity = express.Router();
const { Activity } = require("../models");
const db = require("../models");
const { QueryTypes } = require("sequelize");

// Add activity from instructor to database
activity.post("/", async (req, res) => {
  const activity = req.body;

  try {
    await Activity.create(activity);
    return res.status(201).json({
      success: true,
      message: "New activity successfully created!",
      activity: activity,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while inserting a activity into the database",
    });
  }
});

// Get all activity from instructor
activity.get("/", async (req, res) => {
  const instructor = req.query.instructor;

  try {
    const listOfActivity = await Activity.findAll({
      where: { instructor: instructor },
    });
    let found = listOfActivity.some((act) => act.instructor === instructor);
    if (!found) {
      return res.status(404).json({ msg: "Not found activity" });
    }
    return res.status(200).json(listOfActivity);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Get all activity that student participate in
activity.get("/student", async (req, res) => {
  const student_id = req.query.id;

  try {
    const result = await db.sequelize.query(
      "SELECT act_name,description,instructor,date FROM Students NATURAL JOIN Activities WHERE std_id = ?",
      { replacements: [student_id], type: QueryTypes.SELECT }
    );

    let notfound = result.length === 0;
    if (notfound) {
      return res.status(404).json({
        msg: "Not found activity in this student",
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//Delete single activity
activity.delete("/", async (req, res) => {
  const activity_name = req.query.act_name;
  const instructor = req.query.instructor;

  try {
    await Activity.destroy({
      where: { act_name: activity_name, instructor: instructor },
    }).then(function (rowDeleted) {
      if (rowDeleted === 1) {
        return res.status(200).json({ msg: "Activity deleted successfully" });
      } else {
        return res.status(404).json({ msg: "Not found activity to deleted" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = activity;
