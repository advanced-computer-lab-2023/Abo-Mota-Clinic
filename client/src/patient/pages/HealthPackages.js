import React, { useState } from "react";
import HealthPackageCard from "../components/HealthPackageCard";
import { Box } from "@mui/material";
import { useFetchPackagesPatientQuery, useFetchPatientQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";
import PayHealthPackageModal from "../components/PayHealthPackageModal";

function HealthPackages() {
  const { data, isFetching, error } = useFetchPackagesPatientQuery();

  const [selected, setSelected] = useState(-1);
  let content = <LoadingIndicator />;
  if (!isFetching && !error) {
    content = (
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
          {data.map((healthPackage, idx) => {
            return (
              <HealthPackageCard
                key={idx}
                healthPackage={healthPackage}
                selected={selected}
                setSelected={setSelected}
                index={idx}
              />
            );
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PayHealthPackageModal
            selectedIdx={selected}
            selectedPackage={data[selected]}
            setSelectedPackage={setSelected}
          />
        </Box>
      </Box>
    );
  }

  return <Box sx={{ mt: 5, alignItems: "center", justifyContent: "center" }}>{content}</Box>;
}

export default HealthPackages;
