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
  border: "1px solid transparent", // Default no border
  borderRadius: 8, // Rounded corners
  marginBottom: 2, // Spacing between items
};

const selectedOrHoveredStyle = {
  ...listItemStyle,
  backgroundColor: "#E6F7FF",
  border: "1px solid #80DEEA",
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
};
export default function UserSelectionModal() {
  const [open, setOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log("Selected Position:", selectedPosition);
  };

  const [hoveredPosition, setHoveredPosition] = useState(null);

  const handleListItemClick = (position) => {
    setSelectedPosition(position);
  };

  const handleMouseEnter = (position) => {
    setHoveredPosition(position);
  };

  const handleMouseLeave = () => {
    setHoveredPosition(null);
  };

  const isItemSelectedOrHovered = (position) => {
    return position === selectedPosition || position === hoveredPosition;
  };

  return (
    <div>
      <Button onClick={handleOpen}>Select Desired User</Button>
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
          <List component="nav" aria-label="position selection list">
            {["Board Member", "Seed Investor & Board Observer"].map((position) => (
              <ListItem
                key={position}
                style={isItemSelectedOrHovered(position) ? selectedOrHoveredStyle : listItemStyle}
                onClick={() => handleListItemClick(position)}
                onMouseEnter={() => handleMouseEnter(position)}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={position} secondary="Surfe Sept 2020 - present" />
                {isItemSelectedOrHovered(position) && <ChevronRightIcon />}
              </ListItem>
            ))}
          </List>
          <Box>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!selectedPosition}
            >
              Select User
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
