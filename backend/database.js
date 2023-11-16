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
export async function verifyLogin(email, password) {
  const [rows] = await pool.query(
    "SELECT * FROM user WHERE email=? and password=?",
    [email, password]
  );
  return rows.length === 0 ? 0 : rows[0].ID;
}

// Ajouter un utilisateur
export async function addUser(userObject) {
  const [rows] = await pool.query(
    "INSERT INTO user (firstName, lastName, email, phone, password, role, pictureUrl, ID_restaurant, UID,verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userObject[0].firstName,
      userObject[0].lastName,
      userObject[0].email,
      userObject[0].phone,
      userObject[0].password,
      userObject[0].role,
      userObject[0].pictureUrl,
      userObject[0].ID_restaurant,
      userObject[0].UID,
      userObject[0].verified,
    ]
  );

  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

export async function verifyUser(uid) {
  const [rows] = await pool.query(
    "UPDATE user SET verified = 1 WHERE UID = ?",
    [uid]
  );

  // Vérifiez si la mise à jour a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que la mise à jour a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que la mise à jour a échoué
  }
}

// Mettre à jour un utilisateur
export async function updateUser(userObject) {
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
  // Vérifiez si la mise à jour a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que la mise à jour a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que la mise à jour a échoué
  }
}

// Obtenir un utilisateur par ID, retourne 0 s'il n'existe pas
export async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE ID=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

export async function getUserFromUID(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE UID=?", [id]);
  return rows.length === 0 ? 0 : rows;
}
export async function getUserFromEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email=?", [email]);
  return rows.length === 0 ? 0 : rows;
}

// Obtenir le Role d'un utilisateur(1= worker ; 2 = manager)
export async function getRole(uid) {
  const [rows] = await pool.query("SELECT role FROM user WHERE UID=?", [uid]);
  return rows.length === 0 ? 0 : rows;
}

export async function isEmailOfWorker(email) {
  const result = await staffExists(email);
  if (result === 0) {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE email=? AND role=1",
      [email]
    );
    return rows.length === 0 ? 0 : rows;
  } else {
    return 2;
  }
}

// Obtenir tous les utilisateurs
export async function getAllUser() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows.length === 0 ? 0 : rows;
}

// Vérifier l'existence d'un utilisateur par email, retourne 0 s'il n'existe pas, sinon retourne l'ID de l'utilisateur
export async function verifyUserEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email=?", [email]);
  return rows.length === 0 ? 0 : rows[0].ID;
}

// Supprimer un utilisateur
export async function deleteUser(id) {
  const user = await getUser(id);

  if (user === 0) {
    return "L'utilisateur n'existe pas.";
  }

  const [rows] = await pool.query("DELETE FROM user WHERE ID = ?", [id]);
  return "Utilisateur supprimé avec succès.";
}

/************************************** QUERIES DU PERSONNEL **********************************************/

// Ajouter un membre du personnel
export async function addStaff(staffObject) {
  const [rows] = await pool.query(
    "INSERT INTO staff (role,stars,ID_user) VALUES(?,?,?) ",
    [staffObject[0].role, staffObject[0].stars, staffObject[0].ID_users]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

// Mettre à jour un membre du personnel
export async function updateStaff(staffObject) {
  const [rows] = await pool.query(
    "UPDATE user SET role = ?, stars = ?, ID_user = ? WHERE ID = ?",
    [
      staffObject[0].role,
      staffObject[0].stars,
      staffObject[0].ID_user,
      staffObject[0].ID,
    ]
  );
  // Vérifiez si la mise à jour a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que la mise à jour a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que la mise à jour a échoué
  }
}

// Obtenir un staff par ID, retourne 0 s'il n'existe pas
export async function getStaff(id) {
  const [rows] = await pool.query("SELECT * FROM staff WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

export async function staffExists(email) {
  const [rows] = await pool.query(
    "SELECT * FROM user INNER JOIN staff ON user.ID = staff.ID_user WHERE user.email = ?",
    [email]
  );
  return rows.length === 0 ? 0 : rows;
}

export async function getStaffList() {
  const allStaff = await getAllStaff();
  const staffList = [];
  const roleMap = ["Chef", "Waiter", "Cleaner"];
  if (allStaff != 0) {
    for (let i = 0; i < allStaff.length; i++) {
      const users = await getUser(allStaff[i].ID_user);
      if (users != 0) {
        staffList.push({
          role: roleMap[allStaff[i].role] || "Unknown",
          stars: allStaff[i].stars,
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          pictureUrl: users[0].pictureUrl,
        });
      }
    }
  } else {
    return allStaff;
  }
  return staffList;
}

// Supprimer un membre du personnel
export async function deleteStaff(id) {
  const user = await getStaff(id);

  if (staff === 0) {
    return "Aucun staff n'existe pour cet ID.";
  }

  const [rows] = await pool.query("DELETE FROM staff WHERE ID = ?", [id]);
  return "Staff supprimé avec succès.";
}

// Obtenir tous les membres du personnel
export async function getAllStaff() {
  const [rows] = await pool.query("SELECT * FROM staff");
  return rows.length === 0 ? 0 : rows;
}

/************************************** QUERIES DES RESTAURANTS **********************************************/

// Ajouter un restaurant
export async function addRestaurant(restaurantObject) {
  const [rows] = await pool.query(
    "INSERT INTO restaurant (name,adress,phone) VALUES(?,?,?) ",
    [
      restaurantObject[0].name,
      restaurantObject[0].adress,
      restaurantObject[0].phone,
    ]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

// Mettre à jour un restaurant
export async function updateRestaurant(restaurantObject) {
  const [rows] = await pool.query(
    "UPDATE restaurant SET name = ?, adress = ?, phone = ? WHERE ID = ?",
    [
      restaurantObject[0].name,
      restaurantObject[0].adress,
      restaurantObject[0].phone,
      restaurantObject[0].ID,
    ]
  );

  // Vérifiez si la mise à jour a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que la mise à jour a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que la mise à jour a échoué
  }
}

// Obtenir tous les restaurants
export async function getAllRestaurant() {
  const [rows] = await pool.query("SELECT * FROM restaurant");
  return rows.length === 0 ? 0 : rows;
}

// Obtenir un restaurant par ID, retourne 0 s'il n'existe pas
export async function getRestaurant(id) {
  const [rows] = await pool.query("SELECT * FROM restaurant WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Supprimer un restaurant
export async function deleteRestaurant(id) {
  const restaurant = await getRestaurant(id);

  if (restaurant === 0) {
    return "Aucun restaurant n'existe pour cet ID.";
  }

  const [rows] = await pool.query("DELETE FROM restaurant WHERE ID = ?", [id]);
  return "Restaurant supprimé avec succès.";
}

/************************************** QUERIES DES COMMENTAIRES **********************************************/

// Ajouter un commentaire
export async function addComment(commentObject) {
  const [rows] = await pool.query(
    "INSERT INTO comment (firstName,lastName,ID_restaurant) VALUES(?,?,?) ",
    [
      commentObject[0].firstName,
      commentObject[0].lastName,
      commentObject[0].ID_restaurant,
    ]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

// Obtenir un commentaire par ID, retourne 0 s'il n'existe pas
export async function getComment(id) {
  const [rows] = await pool.query("SELECT * FROM comment WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

//Supprimer un commentaire
export async function deleteComment(id) {
  const comment = await getComment(id);

  if (comment === 0) {
    return "Aucun commentaire n'existe pour cet ID.";
  }

  const [rows] = await pool.query("DELETE FROM comment WHERE ID = ?", [id]);

  // Vérifiez si la suppression a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return "Commentaire supprimé avec succès.";
  } else {
    return "La suppression du commentaire a échoué.";
  }
}

// Obtenir tous les commentaires
export async function getAllComment() {
  const [rows] = await pool.query("SELECT * FROM comment");
  return rows.length === 0 ? 0 : rows;
}

/************************************** QUERIES DES REFRESHTOKEN **********************************************/

// Ajouter un refreshToken
export async function addRefreshToken(ID_user, refreshToken) {
  const [rows] = await pool.query(
    "INSERT INTO refreshtokens (ID_user, refreshToken) VALUES (?, ?)",
    [ID_user, refreshToken]
  );

  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

// Obtenir un refreshToken par ID
export async function getRefreshToken(refreshToken) {
  const [rows] = await pool.query(
    "SELECT * FROM refreshtokens WHERE refreshToken=?",
    [refreshToken]
  );
  return rows.length === 0 ? 0 : rows;
}

//Supprimer un refreshToken
export async function deleteRefreshToken(token) {
  const refreshToken = await getRefreshToken(token);

  if (refreshToken === 0) {
    return 2;
  }

  const [rows] = await pool.query(
    "DELETE FROM refreshTokens WHERE refreshToken = ?",
    [token]
  );

  // Vérifiez si la suppression a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1;
  } else {
    return 0;
  }
}
