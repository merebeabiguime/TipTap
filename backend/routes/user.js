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
  } catch (err) {
    console.log(err);
  }
});

/***************************************** GET SPECIFIC ***************************************************** */

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
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.getUser(id);
    if (result == 0) {
      res.send({ status: "Error", response: "Utilisateur Introuvable" });
    } else {
      res.send({ status: "Success", response: result });
    }
  } catch (err) {
    res.send({ status: "Error", response: "Une erreur s'est produite" });
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
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const userObject = req.body;
    const result = await db.addUser(userObject);
    if (result == 0) {
      res.send({
        status: "Error",
        response: "Impossible d'ajouter l'utilisateur",
      });
    } else {
      res.send({ status: "Success", response: result });
    }
  } catch (err) {
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

export default router;
