const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./ReviewsRoutes');
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.set("strictQuery", false);

const PORT = 8080 || process.env.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
.connect(process.env.MONGODB_LINK)
.then(() => console.log('WE WERE CONNECTED TO MONGO'))
.catch((err) => console.log(err))

app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Fit",
      payment_method: id,
      confirm: true,
      return_url: 'https://example.com/return_url'
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`I AM LISTENING ON PORT ${PORT}`);
});

//username: natmusikhina
//password: ZJhYCcv0QC57iss7

//mongodb+srv://natmusikhina:<password>@cluster0.bwcjwq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0