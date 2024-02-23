const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      instructor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Activities",
          key: "instructor_id",
        },
        primaryKey: true,
        onDelete: "CASCADE",
      },
      act_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skill_type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );

  return Skill;
};
