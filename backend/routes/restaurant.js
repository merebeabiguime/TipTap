import express from "express";
import * as db from "../database.js";
const router = express.Router();

/***************************************** GET SPECIFIC ***************************************************** */

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.getRestaurant(id);

    if (result === 0)
      return res.send({
        status: "Error",
        response: "Impossible de charger ce restaurant",
      });

    res.send({ status: "Success", response: result });
  } catch (error) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});
export default router;
