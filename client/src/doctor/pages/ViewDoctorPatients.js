import React, { useState } from "react";
import Button from "@mui/joy/Button";
import { isAfter, isSameDay } from "date-fns"; // Import date-fns functions
import { useSelector } from "react-redux";
import { useFetchPatientsQuery, useFetchDoctorQuery } from "../../store";
import SearchBar from "../../patient/components/SearchBar";
import PatientCard from "../components/PatientCard";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function ViewDoctorPatients() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isFetching } = useFetchPatientsQuery();

  let patients = [];
  if (!isFetching) patients = data;

  const navigate = useNavigate();

  const handleViewApp = () => {
    setIsFiltered(true);
  };

  const handleViewAll = () => {
    setIsFiltered(false);
  };

  let renderedPatients;
  if (isFetching) renderedPatients = [];
  else {
    renderedPatients = isFiltered
      ? patients.filter((patient) => {
          //works if the format only is MM/DD/YY

          const today = new Date();
          // const appointmentDate = new Date(patient.appointment);
          const appointmentsList = patient.appointments;
          const updatedAppointmentsList = appointmentsList.map((appointment) => {
            const currDate = dayjs();
            const appointmentDate = dayjs(appointment.formattedDate);

            if (appointmentDate.isAfter(currDate)) {
              return { ...appointment, status: "upcoming" };
            } else {
              return { ...appointment, status: "completed" };
            }
          });

          const upcomingAppointments = updatedAppointmentsList.filter((appointment) => {
            const appointmentDate = new Date(appointment.formattedDate.split(",")[0]);

            return isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
          });

          // patient.appointments = [...upcomingAppointments];

          // return appointmentDate >= today;
          return upcomingAppointments.length > 0;
        })
      : patients;
  }

  renderedPatients = renderedPatients.filter((patient) => {
    const name = patient.name.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const content = renderedPatients.map((patient, idx) => {
    const handleRedirect = () => navigate(`patientInfo/${idx}`);
    return <PatientCard patient={patient} onClick={handleRedirect} className="items-center mb-5" />;
  });

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {!isFetching && (
        <div className="ml-20 flex flex-col space-y-4 w-full">
          <div className="flex justify-between items-center space-x-4 w-full mt-10">
            <Button size="md" variant="soft" color="neutral" onClick={handleViewApp}>
              View Upcoming Appointments
            </Button>
            <Button size="md" variant="soft" color="neutral" onClick={handleViewAll}>
              View All Patients
            </Button>
            <SearchBar
              placeholder="Search for patients..."
              onChange={(value) => setSearchTerm(value)}
            />
          </div>

          <div className="flex flex-wrap space-x-5">{content}</div>
        </div>
      )}
    </div>
  );
}

export default ViewDoctorPatients;
