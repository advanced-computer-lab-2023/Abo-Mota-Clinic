import { Box, Typography } from "@mui/joy";
import React, { useState } from "react";
import PrescriptionAccordion from "../components/Prescriptions/PrescriptionAccordion";
import AddPrescription from "../components/Prescriptions/AddPrescription";
import BackArrow from "../../shared/Components/BackArrow";
import PrescriptionCard from "../components/Prescriptions/PrescriptionCard";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";
import { useLocation } from "react-router-dom";
import { useFetchDoctorPrescriptionsQuery } from "../../store";
import { DatePicker } from "antd";
import dayjs from "dayjs";
function ViewPrescriptionsDoctor() {
  // const [openAllAccordions, setOpenAllAccordions] = useState(false);
  // const downloadPdfDocument = () => {
  //   // setOpenAllAccordions(true);
  //   const sectionHeight = window.innerHeight; // Height of each captured section
  //   const totalHeight = document.body.scrollHeight; // Total scrollable height
  //   let currentPosition = 0;
  //   let pageNumber = 0;

  //   const captureSection = () => {
  //     window.scrollTo(0, currentPosition);
  //     html2canvas(document.body, {
  //       width: document.body.scrollWidth, // Capture the full width
  //     }).then((canvas) => {
  //       const contentWidth = canvas.width;
  //       const contentHeight = canvas.height;

  //       // Calculate the PDF size (you may need to adjust these calculations)
  //       const pdfWidth = 210; // Width in mm for an A4 size PDF
  //       const pdfHeight = (contentHeight * pdfWidth) / contentWidth; // Maintain aspect ratio

  //       // Initialize jsPDF with calculated dimensions
  //       const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
  //       if (pageNumber !== 0) {
  //         pdf.addPage();
  //       }
  //       const imgData = canvas.toDataURL("image/png");
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //       currentPosition += sectionHeight;
  //       pageNumber++;

  //       if (currentPosition < totalHeight) {
  //         captureSection();
  //       } else {
  //         pdf.save("download.pdf");
  //         window.scrollTo(0, 0); // Scroll back to top
  //       }
  //     });
  //   };

  //   captureSection();
  //   // setTimeout(() => {
  //   //   setOpenAllAccordions(false);
  //   // }, 5000);
  // };
  // console.log(openAllAccordions);
  // const downloadPdfDocument = () => {
  //   const sectionHeight = window.innerHeight; // Height of each captured section
  //   const totalHeight = document.body.scrollHeight; // Total scrollable height
  //   let currentPosition = 0;
  //   let pageNumber = 0;
  //   let pdf = null;

  //   const captureSection = () => {
  //     html2canvas(document.body, {
  //       x: 0,
  //       y: currentPosition,
  //       width: window.innerWidth,
  //       height: sectionHeight,
  //       scrollX: 0,
  //       scrollY: currentPosition,
  //       windowWidth: document.documentElement.offsetWidth,
  //       windowHeight: sectionHeight,
  //     }).then((canvas) => {
  //       const contentWidth = canvas.width;
  //       const contentHeight = canvas.height;
  //       const pdfWidth = 210; // A4 width in mm
  //       const pdfHeight = (contentHeight * pdfWidth) / contentWidth;

  //       if (pageNumber === 0) {
  //         pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
  //       } else {
  //         pdf.addPage([pdfWidth, pdfHeight]);
  //       }

  //       const imgData = canvas.toDataURL("image/png");
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //       currentPosition += sectionHeight;
  //       pageNumber++;

  //       if (currentPosition < totalHeight) {
  //         captureSection();
  //       } else {
  //         pdf.save("download.pdf");
  //         window.scrollTo(0, 0);
  //       }
  //     });
  //   };

  //   captureSection();
  // };
  // const { idx } = useParams()
  // const {data:patients, isFetching: isFetchingPatients } = useFetchPatientsQuery()
  // let patientId = ""
  // useEffect(()=>{
  //   if(!isFetchingPatients){
  //     patientId = patients[idx]._id
  //   }
  // },[isFetchingPatients])
  const location = useLocation();
  const { patientId } = location.state;
  const { data, isFetching, error } = useFetchDoctorPrescriptionsQuery({ patientId });
  const [selectedDate, setSelectedDate] = useState(null);
  const handelDateChange = (date) => {
    const formattedChosenDate = dayjs(date).format("MM/DD/YYYY");
    if (formattedChosenDate === "Invalid Date") {
      setSelectedDate(null);
      return;
    }
    setSelectedDate(formattedChosenDate);
    console.log(formattedChosenDate);
  };
  if (isFetching) {
    return <LoadingIndicator />;
  }
  let prescriptions = data;
  if (selectedDate !== null) {
    prescriptions = prescriptions.filter((prescription) => {
      return prescription.formattedDate === selectedDate;
    });
  } else {
    prescriptions = data;
  }
  // console.log(data);
  return (
    <Box sx={{ m: 5 }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ mr: 2 }}>
          <BackArrow />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 5 }}>
        {data.length === 0 ? (
          <h3>No Prescriptions</h3>
        ) : (
          <Box className="space-y-5">
            <DatePicker format="MM/DD/YYYY" onChange={handelDateChange} style={{ width: "20%" }} />
            {prescriptions.length !== 0 ? (
              prescriptions.map((prescription, idx) => {
                return (
                  <Box sx={{ mb: 5 }} key={idx}>
                    {/* <PrescriptionAccordion {...prescription} openAllAccordions={openAllAccordions} /> */}
                    <PrescriptionCard {...prescription} />
                  </Box>
                );
              })
            ) : (
              <Typography variant="h6">No Prescriptions on {selectedDate}</Typography>
            )}
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 5 }}>
        <AddPrescription patientId={patientId} />
      </Box>
      {/* <Box sx={{ mt: 2 }}>
        <Button onClick={downloadPdfDocument}>Download PDF</Button>
      </Box> */}
    </Box>
  );
}

export default ViewPrescriptionsDoctor;
