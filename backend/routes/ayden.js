import express from "express";
import AdyenLibrary from "@adyen/api-library";
import { v4 as uuidv4 } from "uuid";

const { CheckoutAPI, Client } = AdyenLibrary;
const client = new Client({
  apiKey: process.env.AYDEN_API_KEY,
  environment: "TEST",
});
const checkout = new CheckoutAPI(client);
const router = express.Router();

router.post("/session", async (req, res) => {
  try {
    const orderRef = uuidv4();
    console.log(orderRef);
    const Paymentdetails = req.body;
    console.log(Paymentdetails);
    const PaymentResponse = await checkout.sessions({
      amount: { currency: "EUR", value: "1000" },
      reference: orderRef,
      returnUrl: "http://localhost:3000",
      merchantAccount: process.env.AYDEN_MERCHANT_ACCOUNT,
    });

    console.log(PaymentResponse);

    res.send({ status: "Success", response: PaymentResponse });
  } catch (err) {
    res.send({ status: "Error", response: err });
  }
});

export default router;
