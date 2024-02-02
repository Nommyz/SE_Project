const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      act_name: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Activities",
          key: "act_name",
        },
        onDelete: "CASCADE",
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
