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
  try {
    const [rows] = await pool.query(
      "INSERT INTO user (firstName, lastName, email, phone, password, role, pictureUrl, ID_restaurant, UID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ]
    );

    // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
    if (rows.affectedRows === 1) {
      return 1; // Retournez 1 pour indiquer que l'insertion a réussi
    } else {
      return 0; // Retournez 0 pour indiquer que l'insertion a échoué
    }
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que l'insertion a échoué
    return 0;
  }
}

// Mettre à jour un utilisateur
export async function updateUser(userObject) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que la mise à jour a échoué
    return 0;
  }
}

// Obtenir un utilisateur par ID, retourne 0 s'il n'existe pas
export async function getUser(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Obtenir le Role d'un utilisateur(1= worker ; 2 = manager)
export async function getRole(uid) {
  const [rows] = await pool.query("SELECT role FROM user WHERE UID=?", [uid]);
  return rows.length === 0 ? 0 : rows;
}

export async function isEmailOfWorker(email) {
  const [rows] = await pool.query(
    "SELECT * FROM user WHERE email=? AND role=1",
    [email]
  );
  return rows.length === 0 ? 0 : rows;
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
  try {
    const user = await getUser(id);

    if (user === 0) {
      return "L'utilisateur n'existe pas.";
    }

    const [rows] = await pool.query("DELETE FROM user WHERE ID = ?", [id]);
    return "Utilisateur supprimé avec succès.";
    // Vérifiez si la suppression a réussi (aucune exception n'a été levée)
    if (rows.affectedRows === 1) {
      return "Commentaire supprimé avec succès.";
    } else {
      return "La suppression du commentaire a échoué.";
    }
  } catch (error) {
    // En cas d'erreur, retournez un message d'erreur
    return "Erreur lors de la suppression du commentaire : " + error.message;
  }
}

/************************************** QUERIES DU PERSONNEL **********************************************/

// Ajouter un membre du personnel
export async function addStaff(staffObject) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que l'insertion a échoué
    return 0;
  }
}

// Mettre à jour un membre du personnel
export async function updateStaff(staffObject) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que la mise à jour a échoué
    return 0;
  }
}

// Obtenir un staff par ID, retourne 0 s'il n'existe pas
export async function getStaff(id) {
  const [rows] = await pool.query("SELECT * FROM staff WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

// Supprimer un membre du personnel
export async function deleteStaff(id) {
  try {
    const user = await getStaff(id);

    if (staff === 0) {
      return "Aucun staff n'existe pour cet ID.";
    }

    const [rows] = await pool.query("DELETE FROM staff WHERE ID = ?", [id]);
    return "Staff supprimé avec succès.";
    // Vérifiez si la suppression a réussi (aucune exception n'a été levée)
    if (rows.affectedRows === 1) {
      return "Commentaire supprimé avec succès.";
    } else {
      return "La suppression du commentaire a échoué.";
    }
  } catch (error) {
    // En cas d'erreur, retournez un message d'erreur
    return "Erreur lors de la suppression du commentaire : " + error.message;
  }
}

// Obtenir tous les membres du personnel
export async function getAllStaff() {
  const [rows] = await pool.query("SELECT * FROM staff");
  return rows.length === 0 ? 0 : rows;
}

/************************************** QUERIES DES RESTAURANTS **********************************************/

// Ajouter un restaurant
export async function addRestaurant(restaurantObject) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que l'insertion a échoué
    return 0;
  }
}

// Mettre à jour un restaurant
export async function updateRestaurant(restaurantObject) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que la mise à jour a échoué
    return 0;
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
  try {
    const restaurant = await getRestaurant(id);

    if (restaurant === 0) {
      return "Aucun restaurant n'existe pour cet ID.";
    }

    const [rows] = await pool.query("DELETE FROM restaurant WHERE ID = ?", [
      id,
    ]);
    return "Restaurant supprimé avec succès.";
    // Vérifiez si la suppression a réussi (aucune exception n'a été levée)
    if (rows.affectedRows === 1) {
      return "Commentaire supprimé avec succès.";
    } else {
      return "La suppression du commentaire a échoué.";
    }
  } catch (error) {
    // En cas d'erreur, retournez un message d'erreur
    return "Erreur lors de la suppression du commentaire : " + error.message;
  }
}

/************************************** QUERIES DES COMMENTAIRES **********************************************/

// Ajouter un commentaire
export async function addComment(commentObject) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez 0 pour indiquer que l'insertion a échoué
    return 0;
  }
}

// Obtenir un commentaire par ID, retourne 0 s'il n'existe pas
export async function getComment(id) {
  const [rows] = await pool.query("SELECT * FROM comment WHERE id=?", [id]);
  return rows.length === 0 ? 0 : rows;
}

//Supprimer un commentaire
export async function deleteComment(id) {
  try {
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
  } catch (error) {
    // En cas d'erreur, retournez un message d'erreur
    return "Erreur lors de la suppression du commentaire : " + error.message;
  }
}

// Obtenir tous les commentaires
export async function getAllComment() {
  const [rows] = await pool.query("SELECT * FROM comment");
  return rows.length === 0 ? 0 : rows;
}
