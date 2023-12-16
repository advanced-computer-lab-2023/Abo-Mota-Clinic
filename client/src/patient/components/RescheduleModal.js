import React from 'react';
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useFetchAvailableAppointmentsQuery, usePatientRescheduleAppointmentMutation, useSendEmailMutation, useFet } from "../../store";
import {
  Modal,
  Button,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  Box,
  Typography,
  Divider
} from "@mui/joy";

import { useEffect, useState } from 'react';
import formatAppointments from "../functions/AppointmentsAdjustment";

import dayjs from "dayjs";

function RescheduleModal({ isModalOpen, setIsModalOpen, oldAppointmentId, onConfirm, placeholderImage, placeholderText, title, subtitle, doctorId }) {

  const { data: appointments, isFetching: isFetchingAppointments, isError: isErrorAppointments } = useFetchAvailableAppointmentsQuery(doctorId);

  const [rescheduleAppointment] = usePatientRescheduleAppointmentMutation();
  const [sendEmail] = useSendEmailMutation();

  const [timings, setTimings] = useState([]);
  const [date, setDate] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  if (isFetchingAppointments)
    return <div> Loading </div>;

  const formattedAppointments = formatAppointments(appointments);

  const handleRescheduleClick = () => {
    const body = {
      oldAppointmentId,
      newAppointmentId: selectedAppointmentId,
    }

    onConfirm(body);

    // TODO: ADD FEEDBACK

    onModalClose();
  }

  const handleDateChange = (date) => {
    const formattedDate = date.format("MM/DD/YYYY");
    setDate(date);

    console.log("Formatted Date", formattedDate);
    console.log("Appointments", formattedAppointments);

    const timingsForDate = formattedAppointments[formattedDate] || [];
    console.log("New Timings", timingsForDate);

    setTimings(timingsForDate);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppointmentId(null);
    setTimings([]);
    setDate(null);
  }

  const shouldDisableDate = (day) => {
    const enabledDays = Object.keys(formattedAppointments);
    // console.log(enabledDays);
    return !enabledDays.some((enabledDay) => dayjs(enabledDay).isSame(day, "day"));
  };


  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <ModalDialog sx={{ overflowY: "auto", maxHeight: "90vh" }}>
        <ModalClose onClick={() => setIsModalOpen(false)} />
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{subtitle}</DialogContent>
        <form>
          <Box>
            <Box className="flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  shouldDisableDate={shouldDisableDate}
                  onChange={handleDateChange}
                  slots={{ actionBar: () => <></> }}
                  disablePast
                />
              </LocalizationProvider>

              <Divider orientation='vertical' sx={{ my: 3 }} />

              {
                !date
                  ? (
                    <Box className="flex flex-grow justify-center items-center">
                      <Box className="flex flex-col justify-center items-center">
                        {placeholderImage}
                        <Typography level="body-xs">
                          {placeholderText}
                        </Typography>
                      </Box>
                    </Box >
                  )
                  : (
                    <Box
                      className="flex flex-grow justify-center items-center p-5"
                      sx={{
                        width: '20em',
                        height: '25em',
                        overflowY: "auto",
                      }}
                    >
                      <Box className="flex-col space-y-5">
                        {/* <Typography level="title-md" fontWeight={500}>
                          Select a time slot from below
                        </Typography> */}
                        {timings.map(([appointmentId, time]) => {
                          const isSelected = appointmentId === selectedAppointmentId;
                          const variant = isSelected ? "solid" : "outlined";
                          return (
                            <Button
                              key={time}

                              onClick={() => {
                                // setCurrentTime(time);
                                setSelectedAppointmentId(appointmentId);
                              }}

                              variant={variant}
                              color="primary"
                              fullWidth

                            // Apply a different style or class conditionally
                            // style={isSelected ? { backgroundColor: "#ADD8E6" } : {}}
                            >
                              {time}
                            </Button>
                          );
                        })}
                      </Box>

                    </Box>
                  )
              }

            </Box>

            {/* ACTION BAR */}
            <Box className="flex w-full justify-end">
              <Button color="primary" variant="plain" onClick={handleRescheduleClick}>
                Confirm
              </Button>
            </Box>
          </Box>
        </form>

      </ModalDialog>
    </Modal>

  )
}

export default RescheduleModal;