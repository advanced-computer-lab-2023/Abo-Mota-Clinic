import { Typography, Divider } from "@mui/joy";
import {LuPackagePlus} from "react-icons/lu"

import { Box } from "@mui/joy";

function CheckoutDetails() {
  return (
    <Box>
      <Typography level="h3">
        Details
      </Typography>
      <Divider sx={{mb: 1.5}} />
      <Typography level="title-lg" sx={{ mb: 0.5}} startDecorator={<LuPackagePlus/>}>
        Silver Package
      </Typography>
      <Typography level="body-xs">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vulputate quam id accumsan iaculis. Donec aliquam quam vitae nulla commodo maximus.
      </Typography>

    </Box>
  )
}

export default CheckoutDetails;