import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { DatePicker } from "antd";
import { Box, Button, FormControl, FormLabel, Input, Modal, Textarea } from "@mui/joy";
import dayjs from "dayjs";
import { useRescheduleAppointmentMutation } from "../../store";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { IconButton } from "@mui/material";
function RescheduleAppointment({ appointmentId }) {
  const [rescheduleDate, setRescheduleDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [rescheduleAppointment, results] = useRescheduleAppointmentMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... submit logic ...
    const rescheduledAppointment = {
      appointmentId: appointmentId,
      newDate: rescheduleDate,
    };
    await rescheduleAppointment(rescheduledAppointment);
    console.log(rescheduledAppointment);
    handleClose();
    // if (followUpDate)
    //   const d = { patientUsername: patient.username, followUpDate: followUpDate };
  };
  const modalStyle = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "99vh",
    overflowY: "auto",
    bgcolor: "white",
    boxShadow: 24,
    width: 600,
    p: 4,
  };
  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <ScheduleIcon />
      </IconButton>
      <Modal
        sx={{ zIndex: 1 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="prescription-modal-title"
      >
        <Box sx={modalStyle}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              maxWidth: "500px",
              boxSizing: "border-box",
            }}
          >
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor="reschedule-date">Reschedule Date</FormLabel>
              <DatePicker
                size="small"
                format="MM/DD/YYYY HH:mm A"
                onChange={(date, dateString) => setRescheduleDate(date)}
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                className="h-full w-full"
                disabledDate={(current) => {
                  return current && current < dayjs().endOf("day");
                }}
                style={{ zIndex: 2, overflowY: "auto", maxHeight: 50 }}
              />
            </FormControl>

            <Button
              type="submit"
              variant="solid"
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
              onClick={handleSubmit}
            >
              Reschedule Appointment
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default RescheduleAppointment;
