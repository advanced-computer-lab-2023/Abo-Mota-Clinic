import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";
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
import { useEffect, useState } from "react";
import TwoButtonModal from "../../shared/Components/TwoButtonModal";
import { useSendNotificationMutation, usePatientCancelAppointmentMutation, useRequestFollowUpMutation, usePatientRescheduleAppointmentMutation } from "../../store";
import RescheduleModal from "./RescheduleModal";
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import reschedule_img from "../../shared/assets/reschedule_img.jpg";
import followup_img from "../../shared/assets/followup_img.jpg";

import dayjs from "dayjs";

import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose
} from "@mui/joy";

function AppointmentCard({ sx, formattedDate, status, doctor, patient, socket, appointmentId, name }) {
  // console.log("name: ", name);
  // console.log("doctor: ", specialty);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [sendNotification] = useSendNotificationMutation();
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [cancelAppointment] = usePatientCancelAppointmentMutation();
  const [requestFollowUp] = useRequestFollowUpMutation();
  const [rescheduleAppointment] = usePatientRescheduleAppointmentMutation();

  // const [rescheduleDate, setRescheduleDate] = useState(null);
  // const [rescheduleDoctorId, setRescheduleDoctorId] = useState(null);

  const colors = {
    upcoming: "warning",
    cancelled: "danger",
    completed: "success",
    rescheduled: "primary",
  };

  const handleShowModal = () => setShowCancelModal(true);
  const handleCloseModal = () => setShowCancelModal(false);

  const handleCancel = () => {
    //add cancel appointment logic here
    //TODO: add cancelling feedback
    cancelAppointment({ appointmentId });

    sendNotification({
      recipientUsername: doctor.username,
      recipientType: "doctor",
      content: `Your appointment with ${patient.name} on ${formattedDate.replace(',', ' at')} got cancelled`
    })
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // call sendNotification from to save notification in patient db
    sendNotification({
      recipientUsername: patient.username,
      recipientType: "patient",
      content: `Your appointment with Dr. ${doctor.name} on ${formattedDate.replace(',', ' at')} got cancelled`
    })
      .unwrap()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    //send socket event to backend
    socket.emit("send_notification_cancelled_by_patient", {
      receiver: doctor._id,
      contentDoctor: `Your appointment with ${patient.name} on ${formattedDate.replace(',', ' at')} got cancelled`,
      contentPatient: `Your appointment with Dr. ${doctor.name} on ${formattedDate.replace(',', ' at')} got cancelled`,

    });

    setShowCancelModal(false);
  }
  const message = 'Are you sure you want to cancel your appointment?'

  const rescheduleModalConfig = {
    isModalOpen: isRescheduleModalOpen,
    setIsModalOpen: setIsRescheduleModalOpen,
    doctorId: doctor._id,
    oldAppointmentId: appointmentId,
    onConfirm: rescheduleAppointment,
    placeholderImage: <img src={reschedule_img} alt="reschedule" style={{ marginRight: 5, marginLeft: 5, height: '13em' }} />,
    placeholderText: "Rescheduling isn't always a bad thing!",
    title: "Reschedule your apppointment",
    subtitle: "Pick a new date for your appointment from the date picker below.",
  };

  const followUpModalConfig = {
    isModalOpen: isFollowUpModalOpen,
    setIsModalOpen: setIsFollowUpModalOpen,
    doctorId: doctor._id,
    oldAppointmentId: appointmentId,
    onConfirm: requestFollowUp,
    placeholderImage: <img src={followup_img} alt="reschedule" style={{ marginRight: 10, marginLeft: 10, marginBottom: -40, height: '20em' }} />,
    placeholderText: "Hurry up and book your follow up!",
    title: "Request a follow up",
    subtitle: "Pick a date for your follow up from the date picker below.",
  }


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

            <Box className="flex justify-center items-center space-x-2">
              <Chip color={colors[status]} variant="soft">
                <Typography level="title-lg">{capitalize(status)}</Typography>
              </Chip>

              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                  sx={{ borderRadius: 40, width: 38 }}
                  disabled={status === "cancelled"}

                >
                  <MoreVert />
                </MenuButton>
                <Menu placement="bottom-start">
                  <MenuItem onClick={() => setIsRescheduleModalOpen(true)}>Reschedule</MenuItem>
                  <MenuItem onClick={() => setIsFollowUpModalOpen(true)}>Follow Up</MenuItem>
                  <Divider />
                  <MenuItem color="danger" onClick={handleShowModal}>Cancel</MenuItem>
                </Menu>

              </Dropdown>
            </Box>
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

          <Box className="flex space-x-4">
            {/* <IconButton disabled={status === "cancelled"} aria-label="call" size="md" onClick={handleShowModal}>
              <BiCalendarX fontSize={24} />
            </IconButton> */}

            <IconButton disabled={status === "cancelled"} aria-label="call" size="md">
              <BiChat fontSize={24} />
            </IconButton>
          </Box>
          <TwoButtonModal open={showCancelModal} handleClose={handleCloseModal} handleClickLogic={handleCancel} message={message} />


        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography level="body-sm">
            Patient: {name}
          </Typography>
          {/* <Button disabled={status === "cancelled"} variant="plain" onClick={() => setIsRescheduleModalOpen(true)}>
            Reschedule
          </Button> */}
          <RescheduleModal {...rescheduleModalConfig} />
          <RescheduleModal {...followUpModalConfig} />
        </Box>

      </CardContent>
    </Card>
  );
}


export default AppointmentCard;
