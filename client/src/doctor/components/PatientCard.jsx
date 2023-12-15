import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import PhoneIcon from "@mui/icons-material/Phone";

import Link from "@mui/joy/Link";

import Chip from "@mui/joy/Chip";
import { capitalizeFirstLetter } from "./AppointmentCard";

export default function PatientCard({ patient, onClick, className }) {
  return (
    <Card
      onClick={onClick}
      className={className}
      sx={{
        width: 240,
        transition: "transform 0.2s",
        "&:hover": {
          boxShadow: "md",
          cursor: "pointer",
          borderColor: "neutral.outlinedHoverBorder",
          transform: "scale(1.1)",
        },
      }}
    >
      <AspectRatio ratio="1" maxHeight={150} sx={{ width: 150, borderRadius: "100%" }}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>

      <Typography level="title-lg">{capitalizeFirstLetter(patient.name)}</Typography>

      <Divider inset="none" />

      <CardContent orientation="vertical">
        <div className="flex space-x-10">
          <Typography level="body-sm" fontWeight="lg">
            Phone:
          </Typography>
          <Typography level="body-sm">{patient.mobile}</Typography>
        </div>
        <div className="flex justify-between">
          <Typography level="body-sm" fontWeight="lg">
            Gender:
          </Typography>
          <Typography level="body-sm">{capitalizeFirstLetter(patient.gender)}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
