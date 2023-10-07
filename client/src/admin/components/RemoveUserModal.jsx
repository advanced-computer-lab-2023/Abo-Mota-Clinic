import React, { useState } from 'react';
import '../styles.css';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {FiUserMinus} from 'react-icons/fi';

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalPaperStyle = {
  backgroundColor: 'white',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  padding: '16px',
  minWidth: '300px',
};

function RemoveUserModal() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission here
    setUsername('');
    setRole('');
    setOpen(false);
  };

  return (
    <div>
      <div className='card' style={{display: 'block'}}>
        <FiUserMinus className='user-plus-icon' onClick={handleOpen}/>
        <button className='admin-button' onClick={handleOpen}>Remove User</button>
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-admin-modal-title"
        aria-describedby="add-admin-modal-description"
        style={modalStyle}
      >
        <div style={modalPaperStyle}>
          <h2 id="add-admin-modal-title">Remove User</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              required
              margin="normal"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Select Role</InputLabel>
              <Select
                label="Select Role"
                value={role}
                onChange={handleRoleChange}
                required
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Patient">Patient</MenuItem>
              </Select>
            </FormControl>
            <div style={{marginTop: '20px', marginLeft: '230px'}}>
            <Button type="submit" variant="outlined" color="error">
              Remove
            </Button>
            </div>
            
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default RemoveUserModal;
