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
async function verifyLogin(email, password) {
  const [rows] = await pool.query(
    "SELECT * FROM user WHERE email=? and password=?",
    [email, password]
  );
  return rows.length === 0 ? 0 : rows[0].ID;
}
//bool addUser(userObject)
async function addUser(userObject) {
  const [rows] = await pool.query(
    "INSERT INTO user (firstName,lastName,email,phone,password,role,pictureUrl,ID_restaurant) VALUES(?,?,?,?,?,?,?,?) ",
    [
      userObject[0].firstName,
      userObject[0].lastName,
      userObject[0].email,
      userObject[0].phone,
      userObject[0].password,
      userObject[0].role,
      userObject[0].pictureUrl,
      userObject[0].ID_restaurant,
    ]
  );
  const result = await getUser(userObject[0].ID);
  return result;
}
//modifyUser(userObject)
//userObject getUser(userId) => if null user dont exist
async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

//bool addStaff(staffObject)
async function addStaff(staffObject) {
  const [rows] = await pool.query(
    "INSERT INTO staff (role,stars,ID_user) VALUES(?,?,?) ",
    [staffObject[0].role, staffObject[0].stars, staffObject[0].ID_users]
  );
  const result = await getUser(staffObject[0].ID);
  return result;
}
//bool modifyStaff(staffObject)
//bool deleteStaff(staffId) => Verify if exist then delete else error message
//int verifyUserEmail(userEmail) => return 0 if doesnt exist else return userId
async function verifyUserEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email=?", [email]);
  return rows.length === 0 ? 0 : rows[0].ID;
}
//list of Staff getAllStaff()
async function getAllStaff() {
  const [rows] = await pool.query("SELECT * FROM staff");
  return rows;
}
//bool addRestaurant(restaurant object)
async function addRestaurant(restaurantObject) {
  const [rows] = await pool.query(
    "INSERT INTO restaurant (name,adress,phone) VALUES(?,?,?) ",
    [
      restaurantObject[0].name,
      restaurantObject[0].adress,
      restaurantObject[0].phone,
    ]
  );
  const result = await getUser(restaurantObject[0].ID);
  return result;
}
//bool modifyRestaurant(restaurant object)

const result = await addRestaurant([
  {
    name: "o",
    adress: "o",
    phone: "o",
  },
]);
console.log(result);
