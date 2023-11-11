import { Box, Typography, Divider, Button, Card } from "@mui/joy";

// HOOKS
import { useState } from "react";

// COMPONENTS
import CardPayment from "../components/CardPayment";
import PaymentSummary from "../components/PaymentSummary";
import CheckoutDetails from "../components/CheckoutDetails";
import WalletPayment from "../components/WalletPayment";

// ICONS
import { FaRegCreditCard } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";

// UTILS
import round2dp from "../utils/round2dp";

function PaymentPage({ items, type, details, discount, onPaymentSuccess, onPaymentFailure }) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = items.reduce((acc, {price}) => acc + price, 0);
  const deductible = round2dp(subtotal * (1 - discount));
  
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
    <Box className="mt-15 space-y-5">
      <Box sx={{ py: 2 }}>
        <Typography level="h1" sx={{ ml: -0.5 }}>
          Checkout
        </Typography>

        <br></br>

        <Box id="card-body" className="w-full flex justify-between space-x-20">
          <Box sx={{ width: '60%' }}>

            <CheckoutDetails type={type} details={details} />

            <Typography level="h3" sx={{ mt: 5 }}>
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
            items={items}
            discount={discount}
          />

        </Box>
      </Box>
    </Box>


  );
}
export default PaymentPage;
