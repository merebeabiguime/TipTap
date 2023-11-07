import express from "express";
import * as db from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const UID = req.body;
    const userFound = await db.getUserFromUID(UID);
    if (userFound === 0)
      return res.send({ status: "Error", response: "Utilisateur Introuvable" });
    //Creat JWT
    accessToken = jsonwebtoken.sign(
      {
        firstName: userFound[0].firstName,
        lastName: userFound[0].lastName,
        pictureUrl: userFound[0].pictureUrl,
        role: userFound[0].role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "900s" }
    );
    refreshToken = jsonwebtoken.sign(
      {
        firstName: userFound[0].firstName,
        lastName: userFound[0].lastName,
        pictureUrl: userFound[0].pictureUrl,
        role: userFound[0].role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //Adding refreshtoken to db
    const refreshResponse = await db.addRefreshToken(
      userFound[0].ID,
      refreshToken
    );

    if (refreshResponse === 0)
      return res.send({
        status: "Error",
        response: "Une erreur s'est produite, veuillez reesayer",
      });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 60 * 60 * 1000 * 24,
    });
    res.json({ accessToken });
    //res.send({ status: "Success", response: userFound });
  } catch (err) {
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

export default router;
