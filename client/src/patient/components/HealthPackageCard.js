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
import PayHealthPackageModal from "./PayHealthPackageModal";
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

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   maxWidth: "90vw",
//   bgcolor: "background.paper",
//   borderRadius: "16px",
//   boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
//   p: 4,
//   outline: "none",
// };

const HealthPackageCard = ({ healthPackage }) => {
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
          <PayHealthPackageModal />
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default HealthPackageCard;
