import React, { useEffect } from "react";
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
import SearchBar from "../../patient/components/SearchBar";
import { isAfter, isSameDay, isBefore } from 'date-fns'; // Import date-fns functions
import { Autocomplete } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import CircularProgress from '@mui/joy/CircularProgress';
import AppointmentCard from "../components/AppointmentCard";



function ViewDoctorAppointments() {
	const [selection, setSelection] = useState([]);
	const [selectedStartDate, setSelectedStartDate] = useState(null);
	const [selectedEndDate, setSelectedEndDate] = useState(null);

	const [searchTerm, setSearchTerm] = useState("")
	
	
	const { data, error, isFetching } = useFetchAppointmentsQuery();
	
	
	console.log(data);
    // const [addAlbum, results] = useAddAlbumMutation();

	let filteredAppointments ;




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

	const options = ["upcoming", "cancelled", "completed", "unbooked"];

	if(isFetching)
		filteredAppointments = [];
	else if (selection.length === 0) {
		filteredAppointments = data;
	} else {
		filteredAppointments = data.filter((appointment) => selection.includes(appointment.status));
	}
	
	if (selectedStartDate && !selectedEndDate){
		filteredAppointments = filteredAppointments.filter((appointment) => {
			const formattedSelectedDate = dayjs(selectedStartDate).format("MM/DD/YYYY");
			return formattedSelectedDate === appointment.formattedDate.split(",")[0];
		});
	}else if(selectedStartDate && selectedEndDate){
		filteredAppointments = filteredAppointments.filter((appointment) => {
			const formattedSelectedStartDate = dayjs(selectedStartDate).format("MM/DD/YYYY");
			const formattedSelectedEndDate = dayjs(selectedEndDate).format("MM/DD/YYYY");
			const appointmentDate = appointment.formattedDate.split(",")[0];

			return isSameDay(formattedSelectedStartDate, appointmentDate) || isSameDay(formattedSelectedEndDate, appointmentDate) ||
				 (isAfter(formattedSelectedStartDate, appointmentDate) && isBefore(formattedSelectedEndDate, appointmentDate));
		});
	}
			

	filteredAppointments = filteredAppointments.filter((appointment) => {
		return appointment.patient.name.includes(searchTerm);
	})
	
	
	
	

	const handleSelect = (selectedOptions) => {
		setSelection(selectedOptions);
	};

	const handleStartDateChange = (date) => {
		setSelectedStartDate(date);
	};

	const handleEndDateChange = (date) => {
		setSelectedEndDate(date);
	}

	const clearSelectedDate = () => {
		setSelectedStartDate(null);
		setSelectedEndDate(null);

	};

	let renderedAppointments = [];

	if(filteredAppointments.length > 0){
		renderedAppointments = filteredAppointments.map((appointment, index) => {
			return <AppointmentCard key={index} appointment={appointment}/>
		});
	}
	  
	

	return (
		<div>
			
			{!isFetching && 
				<div className="ml-20 flex flex-col space-y-4">
					<div>
						{/* <div className="mb-10">
							<Dropdown options={options} onChange={handleSelect} value={selection} />
							
						</div> */}

					<FormControl id="multiple-limit-tags">
						<Autocomplete
							
							multiple
							id="tags-default"
							placeholder="Status"
							loading={isFetching}
							options={options}	
							endDecorator={
								isFetching ? (
									<CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
								) : null
							}
							limitTags={2}
							onChange={(event, newValue) => {
								handleSelect(newValue)
							}}
						
						/>
					</ FormControl>



						<div className="flex items-center justify-between mr-10 space-y-4">
							<div className="flex items-center mb-5 mt-5" >
								<DatePickerMaterialUI value={selectedStartDate} onChange={handleStartDateChange} />
								-
								<DatePickerMaterialUI value={selectedEndDate} onChange={handleEndDateChange} />
							</div>
							<Button size="md" variant="soft" color="neutral" onClick={clearSelectedDate}>
								Clear Selected Date
							</Button>
							
							<SearchBar placeholder="Search for patients..." onChange={(value) => setSearchTerm(value)}/>							
						</div>
					</div>
					{/* <Table data={filteredAppointments} config={config} /> */}
					{renderedAppointments}
				</div>
			}
		</div>
		
		
	);
}

export default ViewDoctorAppointments;