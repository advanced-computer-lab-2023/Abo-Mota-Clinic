import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import Avatar from "@mui/joy/Avatar";
import { capitalizeFirstLetter } from "./AppointmentCard";
import image from "../assets/appointmentAvatar.png";
import dayjs from "dayjs";

export default function MiniAppointmentCard({ appointment }) {
  const colors = {
    upcoming: "warning",
    cancelled: "danger",
    completed: "success",
    unbooked: "primary",
    rescheduled: "primary",
  };

  const currDate = dayjs();
  const appointmentDate = dayjs(appointment.formattedDate);
  if (!(appointment.status === "cancelled" || appointment.status === "rescheduled")) {
    if (appointmentDate.isAfter(currDate)) {
      appointment = { ...appointment, status: "upcoming" };
    } else {
      appointment = { ...appointment, status: "completed" };
    }
  }

  return (
    <Card
      orientation="horizontal"
      sx={{
        width: "400px",
        height: "80px",
        flexWrap: "wrap",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        mr: 2,
      }}
      className="hover:shadow-lg"
    >
      <Avatar src={image} />
      <CardContent>
        <div>
          <Box className="flex flex-row justify-between mb-2">
            <Typography
              level="body-md"
              textColor="text.tertiary"
              startDecorator={<AccessTimeIcon fontSize="10" />}
            >
              {appointment.formattedDate}
            </Typography>
            <Chip color={colors[appointment.status]} variant="soft">
              <Typography level="title-md">{capitalizeFirstLetter(appointment.status)}</Typography>
            </Chip>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}
