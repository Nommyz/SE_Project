const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      instructor_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      act_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Activity;
};
