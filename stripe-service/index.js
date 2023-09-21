import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";

dotenv.config();
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/payment", cors(), async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 499,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
    });
  }
});

app.listen(4002, () => {
  console.log("Server is listening on port 4002 🚀");
});
