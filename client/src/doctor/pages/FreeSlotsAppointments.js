import React, { useState } from 'react';

function FreeSlotsAppointments() {

  const [provider, setProvider] = useState('');
  const [timezone, setTimezone] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
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
    setTimezone("");
    setDate("");
    setStartTime("");


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
  const headerStyle = { marginBottom: '20px', color: '#333', fontSize: '24px' };

  return (
    <div>
      <h1 style={headerStyle}>Free Appointment Slots</h1>
      <form onSubmit={handleSubmit}>
        <div style={formFieldStyle}>
          <label>
            Provider
            <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} />
          </label>
        </div>
        <div style={formFieldStyle}>
          <label>
            Timezone
            <input type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
          </label>
        </div>
        <div style={formFieldStyle}>
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <div style={formFieldStyle}>
          <label>
            Start Time
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
        </div>
        <div style={formFieldStyle}>
          <label>
            Appointment Duration (mins)
            <input type="number" value={appointmentDuration} onChange={(e) => setAppointmentDuration(e.target.value)} />
          </label>
        </div>
        <div style={formFieldStyle}>
          <label>
            Buffer (mins)
            <input type="number" value={buffer} onChange={(e) => setBuffer(e.target.value)} />
          </label>
        </div>
        <div>
          <button type="submit" style={buttonStyle}>Add Time Slots</button>
        </div>
      </form>

    </div>
  );
}

export default FreeSlotsAppointments;