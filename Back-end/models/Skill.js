const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
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
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
