import Avatar from '@mui/joy/Avatar';
import { FaUser, FaHospital, FaCalendar, FaFileContract, FaWallet } from 'react-icons/fa';

export const items = [
  {
    name: "Patients",
    to: "patients",
    logo: <FaHospital />,
  },
  {
    name: "Appointments",
    to: "appointments",
    logo: <FaCalendar />,
  },
  {
    name: "View Contract",
    to: "contract",
    logo: <FaFileContract />,
  },
  {
    name: "View my Wallet",
    to: "wallet",
    logo: <FaWallet />,
  },
];
