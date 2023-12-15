import {
  FaUserMd,
  FaCalendarCheck,
  FaNotesMedical,
  FaUsers,
  FaBoxOpen,
  FaWallet,
} from "react-icons/fa";
export const items = [
  {
    name: "Doctors",
    to: "doctors",
    logo: <FaUserMd />, // FontAwesome: user-md or Material Icons: local_hospital
  },
  {
    name: "My Appointments",
    to: "appointments",
    logo: <FaCalendarCheck />, // FontAwesome: calendar-check or Material Icons: event_available
  },
  {
    name: "My Prescriptions",
    to: "prescriptions",
    logo: <FaNotesMedical />, // FontAwesome: notes-medical or Material Icons: description
  },
  {
    name: "My Family Members",
    to: "familyMembers",
    logo: <FaUsers />, // FontAwesome: users or Material Icons: people_outline
  },
  {
    name: "Health Packages",
    to: "healthPackages",
    logo: <FaBoxOpen />, // FontAwesome: box-open or Material Icons: local_offer
  },
  {
    name: "My Wallet",
    to: "wallet",
    logo: <FaWallet />, // FontAwesome: wallet or Material Icons: account_balance_wallet
  },
];
