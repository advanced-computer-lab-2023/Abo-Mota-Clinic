import React from "react";
import Table from "../components/Table";
import { useState } from "react";
import "@fontsource/inter";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DatePickerMaterialUI from "../components/DatePickerMaterialUI";
import dayjs from "dayjs";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import { useFetchAppointmentsQuery, useFetchDoctorQuery } from "../../store";
import { useSelector } from "react-redux";


function ViewDoctorAppointments() {
	const [selection, setSelection] = useState("Status");
	const [selectedDate, setSelectedDate] = useState(null);
	
	
	const { data, error, isFetching } = useFetchAppointmentsQuery();
	
	
	console.log(data);
    // const [addAlbum, results] = useAddAlbumMutation();



	const config = [
		{ label: "ID", render: (appointment) => appointment.id },
		{ label: "Patient", render: (appointment) => appointment.patient.name },
		{ label: "Date", render: (appointment) => appointment.formattedDate.split(",")[0] },
		{
			label: "Time",
			render: (appointment) => appointment.formattedDate.split(",")[1] ,
		},
		{
			label: "Status",
			render: (appointment) => appointment.status,
		}
	];

	const options = ["All", "upcoming", "cancelled", "completed", "unbooked"];

	let renderAppointments ;
		if(isFetching)
			renderAppointments = [];
		else if (selection === "All" || selection === "Status") {
			renderAppointments = data;
		} else {
			renderAppointments = data.filter((appointment) => appointment.status === selection);
		}
		
		if (selectedDate)
				renderAppointments = renderAppointments.filter((appointment) => {
					const formattedSelectedDate = dayjs(selectedDate).format("MM/DD/YYYY");
					return formattedSelectedDate === appointment.formattedDate.split(",")[0];
		});
	
	
	
	

	const handleSelect = (selectedOption) => {
		const option = selectedOption.value;
		setSelection(option);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const clearSelectedDate = () => {
		setSelectedDate(null);
	};

	return (
		<div>
			
			{!isFetching && 
				<div className="ml-5">
					<div>
						<div style={{ marginBottom: "10px" }}>
							<Dropdown options={options} onChange={handleSelect} value={selection} />
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginRight: "10px",
							}}
						>
							<DatePickerMaterialUI value={selectedDate} onChange={handleDateChange} />
							<Button size="md" variant="soft" color="neutral" onClick={clearSelectedDate}>
								Clear Selected Date
							</Button>
							
							<Textarea name="Soft" placeholder="Search Patient Name…" variant="outlined" />
							
						</div>
					</div>
					<Table data={renderAppointments} config={config} />
				</div>
			}
		</div>
		
		
	);
}

export default ViewDoctorAppointments;