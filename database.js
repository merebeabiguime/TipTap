import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

//Creating the connection to the database

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//First query
//int verifyLogin(email,password) => return 0 if doesnt exist else return userId
//bool addUser(userObject)
//modifyUser(userObject)
//userObject getUser(userId) => if null user dont exist
//bool addStaff(staffObject)
//bool modifyStaff(staffObject)
//bool deleteStaff(staffId) => Verify if exist then delete else error message
//int verifyUserEmail(userEmail) => return 0 if doesnt exist else return userId
//list of Staff getAllStaff()
//bool addRestaurant(restaurant object)
//bool modifyRestaurant(restaurant object)

const result = await pool.query("SELECT * FROM user");
console.log(result);
