import { Box, Typography } from "@mui/joy";
import React from "react";
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import AddPrescription from "../components/AddPrescription";

function ViewPrescriptionsDoctor() {
  const dummy_data = [
    {
      date: "03/15/2023",
      doctor: {
        name: "Dr. Smith",
        specialty: "Cardiology",
      },
      medicines: [
        {
          medicine: {
            name: "Medicine A",
          },
          dosage: 250,
          frequency: "Twice a day",
          duration: "10 days",
        },
        {
          medicine: {
            name: "Medicine B",
          },
          dosage: 100,
          frequency: "Once a day",
          duration: "7 days",
        },
      ],
      description: "General heart care and monitoring",
      status: "filled",
    },
    {
      date: "04/22/2023",
      doctor: {
        name: "Dr. Williams",
        specialty: "Neurology",
      },
      medicines: [
        {
          medicine: {
            name: "Medicine C",
          },
          dosage: 150,
          frequency: "Three times a day",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
    },
  ];
  return (
    <Box sx={{ width: "100%", m: 5 }}>
      <Typography>View Prescriptions</Typography>
      <Box sx={{ width: "100%", mt: 5 }}>
        {dummy_data.map((prescription, idx) => {
          return (
            <Box sx={{ mb: 5 }} key={idx}>
              <PrescriptionAccordion {...prescription} />
            </Box>
          );
        })}
      </Box>
      <Box>
        <AddPrescription />
      </Box>
    </Box>
  );
}

export default ViewPrescriptionsDoctor;
