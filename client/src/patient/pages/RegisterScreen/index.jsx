import Button from "../../../shared/Components/Button";
import { useState } from "react";
import Input from "../../../shared/Components/InputField";
import './RegisterStyles.css';
import DropDown from "../../../shared/Components/DropDown";
import DateInput from "../../../shared/Components/DateInput";
import logo from '../../../shared/assets/logo.png';
import { Link } from "react-router-dom";


const RegisterScreen = () => {
  const genders = ['Male', 'Female'];
  const [gender, setGender] = useState(genders[0]);
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setGender(selectedOption);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <div className="registesr-div">
      <div className="register-portal">
        <div className="register-part">
        <div className="register-title">
        Welcome to Abo Mouta Clinic!
        </div>       
        <div className="register-subtitle">
        Your health is our priority
        </div>
          <form action="post" onSubmit={handleSubmit}>
            <Input label="Username*" type="text" id="user-username" required/>
            <Input label="Email*" type="email" id="user-email" required/>
            <Input label="First Name*" type="text" id="user-first" required/>
            <Input label="Last Name*" type="text" id="user-last" required/>
            <DateInput label="Date of Birth*" type="date" id="dob"/>
            <DropDown value={gender} options={genders} onChange={handleOptionChange}  label='Gender*' name="gender" required/>
            {/* <RadioButton options={genders} onChange={handleOptionChange} selectedOption={radio} name="gender"/> */}
            <Input label="Phone Number*" type="tel" id="user-contact" required/>
            <Input label="Password*" type="password" id="password" required />
            <h2 className="emergency-label">Emergency Contact info:</h2>
            <Input label="First Name*" type="text" id="em-first" required/>
            <Input label="Last Name*" type="text" id="em-last" required/>
            <Input label="Phone Number*" type="tel" id="em-contact" required/>
            <Input label="Username" type="tel" id="em-username"/>
            <div className="button-register-container"><Button type="submit" label="Register"/></div>
            <div className="link-register-container"><Link className="link-register">Already have an account?</Link></div>
          </form>
        </div>
        <div className="logo-div"> <img className="register-logo" src={logo} alt="logo"/> </div>
      </div>
    </div>
  );
}

export default RegisterScreen;