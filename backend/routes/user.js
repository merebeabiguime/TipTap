import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  try {
    const result = await db.getAllUser();
    res.send(result);
    result != 0
      ? res.send(result)
      : res.send("Impossible de charger les utilisateurs");
  } catch (err) {}
});

/***************************************** GET SPECIFIC ***************************************************** */

////LOGIN
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.getUserFromUID(id);
    if (result == 0) {
      res.send({ status: "Error", response: "Utilisateur Introuvable" });
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

router.get("/uid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.getUser(id);
    if (result == 0) {
      res.send({ status: "Error", response: "Utilisateur Introuvable" });
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

router.get("/role/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.getRole(id);
    if (result == 0) {
      res.send({
        status: "Error",
        response: "Impossible de charger cet utilisateur",
      });
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

router.post("/verify", async (req, res) => {
  try {
    const userUID = req.body[0].UID;

    const userVerified = await db.verifyUser(userUID);

    if (userVerified === 0)
      return res.send({
        status: "Error",
        response: "Impossible de vérifié cet utilisateur..",
      });

    return res.send({
      status: "Success",
      response: "L'utilisateur a été vérifié avec succès",
    });
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produtie",
      code: 404,
    });
  }
});

export default router;
