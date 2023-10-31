import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  const result = await db.getAllStaff();
  result != 0 ? res.send(result) : res.send("Impossible de charger le staff");
});

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getStaff(id);
  result != 0 ? res.send(result) : res.send("Impossible de charger ce staff");
});

router.get("/email/:email", async (req, res) => {
  const email = req.params.email;
  const result = await db.isEmailOfWorker(email);
  result != 0 ? res.send(result) : res.send("Email invalide");
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
    throw new Error("Une erreur s'est produite lors de l'ajout du staff.");
  }
});

export default router;
