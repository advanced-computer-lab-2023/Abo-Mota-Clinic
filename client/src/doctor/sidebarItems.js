import Avatar from "@mui/joy/Avatar";
import { FaUser, FaHospital, FaCalendar, FaFileContract, FaWallet, FaHome } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";

const items = [
  {
    key: '0',
    icon: <FaHome />,
    label: 'Home',
    to: '/doctor', // Empty string for the route to home
  },
  {
    key: '1',
    icon: <FaHospital />,
    label: 'Patients',
    to: 'patients', // Assuming you are using react-router-dom for routing
  },
  {
    key: '2',
    icon: <FaCalendar />,
    label: 'Appointments',
    to: 'appointments',
  },
  {
    key: '3',
    icon: <FaFileContract />,
    label: 'View Contract',
    to: 'contract',
  },
  {
    key: '4',
    icon: <FaWallet />,
    label: 'View my Wallet',
    to: 'wallet',
  },
  {
    key: '5',
    icon: <FaCodePullRequest />,
    label: 'Follow Up Requests',
    to: 'followUpRequests',
  },
];

export default items;
