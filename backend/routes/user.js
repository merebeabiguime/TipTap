import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  const result = await db.getAllUser();
  res.send(result);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger les utilisateurs");
});

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getUser(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger cet utilisateur");
});

router.post("/addUser", async (req, res) => {
  // Récupérez les données de la demande POST
  const userObject = req.body; // Assurez-vous que les données POST sont correctement formatées
  try {
    // Appelez la fonction pour ajouter un utilisateur
    const result = await db.addUser(userObject);

    if (result === 1) {
      res.status(201).send("Utilisateur ajouté avec succès.");
    } else {
      res.status(400).send("Impossible d'ajouter l'utilisateur.");
    }
  } catch (err) {
    console.log(err);
    throw new Error(
      "Une erreur s'est produite lors de l'ajout de l'utilisateur."
    );
  }
});

export default router;
