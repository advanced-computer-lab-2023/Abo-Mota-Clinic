import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./patient/Patient";
import Doctor from "./doctor/Doctor";
import Admin from "./admin/Admin";

import NavBar from "./shared/Components/NavBar";

// Admin
import Packages from "./admin/pages/Packages";
import Applications from "./admin/pages/Applications";
import ViewAdmins from "./admin/pages/ViewAdmins";
import ViewUsers from "./admin/pages/ViewUsers";
import HandleUsers from "./admin/pages/HandleUsers";
import AddAdmin from "./admin/pages/AddAdmin";
import RemoveUser from "./admin/pages/RemoveUser";


// Patient
import ViewPatientAppointments from "./patient/pages/ViewPatientAppointments";
import ViewDoctors from "./patient/pages/ViewDoctors";
import ViewFamilyMembers from "./patient/pages/ViewFamilyMembers";
import ViewPrescriptions from "./patient/pages/ViewPrescriptions";
import RegisterScreen from "./patient/pages/RegisterScreen";

// Doctor
import ViewDoctorAppointments from "./doctor/pages/ViewDoctorAppointments";
import ViewDoctorPatients from "./doctor/pages/ViewDoctorPatients";
import EditMyProfile from "./doctor/pages/EditMyProfile";
import RegisterForm from "./doctor/pages/RegisterForm";



function App() {
	return (
		<div>
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
						<Route path='profile' element={<EditMyProfile />}/>
						<Route path='registerForm' element={<RegisterForm />}/>
					</Route>

					<Route path="/admin" element={<Admin />}>
						<Route path="applications" element={<Applications />} />
						<Route path="packages" element={<Packages />} />
						<Route path="viewAdmins" element={<ViewAdmins />} />
						<Route path="viewUsers" element={<ViewUsers />} />
						<Route path="handleUsers" element={<HandleUsers />}/>
						<Route path="addAdmin" element={<AddAdmin />} />
						<Route path="removeUser" element={<RemoveUser />} />
					</Route>
				</Routes>
		</div>
	);
}

export default App;
