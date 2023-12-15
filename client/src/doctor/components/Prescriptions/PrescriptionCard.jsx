import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Avatar } from "@mui/joy";
import MedicationList from "./MedicationList";
import PrescriptionDescription from "./PrescriptionDescription";
import AddMedicine from "./AddMedicine";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { toPng } from "html-to-image";

export default function PrescriptionCard({
  medicines,
  _id,
  openAllAccordions,
  description,
  doctor: { name, specialty },
  status,
  formattedDate,
  ...rest
}) {
  // console.log(_id);
  const cardRef = useRef(null); // Create a ref for the card
  //   const downloadPdfDocument = () => {
  //     html2canvas(cardRef.current).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgWidth = 210; // A4 width in mm
  //       const imgHeight = canvas.height * imgWidth / canvas.width;
  //       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //       pdf.save('prescription-card.pdf');
  //     });
  //   };
  const downloadPdfDocument = () => {
    console.log("Download function triggered"); // Debug line

    if (cardRef.current) {
      console.log("Card ref is found"); // Debug line

      toPng(cardRef.current, { quality: 1 })
        .then((dataUrl) => {
          console.log("Image captured"); // Debug line

          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (img.height * imgWidth) / img.width;
            pdf.addImage(img.src, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("prescription-card.pdf");
            console.log("PDF saved"); // Debug line
          };
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
    } else {
      console.log("Card ref is null"); // Debug line
    }
  };

  const statusMap = {
    filled: "success",
    unfilled: "danger",
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        // gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: 2,
      }}
    >
      <Card size="lg" variant="outlined" sx={{ width: "100%" }} ref={cardRef}>
        {/* <Typography level="h2">{name}</Typography> */}
        <Box className="flex justify-between">
          <Box className="flex space-x-4">
            <Avatar
              alt="ML"
              // src={DoctorImg}
              size="lg"
            />

            <Box className="mr-10">
              <Typography level="title-lg" id="card-description">
                Prescription at
              </Typography>
              <Typography level="body-sm" aria-describedby="card-description">
                {formattedDate}
              </Typography>
            </Box>
          </Box>
          <Chip color={statusMap[status]} variant="soft">
            {status[0].toUpperCase() + status.slice(1)}
          </Chip>
        </Box>
        <Divider inset="none" sx={{ height: 2 }} />
        <MedicationList medicines={medicines} prescriptionId={_id} />
        <Divider inset="none" sx={{ height: 2 }} />
        <PrescriptionDescription prescriptionId={_id} description={description} />
        <Divider inset="none" sx={{ height: 2 }} />
        <CardActions>
          <Button onClick={downloadPdfDocument}>Download</Button>
          <AddMedicine prescriptionId={_id} />
        </CardActions>
      </Card>
    </Box>
  );
}
