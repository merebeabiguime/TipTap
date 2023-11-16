import express from "express";
import * as db from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/other", async (req, res) => {
  try {
    const userObject = req.body;

    const userFound = await db.getUserFromEmail(userObject.email);

    if (userFound === 0) {
      const displayName = userObject.displayName;
      const nameParts = displayName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      const userToSignup = {
        firstName: firstName,
        lastName: lastName,
        email: userObject.email,
        phone: "None",
        password: "password",
        role: 1,
        pictureUrl: userObject.photoURL,
        ID_restaurant: 0,
        UID: userObject.uid,
        verified: userObject.verified,
        phone: userObject.phone,
      };

      const signInUser = await db.addUser([userToSignup]);

      if (signInUser === 0) {
        return res.send({
          status: "Error",
          response: "Unable to add the user.",
        });
      }
    }
    res.send({
      status: "Success",
      response: "Google auth successfull",
    });
  } catch (err) {
    res.send({
      status: "Error",
      response: "An error occurred during Google authentication.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const UID = req.body[0].UID;
    const userFound = await db.getUserFromUID(UID);
    if (userFound === 0)
      return res.send({ status: "Error", response: "Utilisateur Introuvable" });
    console.log("aaa");
    //Creat JWT
    const accessToken = jsonwebtoken.sign(
      {
        firstName: userFound[0].firstName,
        lastName: userFound[0].lastName,
        pictureUrl: userFound[0].pictureUrl,
        role: userFound[0].role,
        ID: userFound[0].ID,
        verified: userFound[0].verified,
        UID: userFound[0].UID,
        phone: userFound[0].phone,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "900s" }
    );

    const refreshToken = jsonwebtoken.sign(
      {
        firstName: userFound[0].firstName,
        lastName: userFound[0].lastName,
        pictureUrl: userFound[0].pictureUrl,
        role: userFound[0].role,
        ID: userFound[0].ID,
        verified: userFound[0].verified,
        UID: userFound[0].UID,
        phone: userFound[0].phone,
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
        response: "Impossible de créer le refreshToken",
      });

    res.cookie("jsonwebtoken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 1000 * 24,
    });

    if (userFound[0].role === 1)
      res.json({
        status: "Success",
        response: "/privateWorker/private-home-worker",
        accessToken: accessToken,
      });
    if (userFound[0].role === 2)
      res.json({
        status: "Success",
        response: "/privateManager/private-home-manager",
        accessToken: accessToken,
      });
  } catch (err) {
    res.send({ status: "Error", response: "Une erreur s'est produite" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const userObject = req.body.current;
    console.log("uobj", userObject);
    const result = await db.addUser(userObject);
    if (result == 0) {
      res.send({
        status: "Error",
        response: "Impossible d'ajouter l'utilisateur",
      });
    } else {
      res.send({ status: "Success", response: result });
    }
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite lors de l'inscription",
    });
    //console.log(err);
  }
});

export default router;
