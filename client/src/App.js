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
// import Subscription from "./patient/components/Subscription";
import PatientTest3 from "./patient/pages/PatientTest3";

// Doctor
import ViewDoctorAppointments from "./doctor/pages/ViewDoctorAppointments";
import ViewDoctorPatients from "./doctor/pages/ViewDoctorPatients";
import EditMyProfile from "./doctor/pages/EditMyProfile";
import RegisterForm from "./doctor/pages/RegisterForm";
import ViewPatientInfo from "./doctor/pages/ViewPatientInfo";
import HealthPackages from "./patient/pages/HealthPackages";
import Profile from "./patient/pages/Profile";
import FreeSlotsAppointments from "./doctor/pages/FreeSlotsAppointments";
import PatientFollowUp from "./doctor/pages/PatientFollowUp";
import Contract from "./doctor/pages/Contract";

// login
import LoginForm from "./shared/pages/LoginForm";

import PaymentPage from "./patient/pages/PaymentPage";


// login


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/patientRegistration" element={<RegisterScreen />} />
        <Route path="/patient" element={<Patient />}>
          <Route path="" element={<PatientHome />} /> {/* TODO: change to home page */}
          <Route path="appointments" element={<ViewPatientAppointments />} />
          <Route path="doctors" element={<ViewDoctors />} />
          <Route path="prescriptions" element={<ViewPrescriptions />} />
          <Route path="familyMembers" element={<ViewFamilyMembers />} />
          <Route path="test" element={<PatientTest />} />
          <Route path="doctors/info/:id/" element={<ViewDoctorProfile />} />
          <Route path="wallet" element={<ViewWallet />} />
          <Route path="doctors/info/:id/test2/:doctorId" element={<PatientTest2 />} />
          <Route path="healthPackages" element={<HealthPackages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="test3" element={<PatientTest3 />} />
          {/* <Route path="profile/subscription" element={<Subscription/>}/> */}
        </Route>
        <Route path="/doctorRegistration" element={<RegisterForm />} />
        <Route path="/doctor" element={<Doctor />}>
          <Route path="contract" element={<Contract contractTitle="Doctor Contract" name="Karim Gamaleldin" doctor />}/>
          <Route path="appointments" element={<ViewDoctorAppointments />} />
          <Route path="patients" element={<ViewDoctorPatients />} />
          <Route path="FreeSlotsAppointments" element={<FreeSlotsAppointments />} />
          <Route path="appointments/PatientFollowUp/:patientId" element={<PatientFollowUp />} />
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
    </div>
  );
}

export default App;
