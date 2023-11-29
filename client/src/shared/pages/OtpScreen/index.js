import './styles.css';
import {AiOutlineClose} from 'react-icons/ai';
import { Formik } from 'formik';
import Input from '../../Components/InputField';
import * as yup from 'yup';
import Button from "../../Components/Button";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { useState, useEffect } from "react";
import { useForgetPasswordMutation } from '../../../store';
import { useRequestOtpMutation } from '../../../store';
import Toast from "../../../patient/components/Toast";

const OtpScreen = ({closeForm, email}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [showButton, setShowButton] = useState(false);
  const [setNewPassword , result] = useForgetPasswordMutation();
  const [requestOtp, results] = useRequestOtpMutation();

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });
  console.log(email)

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  const onResendClick = () => {
    setSeconds(60);
    setShowButton(false);
    // Add code for backend resend otp here
    console.log(email)
    requestOtp({email})
    .unwrap()
    .then(() => {
      setToast({
        ...toast,
        open: true,
        color: "success",
        message: "OTP resent to your email",
      });
    })
    .catch((res) => {
      setToast({
        ...toast,
        open: true,
        color: "danger",
        message: res.data.error,
      });
    });
  }

  useEffect(() => {
    // Only start the countdown if the button is not yet visible
    if (!showButton) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clear the interval when the countdown is finished
      return () => clearInterval(intervalId);
    }
  }, [showButton]);

  // Effect to handle the countdown reaching zero
  useEffect(() => {
    if (seconds === 0) {
      setShowButton(true);
      // Optionally reset the timer here if needed
    }
  }, [seconds]);


  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    console.log(values.email);
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    setNewPassword({...values, email})
      .unwrap()
      .then(async() => {
        setToast({
          ...toast,
          open: true,
          color: "success",
          message: "Password Changed",
        });
        resetForm({ values: '' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        closeForm();
      })
      .catch((res) => 
      {
        setToast({
          ...toast,
          open: true,
          color: "danger",
          message: res.data.error,
        });
      });


    setIsLoading(false);

  
  };
  const OtpForm = (
    <Formik
    initialValues={initialOtpValues}
    validationSchema={OtpSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          
          <div className="form-container">         
            <Input 
            label="OTP" 
            icon
            type="text" 
            id="otp"
            error={formik.errors.otp}
            touch={formik.touched.otp}
            {...formik.getFieldProps('otp')}
            />
          </div>
          <div className="form-container">
            <Input
              label="Password*"
              icon
              type="password"
              id="newPassword"
              error={formik.errors.newPassword}
              touch={formik.touched.newPassword}
              {...formik.getFieldProps("newPassword")}
            />
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :
            // <Link to='medicine'>
              <Button type="submit">
                Submit
              </Button>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
    );
  return (
    <div className='otp-portal-container'>
      <div className='otp-portal'>
        <div className='otp-button-container'>
          <h1 className='otp-header'>One Time Password</h1>
          <span className= 'otp-close-button-span' onClick={closeForm}><AiOutlineClose size={30} color='black'/></span>
        </div>
        {OtpForm}
        <p className='otp-paragraph'>Check your Mail.{showButton ? <span className='otp-resend-span otp-resend-clickable' onClick={onResendClick}> Resend OTP</span> : <span className='otp-resend-span'> wait {seconds} seconds</span>}</p>
      </div>

      <div>
        <Toast {...toast} onClose={onToastClose} />
      </div>
    </div>

  );
}

const OtpSchema = yup.object().shape({
  otp: yup.string().matches(/^\d{6}$/, 'OTP must be exactly 6 digits').required('Please enter your OTP'),
  newPassword: yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-zA-Z]/, "Password must contain at least one letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .required("Please enter a valid password"),
});


const initialOtpValues = {
  otp: '',
  newPassword: '',
};


export default OtpScreen;