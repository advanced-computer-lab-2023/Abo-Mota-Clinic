import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Button, Box, Typography } from "@mui/joy";
import React, { useState, useRef } from 'react';
import MedicationList from "../components/MedicationList";
import PrescriptionHeader from "./PrescriptionHeader";
import { MdOutlineFileDownload } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import { useNavigate } from "react-router-dom";

function PrescriptionAccordion({ medicines, idx, ...rest }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  const handleToggle = () => {
    setExpanded(!expanded);
  }

  const downloadPdfDocument = () => {
    console.log("Download function triggered"); // Debug line

    if (pdfRef.current) {
      console.log("Card ref is found"); // Debug line

      console.log(pdfRef.current);

      toPng(pdfRef.current, { quality: 1 })
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

  const onDownload = async () => {
    setExpanded(true);

    const delay = new Promise(resolve => {
      setTimeout(() => {
        resolve('Promise resolved after 1 second');
      }, 2000); // 1000 milliseconds = 1 second
    });

    await delay;

    downloadPdfDocument();

    setExpanded(false);
  };

  return (
    <div ref={pdfRef}>
      <Accordion expanded={expanded} sx={{ boxShadow: 0, border: "1px solid #e0e0e0", width: "100%" }}>
        <AccordionSummary>
          <PrescriptionHeader {...rest} expanded={expanded} onToggle={handleToggle} onDownload={onDownload} />
        </AccordionSummary>
        <AccordionDetails>
          <MedicationList medicines={medicines} onDownload={onDownload} />
        </AccordionDetails>

        <Box className="px-8">
          <Typography level="title-lg" sx={{ marginBottom: 1 }} startDecorator={<TfiWrite style={{ marginRight: 1 }} />}>
            Doctor's notes
          </Typography>
          <Typography level="body-sm" >

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum elit id lobortis lacinia. Nunc finibus porta suscipit. Etiam quis scelerisque erat, quis hendrerit diam. Proin pretium sollicitudin erat ac mollis. Morbi eget erat non lorem facilisis iaculis.          </Typography>
        </Box>

        <Box className="flex w-full justify-end pr-4 pb-2">
          <Button
            variant="plain"
            onClick={() => navigate(`./${idx}`)}
          >
            Pay
          </Button>
          <Button
            variant="plain"
            onClick={downloadPdfDocument}
            startDecorator={<MdOutlineFileDownload
              style={{ fontSize: 18 }} // Adjust font size and margin as needed
            />}
          >
            Download
          </Button>
        </Box>
      </Accordion>
    </div>
  )
}

export default PrescriptionAccordion;