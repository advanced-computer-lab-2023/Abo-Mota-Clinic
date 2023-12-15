import React from "react";
import { useFetchAppointmentsQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";

function AppointmentTable({ id }) {
  let content;
  const { data, isFetching, error } = useFetchAppointmentsQuery(id);

  if (isFetching) {
    content = <LoadingIndicator />;
  } else if (error) {
    content = <div> error </div>;
  } else {
    content = data.map((appointment) => {
      return (
        <div className="flex">
          <p> {appointment.patient_id}</p> | <p> {appointment.date} </p> |{" "}
          <p> {appointment.time} </p> | <p> {appointment.status} </p>
        </div>
      );
    });
  }
  return <div> {content} </div>;
}

export default AppointmentTable;
