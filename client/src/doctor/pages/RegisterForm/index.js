import Button from "../../../shared/Components/Button";
import { useState } from "react";
import Input from "../../../shared/Components/InputField";
import './styles.css';
import DateInput from "../../../shared/Components/DateInput";
import logo from '../../../shared/assets/logo.png';
import * as yup from 'yup';
import Header from "../../../shared/Components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../../shared/Components/LoadingIndicator";
import { useRegisterDoctorMutation } from "../../../store";
import DropDown from "../../../shared/Components/DropDown"
import { useNavigate } from "react-router-dom";
import NavBar from "../../../shared/Components/NavBar"


const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerDoctor, results] = useRegisterDoctorMutation();
  const navigateq = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    console.log(values);
    const doctor = {
      dob: values.dateOfBirth,
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      gender: values.gender,
      mobile: values.mobileNumber,
      nationalId: values.nationalId,
      username: values.userName,
      password: values.password,
      rate: values.hourlyRate,
      affiliation: values.affiliation,
      educationalBackground: values.educationalBackground
    }
    console.log(doctor);
    setIsLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    await registerDoctor(doctor);
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    resetForm({ values: '' });
    navigateq('/doctor/appointments');
};


  const DoctorForm = (
    <Formik
    initialValues={initialDoctorValues}
    validationSchema={DoctorSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">         
            <Input 
            label="Email*" 
            type="text" 
            id="email"
            error={formik.errors.email}
            touch={formik.touched.email}
            {...formik.getFieldProps('email')}
            />
          </div>
          <div className="form-container">
          <Input 
            label="Username*" 
            type="text" 
            id="userName"
            error={formik.errors.userName}
            touch= {formik.touched.userName}
            {...formik.getFieldProps('userName')}
            />
            <Input 
              label="NationalID*" 
              type="text" 
              id="nationalId"
              error={formik.errors.nationalId}
              touch= {formik.touched.nationalId}
              {...formik.getFieldProps('nationalId')}
            />  
            </div>
          <div className="form-container">
            <Input 
            label="First Name*" 
            type="text" 
            id="firstName"
            error={formik.errors.firstName}
            touch= {formik.touched.firstName}
            {...formik.getFieldProps('firstName')}
            />  
            <Input 
            label="Last Name*" 
            type="text" 
            id="lastName"
            error={formik.errors.lastName}
            touch= {formik.touched.lastName}
            {...formik.getFieldProps('lastName')}
            />   
          </div>
          <div className="form-container">
            <DateInput 
            label="Date of Birth*" 
            id="dob"
            error={formik.errors.dateOfBirth}
            touch = {formik.touched.dateOfBirth}
            {...formik.getFieldProps('dateOfBirth')}
            onChange={formik.handleChange}
            />
            <Input 
            label="Hourly rate in USD*" 
            type="number" 
            id="hourlyRate"
            error={formik.errors.hourlyRate}
            touch = {formik.touched.hourlyRate}
            {...formik.getFieldProps('hourlyRate')}
            />   
          </div>
          <div className="form-container">           
            <Input 
            label="Affliation(Hospital)*" 
            type="text" 
            id="affiliation"
            error={formik.errors.affiliation}
            touch = {formik.touched.affiliation}
            {...formik.getFieldProps('affiliation')}
            />  
            <Input 
            label="Educational Background*" 
            type="text" 
            id="educationalBackground"
            error={formik.errors.educationalBackground}
            touch = {formik.touched.educationalBackground}
            {...formik.getFieldProps('educationalBackground')}
            />  
          </div>
          <div className="form-container">
            <Input 
            label="Phone number*" 
            type="tel" 
            id="mobileNumber"
            error={formik.errors.mobileNumber}
            touch = {formik.touched.mobileNumber}
            {...formik.getFieldProps('mobileNumber')}
            />
            <DropDown 
            label="Gender*" 
            type="text" 
            id="gender"
            error={formik.errors.gender}
            onChange={formik.handleChange}
            touch = {formik.touched.gender}
            options={['male', 'female']}
            {...formik.getFieldProps('gender')}
            /> 
          </div>
          <div className="form-container">
          <Input 
            label="Password*" 
            type="password" 
            id="password"
            error={formik.errors.password}
            touch = {formik.touched.password}
            {...formik.getFieldProps('password')}
            />
            <Input 
            label="Cofirm Password*" 
            type="password" 
            id="confirmPassword"
            error={formik.errors.confirmPassword}
            touch = {formik.touched.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
            />  
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :<Button type="submit">
            Submit Form
          </Button>}
        </div>
        </form>
      )}

    </Formik>
  );
   
  return (
    <div className="registesr-div">
      <NavBar />
      <div className="register-portal">
        <div className="register-part">
          <Header header="Welcome to Abo Mouta Clinic!" subheader="We are glad you want to join us!"/>
          {DoctorForm}
        </div>
        <div className="logo-div"> <img className="register-logo" src={logo} alt="logo"/> </div>
      </div>
    </div>
  );
}

const DoctorSchema = yup.object().shape({
  userName: yup.string().min(3, 'Username must be at least 3 characters long').max(50, 'Username must be at most 50 characters long').required('Please enter a valid username'),
  
  firstName: yup.string().min(2, 'First Name must be at least 2 characters long').max(50, 'First Name must be at most 50 characters long').required('Please enter a valid First Name'),
  
  lastName: yup.string().min(2, 'Last Name must be at least 2 characters long').max(50, 'Last Name must be at most 50 characters long').required('Please enter a valid Last Name'),

  email: yup.string().email('Invalid email').required('Please enter a valid email address'),

  password: yup.string().min(8, 'Password must be at least 8 characters long').matches(/[a-zA-Z]/, 'Password must contain at least one letter').matches(/[0-9]/, 'Password must contain at least one number').required('Please enter a valid password'),

  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  
  dateOfBirth: yup.date().max(new Date(), 'Date of Birth should be in the past').required('Please enter your date of birth'),

  hourlyRate: yup.number().positive('Hourly rate should be a positive number').required('Please enter your hourly rate'),

  affiliation: yup.string().min(3, 'Affiliation (Hospital) must be at least 3 characters long').max(50, 'Affiliation (Hospital) must be at most 50 characters long').required('Please enter your affiliation (hospital)'),

  educationalBackground: yup.string().min(5, 'Educational Background is too short').max(500, 'Educational Background is too long').required('Please enter your educational background'),

  gender: yup.string().oneOf(['male', 'female'], 'Invalid gender').required('Please select a gender'),

  mobileNumber: yup.string().matches(/^[0-9]{11}$/, 'Mobile number must be exactly 11 digits').required('Please enter a valid mobile number'),

  nationalId: yup.string().matches(/^[0-9]{14}$/, 'National ID must be exactly 14 digits').required('Please enter a valid national ID')

});


const initialDoctorValues = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',  
  dateOfBirth: '',
  hourlyRate: '',
  affiliation: '',
  educationalBackground: '',
  gender: 'male',
  mobileNumber: '',
  nationalId: ''
};



export default RegisterForm;