const mysql = require("mysql");

//MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mysql_db",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL database = ", err);
    return;
  }
  console.log("MySQL successfully connected");
});

module.exports = connection;
