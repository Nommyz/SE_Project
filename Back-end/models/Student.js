const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
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
        onUpdate: "CASCADE",
      },
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      std_fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      std_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );

  return Student;
};
