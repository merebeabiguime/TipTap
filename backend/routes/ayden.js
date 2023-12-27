import express from "express";
import AdyenLibrary from "@adyen/api-library";
import { v4 as uuidv4 } from "uuid";

const { CheckoutAPI, Client, Config } = AdyenLibrary;

const config = new Config();
config.apiKey = process.env.AYDEN_API_KEY;
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);
const router = express.Router();

router.post("/session", async (req, res) => {
  try {
    const orderRef = uuidv4();
    console.log(orderRef);
    const Paymentdetails = req.body;
    console.log(Paymentdetails);
    const amountValue = parseFloat(Paymentdetails[0].amount);
    console.log(amountValue);
    const response = await checkout.PaymentsApi.sessions({
      amount: { currency: "EUR", value: amountValue * 100 }, // value is 100€ in minor units
      reference: orderRef, // required
      merchantAccount: process.env.AYDEN_MERCHANT_ACCOUNT, // required
      returnUrl: "http://localhost:3000", // required for 3ds2 redirect flow
    });
    console.log("ici");

    res.send({ status: "Success", response: response });
  } catch (err) {
    res.send({ status: "Error", response: err });
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
  }
});

export default router;
