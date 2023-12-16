import { useFetchPrescriptionsQuery, useFetchPatientQuery } from "../../store";
import { useState } from "react";
import filter from "../utils/filter";
import { FormControl, FormLabel, Autocomplete, Box, Link, Breadcrumbs, Typography, Button, Alert } from "@mui/joy";
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function ViewPrescriptions() {
  const { data, isFetching, error } = useFetchPrescriptionsQuery();
  const { data: patient, isFetching: isFetchingPatient, error: isErrorPatient } = useFetchPatientQuery();
  const [config, setConfig] = useState({});
  const [date, setDate] = useState(null);
  const dateFormat = "MM/DD/YYYY"

  const [isPharmacyAlertOpen, setIsPharmacyAlertOpen] = useState(true);

  console.log(data);

  let content;
  let doctorNames = [];

  if (isFetching || isFetchingPatient) {
    content = <div> Loading ... </div>
  } else if (error || isErrorPatient) {
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

    content = filteredData.map((pres, idx) => {
      return (
        <Box>
          <PrescriptionAccordion {...pres} idx={idx} />
        </Box>
      )
    });

    doctorNames = [...new Set(data.map((pres) => pres.doctor.name))];
  }

  return (
    <div className="ml-20 mr-20 mt-10">
      {
        isPharmacyAlertOpen &&
        !patient.pharmacyPatient && <Alert
          variant="soft"
          color="primary"
          size="lg"
          sx={{ mb: 2 }}
          // startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          endDecorator={
            <Button size="sm" variant="plain" color="primary" onClick={() => setIsPharmacyAlertOpen}>
              Hide
            </Button>
          }
        >
          <Box>
            <Typography level="title-lg" mb={1}>
              Level up your experience!
            </Typography>
            <Typography level="body-sm">
              Link your pharmacy account and purchase all your prescriptions right here with one click.
            </Typography>
          </Box>
        </Alert>

      }

      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">Home</Link>
        <Typography>Prescriptions</Typography>
      </Breadcrumbs>



      <Box className="flex space-x-8">

        <FormControl id="multiple-limit-tags">
          <FormLabel>Doctor name</FormLabel>
          <Autocomplete
            id="tags-default"
            placeholder="Name"
            loading={isFetching}
            options={doctorNames}

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