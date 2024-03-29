import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from "./patient/Patient";
import Doctor from "./doctor/Doctor";
import Admin from "./admin/Admin";


// Admin
import Packages from "./admin/pages/Packages";
import Applications from "./admin/pages/Applications";
import ManageUsers from "./admin/pages/ManageUsers";
import ChangePasswordPage from "./admin/pages/ChangePasswordPage";

// Patient
import ViewPatientAppointments from "./patient/pages/ViewPatientAppointments";
import ViewDoctors from "./patient/pages/ViewDoctors";
import ViewFamilyMembers from "./patient/pages/ViewFamilyMembers";
import ViewPrescriptions from "./patient/pages/ViewPrescriptions";
import RegisterScreen from "./patient/pages/RegisterScreen";
import PatientTest from "./patient/pages/AppointmentScheduler";
import ViewDoctorProfile from "./patient/pages/ViewDoctorProfile";
import PatientHome from "./patient/pages/PatientHome";
import ViewWallet from "./patient/pages/ViewWallet";
import AppointmentStepper from "./patient/pages/AppointmentStepper";
import Subscription from "./patient/pages/Subscription";
import PaymentPage from "./patient/pages/PaymentPage";
import PackagePaymentWrapper from "./patient/pages/PackagePaymentWrapper";
import Notifications from "./shared/pages/Notifications";

import Chat from "./patient/components/Chat";
import ViewPatientFamilyAppointments from "./patient/pages/ViewPatientFamilyAppointments";

// Doctor
import ViewDoctorAppointments from "./doctor/pages/ViewDoctorAppointments";
import ViewDoctorPatients from "./doctor/pages/ViewDoctorPatients";

import RegisterForm from "./doctor/pages/RegisterForm";
import ViewPatientInfo from "./doctor/pages/ViewPatientInfo";
import HealthPackages from "./patient/pages/HealthPackages";
import Profile from "./patient/pages/Profile";
import DoctorHome from "./doctor/pages/DoctorHome";
import FreeSlotsAppointments from "./doctor/pages/FreeSlotsAppointments";
import PatientFollowUp from "./doctor/pages/PatientFollowUp";
import Contract from "./doctor/pages/Contract";
import DoctorProfile from './doctor/pages/Profile/Profile';
import ViewPrescriptionsDoctor from "./doctor/pages/ViewPrescriptionsDoctor";
import ViewFollowUpRequests from "./doctor/pages/ViewFollowUpRequests";
// login
import LoginForm from "./shared/pages/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import PasswordSection from "./admin/pages/PasswordSection";
import LandingPage from "./shared/pages/LandingPage/LandingPage";
import GetStarted from "./shared/pages/GetStarted/GetStarted";

import io from "socket.io-client";
import VideoChat from "./shared/pages/VideoChat/VideoChat";
import PrescriptionPaymentWrapper from "./patient/pages/PrescriptionPaymentWrapper";
// Socket.io
const socket = io.connect("http://localhost:5000");

// login
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<GetStarted task='Sign In' />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/patientRegistration" element={<GetStarted task='Sign Up' />} />
        <Route element={<ProtectedRoute roles={["patient"]} />}>
          <Route path="/patient" element={<Patient socket={socket} />}>
            <Route path="" element={<PatientHome />} />
            <Route path="appointments" element={<ViewPatientAppointments socket={socket} />} />
            <Route
              path="familyAppointments"
              element={<ViewPatientFamilyAppointments socket={socket} />}
            />
            <Route path="doctors" element={<ViewDoctors socket={socket} />} />
            <Route path="prescriptions" element={<ViewPrescriptions />} />
            <Route path="prescriptions/:idx" element={<PrescriptionPaymentWrapper />} />
            <Route path="familyMembers" element={<ViewFamilyMembers />} />
            <Route path="test" element={<PatientTest />} />
            <Route path="doctors/info/:id/" element={<ViewDoctorProfile />} />
            <Route path="doctors/info/:id/video" element={<VideoChat />} />
            <Route path="wallet" element={<ViewWallet isPatient={true} />} />
            <Route
              path="doctors/info/:id/appointment/:doctorId"
              element={<AppointmentStepper socket={socket} />}
            />
            <Route path="healthPackages" element={<HealthPackages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat/:contact?" element={<Chat socket={socket} />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="healthPackages/:idx" element={<PackagePaymentWrapper />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>

        <Route path="/doctorRegistration" element={<GetStarted task='Join the team' />} />
        <Route element={<ProtectedRoute roles={["doctor"]} />}>
          <Route path="/doctor" element={<Doctor socket={socket} />}>
            {/* <Route path="" element={<Notification socket={socket} />} /> */}
            <Route
              path="contract"
              element={<Contract contractTitle="Doctor Contract" name="Karim Gamaleldin" doctor />}
            />
            <Route path="appointments" element={<ViewDoctorAppointments socket={socket} />} />
            <Route path="patients" element={<ViewDoctorPatients />} />
            <Route path="FreeSlotsAppointments" element={<FreeSlotsAppointments />} />
            <Route path="appointments/PatientFollowUp/" element={<PatientFollowUp />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="" element={<DoctorHome/>}/>
            <Route path="chat/:contact?" element={<Chat socket={socket} />} />
            <Route path="registerForm" element={<RegisterForm />} />
            <Route path="patients/patientInfo/:idx" element={<ViewPatientInfo />} />
            <Route path="patients/patientInfo/:idx/video" element={<VideoChat />} />
            
            <Route
              path="patients/patientInfo/:idx/prescriptions"
              element={<ViewPrescriptionsDoctor />}
            />
            <Route path="followUpRequests" element={<ViewFollowUpRequests />} />
            <Route path="wallet" element={<ViewWallet isPatient={false} />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="applications" element={<Applications />} />
            <Route path="packages" element={<Packages />} />
            <Route path="manageUsers" element={<ManageUsers />} />
            <Route path="changePassword" element={<ChangePasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;