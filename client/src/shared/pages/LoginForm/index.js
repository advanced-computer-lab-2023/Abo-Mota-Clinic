import KimoButton from "../../Components/KimoButton";
import { useEffect, useState } from "react";
import Input from "../../Components/InputField";
import logo from "../../../shared/assets/logo.png";
import * as yup from "yup";
import Header from "../../Components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../Components/LoadingIndicator";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useLoginMutation } from "../../../store";
import ForgetPasswordScreen from "../ForgetPasswordScreen";
import OtpScreen from "../OtpScreen";
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const navigate = useNavigate();
  const [login, results] = useLoginMutation();
  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    console.log(values);
    const user = {
      username: values.username,
      password: values.password,
    };
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const result = await login(user).unwrap();
      console.log(result);
      // Use the result for navigation or other side effects
      if (result.userType === "patient") {
        navigate("/patient");
      } else if (result.userType === "doctor") {
        navigate("/doctor");
      } else if (result.userType === "admin") {
        navigate("/admin");
      }
      resetForm({ values: "" });
    } catch (error) {
      console.error("Failed to login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgetPasswordOnClick = () => {
    console.log("forget password");
  };

  const UserForm = (
    <Formik initialValues={initialUserValues} validationSchema={UserSchema} onSubmit={handleSubmit}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {/* {console.log(formik.values)} */}
          <div className="form-container">
            <Input
              label="Username*"
              icon
              type="text"
              id="username"
              error={formik.errors.username}
              touch={formik.touched.username}
              {...formik.getFieldProps("username")}
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
              {...formik.getFieldProps("password")}
            />
          </div>
          <div className="submit-add-medicine-button-container">
            {
              isLoading ? (
                <LoadingIndicator />
              ) : (
                // <Link to='medicine'>
                <KimoButton type="submit">Log in</KimoButton>
              )
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
          <div className="login-logo-div">
            {" "}
            <img className="login-logo" src={logo} alt="logo" />{" "}
          </div>
          <Header header="Welcome Back!" type="login-header" />
        </div>
        <p className="login-word">Login</p>
        {UserForm}
        <div className="flex justify-between mr-8 ml-8">
          <div className="flex space-x-4">
            <button className="forget-password-button" onClick={() => {navigate("/doctorRegistration")}}>
              Register as Doctor?
            </button>
            <button className="forget-password-button" onClick={() => {navigate("/patientRegistration")}}>
              Register as Patient?
            </button>
          </div>
          <button className="forget-password-button" onClick={() => {setForgetPassword(true)}}>
            Forget Password?
          </button>

        </div>
      </div>
      {forgetPassword && <ForgetPasswordScreen closeForm={() => {setForgetPassword(false)}} goToOtp={() => {setOtpOpen(true)}} />}
      {otpOpen && <OtpScreen closeForm={() => {setOtpOpen(false)}} />}
    </div>
  );
};

const FILE_SIZE = 160 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const UserSchema = yup.object().shape({
  username: yup.string("Invalid username").required("Please enter a valid username"),

  password: yup.string(),
  // .min(8, "Password must be at least 8 characters long")
  // .matches(/[a-zA-Z]/, "Password must contain at least one letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .required("Please enter a valid password"),
});

const initialUserValues = {
  username: "",
  password: "",
};

export default LoginForm;
