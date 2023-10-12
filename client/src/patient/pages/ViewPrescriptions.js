import { useFetchPrescriptionsQuery } from "../../store";
import { Select } from "@mui/joy";
import { Option } from "@mui/joy";
import FilterSelect from "../components/FilterSelect";
import { useState } from "react";
import { useFilterSelect } from "../hooks/useFilterSelect";
import filter from "../utils/filter";
import onFilterChange from "../functions/onFilterChange";
// import { useFilter } from "../functions/useFilter";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Autocomplete } from "@mui/joy";
import CircularProgress from '@mui/joy/CircularProgress';
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import Box from "@mui/joy/Box";

export default function ViewPrescriptions() {
  const { data, isFetching, error } = useFetchPrescriptionsQuery(0);
  const [config, setConfig] = useState({});

  console.log("Config", config);

  const [filterConfig, setFilterConfig] = useState({});

  let content;
  let doctorNames = [];

  if (isFetching) {
    content = <div> Loading ... </div>
  } else if (error) {
    content = <div> Error ... </div>
  } else {
    const filteredData = filter(data, config);

    content = filteredData.map((pres) => {
      return (
        <Box>
          <PrescriptionAccordion {...pres} />
        </Box>
      )
    });

    doctorNames = [...new Set(data.map((pres) => pres.doctor.name))];
  }

  return (
    <div className="w-full ml-20 mr-20 mt-10">
      <Box className="flex space-x-4">

        <FormControl id="multiple-limit-tags">
          <FormLabel>Doctor name</FormLabel>
          <Autocomplete
            // multiple
            id="tags-default"
            placeholder="Name"
            loading={isFetching}
            options={doctorNames}
            // endDecorator={
            //   isFetching ? (
            //     <CircularProgress thickness={2} size="sm" sx={{ bgcolor: 'background.surface' }} />
            //   ) : null
            // }
            onChange={(event, newValue) => {
              setConfig({ ...config, "doctor.name": newValue })
              console.log("New value:", newValue);
            }}
          />
        </ FormControl>

        <FormControl id="multiple-limit-tags">
          <FormLabel>Status</FormLabel>
          <Autocomplete
            multiple
            id="tags-default"
            placeholder="Status"
            loading={isFetching}
            options={["Filled", "Unfilled"]}
            // endDecorator={
            //   isFetching ? (
            //     <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
            //   ) : null
            // }
            limitTags={2}
            onChange={(event, newValue) => {
              setConfig({ ...config, status: newValue })
            }}
          />
        </ FormControl>
      </Box>

      <Box className="w-full mt-10 space-y-5">
        {content}
      </Box>
    </div>

  )
}