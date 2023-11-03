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

router.get("/:id", async (req, res) => {
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
    } else if (result === 2) {
      res.send({ status: "Error", response: "Staff déjà existant" });
    } else {
      res.send({ status: "Success", response: result });
    }
  } catch (err) {
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

router.post("/addStaff", async (req, res) => {
  // Récupérez les données de la demande POST
  const staffObject = req.body; // Assurez-vous que les données POST sont correctement formatées
  try {
    // Appelez la fonction pour ajouter un utilisateur
    const result = await db.addStaff(staffObject);

    if (result === 1) {
      res.status(201).send("Staff ajouté avec succès.");
    } else {
      res.status(400).send("Impossible d'ajouter le staff.");
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
});

export default router;
