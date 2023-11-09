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
dayjs.extend(customParseFormat);
dayjs.extend(weekday);

// Create a Day.js date object
// const date = dayjs('2023-06-05', { locale: 'en', format: 'YYYY-MM-DD' });

// Format the date in the desired English format
// const formattedDate = date.format('dddd Do [of] MMMM YYYY');

const format = (date) => date.format("dddd Do [of] MMMM YYYY");

export default function PatientTest({ doctorId }) {
  // const [disabledDays, setDisabledDays] = useState([dayjs("2023-10-10"), dayjs("2021-10-12")]);

  // const enabledDays = [
  //   dayjs("2023-11-26"),
  //   dayjs("2023-12-25"),
  //   dayjs("2023-11-10"),
  //   dayjs("2023-11-09"),
  // ];
  const [date, setDate] = useState(null);

  // const handleDateChange = (date) => {
  //   // Disable the selected date and the next day.
  //   setDisabledDays([date, date.add(1, 'day')]);
  // };

  // const timings = [
  //   "12:00 PM",
  //   "1:00 PM",
  //   "2:00 PM",
  //   "3:00 PM",
  //   "4:00 PM",
  //   "5:00 PM",
  //   "7:00 PM",
  //   "8:00 PM",
  // ];
  const customTimings = {
    "2023-11-26": ["10:00 AM", "11:00 AM", "1:00 PM"],
    "2023-12-01": ["2:00 PM", "3:00 PM", "5:00 PM"],
    // Add more dates and their respective timings here
  };
  const [currentTimings, setCurrentTimings] = useState([]);

  // Modify your onChange handler for the date picker
  const handleDateChange = (newDate) => {
    setDate(format(newDate));
    // Update the timings based on the selected date
    const formattedDate = newDate.format("YYYY-MM-DD");
    console.log(formattedDate);

    const timingsForDate = customTimings[formattedDate] || []; // Fallback to an empty array if no timings found
    setCurrentTimings(timingsForDate);
    console.log(timingsForDate);
  };

  const shouldDisableDate = (day) => {
    const enabledDays = Object.keys(customTimings);
    // console.log(enabledDays);
    return !enabledDays.some((enabledDay) => dayjs(enabledDay).isSame(day, "day"));
  };

  const { data: appointments, isFetching, error } = useFetchAvailableAppointmentsQuery(doctorId);

  if (isFetching) {
    return <LoadingIndicator />;
  } else if (error) {
    return <div> Error ... </div>;
  }
  // console.log(appointments);
  // console.log(Object.keys(currentTimings));
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
              return (
                <Button variant="outlined" color="primary" fullWidth>
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
