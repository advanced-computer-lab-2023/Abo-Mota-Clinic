import { useFetchPatientQuery, usePayAppointmentByWalletMutation } from "../../store";
import { Button, Typography } from "@mui/joy";
import { useState } from "react";
import Toast from "./Toast";

function WalletPayment({ doctorId, deductible, doctorCredit }) {

  console.log("Credit @ WalletPayment: ", doctorCredit)

  const { data: patient, isFetching: isFetchingPatient, error: isFetchingPatientError } = useFetchPatientQuery();
  const [payAppointmentByWallet, results] = usePayAppointmentByWalletMutation();

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

  const handlePayByWallet = (e) => {
    e.preventDefault();
    payAppointmentByWallet({
      doctor_id: doctorId,
      deductible: deductible,
      credit: doctorCredit,
    })
      .unwrap()
      .then((res) => setToast({
        ...toast,
        open: true,
        color: "success",
        message: "Payment successful!",
      }))
      .catch((err) => {
        setToast({
          ...toast,
          open: true,
          color: "danger",
          message: "Payment unsuccessful!",
        })
      });
  };

  if (isFetchingPatient) {
    return <div>Loading ...</div>;
  } else if (isFetchingPatientError) {
    return <div> Error ... </div>;
  }


  return (
    <form onSubmit={handlePayByWallet}>
      <Typography level="h3" fontWeight={500}>Available Balance - ${patient.wallet}</Typography>
      <Button
        type="submit"
        variant="solid"
        // disabled={isProcessing}
        id="submit"
        sx={{ width: "100%", my: 3, borderRadius: 1 }}
      // onClick={handlePayByWallet}
      >
        <span id="Button-text">{"Pay"}</span>
      </Button>

      <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>

      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>
    </form>
  )
}

export default WalletPayment;