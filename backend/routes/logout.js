import express from "express";
import * as db from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jsonwebtoken)
      return res.send({
        status: "Success",
        response: "Déconnection réussie",
      });

    const refreshToken = cookies.jsonwebtoken;

    //Check in db if we find this refresh token

    const refreshTokenFound = await db.getRefreshToken(refreshToken);

    if (refreshTokenFound === 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 1000 * 24,
      });
      return res.send({
        status: "Success",
        response: "Déconnection réussie",
      });
    }

    const deletedToken = await db.deleteRefreshToken(refreshToken);
    if (deletedToken !== 1)
      return res.send({
        status: "Error",
        response: "Une erreur s'est produite",
        code: 404,
      });
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 1000 * 24,
    });
    return res.send({
      status: "Success",
      response: "Déconnection réussie",
    });
  } catch (err) {
    res.sendStatus(404);
  }
});

export default router;
