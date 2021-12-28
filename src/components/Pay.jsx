import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
const KEY =
  "pk_test_51JxbQxEqAo9STCAeLGwAOBVme83O8YuiLqwicPpS1uC4KzJK6omLfmW1ROhM2S8rbJSr20x3HQubWso5kDeocN3S00ymYLLfyf";
const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  }, [stripeToken]);
  return (
    <div>
      <StripeCheckout
        name="Les."
        billingAddress
        shippingAddress
        description="Your total is $20"
        amount={2000}
        token={onToken}
        stripeKey={KEY}
      >
        <button>PAY NOW</button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
