import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./patient/Patient";
import Doctor from "./doctor/Doctor";
import Admin from "./admin/Admin";

import NavBar from "./shared/components/NavBar";

// Admin
import Packages from "./admin/pages/Packages";
import Applications from "./admin/pages/Applications";
import ViewAdmins from "./admin/pages/ViewAdmins";
import ViewUsers from "./admin/pages/ViewUsers";

// Patient
import ViewPatientAppointments from "./patient/pages/ViewPatientAppointments";
import ViewDoctors from "./patient/pages/ViewDoctors";
import ViewFamilyMembers from "./patient/pages/ViewFamilyMembers";
import ViewPrescriptions from "./patient/pages/ViewPrescriptions";
import RegisterScreen from "./patient/pages/RegisterScreen";

// Doctor
import ViewDoctorAppointments from "./doctor/pages/ViewDoctorAppointments";
import ViewDoctorPatients from "./doctor/pages/ViewDoctorPatients";

function App() {
	return (
		<div>
				<NavBar />
				<Routes>
					<Route path="/" element={<RegisterScreen />} />
					<Route path="/patient" element={<Patient />}>
						<Route path="appointments" element={<ViewPatientAppointments />} />
						<Route path="doctors" element={<ViewDoctors />} />
						<Route path="prescriptions" element={<ViewPrescriptions />} />
						<Route path="familyMembers" element={<ViewFamilyMembers />} />
					</Route>

					<Route path="/doctor" element={<Doctor />}>
						<Route path="appointments" element={<ViewDoctorAppointments />} />
						<Route path="patients" element={<ViewDoctorPatients />} />
					</Route>

					<Route path="/admin" element={<Admin />}>
						<Route path="applications" element={<Applications />} />
						<Route path="packages" element={<Packages />} />
						<Route path="viewAdmins" element={<ViewAdmins />} />
						<Route path="viewUsers" element={<ViewUsers />} />
					</Route>
				</Routes>
		</div>
	);
}

export default App;
