import Logo from "./images/El7a2ny.png";
import { Link } from "react-router-dom";
import "./stylesheets/Navbar.css";

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="avatar"></div>
			<ul className="buttons">
				<li>
					<Link to="/" className="navbar-link">
						Register
					</Link>
				</li>
				<li>
					<Link to="/home" className="navbar-link">
						Home
					</Link>
				</li>
				<li>
					<Link to="/home" className="navbar-link">
						Contact Us
					</Link>
				</li>
			</ul>
			{/* <div className='right'>
        <div className='avatar'></div>
      </div> */}
		</div>
	);
};

export default Navbar;
