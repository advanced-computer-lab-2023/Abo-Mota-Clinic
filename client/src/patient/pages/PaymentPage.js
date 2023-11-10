import { Box } from "@mui/joy";
import { Typography, Divider, Button, Card } from "@mui/joy";
import CardPayment from "../components/CardPayment";
import { FaRegCreditCard } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";
import { useFetchPatientQuery, usePayAppointmentByWalletMutation } from "../../store";
import capitalize from "../utils/capitalize";
import WalletPayment from "../components/WalletPayment";

function PaymentPage({ doctor, doctorId, date, currentTime, deductible, doctorCredit }) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  console.log("Doctor Credit @ PaymentPage: ", doctorCredit)

  const { data: patient, isFetching: isFetchingPatient, error: isFetchingPatientError } = useFetchPatientQuery();
  const [payAppointmentByWallet, results] = usePayAppointmentByWalletMutation();

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
    <Box className=" mt-20 space-y-5">
      <Box sx={{ py: 2 }} className="">
        <Typography level="h2" fontWeight={500}>
          Checkout
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <br></br>

        <Box id="card-body" className="flex justify-between space-x-10">
          <Box className="">
            <Box id="appointment-review" className="mb-5">
              <Typography level="title-lg" sx={{ marginBottom: 1 }}>
                Details
              </Typography>

              <Typography level="body-md" startDecorator={<BsClock />}>
                {date}, {currentTime}
              </Typography>

              <Typography level="body-md" startDecorator={<GrLocationPin />}>
                {doctor.affiliation}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography level="title-lg" sx={{ marginBottom: 1 }}>
              Payment Method
            </Typography>

            <Card sx={{ width: "600px", borderRadius: 0, p: 4 }}>
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
                <CardPayment doctorId={doctorId} deductible={deductible} doctorCredit={doctorCredit} />
              ) : (
                <WalletPayment doctorId={doctorId} deductible={deductible} doctorCredit={doctorCredit} />
              )}
            </Card>
          </Box>

          <Box
            id="payment-summary"
            style={{ borderRadius: 0, width: "300px" }}
            className="bg-gray-100 rounded p-5"
          >
            <Box className="">
              <Typography level="title-lg">Summary</Typography>

              <Typography level="body-sm">
                Subscribed health package:{" "}
                <span className="font-bold">
                  {!patient.healthPackage ? "No Package" : capitalize(patient.healthPackage.package.name)}
                </span>
              </Typography>

              <Divider sx={{ my: 2 }} />
              <Box>
                <Box className="flex justify-between">
                  <Typography level="body-sm">Consultation</Typography>
                  <Typography level="body-sm">${doctor.rate}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box className="flex justify-between">
                  <Typography level="body-sm" sx={{ marginBottom: 1.5 }}>
                    Subtotal
                  </Typography>
                  <Typography level="body-sm">${doctor.rate}</Typography>
                </Box>
                <Box className="flex justify-between">
                  <Typography level="body-sm">Discount</Typography>
                  <Typography level="body-sm" color="success">
                    {" "}
                    - (${doctor.rate - deductible})
                  </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box className="flex justify-between">
                  <Typography level="title-lg">Total</Typography>
                  <Typography level="title-lg">${deductible}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box className="flex w-full justify-end">
        <Button type="submit" variant="solid" id="submit" sx={{ marginRight: 5, py: 2, borderRadius: 2 }}>
          <span id="Button-text">
            PAY APPOINTMENT
          </span>
        </Button>
      </Box> */}
    </Box>
  );
}
export default PaymentPage;
