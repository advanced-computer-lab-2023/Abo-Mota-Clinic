import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Button, Box, Typography } from "@mui/joy";
import React, { useState, useRef } from 'react';
import MedicationList from "../components/MedicationList";
import PrescriptionHeader from "./PrescriptionHeader";
import { MdOutlineFileDownload } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import downloadPdfDocument from "../functions/pdf";
import { useFetchPatientQuery } from "../../store";
import { useNavigate } from "react-router-dom";

function PrescriptionAccordion({ medicines, idx, ...rest }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const pdfRef = useRef(null);
  const { data: patient, isFetching: isFetchingPatient, error: isErrorPatient } = useFetchPatientQuery();

  if (isFetchingPatient) {
    return <div>Loading...</div>;
  }

  const handleToggle = () => {
    setExpanded(!expanded);
  }

  return (
    <div ref={pdfRef}>
      <Accordion expanded={expanded} sx={{ boxShadow: 0, border: "1px solid #e0e0e0", width: "100%" }}>
        <AccordionSummary>
          <PrescriptionHeader {...rest} expanded={expanded} onToggle={handleToggle} />
        </AccordionSummary>
        <AccordionDetails>
          <MedicationList medicines={medicines} />
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
            disabled={!patient.pharmacyPatient}
          >
            Pay
          </Button>
          <Button
            variant="plain"
            onClick={() => downloadPdfDocument(pdfRef)}
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