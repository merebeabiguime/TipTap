import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Création de la connexion à la base de données
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
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
    "UPDATE user SET firstName = ?, lastName = ?, email = ?, phone = ?,pictureUrl = ? WHERE ID = ?",
    [
      userObject[0].firstName,
      userObject[0].lastName,
      userObject[0].email,
      userObject[0].phoneNumber,
      userObject[0].pictureUrl,
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

// Mettre à jour un utilisateur
export async function updateUserRestaurant(restaurantId, userId) {
  const [rows] = await pool.query(
    "UPDATE user SET ID_restaurant = ? WHERE ID = ?",
    [restaurantId, userId]
  );
  // Vérifiez si la mise à jour a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que la mise à jour a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que la mise à jour a échoué
  }
}

// Obtenir un utilisateur par ID, retourne 0 s'il n'existe pas
export async function getUser(uid) {
  const [rows] = await pool.query("SELECT * FROM user WHERE uid=?", [uid]);
  return rows.length === 0 ? 0 : rows;
}

export async function getUserFromId(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id=?", [id]);

  return rows.length === 0 ? 0 : rows;
}

export async function getUserFromUID(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE UID=?", [id]);
  var accountBalance = 0;
  if (rows.length === 0) {
    return 0;
  } else {
    const [balance] = await pool.query(
      "SELECT amount FROM tip t JOIN staff s ON s.id = t.id_staff WHERE s.id_user = ?",
      [rows[0].ID]
    );
    var userWithBalance = { ...rows[0] };
    if (balance.length === 0) {
      accountBalance = 0;
    } else {
      for (let i = 0; i < balance.length; i++) {
        accountBalance = accountBalance + balance[i].amount;
      }
    }

    userWithBalance.balance = accountBalance;
    return [userWithBalance]; // Retourner un tableau avec le nouvel objet
  }
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
  const user = await getUserFromId(id);

  if (user === 0) {
    return "L'utilisateur n'existe pas.";
  }

  const [rows] = await pool.query("DELETE FROM user WHERE ID = ?", [id]);
  return "Utilisateur supprimé avec succès.";
}

/************************************** QUERIES DU PERSONNEL **********************************************/

// Mettre à jour les étoiles d'un membre du personnel et recalculer la moyenne
export async function updateStars(staffId, newStars) {
  var currentStaff = [];
  var tipRows = [];
  var CommentRows = [];
  var totalStars = 0;
  var currentRating = 0;
  var newRating = 0;

  switch (staffId) {
    case 0: {
      // Obtenir les informations actuelles du personnel
      [currentStaff] = await pool.query("SELECT * FROM staff WHERE role = 2");
      break;
    }
    case 1: {
      // Obtenir les informations actuelles du personnel
      [currentStaff] = await pool.query("SELECT * FROM staff WHERE role = 3");
      break;
    }
    default: {
      // Obtenir les informations actuelles du personnel
      [currentStaff] = await pool.query("SELECT * FROM staff WHERE ID = ?", [
        staffId,
      ]);
      break;
    }
  }

  [tipRows] = await pool.query(
    "SELECT COUNT(*) AS total FROM tip WHERE id_staff = ?",
    [staffId]
  );

  [CommentRows] = await pool.query(
    "SELECT COUNT(*) AS total FROM comment WHERE id_staff=?",
    [staffId]
  );
  totalStars = totalStars + tipRows[0].total + CommentRows[0].total;
  currentRating = currentStaff[0].stars; // Ancien nombre d'étoiles
  newRating =
    newStars !== 0
      ? (currentRating * totalStars + newStars) / (totalStars + 1)
      : currentRating;
  var rows = [];
  console.log("newRating", newRating);

  // On met à jour uniquement si le rating à bien changer
  if (newRating !== currentRating) {
    switch (staffId) {
      case -1: {
        [rows] = await pool.query("UPDATE staff SET stars = ? WHERE role = 2", [
          newRating,
        ]);
        break;
      }
      case 0: {
        [rows] = await pool.query("UPDATE staff SET stars = ? WHERE role = 3", [
          newRating,
        ]);
        break;
      }
      default: {
        [rows] = await pool.query("UPDATE staff SET stars = ? WHERE ID = ?", [
          newRating,
          staffId,
        ]);
        break;
      }
    }
  }

  // Vérifiez si la mise à jour a réussi (aucune exception n'a été levée)
  return 1;
}

// Ajouter un membre du personnel
export async function addStaff(staffObject) {
  const [rows] = await pool.query(
    "INSERT INTO staff (role,stars,ID_user) VALUES(?,?,?) ",
    [staffObject[0].role, 0, staffObject[0].ID_user]
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

// Obtenir tous les membres du personnel
export async function getAllStaff() {
  const [rows] = await pool.query("SELECT * FROM staff");
  return rows.length === 0 ? 0 : rows;
}

function roundStars(stars) {
  const decimalPart = stars - Math.floor(stars);

  if (decimalPart >= 0.6) {
    return Math.ceil(stars);
  } else if (decimalPart >= 0.5) {
    return Math.floor(stars) + 0.5;
  } else if (decimalPart >= 0.4) {
    return Math.floor(stars) + 0.5;
  } else {
    return Math.floor(stars);
  }
}

export async function getStaffList() {
  const allStaff = await getAllStaff();
  const staffList = [];
  const roleMap = ["Inconnu", "Serveur", "Nettoyeur", "Cuisinier"];
  if (allStaff != 0) {
    for (let i = 0; i < allStaff.length; i++) {
      const users = await getUserFromId(allStaff[i].ID_user);
      const roundedStars = roundStars(allStaff[i].stars);

      if (users != 0) {
        staffList.push({
          role: roleMap[allStaff[i].role] || "Unknown",
          stars: roundedStars,
          ID: allStaff[i].ID,
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
  const staffExists = await getStaff(id);

  if (staffExists === 0) {
    return 0;
  }

  const [rows] = await pool.query("DELETE FROM staff WHERE ID = ?", [id]);
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
    const lastInsertedId = rows.insertId;
    return lastInsertedId; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

export async function addBlankRestaurant() {
  const [rows] = await pool.query(
    "INSERT INTO restaurant (name,adress,phone) VALUES(?,?,?) ",
    ["", "", ""]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return rows; // Retournez 1 pour indiquer que l'insertion a réussi
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
    "INSERT INTO comment (comment,id_transaction,date,id_restaurant,id_staff) VALUES(?,?,?,?,?) ",
    [
      commentObject[0].tipComment,
      commentObject[0].id_transaction,
      commentObject[0].date,
      commentObject[0].id_restaurant,
      commentObject[0].id_staff,
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

/************************************** QUERIES DES TIPS **********************************************/

// Ajouter un commentaire
export async function addTip(tipObject) {
  const amount = parseFloat(tipObject[0].amount);
  const restaurantId = parseInt(tipObject[0].restaurantId);
  const [rows] = await pool.query(
    "INSERT INTO tip (amount,id_restaurant,id_staff,id_transaction,date) VALUES(?,?,?,?,?) ",
    [
      amount,
      restaurantId,
      tipObject[0].id_staff,
      tipObject[0].id_transaction,
      tipObject[0].date,
    ]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  if (rows.affectedRows === 1) {
    return 1; // Retournez 1 pour indiquer que l'insertion a réussi
  } else {
    return 0; // Retournez 0 pour indiquer que l'insertion a échoué
  }
}

/************************************** SEND EMAIL **********************************************/
export async function getEmailFromId(idStaff) {
  const [rows] = await pool.query(
    "SELECT * FROM user u JOIN staff s ON u.id = s.id_user WHERE s.id = ?",
    [idStaff]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  return rows.length === 0 ? 0 : rows;
}
export async function getManagerEmail(idRestaurant) {
  const [rows] = await pool.query(
    "SELECT * FROM user WHERE role=2 AND id_restaurant = ?",
    [idRestaurant]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  return rows.length === 0 ? 0 : rows;
}

/************************************** ADD ORDER **********************************************/
export async function addOrder(orderDetails) {
  const [rows] = await pool.query(
    "INSERT INTO orders WHERE (order_id,firstName,lastName,phone,street,appartment,postalCode,qrcodeNbr,price,country,email,qrcodeUrl,id_restaurant) VALUSE (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      orderDetails[0].orderId,
      orderDetails[0].firstName,
      orderDetails[0].lastName,
      orderDetails[0].phone,
      orderDetails[0].street,
      orderDetails[0].appartment,
      orderDetails[0].postalCode,
      orderDetails[0].qrcodeNbr,
      orderDetails[0].price,
      orderDetails[0].country,
      orderDetails[0].email,
      orderDetails[0].qrcodeUrl,
      orderDetails[0].id_restaurant,
    ]
  );
  // Vérifiez si l'insertion a réussi (aucune exception n'a été levée)
  return rows.length === 0 ? 0 : rows;
}
