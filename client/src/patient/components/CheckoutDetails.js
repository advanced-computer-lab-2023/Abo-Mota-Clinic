import { Typography, Divider, Box } from "@mui/joy";
import { LuPackagePlus } from "react-icons/lu"
import { BsClock } from "react-icons/bs";
import { GrLocationPin } from "react-icons/gr";

function CheckoutDetails({ type, details }) {

  if (type === "package") {
    return (
      <Box>
        <Typography level="h3">
          Details
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        <Typography level="title-lg" sx={{ mb: 0.5 }} startDecorator={<LuPackagePlus />}>
          {details.packageName}
        </Typography>
        <Typography level="body-xs">
          {details.packageDescription}
        </Typography>

      </Box>
    );
  }

  else if (type === "appointment") {
    return (
      <Box id="appointment-review" className="mb-5">
        <Typography level="title-lg" sx={{ marginBottom: 1 }}>
          Details
        </Typography>

        <Typography level="body-md" startDecorator={<BsClock />}>
          {details.date}, {details.currentTime}
        </Typography>

        <Typography level="body-md" startDecorator={<GrLocationPin />}>
          {details.location}
        </Typography>
      </Box>
    );
  }


  return (
    <div>
      Page not found
    </div>
  )
}

export default CheckoutDetails;

