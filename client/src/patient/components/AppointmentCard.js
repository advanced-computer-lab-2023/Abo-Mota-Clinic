import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BiChat, BiCalendarX } from "react-icons/bi";
import DoctorImg from "../assets/images/doctor.jpg";
import Chip from "@mui/joy/Chip";
import capitalize from "../utils/capitalize";
import { useState } from "react";
import TwoButtonModal from "../../shared/Components/TwoButtonModal";
import { useSendNotificationMutation } from "../../store";

function AppointmentCard({ sx, formattedDate, status, doctor, patient, socket}) {
  // console.log("name: ", name);
  // console.log("doctor: ", specialty);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [sendNotification] = useSendNotificationMutation();

  const colors = {
    upcoming: "warning",
    cancelled: "danger",
    completed: "success",
    rescheduled: "primary",
  };
  const handleShowModal = () => setShowCancelModal(true);
  const handleCloseModal = () => setShowCancelModal(false);
  const handleCancel = () => {
    console.log(patient.username)
    //add Cancel Appointment logic here
    sendNotification({ 
      recipientUsername: doctor.username,
       recipientType: "doctor" , 
       content:  `Your appointment with ${patient.name} on ${formattedDate.replace(',',' at')} got cancelled`})
       .unwrap()
       .then(res => console.log(res))
       .catch(err => console.log(err));

    // call sendNotification from to save notification in patient db
    sendNotification({ 
      recipientUsername: patient.username,
       recipientType: "patient" , 
       content: `Your appointment with Dr. ${doctor.name} on ${formattedDate.replace(',',' at')} got cancelled`})
       .unwrap()
       .then(res => console.log(res))
       .catch(err => console.log(err));

    //send socket event to backend
    socket.emit("send_notification_cancelled_by_patient", {
      receiver: doctor._id,
      contentDoctor: `Your appointment with ${patient.name} on ${formattedDate.replace(',',' at')} got cancelled`,
      contentPatient: `Your appointment with Dr. ${doctor.name} on ${formattedDate.replace(',',' at')} got cancelled`,

    });
    
    setShowCancelModal(false);
  }
  const message = 'Are you sure you want to cancel your appointment?'

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: "100%",
        "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" },
        ...sx,
      }}
    >
      <CardContent>
        <Box className="w-full">
          <Box className="flex w-full justify-between mb-1">
            <Typography
              level="body-lg"
              id="card-description"
              // startDecorator={<AccessTimeIcon fontSize='10' />}
            >
              Appointment
            </Typography>

            <Chip color={colors[status]} variant="soft">
              <Typography level="title-lg">{capitalize(status)}</Typography>
            </Chip>
          </Box>

          <Typography
            level="body-lg"
            aria-describedby="card-description"
            mb={1}
            startDecorator={<AccessTimeIcon fontSize="10" />}
          >
            {formattedDate.replace(",", " -")}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 1.5 }} />

        <Box className="flex justify-between">
          <Box className="flex space-x-4">
            <Avatar alt={doctor.name} src={DoctorImg} size="lg" />

            <Box className="mr-10">
              <Typography level="title-lg" id="card-description">
                Dr. {doctor.name}
              </Typography>
              <Typography level="body-lg" aria-describedby="card-description" mb={1}>
                {doctor.specialty}
              </Typography>
            </Box>
          </Box>
          <div className="space-x-4">
              <IconButton aria-label="call" size="md" onClick={handleShowModal}>
                <BiCalendarX fontSize={24} />
              </IconButton>

              <IconButton aria-label="call" size="md">
                <BiChat fontSize={24} />
              </IconButton>
          </div>
          <TwoButtonModal open = {showCancelModal} handleClose= {handleCloseModal} handleClickLogic={handleCancel} message={message}/>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AppointmentCard;
