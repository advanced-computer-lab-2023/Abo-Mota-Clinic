import React from "react";
import Table from "../components/Table";
// import SearchBar from '../../components/SearchBar'
import { useState } from "react";
import '@fontsource/inter';



import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePickerMaterialUI from "../components/DatePickerMaterialUI";
import dayjs from "dayjs";
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';







function ViewDoctorAppointments() {
	const [selection, setSelection] = useState("Status");
	const [selectedDate, setSelectedDate] = useState(null);


	const appointments = [
		{
			id: 1,
			patient: "Sara",
			date: "10/01/2023",
			time: '12:00',
			status: "Cancelled",

			
		},
		{
			id: 2,
			patient: "Boni",
			date: "08/04/2023",
			time: '2:00',
			status: "Cancelled",



		},
		{
			id: 3,
			patient: "Ahmed",
			date: "09/01/2023",
			time: '8:30',
			status: "Upcoming",



		},
		{
			id: 4,
			patient: "Omar",
			date: "10/04/2023",
			time: '12:45',
			status: "Urgent",



		},
	];


	const config = [
		{   label: 'ID',
			render: (appointment) => appointment.id,
		},
		{   label: 'Patient',
			render: (appointment) => appointment.patient
		},
		{   label: 'Date',
			render: (appointment) => appointment.date,
		},
		{
			label: 'Time',
			render: (appointment) => appointment.time
		},
		{
			label: 'Status',
			render: (appointment) => appointment.status
		},
		
	
	];

	const options = [
		'All', 'Upcoming', 'Cancelled', 'Urgent'
	];

	let renderAppointments = appointments;

	if (selection === 'All' || selection === 'Status') {
		renderAppointments = appointments;
	  } else {
		renderAppointments = appointments.filter((appointment) => appointment.status === selection);
		
	  }

	if(selectedDate)
	  renderAppointments = renderAppointments.filter((appointment) => {
			const formattedSelectedDate = dayjs(selectedDate).format("MM/DD/YYYY");
			console.log(formattedSelectedDate);
			return formattedSelectedDate === appointment.date;

	})

	
	const handleSelect = (selectedOption) => {
		const option = selectedOption.value;
		setSelection(option);

	}

	const handleDateChange = (date) => {
		setSelectedDate(date);			
		
	}

	const clearSelectedDate = () => {
		setSelectedDate(null);
	}
		
		
	
	return (
		<div className='ml-5'>
			<div>
				<div style={{marginBottom: "10px"}}>
					<Dropdown options={options} onChange={handleSelect} value={selection} />
				</div>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" , marginRight: "10px"}} >
					<DatePickerMaterialUI value={selectedDate} onChange={handleDateChange}/>
					<Button size="md" variant='soft' color="neutral" onClick={clearSelectedDate}>
						Clear Selected Date
       				</Button>
					
					<Textarea name="Soft" placeholder="Search Patient Name…" variant="outlined" />
					
				</div>
			</div>
			

			<Table  data={renderAppointments} config={config}/>
		</div>
	);
}

export default ViewDoctorAppointments;
