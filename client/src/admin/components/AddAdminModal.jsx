import React, { useState } from "react";
import "../styles.css";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FiUserPlus } from "react-icons/fi";
import { useAddAdminMutation } from "../../store";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalPaperStyle = {
  backgroundColor: "white",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  padding: "16px",
  minWidth: "300px",
};

function AddAdminModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail]= useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [addAdmin, results] = useAddAdminMutation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Handle form submission here
    event.preventDefault();
    // console.log(username, password);
    await addAdmin({ username, password,email });
    setUsername("");
    setPassword("");
    setEmail("");
    setOpen(false);
  };

  return (
    <div>
      <div className="card" style={{ display: "block", marginLeft: "50px" }}>
        <FiUserPlus className="user-plus-icon" onClick={handleOpen} />
        <button className="admin-button" onClick={handleOpen}>
          Add Admin
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-admin-modal-title"
        aria-describedby="add-admin-modal-description"
        style={modalStyle}
      >
        <div style={modalPaperStyle}>
          <h2 id="add-admin-modal-title">Add Administrator</h2>
          <form onSubmit={handleSubmit}>
          <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              required
              margin="normal"
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              required
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              margin="normal"
            />
            <div style={{ marginTop: "20px", marginLeft: "230px" }}>
              <Button type="submit" variant="outlined" color="success">
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AddAdminModal;
