import express from "express";
import * as db from "../database.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/other", async (req, res) => {
  try {
    const userObject = req.body;
    console.log(userObject);

    const userFound = await db.getUserFromEmail(userObject.email);

    if (userFound === 0) {
      const displayName = userObject.displayName;
      const nameParts = displayName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      const userToSignup = [
        {
          firstName: firstName,
          lastName: lastName,
          email: userObject.email,
          phone: "None",
          password: "password",
          role: 1,
          pictureUrl: userObject.photoURL,
          ID_restaurant: 0,
          UID: userObject.uid,
          verified: 1,
        },
      ];

      const signInUser = await db.addUser(userToSignup);

      console.log("apres signIn");

      if (signInUser === 0) {
        return res.send({
          status: "Error",
          response: "Impossible d'ajouter l'utilisateur.",
        });
      }
    }
    console.log("apres le user found");
    res.send({
      status: "Success",
      response: "Connection réussie",
    });
  } catch (err) {
    res.send({
      status: "Error",
      response: "Une erreur s'est produite.",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const userObject = req.body.current;
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
      response: "Une erreur s'est produite",
      code: 404,
    });
  }
});

export default router;
