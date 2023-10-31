import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  const result = await db.getAllStaff();
  result != 0 ? res.send(result) : res.send("Impossible de charger le staff");
});

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getStaff(id);
  result != 0 ? res.send(result) : res.send("Impossible de charger ce staff");
});

export default router;
