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

    const emailResponse = await db.isEmailOfWorker(
      getUserResponse.data[0].email
    );

    if (emailResponse === 0)
      return res.send({
        status: "Error",
        response: "Une erreur s'est produite",
      });
    if (emailResponse === 2)
      return res.send({ status: "Error", response: "Staff déjà existant" });

    res.send({ status: "Success", response: "Success" });
  } catch (err) {
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

export default router;
