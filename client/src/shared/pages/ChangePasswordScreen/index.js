import Input from '../../Components/InputField';
import * as yup from 'yup';
import { Formik } from 'formik';
import Button from "../../Components/Button";
import LoadingIndicator from "../../Components/LoadingIndicator"; 
import { useState } from "react";
import Header from "../../Components/Header";
import './styles.css';

const ChangePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    resetForm({ values: '' });
  };
  const changePasswordForm = (
    <Formik
    initialValues={initialChangePassword}
    validationSchema={ChangePasswordSchema}
    onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-container">         
            <Input 
            label="Old Password*" 
            icon
            type="password" 
            id="oldPassword"
            error={formik.errors.oldPassword}
            touch={formik.touched.oldPassword}
            {...formik.getFieldProps('oldPassword')}
            />
          </div>
          <div className="form-container">
            <Input 
            label="New Password*" 
            icon
            type="password" 
            id="newPassword"
            error={formik.errors.password}
            touch={formik.touched.password}
            {...formik.getFieldProps('password')}
            />
          </div>
          <div className="form-container">
            <Input 
            label="Confirm New Password*" 
            icon
            type="password" 
            id="confirmNewPassword"
            error={formik.errors.confirmPassword}
            touch={formik.touched.confirmPassword}
            {...formik.getFieldProps('confirmPassword')}
            />
          </div>
          <div className="submit-add-medicine-button-container">
          {isLoading ? <LoadingIndicator /> :
            // <Link to='medicine'>
              <Button type="submit">
                Log in
              </Button>
            // </Link>
          }
        </div>
        </form>
      )}

    </Formik>
    );


    return (
      <div className='change-password-container'>
          <div className="change-password-screen">
          <Header header="Change Password" />
          {changePasswordForm}
        </div>
      </div>
    );
}


const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Please enter a valid password'),

  password: yup.string().min(8, 'Password must be at least 8 characters long').matches(/[a-zA-Z]/, 'Password must contain at least one letter').matches(/[0-9]/, 'Password must contain at least one number').required('Please enter a valid password'),

  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
});


const initialChangePassword = {
  oldPassword: '',
  password: '',
  confirmPassword: ''
};

export default ChangePasswordScreen;