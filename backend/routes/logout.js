import express from "express";
import * as db from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const cookies = request.cookies;

    if (!cookies?.jsonwebtoken)
      return res.send({
        status: "Success",
        response: "Déconnecté",
      });

    const refreshToken = cookies.jsonwebtoken;

    //Check in db if we find this refresh token

    const refreshTokenFound = await db.getRefreshToken(refreshToken);

    if (refreshTokenFound === 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.send({
        status: "Success",
        response: "Déconnecté",
      });
    }

    const deletedToken = await db.deleteRefreshToken(refreshToken);
    if (deletedToken !== 1)
      return res.send({
        status: "Error",
        response: "Une erreur s'est produite",
      });
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.send({
      status: "Success",
      response: "Déconnecté",
    });
  } catch (err) {
    res.sendStatus(404);
  }
});

export default router;
