import React, {useState} from "react";
import Table from "../components/Table";
import Button from '@mui/joy/Button';
import { isAfter, isSameDay } from 'date-fns'; // Import date-fns functions
import TableCollapsibleRow from "../components/TableCollapsibleRow";
import { useSelector } from "react-redux";
import { useFetchPatientsQuery } from "../../store";
import SearchBar from "../../patient/components/SearchBar";


function ViewDoctorPatients() {
	const [isFiltered, setIsFiltered]  = useState(false)
	const [searchTerm, setSearchTerm] = useState("")

	const doctor = useSelector((state) => state.doctorSlice);
	const { data, error , isFetching } = useFetchPatientsQuery(doctor);
	const patients = data;
	console.log(patients)



		const handleViewApp = () =>{
			setIsFiltered(true)
		
		} 

		const handleViewAll = () => {
			setIsFiltered(false);
		}

		let renderedPatients;
		if(isFetching)
			renderedPatients = [];
		else{
			renderedPatients  = isFiltered? patients.filter((patient) => {
				

				//works if the format only is MM/DD/YY
	
				const today = new Date();
				// const appointmentDate = new Date(patient.appointment);
				const appointmentsList = patient.appointments;
	
				const upcomingAppointments = appointmentsList.filter((appointment) => {
					const appointmentDate = new Date(appointment.formattedDate.split(",")[0]);
					
					return isSameDay(appointmentDate, today) || isAfter(appointmentDate, today); 
				});
				
				// patient.appointments = [...upcomingAppointments];
				
				// return appointmentDate >= today;
				return upcomingAppointments.length > 0;
	
			}) : patients;
		}
		

		renderedPatients = renderedPatients.filter((patient) => {
			return patient.name.includes(searchTerm);
		})

	

	return (
		<div>
			{isFetching && <div>Loading...</div>}
			{!isFetching &&
			<div className='ml-8'>
			<form style={{marginBottom: "10px", marginLeft: "10px"}}>
				
				<SearchBar placeholder="Search for patients..." onChange={(value) => setSearchTerm(value)}/>							
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
