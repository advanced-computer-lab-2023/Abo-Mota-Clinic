import { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Card, Divider, Typography, Button } from '@mui/joy';
import { Box } from '@mui/material';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(customParseFormat);
dayjs.extend(weekday);

// Create a Day.js date object
// const date = dayjs('2023-06-05', { locale: 'en', format: 'YYYY-MM-DD' });

// Format the date in the desired English format
// const formattedDate = date.format('dddd Do [of] MMMM YYYY');

const format = (date) => date.format('dddd Do [of] MMMM YYYY');


export default function PatientTest() {
  // const [disabledDays, setDisabledDays] = useState([dayjs("2023-10-10"), dayjs("2021-10-12")]);

  const disabledDays = [dayjs("2023-10-26"), dayjs("2023-10-25"), dayjs("2023-11-2"), dayjs("2023-11-3")];
  const [date, setDate] = useState(null);

  // const handleDateChange = (date) => {
  //   // Disable the selected date and the next day.
  //   setDisabledDays([date, date.add(1, 'day')]);
  // };

  const timings = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "7:00 PM", "8:00 PM"];

  return (
    <div className='m-10'>

      <Card
        orientation="horizontal"
        className="p-5 space-y-5"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            shouldDisableDate={(day) => disabledDays.some((disabledDay) => dayjs(disabledDay).isSame(day, 'day'))}
            onChange={(date) => {
              setDate(format(date));
            }}
            disablePast
          />
        </LocalizationProvider>

        <Divider />


        <Box className="h-72 w-80 p-5" sx={{
          overflowY: "scroll",
        }}>
          <Typography level='title-md' sx={{marginBottom: 2}}>
            {date}
          </Typography>

          <Box className="space-y-5">
            {
              timings.map((time) => {
                return (
                  <Button variant="outlined" color="primary" fullWidth disabled={Math.floor(Math.random() * 2)}>
                    {time}
                  </Button>
                );
              })
            }
          </Box>
        </Box>
      </Card>
    </div>
  );
}