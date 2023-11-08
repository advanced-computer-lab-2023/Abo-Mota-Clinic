import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function FreeSlotsAppointments() {
  const [provider, setProvider] = useState('');
  const [timezone, setTimezone] = useState('');
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [appointmentDuration, setAppointmentDuration] = useState(45);
  const [buffer, setBuffer] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      provider,
      timezone,
      date,
      startTime,
      appointmentDuration,
      buffer,
    });


    setTimezone('');
    setDate(null);
    setStartTime(null);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h4" align="center" style={{ margin: '20px 0' }}>
        Free Appointment Slots
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            label="Provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
              fullWidth
            />
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newTime) => setStartTime(newTime)}
              renderInput={(params) => <TextField {...params} />}
              fullWidth
            />
          </LocalizationProvider>
          <TextField
            required
            type="number"
            label="Appointment Duration (mins)"
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(e.target.value)}
            fullWidth
          />
          <TextField
            required
            type="number"
            label="Buffer (mins)"
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Time Slots
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default FreeSlotsAppointments;
