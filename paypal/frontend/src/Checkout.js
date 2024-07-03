import React, { useEffect, useState } from 'react';

const Checkout = () => {
  const [buttonRendered, setButtonRendered] = useState(false);

  useEffect(() => {
    if (window.paypal && !buttonRendered) {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01' // Set the amount here dynamically based on cart total
              }
            }]
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // You can call your backend API here to save the transaction details
          });
        }
      }).render('#paypal-button-container');
      setButtonRendered(true); // Mark the button as rendered
    }
  }, [buttonRendered]);

  return <div id="paypal-button-container"></div>;
};

export default Checkout;
