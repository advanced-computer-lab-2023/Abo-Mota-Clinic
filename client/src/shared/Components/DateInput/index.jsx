import { useState } from "react"
import './styles.css';
function DateInput ({label, type}){
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  return (
    <div className="wrapper">
      <label htmlFor={label}>{label}</label>
      <div className="input-data">
        <input id={label} name={label} type={type} value={value} onChange={handleChange} required/>
      </div>
    </div>
  );
}

export default DateInput;