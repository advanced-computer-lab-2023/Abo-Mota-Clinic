import { Link } from "react-router-dom";
import "./navbarstyless.css";
import logo from "../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import SideBar from "../SideBar";
import { useState } from "react";
import { useLogoutMutation } from "../../../store";

const NavBar = ({ links = [], navBarItems = [] }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const [logout, result] = useLogoutMutation();
  const handleClick =  async() => {
    await logout();
  }
  const content = navBarItems.map((item) => {
    return (
      <li id={item.name}>
        {item.name === "Logout"? <Link to={item.to} className="navbar-link" onClick={handleClick}>{item.name}</Link>: 
        <Link to={item.to} className="navbar-link">{item.name}</Link>}
      </li>
    );
  });
  return (
    <div className="navbar">
      <div className="left">
        <SideBar open={sideBarOpen} setOpen={setSideBarOpen} links={links} />
      </div>
      <img src={logo} alt="logo" className="navbar-logo" />

      <ul className="buttons">
        <li>
          <Link to="/" className="navbar-link">
            <div className="navbar-home">
              <AiOutlineHome size={20} />
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link to="/" className="navbar-link">
            Join Us
          </Link>
        </li>
        {content}
      </ul>
      {/* <div className='right'>
        <div className='avatar'></div>
      </div> */}
    </div>
  );
};

export default NavBar;
