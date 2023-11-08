import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientFollowUp() {
  const [patientId, setPatientId] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      if (!patientId || !followUpDate) {
      
        console.error("Patient ID and follow-up date are required");
        return;
      }

      
      const followUpData = {
        patientId,
        date: followUpDate,
        notes,
      };
      setPatientId("");
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
              Patient ID:
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </label>
            <label style={formFieldStyle}>
              Follow Up Date:
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                required
              />
            </label>
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
