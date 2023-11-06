import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { List, Modal } from "antd";
import { useState } from "react";
// You may need to adjust these colors to match the design exactly.
const CardHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(20),
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(2),
}));
const TooltipIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: "1rem",
  verticalAlign: "middle",
  marginLeft: theme.spacing(1),
}));
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: "none",
  margin: theme.spacing(2),
  fontSize: theme.typography.pxToRem(16),
  padding: theme.spacing(1, 4),
  boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: "90vw", // Ensure it doesn't go beyond the screen width
  bgcolor: "background.paper",
  borderRadius: "16px", // Rounded corners
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
  p: 4,
  outline: "none", // Remove default focus outline
};

const HealthPackageCard = ({ healthPackage }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ justifyContent: "center" }}>
      <StyledCard>
        <CardHeader>{healthPackage.name}</CardHeader>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            ${healthPackage.pricePerYear}/year
          </Typography>
          <Box sx={{ my: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="body2">
                Doctor Discount: {healthPackage.doctorDiscount}%
              </Typography>
              <Tooltip title="Discount provided on doctor's consultation fees">
                <TooltipIcon />
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="body2">
                Pharmacy Discount: {healthPackage.pharmacyDiscount}%
              </Typography>
              <Tooltip title="Discount provided on pharmacy purchases">
                <TooltipIcon />
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="body2">
                Family Discount: {healthPackage.familyDiscount}%
              </Typography>
              <Tooltip title="Discount provided for family members">
                <TooltipIcon />
              </Tooltip>
            </Box>
          </Box>
          <StyledButton onClick={handleOpen} variant="contained" color="primary">
            Subscribe
          </StyledButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="payment-modal"
            aria-describedby="payment-options"
          >
            <Box sx={modalStyle}>
              <Typography id="payment-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
                Payment Methods
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                  //   onClick={() => handlePayment("VISA")}
                  >
                    <ListItemText primary="Wallet" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                  //   onClick={() => handlePayment("MASTERCARD")}
                  >
                    <ListItemText primary="Credit Card" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: "100%" }}
                // onClick={handleNextStep}
              >
                Next Step
              </Button>
            </Box>
          </Modal>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default HealthPackageCard;
