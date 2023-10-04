import './styles.css'
import { useState } from 'react';
import AspirinLogo from '../../assets/aspirin.jpg'; 
const Accordion = ({label, subLabel, price, expanded}) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };

  const extension = Object.entries(expanded).map(([key, value]) => {
    return <div className='accordion-entry'>
      <span className='accordion-key'>{key}</span>: {value}
      </div>;
  });

  const className = `accordion ${open ? 'open' : 'closed'}`;
  return (
    <div className='accordion-container'>
      <div className= {className} onClick={onClick}>
        <div className='accordion-titles'>
          <div className='accordion-header'>{label}</div>
          <div className='accordion-subheader'>{subLabel}</div>
        </div>
        <div className='accordion-price'>{price}</div>
      </div>
      {open ? <div className='accordion-extension'>
          <div className='extension-header'>Extra Information</div>
          <img className='accordion-image' src={AspirinLogo} alt='Aspirin Logo'/>
          {extension}
      </div> : <></>}
    </div>
  );
}

export default Accordion; 