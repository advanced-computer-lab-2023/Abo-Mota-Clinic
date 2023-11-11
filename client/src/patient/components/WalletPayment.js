import { useFetchPatientQuery, usePayAppointmentByWalletMutation } from "../../store";
import { Button, Typography } from "@mui/joy";
import { useState } from "react";

function WalletPayment({ deductible, onSuccess, onFailure }) {

  const { data: patient, isFetching: isFetchingPatient, error: isFetchingPatientError } = useFetchPatientQuery();
  const [payAppointmentByWallet, walletResults] = usePayAppointmentByWalletMutation();
  const [isProcessing, setIsProcessing] = useState(false);


  const handlePayByWallet = (e) => {
    e.preventDefault();

    setIsProcessing(true);

    payAppointmentByWallet({
      deductible
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        onSuccess();
        setIsProcessing(false);

      })
      .catch((err) => {
        onFailure();
        setIsProcessing(false);

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
        disabled={isProcessing}
        id="submit"
        sx={{ width: "100%", my: 3, borderRadius: 1 }}
      // onClick={handlePayByWallet}
      >
        <span id="Button-text">{isProcessing ? "Processing ... " : "Pay"}</span>
      </Button>

      <Typography level="body-sm">By clicking Pay you agree to the Terms & Conditions.</Typography>

    </form>
  )
}

export default WalletPayment;