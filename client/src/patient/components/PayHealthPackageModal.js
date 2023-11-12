import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetchPatientQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";

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
  color: theme.palette.primary.main,
  boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
  borderColor: theme.palette.primary.main,
  borderWidth: 1,
  borderStyle: "solid",
  backgroundColor: theme.palette.action.hover,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function PayHealthPackageModal({
  selectedIdx,
  selectedPackage,
  setSelectedPackage,
}) {
  const navigate = useNavigate();

  console.log("SelectedPackage @ PayHealthPackageModal", selectedIdx);
  console.log(selectedPackage);
  const {
    data: patient,
    isFetching: isFetchingPatient,
    error: errorPatient,
  } = useFetchPatientQuery();

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("wallet");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedPackage(-1);
    setOpen(false);
  };
  if (isFetchingPatient) {
    return <LoadingIndicator />;
  }

  const handleSubscribeClick = () => {
    navigate(`./${selectedIdx}`);
  };

  const handlePayClick = () => {
    handleClose();
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Box>
      <StyledButton
        disabled={patient.healthPackage || selectedPackage === undefined ? true : false}
        onClick={handleSubscribeClick}
        variant="contained"
        color="primary"
      >
        Subscribe
      </StyledButton>
      {selectedPackage === undefined ? null : (
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
                {selectedPackage === undefined
                  ? null
                  : `Pay for ${selectedPackage["name"]} package`}
              </Typography>
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
      )}
    </Box>
  );
}
