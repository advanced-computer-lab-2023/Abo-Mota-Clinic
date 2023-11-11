import { Box, Divider, Typography } from "@mui/joy";
import capitalize from "../utils/capitalize";
import round2dp from "../utils/round2dp";

function PaymentSummary({ items, discount, optionalHeaders }) {
  const subtotal = items.reduce((acc, {price}) => acc + price, 0);
  let deductible = discount ? subtotal * (1 - discount) : subtotal;
  deductible = round2dp(deductible);
  const discountedAmount = round2dp(discount * subtotal);

  return (
    <Box
      id="payment-summary"
      style={{ borderRadius: 0, width: "350px" }}
      className="bg-gray-100 rounded p-5"
    >
      <Box className="">
        <Typography level="title-lg">Summary</Typography>

        {optionalHeaders}

        <Divider sx={{ my: 2 }} />

        <Box>
          {
            items.map(({ label, price }) => {
              return (
                <Box className="flex justify-between mb-3">
                  <Typography level="body-sm">{label}</Typography>
                  <Typography level="body-sm">${price}</Typography>
                </Box>
              )
            })
          }

          <Divider sx={{ my: 2 }} />

          <Box className="flex justify-between">
            <Typography level="body-sm" sx={{ marginBottom: 1.5 }}>
              Subtotal
            </Typography>
            <Typography level="body-sm">${items.reduce((acc, { price }) => acc + price, 0)}</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography level="body-sm">Discount</Typography>
            <Typography level="body-sm" color="success">
              {" "}
              - ({discountedAmount})
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
  )
}

export default PaymentSummary;