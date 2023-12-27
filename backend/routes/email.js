import express from "express";
import { Resend } from "resend";
import * as db from "../database.js";

const resend = new Resend(process.env.REACT_RESEND_API_KEY);
const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const emailDetails = req.body;
    console.log("dans le mail,", emailDetails);
    var receiverEmail = null;
    if (emailDetails[0].idStaff === -1 || emailDetails[0].idStaff === 0) {
      console.log("dans la first condition");
      const getManagerEmailResponse = await db.getManagerEmail(
        parseInt(emailDetails[0].idRestaurant)
      );
      if (getManagerEmailResponse === 0) {
        return res.send({ status: "Error", response: getManagerEmailResponse });
      }
      console.log("a la fin de la first", receiverEmail);
      receiverEmail = getManagerEmailResponse[0].email;
    } else {
      console.log("dans la second condition");
      const getEmailFromId = await db.getEmailFromId(emailDetails[0].idStaff);
      if (getEmailFromId === 0) {
        return res.send({ status: "Error", response: getEmailFromId });
      }
      console.log("a la fin de la second", receiverEmail);
      receiverEmail = getEmailFromId[0].email;
    }
    console.log("email", receiverEmail);
    const response = await resend.emails.send({
      from: "support@tiptap.biz",
      to: ["merebe2012@gmail.com"],
      subject: "Vous avez reçu un pourboire",
      html: emailDetails[0].html,
    });
    console.log("apres la response", response);

    if (response.error) {
      return res.send({ status: "Error", response: response.error });
    }

    res.send({ status: "Success", response: response });
  } catch (err) {
    res.send({ status: "Erroraa", response: err });
    console.log("error", err);
  }
});

export default router;
