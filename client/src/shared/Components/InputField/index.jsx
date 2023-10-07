import { useState } from "react"
import './styles.css';
function Input ({label, id, error, touch,  ...probs}){
  return (
    <div className='wrapper'>
      <div className="input-data">
        <input {...probs} id={id} placeholder={label}/>
      </div>
      {error && touch ? <div className="input-error"> {error} </div>: null}
    </div>
  );
}

export default Input;