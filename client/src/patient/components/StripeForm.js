import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button, Divider } from "@mui/joy";
import { Typography } from "@mui/joy";
import { usePayAppointmentByCardMutation } from "../../store";
import { usePayAppointmentByWalletMutation } from "../../store";
import Toast from "./Toast";
// import './stripe.css';

export default function StripeForm({ deductible, doctorCredit, doctorId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };


  const [payAppointmentByCard, results] = usePayAppointmentByCardMutation();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

    if (error) {
      setToast({
        ...toast,
        open: true,
        color: "danger",
        message: "Payment unsuccessful",
      });

      console.log(error);

    } else if (paymentIntent && paymentIntent.status === "succeeded") {

      payAppointmentByCard({
        doctor_id: doctorId,
        deductible: deductible,
        credit: doctorCredit
      });

      setToast({
        ...toast,
        open: true,
        color: "success",
        message: "Payment completed successfully!",
      });

      setMessage(`Payment status: ${paymentIntent.status}`);
    } else {
      setMessage("Something went wrong.");
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
        disabled={isProcessing}
        id="submit"
        sx={{ width: "100%", my: 3, borderRadius: 1 }}
      >
        <span id="Button-text">{isProcessing ? "Processing ... " : "Pay"}</span>
      </Button>

      <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>

      {/* Show any error or success messages */}
      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

    </form>
  );
}
