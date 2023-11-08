// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   Tooltip,
//   ListItemButton,
//   ListItemText,
//   ListItem,
// } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";

// import { styled } from "@mui/material/styles";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import PayHealthPackageModal from "./PayHealthPackageModal";
// import { useState } from "react";
// // You may need to adjust these colors to match the design exactly.
// const CardHeader = styled(Typography)(({ theme }) => ({
//   fontSize: theme.typography.pxToRem(20),
//   color: theme.palette.common.white,
//   backgroundColor: theme.palette.primary.main,
//   padding: theme.spacing(1),
//   borderTopLeftRadius: theme.shape.borderRadius,
//   borderTopRightRadius: theme.shape.borderRadius,
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//   minWidth: 275,
//   borderRadius: theme.shape.borderRadius,
//   textAlign: "center",
//   boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
//   margin: theme.spacing(2),
// }));

// const TooltipIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
//   fontSize: "1rem",
//   verticalAlign: "middle",
//   marginLeft: theme.spacing(1),
// }));

// // const modalStyle = {
// //   position: "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: "auto",
// //   maxWidth: "90vw",
// //   bgcolor: "background.paper",
// //   borderRadius: "16px",
// //   boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
// //   p: 4,
// //   outline: "none",
// // };

// const HealthPackageCard = ({ healthPackage, setSelected, selected, index }) => {
//   const { name, pricePerYear, doctorDiscount, familyDiscount, pharmacyDiscount } = healthPackage;
//   const features = [
//     {
//       name: `Doctor Discount: ${doctorDiscount}%`,
//       tooltip: "Discount provided on doctor's consultation fees",
//     },
//     {
//       name: `Pharmacy Discount: ${pharmacyDiscount}%`,
//       tooltip: "Discount provided on pharmacy purchases",
//     },
//     {
//       name: `Family Discount: ${familyDiscount}%`,
//       tooltip: "Discount provided for family members",
//     },
//   ];
//   return (
//     // <Box sx={{ justifyContent: "center" }}>
//     //   <StyledCard>
//     //     <CardHeader>{name}</CardHeader>
//     //     <CardContent>
//     //       <Typography variant="h6" component="div" gutterBottom>
//     //         ${pricePerYear}/year
//     //       </Typography>
//     //       <Box sx={{ my: 2 }}>
//     //         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//     //           <Typography variant="body2">
//     //             Doctor Discount: {doctorDiscount}%
//     //           </Typography>
//     //           <Tooltip title="Discount provided on doctor's consultation fees">
//     //             <TooltipIcon />
//     //           </Tooltip>
//     //         </Box>
//     //         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//     //           <Typography variant="body2">
//     //             Pharmacy Discount: {pharmacyDiscount}%
//     //           </Typography>
//     //           <Tooltip title="Discount provided on pharmacy purchases">
//     //             <TooltipIcon />
//     //           </Tooltip>
//     //         </Box>
//     //         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//     //           <Typography variant="body2">
//     //             Family Discount: {familyDiscount}%
//     //           </Typography>
//     //           <Tooltip title="Discount provided for family members">
//     //             <TooltipIcon />
//     //           </Tooltip>
//     //         </Box>
//     //       </Box>
//     //       <PayHealthPackageModal />
//     //     </CardContent>
//     //   </StyledCard>
//     // </Box>
//     //--------------------------------------------------------
//     // <Card
//     //   onClick={() => setSelected(index)}
//     //   sx={{
//     //     maxWidth: 345,
//     //     border: selected === index ? 2 : 1,
//     //     borderColor: selected === index ? "primary.main" : "grey.300",
//     //     boxShadow: selected === index ? 3 : 1,
//     //   }}
//     // >
//     //   <CardHeader
//     //     subheader={pricePerYear}
//     //     titleTypographyProps={{ align: "center" }}
//     //     subheaderTypographyProps={{ align: "center" }}
//     //     sx={{
//     //       backgroundColor: selected === index ? "primary.main" : "grey.100",
//     //       color: selected === index ? "common.white" : "text.primary",
//     //     }}
//     //   >
//     //     {name} - ${pricePerYear}/year
//     //   </CardHeader>
//     //   <CardContent>
//     //     {features.map(({ name, tooltip }, index) => (
//     //       <Box display="flex" alignItems="center" key={index}>
//     //         <CheckIcon color="success" />
//     //         <Typography variant="subtitle1" component="p">
//     //           {name}
//     //         </Typography>
//     //         <Tooltip title={tooltip}>
//     //           <TooltipIcon />
//     //         </Tooltip>
//     //       </Box>
//     //     ))}
//     //     <PayHealthPackageModal />
//     //   </CardContent>
//     // </Card>
//   );
// };

// export default HealthPackageCard;

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PayHealthPackageModal from "./PayHealthPackageModal";

const CustomCard = styled(Card)(({ theme, selected, index }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    selected === index ? "0 4px 8px 0 rgba(0, 0, 0, 0.2)" : "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  padding: theme.spacing(2),
  border: selected === index ? `3px solid #ADD8E6` : "none",
  position: "relative",
  backgroundColor: "#FFF",
  //selected === index ? theme.palette.error.light : "#FFF",
}));

const CardWrapper = styled("div")({
  position: "relative",
  alignContent: "center",
  justifyContent: "center",
});

// Adjust the SelectedLabel style to match the width of its parent
const SelectedLabel = styled(Typography)(({ theme }) => ({
  position: "absolute",
  left: "50%", // Center horizontally relative to the parent
  transform: "translate(-50%, -50%)", // Set left to 0
  padding: theme.spacing(0.5, 2),
  color: theme.palette.error.contrastText,
  borderRadius: theme.shape.borderRadius,
  zIndex: 2,
  backgroundColor: "#ADD8E6",
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  position: "relative", // This sets up the positioning context
  alignContent: "center",
  margin: theme.spacing(2), // You might want to set some margin for visual spacing
}));

const FeatureList = styled(Box)(({ theme }) => ({
  textAlign: "left",
  paddingLeft: theme.spacing(3),
}));

const FeatureItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
const TooltipIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: "1rem",
  verticalAlign: "middle",
  marginLeft: theme.spacing(1),
}));

const HealthPackageCard = ({ healthPackage, selected, setSelected, index }) => {
  const { name, pricePerYear, doctorDiscount, familyDiscount, pharmacyDiscount } = healthPackage;
  return (
    <CardWrapper>
      {selected === index && <SelectedLabel variant="caption">SELECTED</SelectedLabel>}
      <CustomCard selected={selected} index={index} onClick={() => setSelected(index)}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <PriceTag color="primary" gutterBottom>
          ${pricePerYear}
        </PriceTag>
        <Typography color="textSecondary">/Year</Typography>
        <CardContent>
          <FeatureList>
            <FeatureItem>
              <CheckCircleIcon color="success" /> Doctor Discount: {doctorDiscount}%
              <Tooltip title="Discount provided on doctor appointments">
                <TooltipIcon />
              </Tooltip>
            </FeatureItem>
            <FeatureItem>
              <CheckCircleIcon color="success" /> Pharmacy Discount: {pharmacyDiscount}%
              <Tooltip title="Discount provided on pharmacy purchases">
                <TooltipIcon />
              </Tooltip>
            </FeatureItem>
            <FeatureItem>
              <CheckCircleIcon color="success" /> Family Discount: {familyDiscount}%
              <Tooltip title="Discount provided for family members">
                <TooltipIcon />
              </Tooltip>
            </FeatureItem>
          </FeatureList>
          <PayHealthPackageModal />
        </CardContent>
      </CustomCard>
    </CardWrapper>
  );
};

export default HealthPackageCard;
