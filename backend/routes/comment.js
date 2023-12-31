import express from "express";
import * as db from "../database.js";
const router = express.Router();

router.post("/addComment", async (req, res) => {
  // Récupérez les données de la demande POST
  const commentObject = req.body; // Assurez-vous que les données POST sont correctement formatées
  try {
    // Appelez la fonction pour ajouter un utilisateur
    const result = await db.addComment(commentObject);

    if (result === 1) {
      const addStarsResult = await db.updateStars(
        commentObject[0].id_staff,
        commentObject[0].rating
      );

      if (addStarsResult !== 1) {
        return res.send({
          status: "Error",
          response: "Impossible de modifier le rating du staff'",
        });
      }
      res.send({ status: "Success", response: addStarsResult });
    } else {
      res.send({
        status: "Error",
        response: "Impossible d'ajouter le pourboire'",
      });
    }
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});

export default router;
