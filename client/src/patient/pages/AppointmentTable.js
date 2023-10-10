import React from "react";
import { useFetchAppointmentsQuery } from "../../store";

function AppointmentTable({ id }) {
  let content;
  const { data, isFetching, error } = useFetchAppointmentsQuery(id);

  if (isFetching) {
    content = <div> is loading ... </div>
  } else if (error) {
    content = <div> error </div>
  }
  else {
    content = data.map((appointment) => {
      return (
        <div className="flex">
          <p> {appointment.patient_id}</p> | <p> {appointment.date} </p> | <p> {appointment.time} </p> | <p> {appointment.status} </p>
        </div>
      )
    })
  }
  return <div> {content} </div>;
}

export default AppointmentTable;
