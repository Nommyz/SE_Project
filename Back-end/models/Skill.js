const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      instructor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      act_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Activities",
          key: "act_name",
        },
        onDelete: "CASCADE",
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
