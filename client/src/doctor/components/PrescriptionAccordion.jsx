import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import React, { useState } from "react";
import MedicationList from "./MedicationList";
import PrescriptionHeader from "./PrescriptionHeader";
function PrescriptionAccordion({ medicines, ...rest }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      sx={{ boxShadow: 0, border: "1px solid #e0e0e0", width: "100%" }}
    >
      <AccordionSummary>
        <PrescriptionHeader {...rest} expanded={expanded} onToggle={handleToggle} />
      </AccordionSummary>
      <AccordionDetails>
        <MedicationList medicines={medicines} />
      </AccordionDetails>
    </Accordion>
  );
}

export default PrescriptionAccordion;
