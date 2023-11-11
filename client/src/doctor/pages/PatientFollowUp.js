import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from "antd";
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@mui/joy';
import dayjs from "dayjs";

function PatientFollowUp() {
  const [followUpDate, setFollowUpDate] = useState(null);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const {patientId}=useParams();
  console.log(patientId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... submit logic ...
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center', 
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        width: '100%', 
        maxWidth: '500px', 
        boxSizing: 'border-box',
      }}>
  
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="follow-up-date">Follow Up Date</FormLabel>
          <DatePicker
            format="MM/DD/YYYY HH:mm A"
            onChange={(date, dateString) => setFollowUpDate(date)}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
            className="h-full w-full"
          />
        </FormControl>
  
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="notes">Notes</FormLabel>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            minRows={3}
            fullWidth
          />
        </FormControl>
  
        <Button type="submit" variant="solid" sx={{
          mt: 2,
          py: 1.5,
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          '&:hover': {
              backgroundColor: '#0056b3',
          },
        }}>
          Schedule Follow Up
        </Button>
      </Box>
    </Box>
  );
  
}

export default PatientFollowUp;
