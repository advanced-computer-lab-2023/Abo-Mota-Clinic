import React, {useState} from "react";
import Table from "../components/Table";
// import SearchBar from '../../components/SearchBar'
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import { isAfter, isSameDay } from 'date-fns'; // Import date-fns functions
import TableCollapsibleRow from "../components/TableCollapsibleRow";

function ViewDoctorPatients() {
	const [isFiltered, setIsFiltered]  = useState(false)

	const patients = [
		{
			id: 1,
			name: "Sara",
			appointment: "10/5/2023",
			information:
			{
			  fullName: 'Sara Amr' ,
			  patientId: '11091700',
			  phoneNumber: '010245663235',
			  dob: "5/1/2002",
			  gender: "F",
			  
			},
		},
		{
			id: 2,
			name: "Boni",
			appointment: "8/4/2023",
			information:
			{
			  fullName: 'Boni Mohamed' ,
			  patientId: '11091700',
			  phoneNumber: '010245663235',
			  dob: "5/1/2002",
			  gender: "F",
			  
			},
		},
		{
			id: 3,
			name: "Ahmed",
			appointment: "20/10/2023",
			information:
			{
			  fullName: 'Sara Amr' ,
			  patientId: '11091700',
			  phoneNumber: '010245663235',
			  dob: "5/1/2002",
			  gender: "F",
			  
			},
		},
		{
			id: 4,
			name: "Omar",
			appointment: "10/24/2023",
			information:
			{
			  fullName: 'Sara Amr' ,
			  patientId: '11091700',
			  phoneNumber: '010245663235',
			  dob: "5/1/2002",
			  gender: "F",
			  
			},
		},
	];

	const config = [
		{   label: 'ID',
			render: (patient) => patient.id,
		},
		{   label: 'Name',
			render: (patient) => patient.name
		},
		{   label: 'Appointment',
			render: (patient) => patient.appointment,
		},
		{
			label: "View",
			render: (patient) => <button>{patient.view}</button>
		}
		];


		const handleViewApp = () =>{
			setIsFiltered(true)
		
		} 

		const handleViewAll = () => {
			setIsFiltered(false);
		}

		function parseDate(dateString) {
			// Split the date string to check for '-' or '/'
			const parts = dateString.split(/-|\//);
			if (parts.length === 3) {
			  // Check if the first part is greater than 12 to distinguish between DD-MM-YYYY and MM-DD-YYYY
			  const isDDMMYYYY = parseInt(parts[0], 10) > 12;
			  const [day, month, year] = isDDMMYYYY ? parts : [parts[1], parts[0], parts[2]];
			  return new Date(year, month - 1, day); // Month is 0-based, so subtract 1
			}
			return null;
		  }

		let renderedPatients = isFiltered? 	patients.filter((patient) => {
				

			//works if the format only is MM/DD/YY

			const today = new Date();
			// const appointmentDate = new Date(patient.appointment);
			const appointmentDate = parseDate(patient.appointment);
			

		
			console.log(`Dates: ${appointmentDate === today}`)
			console.log(`TODAY: ${today}`)
			console.log(`PDATE: ${appointmentDate}`)
			console.log(typeof today)
			
			
			// return appointmentDate >= today;
			return isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);

		}) : patients;

	

	return (
		<div classpatient='ml-5'>
			<div>
				
				<Textarea name="Soft" placeholder="Search Patient Name…" variant="soft" />
				<Button size="md" variant='soft' color="neutral" onClick={handleViewApp}>
						View Upcoming Appointments
       			</Button>
				<Button size="md" variant='soft' color="neutral" onClick={handleViewAll}>
					View All Patients
       			</Button>
			</div>

			<TableCollapsibleRow data={renderedPatients}/>
		</div>
	);
}

export default ViewDoctorPatients;
