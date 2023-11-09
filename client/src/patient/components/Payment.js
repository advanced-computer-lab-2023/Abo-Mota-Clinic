import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "../components/StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stripe/config").then((res) => {
      const { publishableKey } = res.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/stripe/create-payment-intent", {
        amount: 1000,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  if (!stripePromise || !clientSecret) {
    return <div>Loading...</div>; // Show loading or some other placeholder until everything is loaded
  }

  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{
          appearance: {
            theme: "minimal",
            locale: "auto",
          },
          clientSecret,
        }}
      >
        <StripeForm />
      </Elements>
    </>
  );
}

export default Payment;
