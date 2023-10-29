import express from "express";
import * as db from "./database.js";
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

/***************************************** DELETE  ***************************************************** */

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteUser(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de supprimer cet utilisateur");
});

export default router;
