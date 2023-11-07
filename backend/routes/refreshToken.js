import express from "express";
import * as db from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(cookies);

    if (!cookies?.jsonwebtoken)
      return res.send({
        status: "Error",
        response: "Une erreur s'est produite",
      });

    const refreshToken = cookies.jsonwebtoken;

    //Check in db if we find this refresh token

    const refreshTokenFound = await db.getRefreshToken(refreshToken);

    if (refreshTokenFound === 0)
      return res.send({
        status: "Error",
        response: "Accès interdit",
      });

    const userFound = await db.getUser(refreshTokenFound[0].ID_user);

    if (userFound === 0)
      return res.send({
        status: "Error",
        response: "Utilisateur introuvable",
      });

    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.send({
            status: "Error",
            response: "Accès interdit",
          });
        console.log("icichahahahah");

        const accessToken = jsonwebtoken.sign(
          {
            firstName: userFound[0].firstName,
            lastName: userFound[0].lastName,
            pictureUrl: userFound[0].pictureUrl,
            role: userFound[0].role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "900s" }
        );
        res.json({
          status: "Success",
          accessToken: accessToken,
        });
      }
    );
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
    });
  }
});

export default router;
