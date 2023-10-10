import React, {useState} from "react";
import Table from "../components/Table";
// import SearchBar from '../../components/SearchBar'
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import { isAfter, isSameDay } from 'date-fns'; // Import date-fns functions
import TableCollapsibleRow from "../components/TableCollapsibleRow";
import { useSelector } from "react-redux";
import { useFetchPatientsQuery } from "../../store";

function ViewDoctorPatients() {
	const [isFiltered, setIsFiltered]  = useState(false)
	const doctor = useSelector((state) => state.doctorSlice);
	const { data, error , isFetching } = useFetchPatientsQuery(doctor);
	const patients = data;
	console.log(patients)
	// const patients = [
	// 	{
	// 		id: 1,
	// 		name: "Sara",
	// 		appointment: "10/5/2023",
	// 		information:
	// 		{
	// 		  fullName: 'Sara Amr Elshafie' ,
	// 		  patientId: '11091700',
	// 		  phoneNumber: '010245663235',
	// 		  dob: "5/1/2002",
	// 		  gender: "F",
	// 		  emergency: "010215412"
			  
	// 		},
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Boni",
	// 		appointment: "8/4/2023",
	// 		information:
	// 		{
	// 		  fullName: 'Boni Mohamed' ,
	// 		  patientId: '11091700',
	// 		  phoneNumber: '010245663235',
	// 		  dob: "5/1/2002",
	// 		  gender: "F",
	// 		  emergency: "010215412"
			  
	// 		},
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Ahmed",
	// 		appointment: "20/10/2023",
	// 		information:
	// 		{
	// 		  fullName: 'Sara Amr Elshafie' ,
	// 		  patientId: '11091700',
	// 		  phoneNumber: '010245663235',
	// 		  dob: "5/1/2002",
	// 		  gender: "F",
	// 		  emergency: "010215412"
			  
	// 		},
	// 	},
	// 	{
	// 		id: 4,
	// 		name: "Omar",
	// 		appointment: "10/24/2023",
	// 		information:
	// 		{
	// 		  fullName: 'Sara Amr Elshafie' ,
	// 		  patientId: '11091700',
	// 		  phoneNumber: '010245663235',
	// 		  dob: "5/1/2002",
	// 		  gender: "F",
	// 		  emergency: "010215412"
			  
	// 		},
	// 	},
	// ];

	// const config = [
	// 	{   label: 'ID',
	// 		render: (patient) => patient.id,
	// 	},
	// 	{   label: 'Name',
	// 		render: (patient) => patient.name
	// 	},
	// 	{   label: 'Appointment',
	// 		render: (patient) => {
	// 			console.log(patients)
	// 			return patient.appointments[0].formattedDate.split(",")[0]
				
	// 		}
	// 	},
	// ];


		const handleViewApp = () =>{
			setIsFiltered(true)
		
		} 

		const handleViewAll = () => {
			setIsFiltered(false);
		}

		let renderedPatients = isFiltered? 	patients.filter((patient) => {
				

			//works if the format only is MM/DD/YY

			const today = new Date();
			// const appointmentDate = new Date(patient.appointment);
			const appointmentsList = patient.appointments;

			const upcomingAppointments = appointmentsList.filter((appointment) => {
				 const appointmentDate = new Date(appointment.formattedDate.split(",")[0]);
				 console.log(appointmentDate);
				 console.log(today);
				 console.log(isAfter(appointmentDate, today));
				return isSameDay(appointmentDate, today) || isAfter(appointmentDate, today); 
			});
			
			// patient.appointments = [...upcomingAppointments];
			
			// return appointmentDate >= today;
			return upcomingAppointments.length > 0;

		}) : patients;

	

	return (
		<div>
			{isFetching && <div>Loading...</div>}
			{!isFetching &&
			<div className='ml-8'>
			<form style={{marginBottom: "10px", marginLeft: "10px"}}>
				
				<Textarea name="Soft" placeholder="Search Patient Name…" variant="soft" style={{marginBottom: "10px"}}/>
				<Button size="md" variant='soft' color="neutral" onClick={handleViewApp}>
					View Upcoming Appointments
       			</Button>
				<Button size="md" variant='soft' color="neutral" onClick={handleViewAll}>
					View All Patients
       			</Button>
			</form>

			<TableCollapsibleRow data={renderedPatients}/>
		</div>}
		</div>
		
	);
}

export default ViewDoctorPatients;
