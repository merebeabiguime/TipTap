import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET ALL ***************************************************** */

router.get("/", async (req, res) => {
  const result = await db.getAllRestaurant();
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger les restaurants");
});

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getRestaurant(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger ce restaurant");
});
