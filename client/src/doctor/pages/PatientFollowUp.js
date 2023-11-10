import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from "antd";
import { FormControl, FormLabel } from '@mui/joy';
import dayjs from "dayjs";



function PatientFollowUp() {
  const [patientUsername, setPatientUsername] = useState('');
  const [followUpDate, setFollowUpDate] = useState(null);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      if (!patientUsername || !followUpDate) {
      
        console.error("Patient ID and follow-up date are required");
        return;
      }

      
      const followUpData = {
        patientUsername,
        date: followUpDate,
        notes,
      };
      setPatientUsername("");
      setFollowUpDate("");
      setNotes("");
  
      console.log({
       followUpData
      });

     

    } catch (error) {
      
      console.error(error);
    }
  };

  
  const formFieldStyle = { marginBottom: '10px' };
  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
  
        <div style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={formFieldStyle}>
              Patient Username: 
              <input
                type="text"
                value={patientUsername}
                onChange={(e) => setPatientUsername(e.target.value)}
                required
              />
            </label>
            {/* <label style={formFieldStyle}>
              Follow Up Date:
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                required
              />
            </label> */}
            <FormControl id="multiple-limit-tags">
              <FormLabel>Follow Up Date</FormLabel>
                <DatePicker
                  format="MM/DD/YYYY HH:mm A"
                  onChange={(date, dateString) => {setFollowUpDate(date); console.log(date.toString())}}
                  showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                  className="h-full w-56"
                />
            </ FormControl>

            <label style={formFieldStyle}>
              Notes:
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <button type="submit" style={buttonStyle}>Schedule Follow Up</button>
          </form>
        </div>
      );
}

export default PatientFollowUp;
