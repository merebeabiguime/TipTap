import express from "express";
import * as db from "../database.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = req.user;

    if (user.role != 2)
      return res.send({ status: "Error", response: "Accès refusé" });

    const id = req.params.id;
    const getUserResponse = await db.getUser(id);
    if (getUserResponse == 0)
      return res.send({ status: "Error", response: "Utilisateur Introuvable" });

    const emailResponse = await db.isEmailOfWorker(getUserResponse[0].email);

    if (emailResponse === 0)
      return res.send({
        status: "Error",
        response: "Veuillez fournir une adresse email valide d'un employé",
      });
    if (emailResponse === 2)
      return res.send({ status: "Error", response: "Staff déjà existant" });

    return res.send({ status: "Success", response: getUserResponse });
  } catch (err) {
    return res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});

export default router;
