import { Box } from "@mui/joy";
import { Typography, Divider, Button, Card } from "@mui/joy";
import CardPayment from "../components/CardPayment";
import { FaRegCreditCard } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { useFetchPatientQuery, usePayAppointmentByWalletMutation, usePayAppointmentByCardMutation, useBookAppointmentMutation } from "../../store";
import capitalize from "../utils/capitalize";
import WalletPayment from "../components/WalletPayment";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { useCreditDoctorMutation } from "../../store";
import PaymentSummary from "../components/PaymentSummary";
import round2dp from "../utils/round2dp";
import CheckoutDetails from "../components/CheckoutDetails";

function PaymentPage({ doctor, doctorId, date, currentTime, deductible, doctorCredit, appointmentId }) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const { data: patient, isFetching: isFetchingPatient, error: isFetchingPatientError } = useFetchPatientQuery();
  const [payAppointmentByWallet, walletResults] = usePayAppointmentByWalletMutation();
  const [creditDoctor, creditDoctorResults] = useCreditDoctorMutation();
  const [bookAppointment, bookResults] = useBookAppointmentMutation();

  const navigate = useNavigate();

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


  const onPaymentSuccess = () => {
    creditDoctor({
      doctor_id: doctorId,
      credit: doctorCredit
    });

    bookAppointment({
      appointmentId
    });

    setToast({
      ...toast,
      open: true,
      color: "success",
      message: "Payment completed successfully!",
    });

    setTimeout(() => {
      navigate("/patient/");
    }, 1500)
  }

  const onPaymentFailure = () => {
    setToast({
      ...toast,
      open: true,
      color: "danger",
      message: "Payment unsuccessful",
    });
  }

  if (isFetchingPatient) {
    return <div>Loading ...</div>;
  } else if (isFetchingPatientError) {
    return <div> Error ... </div>;
  }


  const buttonGroup = [
    {
      id: 1,
      label: "Card",
      icon: <FaRegCreditCard />,
      onClick: () => setPaymentMethod("card"),
    },
    {
      id: 2,
      label: "Wallet",
      icon: <IoWallet />,
      onClick: () => setPaymentMethod("wallet"),
    },
  ];

  return (
    //w-full add this if you want full width
    <Box className="mt-15 space-y-5">
      <Box sx={{ py: 2 }}>
        <Typography level="h1" sx={{ml: -0.5}}>
          Checkout
        </Typography>

        {/* <Divider sx={{ my: 1.5 }} /> */}

        <br></br>

        <Box id="card-body" className="w-full flex justify-between space-x-20">
          <Box sx={{width: '60%'}}>
            {/* <Box id="appointment-review" className="mb-5">
              <Typography level="title-lg" sx={{ marginBottom: 1 }}>
                Details
              </Typography>

              <Typography level="body-md" startDecorator={<BsClock />}>
                {date}, {currentTime}
              </Typography>

              <Typography level="body-md" startDecorator={<GrLocationPin />}>
                {doctor.affiliation}
              </Typography>
            </Box> */}

            <CheckoutDetails />


            <Typography level="h3" sx={{mt: 5}}>
              Payment Method
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            <Card sx={{ borderRadius: 0, p: 4 }}>
              <Box id="button-group" className="flex space-x-2 mb-5">
                {buttonGroup.map((button) => (
                  <Button
                    key={button.id}
                    variant="outlined"
                    onClick={button.onClick}
                    startDecorator={button.icon}
                    sx={
                      button.label.toLowerCase() === paymentMethod
                        ? { borderColor: "#0b6bcb", borderWidth: 2 }
                        : {}
                    }
                    className="h-16 w-24"
                  >
                    {button.label}
                  </Button>
                ))}
              </Box>

              {/* MAIN PAYMENT COMPONENT */}

              {paymentMethod === "card" ? (
                <CardPayment
                  deductible={deductible}
                  onSuccess={onPaymentSuccess}
                  onFailure={onPaymentFailure}
                />
              ) : (
                <WalletPayment
                  deductible={deductible}
                  onSuccess={onPaymentSuccess}
                  onFailure={onPaymentFailure}
                />
              )}
            </Card>
          </Box>

          <PaymentSummary
            items={[{ name: "Consultation", price: round2dp(doctor.rate * 1.1) }]}
            discount={patient.healthPackage.package ? patient.healthPackage.package.doctorDiscount : 0}
            optionalHeaders={
              <Typography level="body-sm">
                Subscribed health package:{" "}
                <span className="font-bold">
                  {!patient.healthPackage ? "No Package" : capitalize(patient.healthPackage.package.name)}
                </span>
              </Typography>
            }
          />

        </Box>
      </Box>

      {/* <Box className="flex w-full justify-end">
        <Button type="submit" variant="solid" id="submit" sx={{ marginRight: 5, py: 2, borderRadius: 2 }}>
          <span id="Button-text">
            PAY APPOINTMENT
          </span>
        </Button>
      </Box> */}


      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>

    </Box>


  );
}
export default PaymentPage;
