import Button from "../../../shared/Components/Button.js";
import { useState, useEffect } from "react";
import Input from "../../../shared/Components/InputField";
// import "./styles.css";
import DateInput from "../../../shared/Components/DateInput";
import logo from "../../../shared/assets/logo.png";
import * as yup from "yup";
import Header from "../../../shared/Components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../../shared/Components/LoadingIndicator";
import DropDown from "../../../shared/Components/DropDown";
import { useRegisterPatientMutation } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormErrorDialog from "../../../shared/Components/FormErrorDialog";
const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerPatient, results] = useRegisterPatientMutation();
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { resetForm }) => {
    // values contains all the data needed for registeration
    // console.log(values);
    const patient = {
      dob: values.dateOfBirth,
      email: values.email,
      name: `${values.firstName} ${values.lastName}`,
      gender: values.gender,
      mobile: values.mobileNumber,
      nationalId: values.nationalId,
      username: values.userName,
      password: values.password,
      emergencyContact: {
        name: `${values.emergencyContactFirstName} ${values.emergencyContactLastName}`,
        mobile: values.emergencyContactMobileNumber,
        relation: values.emergencyContactRelation,
      },
    };
    // console.log(patient)

    setIsLoading(true);
    await registerPatient(patient);
    // dispatch(login({ role: "patient" }));
    console.log(results);
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
  };

  console.log("out: ", results);

  useEffect(() => {
    if (results.isError) {
      setIsError(results.error.data.error);
    }
  }, [results]);

  const clientForm = (
    <Formik
      initialValues={clientInitialValues}
      validationSchema={clientSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className='form-container'>
            <Input
              label='Email*'
              type='text'
              id='email'
              error={formik.errors.email}
              touch={formik.touched.email}
              {...formik.getFieldProps("email")}
            />
            <Input
              label='Phone number*'
              type='tel'
              id='mobileNumber'
              error={formik.errors.mobileNumber}
              touch={formik.touched.mobileNumber}
              {...formik.getFieldProps("mobileNumber")}
            />
          </div>
          <div className='form-container'>
            <Input
              label='Username*'
              type='text'
              id='userName'
              error={formik.errors.userName}
              touch={formik.touched.userName}
              {...formik.getFieldProps("userName")}
            />
            <Input
              label='NationalID*'
              type='text'
              id='nationalId'
              error={formik.errors.nationalId}
              touch={formik.touched.nationalId}
              {...formik.getFieldProps("nationalId")}
            />
          </div>
          <div className='form-container'>
            <Input
              label='First Name*'
              type='text'
              id='firstName'
              error={formik.errors.firstName}
              touch={formik.touched.firstName}
              {...formik.getFieldProps("firstName")}
            />
            <Input
              label='Last Name*'
              type='text'
              id='lastName'
              error={formik.errors.lastName}
              touch={formik.touched.lastName}
              {...formik.getFieldProps("lastName")}
            />
          </div>
          <div className='form-container'>
            <DropDown
              label='Gender*'
              type='text'
              id='gender'
              error={formik.errors.gender}
              onChange={formik.handleChange}
              touch={formik.touched.gender}
              options={["male", "female"]}
              {...formik.getFieldProps("gender")}
            />
            <DateInput
              label='Date of Birth*'
              id='dob'
              error={formik.errors.dateOfBirth}
              touch={formik.touched.dateOfBirth}
              {...formik.getFieldProps("dateOfBirth")}
              onChange={formik.handleChange}
            />
          </div>
          <div className='form-container'>
            <Input
              label='Password*'
              type='password'
              id='password'
              error={formik.errors.password}
              touch={formik.touched.password}
              {...formik.getFieldProps("password")}
            />
            <Input
              label='Confirm Password*'
              type='password'
              id='confirmPassword'
              error={formik.errors.confirmPassword}
              touch={formik.touched.confirmPassword}
              {...formik.getFieldProps("confirmPassword")}
            />
          </div>
          <div className='register-emergency-contact-title'>
            Emergency Contact:
          </div>
          <div className='form-container'>
            <Input
              label='First Name*'
              type='text'
              id='emergencyContactFirstName'
              error={formik.errors.emergencyContactFirstName}
              touch={formik.touched.emergencyContactFirstName}
              {...formik.getFieldProps("emergencyContactFirstName")}
            />
            <Input
              label='Last Name*'
              type='text'
              id='emergencyContactLastName'
              error={formik.errors.emergencyContactLastName}
              touch={formik.touched.emergencyContactLastName}
              {...formik.getFieldProps("emergencyContactLastName")}
            />
          </div>
          <div className='form-container'>
            <Input
              label='Phone number*'
              type='tel'
              id='emergencyContactMobileNumber'
              error={formik.errors.emergencyContactMobileNumber}
              touch={formik.touched.emergencyContactMobileNumber}
              {...formik.getFieldProps("emergencyContactMobileNumber")}
            />
            <Input
              label='Contact Relation*'
              type='text'
              id='emergencyContactRelation'
              error={formik.errors.emergencyContactRelation}
              touch={formik.touched.emergencyContactRelation}
              {...formik.getFieldProps("emergencyContactRelation")}
            />
          </div>
          <div className='submit-add-medicine-button-container'>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              <Button type='submit'>Submit Form</Button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <div className='registesr-div'>
      {/*<NavBar />*/}
      <FormErrorDialog
        isError={isError}
        setClose={() => setIsError("")}
        message={isError}
      />
      <div className='register-portal'>
        <div className='register-part'>
          <Header header='Welcome to Abo Mouta Clinic!' subheader='' />
          {clientForm}
        </div>
        <div className='logo-div'>
          {" "}
          <img className='register-logo' src={logo} alt='logo' />{" "}
        </div>
      </div>
    </div>
  );
};

const clientSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .required("Please enter a valid username"),

  firstName: yup
    .string()
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name must be at most 50 characters long")
    .required("Please enter a valid First Name"),

  lastName: yup
    .string()
    .min(2, "Last Name must be at least 2 characters long")
    .max(50, "Last Name must be at most 50 characters long")
    .required("Please enter a valid Last Name"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter a valid email address"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Please enter a valid password"),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  dateOfBirth: yup
    .date()
    .max(new Date(), "Date of Birth should be in the past")
    .required("Please enter your date of birth"),

  gender: yup
    .string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Please select a gender"),

  mobileNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "Mobile number must be exactly 11 digits")
    .required("Please enter a valid mobile number"),

  emergencyContactFirstName: yup
    .string()
    .min(2, "First Name must be at least 2 characters long")
    .max(100, "First Name must be at most 100 characters long")
    .required("Please enter a valid first name"),

  emergencyContactLastName: yup
    .string()
    .min(2, "Last Name must be at least 2 characters long")
    .max(100, "Last Name must be at most 100 characters long")
    .required("Please enter a valid last name"),

  emergencyContactMobileNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "Mobile number must be exactly 11 digits")
    .required("Please enter a valid mobile number"),

  emergencyContactRelation: yup
    .string()
    .min(2, "Relation must be at least 2 characters long")
    .max(100, "Relation must be at most 100 characters long")
    .required("Please specify the relation to patient"),

  nationalId: yup
    .string()
    .matches(/^[0-9]{14}$/, "National ID must be exactly 14 digits")
    .required("Please enter a valid national ID"),
});

const clientInitialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  gender: "male",
  mobileNumber: "",
  emergencyContactFirstName: "",
  emergencyContactLastName: "",
  emergencyContactMobileNumber: "",
  emergencyContactRelation: "",
  nationalId: "",
};

export default RegisterScreen;
