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
import PatientTest from "./patient/pages/AppointmentScheduler";
import ViewDoctorProfile from "./patient/pages/ViewDoctorProfile";
import PatientHome from "./patient/pages/PatientHome";
import ViewWallet from "./patient/pages/ViewWallet";
import AppointmentStepper from "./patient/pages/AppointmentStepper";
import Subscription from "./patient/pages/Subscription";
import PaymentPage from "./patient/pages/PaymentPage";
import PackagePaymentWrapper from "./patient/pages/PackagePaymentWrapper";
import ChangePassword from "./patient/components/ChangePassword";
import Chat from "./patient/components/Chat";

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
import Notification from "./doctor/components/Notification";
import ViewPrescriptionsDoctor from "./doctor/pages/ViewPrescriptionsDoctor";

// login
import LoginForm from "./shared/pages/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import PasswordSection from "./admin/pages/PasswordSection";
import LandingPage from "./shared/pages/LandingPage/LandingPage";

import io from "socket.io-client";
import VideoChat from "./shared/pages/VideoChat/VideoChat";
import ViewFollowUpRequests from "./doctor/pages/ViewFollowUpRequests";
// Socket.io
const socket = io.connect("http://localhost:5000");

// login
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/patientRegistration" element={<RegisterScreen />} />
        <Route element={<ProtectedRoute roles={["patient"]} />}>
          <Route path="/patient" element={<Patient socket={socket} />}>
            <Route path="" element={<PatientHome />} />
            <Route path="appointments" element={<ViewPatientAppointments socket={socket} />} />
            <Route path="doctors" element={<ViewDoctors socket={socket} />} />
            <Route path="prescriptions" element={<ViewPrescriptions />} />
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
            <Route path="test3/:recipient" element={<Chat socket={socket} />} />
            <Route path="profile/subscription" element={<Subscription />} />
            <Route path="healthPackages/:idx" element={<PackagePaymentWrapper />} />
          </Route>
        </Route>

        <Route path="/doctorRegistration" element={<RegisterForm />} />
        <Route element={<ProtectedRoute roles={["doctor"]} />}>
          <Route path="/doctor" element={<Doctor socket={socket} />}>
            <Route path="" element={<Notification socket={socket} />} />

            <Route
              path="contract"
              element={<Contract contractTitle="Doctor Contract" name="Karim Gamaleldin" doctor />}
            />
            <Route path="appointments" element={<ViewDoctorAppointments socket={socket} />} />
            <Route path="patients" element={<ViewDoctorPatients />} />
            <Route path="FreeSlotsAppointments" element={<FreeSlotsAppointments />} />
            <Route path="appointments/PatientFollowUp/" element={<PatientFollowUp />} />
            <Route path="profile" element={<EditMyProfile />} />
            <Route path="registerForm" element={<RegisterForm />} />
            <Route path="patients/patientInfo/:idx" element={<ViewPatientInfo />} />
            <Route path="patients/patientInfo/:idx/video" element={<VideoChat />} />
            <Route
              path="patients/patientInfo/:idx/prescriptions"
              element={<ViewPrescriptionsDoctor />}
            />
            <Route path="wallet" element={<ViewWallet isPatient={false} />} />
            <Route path="followUpRequests" element={<ViewFollowUpRequests />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="applications" element={<Applications />} />
            <Route path="packages" element={<Packages />} />
            <Route path="manageUsers" element={<ManageUsers />} />
            <Route path="changePassword" element={<PasswordSection />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
