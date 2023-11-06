import { Link } from "react-router-dom";
import "./navbarstyless.css";
import logo from "../../assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import SideBar from "../SideBar";
import { useState } from "react";

const NavBar = ({ links, items }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const content = items.map((item) => {
    return (
      <li id={item.name}>
        <Link to={item.to}>{item.name}</Link>
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
