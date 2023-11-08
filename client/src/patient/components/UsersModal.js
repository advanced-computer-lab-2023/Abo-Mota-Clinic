import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { List, ListItem } from "@mui/material";

const users = ["User 1", "User 2", "User 3", "User 4"]; // Example user list

const UserSelectionModal = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSubmit = () => {
    // Handle the selected users here, e.g., send them to the server or perform some action
    console.log("Selected User:", selectedUser);
    handleClose(); // Close the modal after submission
  };

  return (
    <Box>
      <Button onClick={handleOpen}>View Reviews</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Select which user you want to book an appointment for
            </Typography>
            <List>
              {users.map((user) => (
                <ListItem key={user} disablePadding sx={{ mb: 3 }}>
                  <Button
                    variant={selectedUser === user ? "contained" : "outlined"}
                    onClick={() => handleUserClick(user)}
                    style={{ width: "100%" }}
                  >
                    {user}
                  </Button>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "16px", width: "100%" }}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserSelectionModal;
