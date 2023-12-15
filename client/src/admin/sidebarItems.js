import { FaBox, FaLaptop, FaUsers, FaKey } from "react-icons/fa";

export const items = [
  {
    key: "1",
    icon: <FaBox />,
    label: "Packages",
    to: "packages", // Assuming you're using react-router-dom for routing
  },
  {
    key: "2",
    icon: <FaLaptop />,
    label: "Applications",
    to: "applications",
  },
  {
    key: "3",
    icon: <FaUsers />,
    label: "Manage Users",
    to: "manageUsers",
  },
  {
    key: "4",
    icon: <FaKey />,
    label: "Change Password",
    to: "changePassword",
  },
];

export default items;
