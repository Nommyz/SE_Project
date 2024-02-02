const express = require("express");
const skill = express.Router();
const { Skill } = require("../models");

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
  const activity_name = req.query.act_name;
  const instructor = req.query.instructor;

  try {
    const listOfSkill = await Skill.findAll({
      where: { instructor: instructor, act_name: activity_name },
      attributes: ["skill_type"],
    });
    let notfound = listOfSkill.length === 0;
    if (notfound) {
      return res
        .status(404)
        .json({ msg: "Not found skill from this activity" });
    }
    return res.status(200).json(listOfSkill);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = skill;
