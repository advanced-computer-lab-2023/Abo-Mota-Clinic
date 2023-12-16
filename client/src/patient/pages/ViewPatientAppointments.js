import { useFetchPatientAppointmentsQuery, useFetchFamilyMemberAppointmentsQuery } from "../../store";
import AppointmentCard from "../components/AppointmentCard";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Breadcrumbs, FormControl, FormLabel, Autocomplete } from "@mui/joy";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import filter from "../utils/filter";

export default function ViewPatientAppointments({ socket }) {
  const [date, setDate] = useState(null);
  const [config, setConfig] = useState({ owner: "Self" });

  const dateFormat = "MM/DD/YYYY HH:mm A";
  const { data, isFetching, isError } = useFetchPatientAppointmentsQuery();
  const { data: familyMemberAppointments, isFetching: isFetchingFamilyMemberAppointments, isError: isErrorFamilyMemberAppointments } = useFetchFamilyMemberAppointmentsQuery();
  let content;

  if (isFetching || isFetchingFamilyMemberAppointments) {
    content = <div> Loading ...</div>;
  } else if (isError) {
    content = <div> Error ... </div>;
  } else {
    let newData = [
      ...data.map((appointment) => { return { ...appointment, owner: "Self", name: "You" } }),
      ...familyMemberAppointments.map((appointment) => { return { ...appointment, owner: "Family", name: appointment.patient.name } })];

    newData = newData.map((appointment) => {
      const currDate = dayjs();
      const appointmentDate = dayjs(appointment.formattedDate);
      if (appointment.status === "cancelled" || appointment.status === "rescheduled") {
        return appointment;
      }
      if (appointmentDate.isAfter(currDate)) {
        return { ...appointment, status: "upcoming" };
      } else {
        return { ...appointment, status: "completed" };
      }
    });
    let filteredData = filter(newData, config);

    filteredData = filteredData.filter((appt) => {
      if (date) {
        return dayjs(appt.formattedDate, dateFormat).isSame(dayjs(date, dateFormat), "minute");
      } else {
        return true;
      }
    });
    // console.log(filteredData);
    content = filteredData.map((appointment) => {
      // console.log("appointment: ", appointment);
      return <AppointmentCard sx={{ width: "100%" }} socket={socket} {...appointment} appointmentId={appointment._id} name={appointment.name} />;
    });
  }

  return (
    <Box className=" ml-20 mt-10 mr-20 space-y-5">
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">
          Home
        </Link>
        <Typography>Appointments</Typography>
      </Breadcrumbs>

      <Box className="flex space-x-8">
        <FormControl id="multiple-limit-tags">
          <FormLabel>Status</FormLabel>
          <Autocomplete
            multiple
            id="tags-default"
            placeholder="Status"
            options={["Completed", "Upcoming", "Cancelled", "Rescheduled"]}

            limitTags={2}
            onChange={(event, newValue) => {
              setConfig({ ...config, status: newValue });
            }}
          />
        </FormControl>

        <FormControl id="multiple-limit-tags">
          <FormLabel>Patient</FormLabel>
          <Autocomplete
            multiple
            id="tags-default"
            placeholder="Status"
            options={["Self", "Family"]}
            defaultValue={["Self"]}

            limitTags={2}
            onChange={(event, newValue) => {
              setConfig({ ...config, owner: newValue });
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

      {content}
    </Box >
  );
}
