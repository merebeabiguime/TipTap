import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Création de la connexion à la base de données
const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

/************************************** QUERIES DES UTILISATEURS **********************************************/

// Vérifier la connexion (email, mot de passe) => retourne 0 s'il n'existe pas, sinon retourne l'ID de l'utilisateur
async function verifyLogin(email, password) {
  const [rows] = await pool.query(
    "SELECT * FROM user WHERE email=? and password=?",
    [email, password]
  );
  return rows.length === 0 ? 0 : rows[0].ID;
}

// Ajouter un utilisateur
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

// Mettre à jour un utilisateur
async function updateUser(userObject) {
  const [rows] = await pool.query(
    "UPDATE user SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ?, role = ?, pictureUrl = ?, ID_restaurant = ? WHERE ID = ?",
    [
      userObject[0].firstName,
      userObject[0].lastName,
      userObject[0].email,
      userObject[0].phone,
      userObject[0].password,
      userObject[0].role,
      userObject[0].pictureUrl,
      userObject[0].ID_restaurant,
      userObject[0].ID,
    ]
  );
}

// Obtenir un utilisateur par ID, retourne 0 s'il n'existe pas
async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Obtenir tous les utilisateurs
async function getAllUser() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows.length === 0 ? 0 : rows;
}

// Vérifier l'existence d'un utilisateur par email, retourne 0 s'il n'existe pas, sinon retourne l'ID de l'utilisateur
async function verifyUserEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email=?", [email]);
  return rows.length === 0 ? 0 : rows[0].ID;
}

// Supprimer un utilisateur
async function deleteUser(id) {
  const user = await getUser(id);

  if (user === 0) {
    return "L'utilisateur n'existe pas.";
  }

  const [rows] = await pool.query("DELETE FROM user WHERE ID = ?", [id]);
  return "Utilisateur supprimé avec succès.";
}

/************************************** QUERIES DU PERSONNEL **********************************************/

// Ajouter un membre du personnel
async function addStaff(staffObject) {
  const [rows] = await pool.query(
    "INSERT INTO staff (role,stars,ID_user) VALUES(?,?,?) ",
    [staffObject[0].role, staffObject[0].stars, staffObject[0].ID_users]
  );
}

// Mettre à jour un membre du personnel
async function updateStaff(staffObject) {
  const [rows] = await pool.query(
    "UPDATE user SET role = ?, stars = ?, ID_user = ? WHERE ID = ?",
    [
      staffObject[0].role,
      staffObject[0].stars,
      staffObject[0].ID_user,
      staffObject[0].ID,
    ]
  );
}

// Obtenir un staff par ID, retourne 0 s'il n'existe pas
async function getStaff(id) {
  const [rows] = await pool.query("SELECT * FROM staff WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Supprimer un membre du personnel
async function deleteStaff(id) {
  const user = await getStaff(id);

  if (staff === 0) {
    return "Aucun staff n'existe pour cet ID.";
  }

  const [rows] = await pool.query("DELETE FROM staff WHERE ID = ?", [id]);
  return "Staff supprimé avec succès.";
}

// Obtenir tous les membres du personnel
async function getAllStaff() {
  const [rows] = await pool.query("SELECT * FROM staff");
  return rows.length === 0 ? 0 : rows;
}

/************************************** QUERIES DES RESTAURANTS **********************************************/

// Ajouter un restaurant
async function addRestaurant(restaurantObject) {
  const [rows] = await pool.query(
    "INSERT INTO restaurant (name,adress,phone) VALUES(?,?,?) ",
    [
      restaurantObject[0].name,
      restaurantObject[0].adress,
      restaurantObject[0].phone,
    ]
  );
}

// Mettre à jour un restaurant
async function updateRestaurant(restaurantObject) {
  const [rows] = await pool.query(
    "UPDATE restaurant SET name = ?, adress = ?, phone = ? WHERE ID = ?",
    [
      restaurantObject[0].name,
      restaurantObject[0].adress,
      restaurantObject[0].phone,
      restaurantObject[0].ID,
    ]
  );
}

// Obtenir tous les restaurants
async function getAllRestaurant() {
  const [rows] = await pool.query("SELECT * FROM restaurant");
  return rows.length === 0 ? 0 : rows;
}

// Obtenir un restaurant par ID, retourne 0 s'il n'existe pas
async function getRestaurant(id) {
  const [rows] = await pool.query("SELECT * FROM restaurant WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Supprimer un restaurant
async function deleteRestaurant(id) {
  const restaurant = await getRestaurant(id);

  if (restaurant === 0) {
    return "Aucun restaurant n'existe pour cet ID.";
  }

  const [rows] = await pool.query("DELETE FROM restaurant WHERE ID = ?", [id]);
  return "Restaurant supprimé avec succès.";
}

/************************************** QUERIES DES COMMENTAIRES **********************************************/

// Ajouter un commentaire
async function addComment(commentObject) {
  const [rows] = await pool.query(
    "INSERT INTO comment (firstName,lastName,ID_restaurant) VALUES(?,?,?) ",
    [
      commentObject[0].firstName,
      commentObject[0].lastName,
      commentObject[0].ID_restaurant,
    ]
  );
}

// Obtenir un commentaire par ID, retourne 0 s'il n'existe pas
async function getComment(id) {
  const [rows] = await pool.query("SELECT * FROM comment WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Supprimer un commentaire
async function deleteComment(id) {
  const comment = await getComment(id);

  if (comment === 0) {
    return "Aucun commentaire n'existe pour cet ID.";
  }

  const [rows] = await pool.query("DELETE FROM comment WHERE ID = ?", [id]);
  return "Commentaire supprimé avec succès.";
}

// Obtenir tous les commentaires
async function getAllComment() {
  const [rows] = await pool.query("SELECT * FROM comment");
  return rows.length === 0 ? 0 : rows;
}
