import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaChartPie, FaChartLine, FaBook, FaCalendar } from 'react-icons/fa'; // Import icons
import image from '../assets/logo.png'
import { Link } from 'react-router-dom';

export default function SideBar({ open, links }) {
  // Inline styles for menu items
  
  const hoverStyles = {
    backgroundColor: 'purple', // Change this to the desired hover color
  };
  console.log(links);
  return (
    <Sidebar 
      collapsedWidth='0px' 
      collapsed={!open} 
      backgroundColor= 'var(--primary-color-very-dark)'
    >
      <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={image} alt="Logo" style={{ width: 'auto', height: '100px' }} /> {/* Adjust size as needed */}
      </div>

      
      <Menu closeOnClick={true} className='h-screen text-white'
      menuItemStyles={{
        button: ({ level, active, disabled }) => {
          // only apply styles on first level elements of the tree
          if (level === 0)
            return {
              color: disabled ? '#f5d9ff' : '#FFFFFF',
              backgroundColor: active ? '#232232' : undefined,
            };
        },
      }}>
      {

links.map((link)=>{
  return <MenuItem icon={link.logo}
  styles={{ button: hoverStyles }}
  >
    <Link to={link.to}> 
    {link.name}</Link></MenuItem>
})
} 
      </Menu>
    </Sidebar>
  );
}
