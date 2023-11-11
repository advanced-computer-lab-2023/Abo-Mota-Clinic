import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchDoctorsQuery, useFetchPatientQuery } from "../../store";
import DoctorCard from "../components/DoctorCard";
import SearchBar from "../components/SearchBar";
import filter from "../utils/filter";
import filterSearch from "../functions/filterSearch";
import GeometrySkeleton from "../components/GeometrySkeleton";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormLabel,
  Box,
  Link,
  Breadcrumbs,
  Typography,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function ViewDoctors() {
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const [config, setConfig] = useState({});
  const [date, setDate] = useState(null);
  const dateFormat = "MM/DD/YYYY HH:mm A";

  const navigate = useNavigate();
  const { data, isFetching, error } = useFetchDoctorsQuery();
  const {
    data: patient,
    isFetching: isFetchingPatient,
    error: isFetchingPatientError,
  } = useFetchPatientQuery();

  let content;
  let specialties = [];
  let discount;

  if (isFetching || isFetchingPatient) {
    content = undefined;
  } else if (error) {
    content = <div> Error ... </div>;
  } else {
    let filteredData = filter(data, config);
    console.log(filteredData);

    if (date) {
      filteredData = filteredData.filter((doctor) => {
        for (const apt of doctor.appointments) {
          if (dayjs(apt.formattedDate, dateFormat).isSame(dayjs(date, dateFormat), "minute")) {
            return true;
          }
        }
        return false;
      });
    }

    filteredData = filterSearch(filteredData, doctorSearchTerm, ["name"]);
    // filteredData = filterSearch(filteredData, specialtySearchTerm, ["specialty"]);
    // discount = 20;

    if (patient.healthPackage && patient.healthPackage.package) discount = patient.healthPackage.package.doctorDiscount;
    // } else
    // discount = undefined;

    content = (
      <>
        {filteredData.map((doctor, index) => {
          // const handleRedirect = () => navigate('../doctorInfo', { state: doctor });
          return <DoctorCard index={index} {...doctor} discount={discount} />;
        })}
      </>
    );

    specialties = [...new Set(data.map((doctor) => doctor.specialty))];
  }

  return (
    <div className="mt-5 ml-20 w-full">
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">
          Home
        </Link>
        <Typography>Doctors</Typography>
      </Breadcrumbs>

      <Box className="header flex mb-8 pr-10 space-x-5">
        <FormControl id="multiple-limit-tags">
          <FormLabel>Doctor name</FormLabel>
          <SearchBar
            placeholder="Search for doctors ..."
            onChange={(value) => setDoctorSearchTerm(value)}
          />
        </FormControl>

        <FormControl id="multiple-limit-tags">
          <FormLabel>Specialties</FormLabel>
          <Autocomplete
            multiple
            id="tags-default"
            placeholder="Specialties"
            loading={isFetching}
            options={specialties}
            endDecorator={
              isFetching ? (
                <CircularProgress size="sm" sx={{ bgcolor: "background.surface" }} />
              ) : null
            }
            limitTags={2}
            onChange={(event, newValue) => {
              setConfig({ ...config, specialty: newValue });
            }}
          />
        </FormControl>

        <FormControl id="multiple-limit-tags">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="MM/DD/YYYY HH:mm A"
            onChange={(date, dateString) => setDate(date)}
            showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
            className="h-full w-56"
          />
        </FormControl>
      </Box>

      <div>{(isFetching || isFetchingPatient) && <GeometrySkeleton transition="pulse" />}</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-5">{content}</div>
    </div>
  );
}

export default ViewDoctors;
