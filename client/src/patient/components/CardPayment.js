import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchStripeConfigQuery, useCreatePaymentIntentMutation } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";

function Payment({ deductible, onSuccess, onFailure, socket, doctor, details, selectedUser }) {
  const currencyMultiplier = 100;
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
    createPaymentIntent(currencyMultiplier * deductible)
      .unwrap()
      .then((res) => setClientSecret(res.clientSecret));
  }, []);

  if (isFetching) {
    return <LoadingIndicator />; // Show loading or some other placeholder until everything is loaded
  }

  if (!stripePromise || !clientSecret) {
    return <LoadingIndicator />; // Show loading or some other placeholder until everything is loaded
  }

  return (
    <>
      <Elements stripe={stripePromise} options={{ appearance: { locale: "auto" }, clientSecret }}>
        <StripeForm
          deductible={deductible}
          onSuccess={onSuccess}
          onFailure={onFailure}
          selectedUser={selectedUser}
          socket={socket}
          doctor={doctor}
          details={details}
        />
      </Elements>
    </>
  );
}

export default Payment;
