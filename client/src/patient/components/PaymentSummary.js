import { Box, Divider, Typography } from "@mui/joy";
import capitalize from "../utils/capitalize";

function PaymentSummary({ patient, doctor, deductible}) {
  return (
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
  )
}

export default PaymentSummary;