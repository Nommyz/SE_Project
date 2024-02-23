const express = require("express");
const skill = express.Router();
const { Skill } = require("../models");
const db = require("../models");
const { QueryTypes } = require("sequelize");

// Add skills into activity
skill.post("/", async (req, res) => {
  const skill = req.body;

  try {
    await Skill.create(skill);
    return res.status(201).json({
      success: true,
      message: "New skill added successfully ",
      activity_skill: skill,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error while inserting a activity into the database",
    });
  }
});

//Get skills for each activity
skill.get("/", async (req, res) => {
  const student_id = req.query.id;

  try {
    const result = await db.sequelize.query(
      "SELECT instructor_id,act_name,skill_type FROM Skills NATURAL JOIN Students WHERE std_id = ?",
      { replacements: [student_id], type: QueryTypes.SELECT }
    );
    let notfound = result.length === 0;
    if (notfound) {
      return res
        .status(404)
        .json({ msg: "Not found skill from this activity" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = skill;
