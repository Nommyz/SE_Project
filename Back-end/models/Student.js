const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
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
        primaryKey: true,
      },
      instructor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      std_fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      std_lname: {
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
