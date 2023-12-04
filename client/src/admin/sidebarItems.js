import { FaBox, FaLaptop, FaUsers, FaKey } from 'react-icons/fa';

export const items = [
  {
    name: "Packages",
    to: "packages",
    logo: <FaBox />
  }
  ,
  {
    name: "Applications",
    to: "applications",
    logo: <FaLaptop />
  }
  ,
  {
    name: "Manage Users",
    to: "manageUsers",
    logo: <FaUsers />
  }
  ,
  {
    name: "Change Password",
    to: "changePassword",
    logo: <FaKey />
  }
];
