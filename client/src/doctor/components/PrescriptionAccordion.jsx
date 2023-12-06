import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import React, { useState } from "react";
import MedicationList from "./MedicationList";
import PrescriptionHeader from "./PrescriptionHeader";
import AddMedicine from "./AddMedicine";

function PrescriptionAccordion({ medicines, _id, openAllAccordions, ...rest }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  // console.log(openAllAccordions);
  return (
    <Accordion
      expanded={openAllAccordions ? openAllAccordions : expanded}
      sx={{ boxShadow: 0, border: "1px solid #e0e0e0", width: "100%" }}
    >
      <AccordionSummary>
        <PrescriptionHeader {...rest} expanded={expanded} onToggle={handleToggle} />
      </AccordionSummary>
      <AccordionDetails>
        <MedicationList medicines={medicines} prescriptionId={_id} />
        <AddMedicine />
      </AccordionDetails>
    </Accordion>
  );
}

export default PrescriptionAccordion;
