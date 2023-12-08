import { FaUserMd, FaCalendarCheck, FaNotesMedical, FaUsers, FaBoxOpen, FaWallet } from 'react-icons/fa'; 
export const items = [
    {
      name: "View Doctors",
      to: "doctors",
      logo: <FaUserMd />, // FontAwesome: user-md or Material Icons: local_hospital
    },
    {
      name: "View My Appointments",
      to: "appointments",
      logo: <FaCalendarCheck />, // FontAwesome: calendar-check or Material Icons: event_available
    },
    {
      name: "View Prescriptions",
      to: "prescriptions",
      logo: <FaNotesMedical />, // FontAwesome: notes-medical or Material Icons: description
    },
    {
      name: "View Family Members",
      to: "familyMembers",
      logo: <FaUsers />, // FontAwesome: users or Material Icons: people_outline
    },
    {
      name: "View Health Packages Options",
      to: "healthPackages",
      logo: <FaBoxOpen />, // FontAwesome: box-open or Material Icons: local_offer
    },
    {
      name: "View my Wallet",
      to: "wallet",
      logo: <FaWallet />, // FontAwesome: wallet or Material Icons: account_balance_wallet
    }
  ];
  