// server.js
const express = require('express');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

paypal.configure({
  'mode': 'sandbox', // Change to 'live' for production
  'client_id': 'YOUR_CLIENT_ID',
  'client_secret': 'YOUR_CLIENT_SECRET'
});

app.use(bodyParser.json());

app.post('/api/paypal-transaction-complete', (req, res) => {
  const paymentId = req.body.paymentId;
  const payerId = req.body.payerId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "0.01"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      res.status(500).send(error);
    } else {
      res.status(200).send(payment);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
