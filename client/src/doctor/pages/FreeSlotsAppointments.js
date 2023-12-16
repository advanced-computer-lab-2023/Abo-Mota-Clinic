import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/joy/Container';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import { blue } from '@mui/material/colors';
import { useAddFreeSlotsMutation } from '../../store';
import { useNavigate } from "react-router-dom";

function FreeSlotsAppointments() {
  const navigate = useNavigate();
  const [date, setDate] = useState(null); 
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState(45);
  const [buffer, setBuffer] = useState(5);
  const [addSlots, results] = useAddFreeSlotsMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ 
      date: date ? date.toISOString().substring(0, 10) : null, 
      startTime, 
      endTime, 
      appointmentDuration, 
      buffer 
    });

    const body = {
      date, 
      startTime, 
      endTime, 
      appointmentDuration, 
      buffer
    };
    await addSlots(body);
    
    setDate(null);
    setStartTime("");
    setEndTime("");

    setTimeout(() => {
      navigate("/doctor/");
    }, 1500);
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value)); 
  };

  return (
    <Container>
      <Typography 
  level="h4" 
  component="h1" 
  sx={{ 
    mb: 3, 
    fontSize: '2rem', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: blue[700]
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
              value={endTime}
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
  
          <Button type="submit" variant="solid" onClick={handleSubmit}>Add Time Slots</Button>
        </form>
      </Sheet>
    </Container>
  );
  
}

export default FreeSlotsAppointments;
