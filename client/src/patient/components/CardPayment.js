import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

function Payment({ deductible, doctorCredit, doctorId }) {
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
        amount: deductible,
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
        <StripeForm deductible={deductible} doctorCredit={doctorCredit} doctorId={doctorId} />
      </Elements>
    </>
  );
}

export default Payment;
