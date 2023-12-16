import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button, Divider } from "@mui/joy";
import { Typography } from "@mui/joy";
import { usePayAppointmentByCardMutation } from "../../store";
import { usePayAppointmentByWalletMutation } from "../../store";
import { useBookAppointmentMutation } from "../../store";
import { useFetchPatientQuery } from "../../store";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
// import './stripe.css';

export default function StripeForm({ onSuccess, onFailure, selectedUser }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
 
  const {
    data: patient,
    isFetching: isFetchingPatient,
    error: isFetchingPatientError,
  } = useFetchPatientQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },

      redirect: "if_required",
    });

    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();

      
    } else {
      onFailure();
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{
        // backgroundColor: '#FFFFFF',
        // border: "#F6F9FC solid 1px",
        // borderRadius: '3px',
        // padding: '20px',
        // margin: '20px 0',
        // boxShadow: '0 30px 50px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%)',
        width: "100%",
      }}
    >
      <div id="card-element">
        <PaymentElement />
      </div>
      <Button
        type="submit"
        variant="solid"
        disabled={isProcessing || selectedUser === -1}
        id="submit"
        sx={{ width: "100%", my: 3, borderRadius: 1 }}
      >
        <span id="Button-text">{isProcessing ? "Processing ... " : "Pay"}</span>
      </Button>

      <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>
    </form>
  );
}
