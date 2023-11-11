import { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Card, Divider, Typography, Button } from "@mui/joy";
import { Box } from "@mui/material";

import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import { useFetchAvailableAppointmentsQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";
import formatAppointments from "../functions/AppointmentsAdjustment";
dayjs.extend(customParseFormat);
dayjs.extend(weekday);

// Create a Day.js date object
// const date = dayjs('2023-06-05', { locale: 'en', format: 'YYYY-MM-DD' });

// Format the date in the desired English format
// const formattedDate = date.format('dddd Do [of] MMMM YYYY');

const format = (date) => date.format("dddd Do [of] MMMM YYYY");

export default function PatientTest({
  currentTimings,
  setCurrentTimings,
  date,
  setDate,
  currentTime,
  setCurrentTime,
  doctorId,
}) {
  const { data, isFetching, error } = useFetchAvailableAppointmentsQuery(doctorId);

  if (isFetching) {
    return <LoadingIndicator />;
  } else if (error) {
    return <div> Error ... </div>;
  }
  // console.log(data);
  // console.log(Object.keys(currentTimings));
  const appointments = formatAppointments(data);
  // console.log(appointments);
  // console.log(data);

  const handleDateChange = (newDate) => {
    setDate(format(newDate));
    const formattedDate = newDate.format("MM/DD/YYYY");
    // console.log(formattedDate);

    const timingsForDate = appointments[formattedDate] || [];
    setCurrentTimings(timingsForDate);
    // console.log(timingsForDate);
  };

  const shouldDisableDate = (day) => {
    const enabledDays = Object.keys(appointments);
    // console.log(enabledDays);
    return !enabledDays.some((enabledDay) => dayjs(enabledDay).isSame(day, "day"));
  };
  console.log(currentTime);
  return (
    <div className="m-10">
      <Card orientation="horizontal" className="p-5 space-y-5">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            shouldDisableDate={shouldDisableDate}
            onChange={handleDateChange}
            disablePast
          />
        </LocalizationProvider>

        <Divider />

        <Box
          className="h-72 w-80 p-5"
          sx={{
            overflowY: "scroll",
          }}
        >
          <Typography level="title-md" sx={{ marginBottom: 2 }}>
            {date}
          </Typography>

          <Box className="space-y-5">
            {currentTimings.map((time) => {
              const isSelected = time === currentTime;
              return (
                <Button
                  key={time}
                  onClick={() => setCurrentTime(time)}
                  variant="outlined"
                  color="primary"
                  fullWidth
                  // Apply a different style or class conditionally
                  style={isSelected ? { backgroundColor: "#ADD8E6" } : {}}
                >
                  {time}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Card>
    </div>
  );
}
