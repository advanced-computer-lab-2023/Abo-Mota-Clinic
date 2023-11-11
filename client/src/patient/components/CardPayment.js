import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchStripeConfigQuery, useCreatePaymentIntentMutation } from "../../store";

function Payment({ deductible, onSuccess, onFailure }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const [createPaymentIntent, results] = useCreatePaymentIntentMutation();
  const { data: config, isFetching, error } = useFetchStripeConfigQuery();

  useEffect(() => {
    if (!isFetching) {
      setStripePromise(loadStripe(config.publishableKey));
    }
  }, [isFetching]);

  useEffect(() => {
    createPaymentIntent(deductible)
      .unwrap()
      .then((res) => setClientSecret(res.clientSecret));
  }, [])


  if (isFetching) {
    return <div>Loading...</div>; // Show loading or some other placeholder until everything is loaded
  }

  if (!stripePromise || !clientSecret) {
    return <div>Loading...</div>; // Show loading or some other placeholder until everything is loaded
  }

  return (
    <>
      <Elements stripe={stripePromise} options={{ appearance: { locale: "auto" }, clientSecret }}>
        <StripeForm
          deductible={deductible}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </Elements>
    </>
  );
}

export default Payment;
