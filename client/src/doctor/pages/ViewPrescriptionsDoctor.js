import { Box, Typography } from "@mui/joy";
import React, { useState } from "react";
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import AddPrescription from "../components/AddPrescription";
import BackArrow from "../../shared/Components/BackArrow";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../../shared/Components/Button";
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
          frequency: "2",
          duration: "10 days",
        },
        {
          medicine: {
            name: "Medicine B",
          },
          dosage: 100,
          frequency: "1",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
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
          frequency: "3",
          duration: "14 days",
        },
      ],
      description: "Neurological examination follow-up",
      status: "unfilled",
    },
  ];
  const [openAllAccordions, setOpenAllAccordions] = useState(false);
  const downloadPdfDocument = () => {
    setOpenAllAccordions(true);
    const sectionHeight = window.innerHeight; // Height of each captured section
    const totalHeight = document.body.scrollHeight; // Total scrollable height
    let currentPosition = 0;
    let pageNumber = 0;

    const captureSection = () => {
      window.scrollTo(0, currentPosition);
      html2canvas(document.body, {
        width: document.body.scrollWidth, // Capture the full width
      }).then((canvas) => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        // Calculate the PDF size (you may need to adjust these calculations)
        const pdfWidth = 210; // Width in mm for an A4 size PDF
        const pdfHeight = (contentHeight * pdfWidth) / contentWidth; // Maintain aspect ratio

        // Initialize jsPDF with calculated dimensions
        const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
        if (pageNumber !== 0) {
          pdf.addPage();
        }
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        currentPosition += sectionHeight;
        pageNumber++;

        if (currentPosition < totalHeight) {
          captureSection();
        } else {
          pdf.save("download.pdf");
          window.scrollTo(0, 0); // Scroll back to top
        }
      });
    };

    captureSection();
    setTimeout(() => {
      setOpenAllAccordions(false);
    }, 5000);
  };
  console.log(openAllAccordions);
  return (
    <Box sx={{ width: "100%", m: 5 }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 2 }}>
          <BackArrow />
        </Box>
        <Typography>View Prescriptions</Typography>
      </Box>
      <Box sx={{ width: "100%", mt: 5 }}>
        {dummy_data.map((prescription, idx) => {
          return (
            <Box sx={{ mb: 5 }} key={idx}>
              <PrescriptionAccordion {...prescription} openAllAccordions={openAllAccordions} />
            </Box>
          );
        })}
      </Box>
      <Box>
        <AddPrescription />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button onClick={downloadPdfDocument}>Download PDF</Button>
      </Box>
    </Box>
  );
}

export default ViewPrescriptionsDoctor;
