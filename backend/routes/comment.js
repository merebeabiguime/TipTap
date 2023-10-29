import express from "express";
import * as db from "./database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  const result = await db.getAllComment();
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger les commentaires");
});

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getComment(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger ce commentaire");
});

/***************************************** DELETE  ***************************************************** */

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteComment(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de supprimer ce commentaire");
});

export default router;
