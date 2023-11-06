import React from "react";
import HealthPackageCard from "../components/HealthPackageCard";
import { Box } from "@mui/material";

const healthPackages = [
  {
    id: 1,
    name: "Basic Health Plan",
    pricePerYear: 800.0,
    doctorDiscount: 10,
    pharmacyDiscount: 5,
    familyDiscount: 5,
  },
  {
    id: 2,
    name: "Premium Health Plan",
    pricePerYear: 1500.0,
    doctorDiscount: 20,
    pharmacyDiscount: 15,
    familyDiscount: 10,
  },
  {
    id: 3,
    name: "Elite Health Plan",
    pricePerYear: 2500.0,
    doctorDiscount: 30,
    pharmacyDiscount: 20,
    familyDiscount: 20,
  },
  {
    id: 4,
    name: "Senior Health Plan",
    pricePerYear: 1200.0,
    doctorDiscount: 15,
    pharmacyDiscount: 10,
    familyDiscount: 25,
  },
  {
    id: 5,
    name: "Child Health Plan",
    pricePerYear: 600.0,
    doctorDiscount: 5,
    pharmacyDiscount: 10,
    familyDiscount: 0,
  },
];

function HealthPackages() {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
      {healthPackages.map((healthPackage) => {
        return <HealthPackageCard healthPackage={healthPackage} />;
      })}
    </Box>
  );
}

export default HealthPackages;
