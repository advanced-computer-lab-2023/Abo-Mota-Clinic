import { useState } from 'react';
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import { useFetchPrescriptionsQuery } from "../store";
import { Box } from "@mui/joy";

const MyAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const { data, isFetching, error } = useFetchPrescriptionsQuery(0);

  let content;
  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div> Error ... </div>;
  }
  else {
    content = data.map((prescription) => {
      return (
        <PrescriptionAccordion {...prescription} />
      )
    })
  }

  return (
    <Box className="ml-8 mt-8 space-y-5">
      {content}
    </Box>
  );
};

export default MyAccordion;
