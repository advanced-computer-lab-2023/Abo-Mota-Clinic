import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./patient/Patient";
import Doctor from "./doctor/Doctor";
import Admin from "./admin/Admin";
import HomePage from "./HomePage";
import NavBar from "./shared/Components/NavBar";


// Admin
import Packages from "./admin/pages/Packages";
import Applications from "./admin/pages/Applications";
import ManageUsers from "./admin/pages/ManageUsers";

// Patient
import ViewPatientAppointments from "./patient/pages/ViewPatientAppointments";
import ViewDoctors from "./patient/pages/ViewDoctors";
import ViewFamilyMembers from "./patient/pages/ViewFamilyMembers";
import ViewPrescriptions from "./patient/pages/ViewPrescriptions";
import RegisterScreen from "./patient/pages/RegisterScreen";
import PatientTest from "./patient/pages/PatientTest";
import ViewDoctorProfile from "./patient/pages/ViewDoctorProfile";
import PatientHome from "./patient/pages/PatientHome";
import ViewWallet from "./patient/pages/ViewWallet";
import PatientTest2 from "./patient/pages/PatientTest2";

// Doctor
import ViewDoctorAppointments from "./doctor/pages/ViewDoctorAppointments";
import ViewDoctorPatients from "./doctor/pages/ViewDoctorPatients";
import EditMyProfile from "./doctor/pages/EditMyProfile";
import RegisterForm from "./doctor/pages/RegisterForm";
import ViewPatientInfo from "./doctor/pages/ViewPatientInfo";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from "./patient/components/StripeForm";
import PaymentPage from "./patient/pages/PaymentPage";

function App() {

	// console.log(publishableKey);
	// console.log("hello");



	return (
		<>
			{
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/patientRegistration' element={<RegisterScreen />} />
					<Route path="/patient" element={<Patient />}>
						<Route path="" element={<PatientHome />} /> {/* TODO: change to home page */}
						<Route path="appointments" element={<ViewPatientAppointments />} />
						<Route path="doctors" element={<ViewDoctors />} />
						<Route path="prescriptions" element={<ViewPrescriptions />} />
						<Route path="familyMembers" element={<ViewFamilyMembers />} />
						<Route path="test" element={<PatientTest />} />
						<Route path="info/:id" element={<ViewDoctorProfile />} />
						<Route path="wallet" element={<ViewWallet />} />
						<Route path="test2" element={<PatientTest2 />} />
						<Route path="stripe" element={<PaymentPage />} />
					</Route>
					<Route path='/doctorRegistration' element={<RegisterForm />} />
					<Route path="/doctor" element={<Doctor />}>
						<Route path="appointments" element={<ViewDoctorAppointments />} />
						<Route path="patients" element={<ViewDoctorPatients />} />
						<Route path="profile" element={<EditMyProfile />} />
						<Route path="registerForm" element={<RegisterForm />} />
						<Route path="patientInfo" element={<ViewPatientInfo />} />
					</Route>

					<Route path="/admin" element={<Admin />}>
						<Route path="applications" element={<Applications />} />
						<Route path="packages" element={<Packages />} />
						<Route path="manageUsers" element={<ManageUsers />} />
					</Route>
				</Routes>
			}
		</>)
		;
}

export default App;
