import './styles.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from 'react-router-dom';
const SideBar = ({open, setOpen, links=[]}) => {

  const mappedSideBarLinks = links.map((link, index) => {
    return(
      <div className='sidebar-link-container'>
        <Link className='sidebar-link' key={index} to={link.to}>{link.name}</Link>
      </div>
      );
  });
  return <div className="sidebar-container"> 
    <div className='sidebar-button' onClick={() => setOpen(!open)}>
      <GiHamburgerMenu size={20} />
    </div>
    {open && (
        <div className="sidebar">
          <div className='sidebar-close-button' onClick={() => setOpen(!open)}>
            <AiOutlineClose size={20} />
          </div>
          {mappedSideBarLinks}
        </div>
      )}
  </div>;
};

export default SideBar;