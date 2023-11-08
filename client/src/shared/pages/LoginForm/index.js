import KimoButton from "../../Components/KimoButton";
import { useEffect, useState } from "react";
import Input from "../../Components/InputField";
import logo from '../../../shared/assets/logo.png';
import * as yup from 'yup';
import Header from "../../Components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import './styles.css';
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    console.log(values);
    const pharmacist = {
      email: values.email,
      password: values.password,
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    resetForm({ values: '' });
    navigate('/pharmacist/medicine');
};

const forgetPasswordOnClick = () => {
  console.log("forget password");
}


  const PharmacistForm = (
    <Formik
    initialValues={initialPharmacistValues}
    validationSchema={PharmacistSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {console.log(formik.values)}
          <div className="form-container">         
            <Input 
            label="Email*" 
            icon
            type="text" 
            id="email"
            error={formik.errors.email}
            touch={formik.touched.email}
            {...formik.getFieldProps('email')}
            />
          </div>
          <div className="form-container">
            <Input 
            label="Password*" 
            icon
            type="password" 
            id="password"
            error={formik.errors.password}
            touch={formik.touched.password}
            {...formik.getFieldProps('password')}
            />
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :
            // <Link to='medicine'>
              <KimoButton type="submit">
                Log in
              </KimoButton>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
  );
   
  return (
    <div className="login-div">
      <div className="login-portal">
        <div className="login-part">
        <div className="login-logo-div"> <img className="login-logo" src={logo} alt="logo"/> </div>
        <Header header="Welcome Back!" type="login-header"/>
        </div>
        <p className="login-word">Login</p>
        {PharmacistForm}
        <div className="forget-password-container">
          <button className="forget-password-button" onClick={forgetPasswordOnClick}>
            Forget Password?
          </button>
        </div>
      </div>
    </div>
  );
}

const FILE_SIZE = 160 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];


const PharmacistSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Please enter a valid email address'),

  password: yup.string().min(8, 'Password must be at least 8 characters long').matches(/[a-zA-Z]/, 'Password must contain at least one letter').matches(/[0-9]/, 'Password must contain at least one number').required('Please enter a valid password'),

});


const initialPharmacistValues = {
  email: '',
  password: ''
};



export default LoginForm;