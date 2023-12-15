import { useFetchPrescriptionsQuery } from "../../store";
import { useState } from "react";
import filter from "../utils/filter";
import { FormControl, FormLabel, Autocomplete, Box, Link, Breadcrumbs, Typography } from "@mui/joy";
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function ViewPrescriptions() {
  const { data, isFetching, error } = useFetchPrescriptionsQuery();
  const [config, setConfig] = useState({});
  const [date, setDate] = useState(null);
  const dateFormat = "MM/DD/YYYY"

  console.log(data);

  let content;
  let doctorNames = [];

  if (isFetching) {
    content = <div> Loading ... </div>
  } else if (error) {
    content = <div> Error ... </div>
  } else {
    let filteredData = filter(data, config);

    filteredData = filteredData.filter((pres) => {
      if (date) {
        return dayjs(pres.formattedDate, dateFormat).isSame(dayjs(date, dateFormat), 'day');
      } else {
        return true;
      }
    });

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
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">Home</Link>
        <Typography>Prescriptions</Typography>
      </Breadcrumbs>

      <Box className="flex space-x-8">

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

        <FormControl id="multiple-limit-tags">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="MM/DD/YYYY"
            onChange={(date, dateString) => setDate(date)}
            style={{
              '&:hover': {
                backgroundColor: 'initial',
              },
            }}
            className="h-full w-56"
          />
        </ FormControl>


      </Box>

      <Box className="w-full mt-10 space-y-5">
        {content}
      </Box>
    </div>

  )
}