import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  const result = await db.getAllStaff();
  if (result === 0) {
    res.send({ status: "Error", response: "Impossible de charger le staff" });
  } else {
    res.send({ status: "Success", response: result });
  }
});

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/search/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getStaff(id);

  if (result === 0) {
    res.send({ status: "Error", response: "Impossible de charger ce staff" });
  } else {
    res.send({ status: "Success", response: result });
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await db.isEmailOfWorker(email);
    if (result === 0) {
      res.send({ status: "Error", response: "Email Invalide" });
      return;
    } else if (result === 2) {
      res.send({ status: "Error", response: "Staff déjà existant" });
      return;
    } else {
      res.send({ status: "Success", response: result });
    }
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    const result = await db.getStaffList();
    if (result === 0) {
      return res.send({
        status: "Error",
        response: "Impossible de charger le staff",
      });
    } else {
      return res.send({ status: "Success", response: result });
    }
  } catch (err) {
    return res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});

router.post("/addStaff", async (req, res) => {
  // Récupérez les données de la demande POST
  const staffObject = req.body; // Assurez-vous que les données POST sont correctement formatées
  console.log(staffObject);
  console.log(staffObject[0].ID_user);
  try {
    const updateUserRestaurant = await db.updateUserRestaurant(
      staffObject[0].id_restaurant,
      staffObject[0].ID_user
    );
    console.log("updateResto", updateUserRestaurant);
    if (updateUserRestaurant === 0)
      return res.send({
        status: "Error",
        response: "Impossible d'assigner l'utilisateur au restaurant",
      });
    // Appelez la fonction pour ajouter un utilisateur
    const result = await db.addStaff(staffObject);

    if (result === 1) {
      res.send({ status: "Success", response: result });
    } else {
      res.send({ status: "Error", response: "Impossible d'ajouter le staff'" });
    }
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
    console.error(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  // Récupérez les données de la demande POST
  const id = req.params.id;

  console.log(id);
  try {
    // Appelez la fonction pour ajouter un utilisateur
    const result = await db.deleteStaff(id);

    if (result === 0) {
      return res.send({
        status: "Error",
        response: "Impossible de supprimer le staff'",
      });
    }

    res.send({ status: "Success", response: result });
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});

export default router;
