const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "seosaph"
});
connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  module.exports = {
      connection
  };