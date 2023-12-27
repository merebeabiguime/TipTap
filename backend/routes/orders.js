import express from "express";
import * as db from "../database.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const orderDetails = req.body;
    const response = db.addOrder(orderDetails);

    if (response === 0)
      return res.send({
        status: "Error",
        response: "Impossible de d'ajouter la commande",
      });

    res.send({ status: "Success", response: response });
  } catch (err) {
    res.send({ status: "Erroraa", response: err });
    console.log("error", err);
  }
});

export default router;
