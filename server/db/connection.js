const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "tweetpost.cgh3anapdpei.ap-south-1.rds.amazonaws.com",
    user: "master",
    password: "kushalgowda",
    database: "tweetpost"
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