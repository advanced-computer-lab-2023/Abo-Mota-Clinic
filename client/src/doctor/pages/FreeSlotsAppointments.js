import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';

function FreeSlotsAppointments() {
  const [date, setDate] = useState(null); // Changed to null to handle Date object
  const [startTime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState(45);
  const [buffer, setBuffer] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ 
      date: date ? date.toISOString().substring(0, 10) : null, // Convert Date object to ISO string
      startTime, 
      endtime, 
      appointmentDuration, 
      buffer 
    });
    setDate(null);
    setStartTime("");
    setEndTime("");
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value)); // Convert string to Date object
  };

  return (
    <Container>
      <Typography 
  level="h4" 
  component="h1" 
  sx={{ 
    mb: 3, 
    fontSize: '2rem', // Larger font size
    fontWeight: 'bold', // Bolder font weight
    textAlign: 'center', // Center align
    color: '#0000ff' // Adjust color if needed
  }}
>
  Free Appointment Slots
</Typography>
      <Sheet variant="outlined" sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="date-input">Date</FormLabel>
            <Input
              id="date-input"
              type="date"
              value={date ? date.toISOString().substring(0, 10) : ''}
              onChange={handleDateChange}
            />
          </FormControl>
  
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="start-time-input">Start Time</FormLabel>
            <Input
              id="start-time-input"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormControl>
  
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="end-time-input">End Time</FormLabel>
            <Input
              id="end-time-input"
              type="time"
              value={endtime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormControl>
  
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="duration-input">Appointment Duration (mins)</FormLabel>
            <Input
              id="duration-input"
              type="number"
              value={appointmentDuration}
              onChange={(e) => setAppointmentDuration(e.target.value)}
            />
          </FormControl>
  
          <FormControl fullWidth sx={{ mb: 4 }}>
            <FormLabel htmlFor="buffer-input">Buffer (mins)</FormLabel>
            <Input
              id="buffer-input"
              type="number"
              value={buffer}
              onChange={(e) => setBuffer(e.target.value)}
            />
          </FormControl>
  
          <Button type="submit" variant="solid">Add Time Slots</Button>
        </form>
      </Sheet>
    </Container>
  );
  
}

export default FreeSlotsAppointments;
