import { useEffect, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button, Divider } from "@mui/joy";
import { Typography } from "@mui/joy";
import { usePayAppointmentByCardMutation } from "../../store";
import { usePayAppointmentByWalletMutation } from "../../store";
import { useBookAppointmentMutation } from "../../store";
import { useSendNotificationMutation } from "../../store";
import { useFetchPatientQuery } from "../../store";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
// import './stripe.css';

export default function StripeForm({ onSuccess, onFailure, selectedUser, socket, doctor, details }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sendNotification] = useSendNotificationMutation();
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

      //send notification to doctor and myself
      // call sendNotification from commonApi.js to save notification in doctor db
      sendNotification({
        recipientUsername: doctor.username,
        recipientType: "doctor",
        content: `You have a new appointment with ${patient.name} on ${details.date} at ${details.currentTime}`,
      })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      // call sendNotification to save notification in patient db
      sendNotification({
        recipientUsername: patient.username,
        recipientType: "patient",
        content: `Your appointment is booked successfully with Dr. ${doctor.name} on ${details.date} at ${details.currentTime}`,
      })
        .unwrap()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      //send socket event to backend
      socket.emit("send_notification_booked", {
        sender: patient._id,
        receiver: doctor._id,
        contentDoctor: `You have a new appointment with ${patient.name} on ${details.date} at ${details.currentTime}`,
        contentPatient: `Your appointment is booked successfully with Dr. ${doctor.name} on ${details.date} at ${details.currentTime}`,
      });
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
