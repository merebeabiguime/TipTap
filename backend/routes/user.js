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

router.get("/uid/:uid", async (req, res) => {
  try {
    console.log("user connected an dtrying...");
    const uid = req.params.uid;
    console.log(uid);
    const result = await db.getUserFromUID(uid);
    if (result == 0) {
      console.log("utilisateur introuvable", result);
      res.send({ status: "Error", response: "Utilisateur Introuvable" });
    } else {
      res.send({ status: "Success", response: result });
      console.log(result);
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

router.put("/update", async (req, res) => {
  try {
    console.log("update");
    const userObject = req.body;
    console.log("body", userObject);
    const result = await db.updateUser(userObject);
    if (result === 0)
      return res.send({
        status: "Error",
        response: result,
      });

    res.send({
      status: "Success",
      response: "L'utilisateur a été modifié avec succès",
    });
  } catch (error) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produtie",
      code: 404,
    });
    console.error(error);
  }
});

router.put("/updateEmail", async (req, res) => {
  try {
    const userObject = req.body;
    const result = await db.updateUserEmail(
      userObject[0].email,
      userObject[0].uid
    );
    if (result === 0)
      return res.send({
        status: "Error",
        response: result,
      });

    res.send({
      status: "Success",
      response: "L'email a été modifié avec succès",
    });
  } catch (error) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produtie",
      code: 404,
    });
    console.error(error);
  }
});

export default router;
