import { useState } from "react"
import './styles.css';
function Input ({label, type, id, required}){
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  console.log(required);
  return (
    <div className="wrapper">
      <div className="input-data">
        <input id={id} name={id} type={type} value={value} onChange={handleChange} required={required}/>
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}

export default Input;