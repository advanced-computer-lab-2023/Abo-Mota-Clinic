import { useState } from "react"
import './styles.css';
import {AiOutlineMail, AiFillLock} from 'react-icons/ai';

function Input ({label, id, error, touch, icon ,  ...probs}){
  return (
    <div className={`wrapper ${id}`}>
      <div className="input-data">
        {icon ? <label className="input-label" htmlFor={id}>{getIcon(id)}</label> : null}
        <input {...probs} id={id} placeholder={label}/>
      </div>
      {error && touch ? <div className="input-error"> {error} </div>: null}
    </div>
  );
}

const getIcon = (s) => {
  switch (s) {
    case 'email': return <AiOutlineMail size="15"/>;
    case 'password': return <AiFillLock size="15"/>;
    default : return null;
  }
}

export default Input;