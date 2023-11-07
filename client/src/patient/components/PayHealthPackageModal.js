import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: "none",
  margin: theme.spacing(2),
  fontSize: theme.typography.pxToRem(16),
  padding: theme.spacing(1, 4),
  boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
}));
export default function PayHealthPackageModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("wallet");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <StyledButton onClick={handleOpen} variant="contained" color="primary">
        Subscribe
      </StyledButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="payment-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              Payment Methods
            </Typography>
            <RadioGroup
              aria-labelledby="payment-modal-title"
              value={selectedValue}
              onChange={handleChange}
              name="payment-method-radio-buttons-group"
            >
              <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
              <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
            </RadioGroup>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
            >
              Pay
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
