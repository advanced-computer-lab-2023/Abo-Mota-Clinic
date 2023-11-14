import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import { BusinessCenter, AccountBalance, MonetizationOn, Work } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItemButton } from "@mui/joy";
// Style for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px",
  borderRadius: "16px", // Rounded border
  boxShadow: 24,
  p: 4,
};

// Inline styles
const listItemStyle = {
  cursor: "pointer",
  border: "2px solid #f0f0f0", // Default no border
  borderRadius: 8, // Rounded corners
  marginBottom: 5, // Spacing between items
  padding: 10,
};

const selectedOrHoveredStyle = {
  ...listItemStyle,
  backgroundColor: "#E6F7FF",
  border: "2px solid #80DEEA",
  display: "flex",
  justifyContent: "space-between",
};

const disabledStyle = {
  ...listItemStyle,
  backgroundColor: "#f0f0f0",
  border: "2px solid #f0f0f0",
  display: "flex",
  justifyContent: "space-between",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  minWidth: "40%",
  bgcolor: "background.paper",
  border: "2px",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
  overflowX: "hidden",
  maxHeight: "100vh",
  overflowY: "hidden",
};
export default function UserSelectionModal({
  selectedUser,
  setSelectedUser,
  users,
  isSubscribing,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    handleClose();
    console.log("Selected User:", selectedUser);
  };

  const [hoveredPosition, setHoveredPosition] = useState(-1);

  const handleListItemClick = (user) => {
    setSelectedUser(user);
  };

  const handleMouseEnter = (user) => {
    setHoveredPosition(user);
  };

  const handleMouseLeave = () => {
    setHoveredPosition(-1);
  };

  const isItemSelectedOrHovered = (position) => {
    return position === selectedUser || position === hoveredPosition;
  };
  const isDisabled = (user) =>
    isSubscribing &&
    !(user.healthPackage.status === "cancelled" || user.healthPackage.status === null);
  console.log(isSubscribing);
  return (
    <Box>
      <Button onClick={handleOpen} variant="outlined">
        Select User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose from the following users
          </Typography>
          <List
            sx={{
              maxHeight: "80vh", // Adjust this value as needed
              overflowY: "auto",
            }}
            component="nav"
            aria-label="position selection list"
          >
            {users.map((user, idx) => (
              <ListItemButton
                key={idx}
                disabled={isDisabled(user)}
                style={
                  isDisabled(user)
                    ? disabledStyle
                    : isItemSelectedOrHovered(user)
                    ? selectedOrHoveredStyle
                    : listItemStyle
                }
                onClick={() => handleListItemClick(user)}
                onMouseEnter={() => handleMouseEnter(user)}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={idx === 0 ? "You" : user.name}
                  secondary={`${user.username} - ${idx === 0 ? "You" : user.relationToPatient}`}
                />
                {isItemSelectedOrHovered(user) && <ChevronRightIcon />}
              </ListItemButton>
            ))}
          </List>
          <Box>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={selectedUser === -1}
            >
              Select User
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
