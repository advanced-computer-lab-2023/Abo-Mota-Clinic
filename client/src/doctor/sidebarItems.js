import Avatar from "@mui/joy/Avatar";
import { FaUser, FaHospital, FaCalendar, FaFileContract, FaWallet } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";

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
  {
    name: "Follow Up Requests",
    to: "followUpRequests",
    logo: <FaCodePullRequest />,
  },
];
