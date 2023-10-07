import { Link } from 'react-router-dom';
import './navbarstyless.css';
import logo from '../../assets/logo.png';
import {GiHamburgerMenu} from 'react-icons/gi';

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='left'>
        <GiHamburgerMenu size={20} className='hamburger'/>
        <img src={logo} alt="logo" className='navbar-logo'/>
      </div>
        <ul className='buttons'>
          <li><Link to="/" className='navbar-link'>Register</Link></li>
          <li><Link to="/home" className='navbar-link'>Home</Link></li>
          <li><Link to="/home" className='navbar-link'>Join Us</Link></li>
        </ul>
      {/* <div className='right'>
        <div className='avatar'></div>
      </div> */}
    </div>
  );
};


export default NavBar;