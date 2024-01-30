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
  const sql = [
    "CREATE TABLE IF NOT EXISTS ACTIVITY (act_name VARCHAR(255), instructor VARCHAR(255),description VARCHAR(255) NOT NULL,DATE date NOT NULL,PRIMARY KEY(act_name,instructor))",
    "CREATE TABLE IF NOT EXISTS STUDENT (act_name VARCHAR(255),instructor VARCHAR(255),std_fname VARCHAR(255) NOT NULL, std_lname VARCHAR(255) NOT NULL,std_id int NOT NULL,PRIMARY KEY(std_id),FOREIGN KEY(act_name,instructor) REFERENCES ACTIVITY(act_name,instructor) ON DELETE CASCADE)",
  ];
  for (let i = 0; i < 2; i++) {
    connection.query(sql[i], function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
  console.log("MySQL successfully connected");
});

module.exports = connection;
