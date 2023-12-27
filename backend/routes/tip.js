import express from "express";
import * as db from "../database.js";
const router = express.Router();

router.post("/addTip", async (req, res) => {
  // Récupérez les données de la demande POST
  const tipObject = req.body; // Assurez-vous que les données POST sont correctement formatées
  console.log(tipObject);
  try {
    // Appelez la fonction pour ajouter un utilisateur
    const result = await db.addTip(tipObject);

    if (result === 1) {
      console.log("111");
      const addStarsResult = await db.updateStars(
        tipObject[0].id_staff,
        tipObject[0].rating
      );
      console.log("resultAddStar", addStarsResult);

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
    });
    console.error(err);
  }
});

export default router;
