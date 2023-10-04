import { useState } from "react"
function DateInput ({label, type, className}){
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const extraClass = className ? className : ''; 

  return (
    <div className={`wrapper ${extraClass}`}>
      <label htmlFor={label}>{label}</label>
      <div className="input-data">
        <input id={label} name={label} type={type} value={value} onChange={handleChange} required/>
      </div>
    </div>
  );
}

export default DateInput;