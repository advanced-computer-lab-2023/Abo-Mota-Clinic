import Button from "../../../shared/Components/Button.js";
import { useState } from "react";
import Input from "../../../shared/Components/InputField";
import "./styles.css";
import DateInput from "../../../shared/Components/DateInput";
import logo from "../../../shared/assets/logo.png";
import * as yup from "yup";
import Header from "../../../shared/Components/Header";
import { Formik } from "formik";
import LoadingIndicator from "../../../shared/Components/LoadingIndicator";
import { login, useRegisterDoctorMutation } from "../../../store";
import DropDown from "../../../shared/Components/DropDown";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../shared/Components/NavBar";
import FileInput from "../../../shared/Components/FileInput";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerDoctor, results] = useRegisterDoctorMutation();
  const navigateq = useNavigate();
  const dispatch = useDispatch();
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
      educationalBackground: values.educationalBackground,
      medicalDegree: values.medicalDegree,
      medicalLicense: values.medicalLicense,
    };
    console.log(doctor);
    setIsLoading(true);
    await registerDoctor(doctor);
    // dispatch(login({ role: "doctor" }));
    // Remove the above await and insert code for backend registeration here.
    setIsLoading(false);
    // resetForm({ values: "" });
    navigateq("/");
  };

  const DoctorForm = (
    <Formik
      initialValues={initialDoctorValues}
      validationSchema={DoctorSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {console.log(formik.values)}
          <div className="form-container">
            <Input
              label="Email*"
              type="text"
              id="email"
              error={formik.errors.email}
              touch={formik.touched.email}
              {...formik.getFieldProps("email")}
            />
          </div>
          <div className="form-container">
            <Input
              label="Username*"
              type="text"
              id="userName"
              error={formik.errors.userName}
              touch={formik.touched.userName}
              {...formik.getFieldProps("userName")}
            />
            <FileInput
              label="NationalID*"
              id="nationalId"
              name="nationalId" // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.nationalId}
              touch={formik.touched.nationalId}
              onChange={(file) => formik.setFieldValue("nationalId", file)}
              onBlur={() => formik.setFieldTouched("nationalId", true)} // To handle touch status
            />
          </div>
          <div className="form-container">
            <Input
              label="First Name*"
              type="text"
              id="firstName"
              error={formik.errors.firstName}
              touch={formik.touched.firstName}
              {...formik.getFieldProps("firstName")}
            />
            <Input
              label="Last Name*"
              type="text"
              id="lastName"
              error={formik.errors.lastName}
              touch={formik.touched.lastName}
              {...formik.getFieldProps("lastName")}
            />
          </div>
          <div className="form-container">
            <DropDown
              label="Gender*"
              type="text"
              id="gender"
              error={formik.errors.gender}
              onChange={formik.handleChange}
              touch={formik.touched.gender}
              options={["male", "female"]}
              {...formik.getFieldProps("gender")}
            />
            <DateInput
              label="Date of Birth*"
              id="dob"
              error={formik.errors.dateOfBirth}
              touch={formik.touched.dateOfBirth}
              {...formik.getFieldProps("dateOfBirth")}
              onChange={formik.handleChange}
            />
          </div>
          <div className="form-container">
            <Input
              label="Affliation(Hospital)*"
              type="text"
              id="affiliation"
              error={formik.errors.affiliation}
              touch={formik.touched.affiliation}
              {...formik.getFieldProps("affiliation")}
            />
            <Input
              label="Educational Background*"
              type="text"
              id="educationalBackground"
              error={formik.errors.educationalBackground}
              touch={formik.touched.educationalBackground}
              {...formik.getFieldProps("educationalBackground")}
            />
          </div>
          <div className="form-container">
            <Input
              label="Phone number*"
              type="tel"
              id="mobileNumber"
              error={formik.errors.mobileNumber}
              touch={formik.touched.mobileNumber}
              {...formik.getFieldProps("mobileNumber")}
            />
            <Input
              label="Hourly rate in USD*"
              type="number"
              id="hourlyRate"
              error={formik.errors.hourlyRate}
              touch={formik.touched.hourlyRate}
              {...formik.getFieldProps("hourlyRate")}
            />
          </div>
          <div className="form-container">
            <Input
              label="Password*"
              type="password"
              id="password"
              error={formik.errors.password}
              touch={formik.touched.password}
              {...formik.getFieldProps("password")}
            />
            <Input
              label="Confirm Password*"
              type="password"
              id="confirmPassword"
              error={formik.errors.confirmPassword}
              touch={formik.touched.confirmPassword}
              {...formik.getFieldProps("confirmPassword")}
            />
          </div>
          <div className="form-container">
            <FileInput
              label="Medical Degree*"
              id="medicalDegree"
              name="medicalDegree" // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.medicalDegree}
              touch={formik.touched.medicalDegree}
              onChange={(file) => formik.setFieldValue("medicalDegree", file)}
              onBlur={() => formik.setFieldTouched("medicalDegree", true)} // To handle touch status
            />
            <FileInput
              label="Working License*"
              id="workingLicense"
              name="workingLicense" // Ensure this is set to correctly associate with Formik's `getFieldProps`
              error={formik.errors.medicalLicense}
              touch={formik.touched.medicalLicense}
              onChange={(file) => formik.setFieldValue("medicalLicense", file)}
              onBlur={() => formik.setFieldTouched("medicalLicense", true)} // To handle touch status
            />
          </div>
          <div className="submit-add-medicine-button-container">
            {
              isLoading ? (
                <LoadingIndicator />
              ) : (
                // <Link to='medicine'>
                <Button type="submit">Submit Form</Button>
              )
              // </Link>
            }
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <div className="registesr-div">
      {  /*<NavBar >*/}    
      <div className="register-portal">
        <div className="register-part">
          <Header
            header="Welcome to Abo Mouta Clinic!"
            subheader="We are glad you want to join us!"
          />
          {DoctorForm}
        </div>
        <div className="logo-div">
          {" "}
          <img className="register-logo" src={logo} alt="logo" />{" "}
        </div>
      </div>
    </div>
  );
};

const FILE_SIZE = 10000 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];

const DoctorSchema = yup.object().shape({
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

  email: yup.string().email("Invalid email").required("Please enter a valid email address"),

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

  hourlyRate: yup
    .number()
    .positive("Hourly rate should be a positive number")
    .required("Please enter your hourly rate"),

  affiliation: yup
    .string()
    .min(3, "Affiliation (Hospital) must be at least 3 characters long")
    .max(50, "Affiliation (Hospital) must be at most 50 characters long")
    .required("Please enter your affiliation (hospital)"),

  gender: yup
    .string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Please select a gender"),

  mobileNumber: yup
    .string()
    .matches(/^[0-9]{11}$/, "Mobile number must be exactly 11 digits")
    .required("Please enter a valid mobile number"),

  educationalBackground: yup
    .string()
    .min(10, "Educational Background must be at least 10 characters long")
    .max(50, "Educational Background must be at most 50 characters long")
    .required("Please enter your educational background"),

  medicalDegree: yup
    .mixed()
    .required("A file is required")
    .test("fileFormat", "Unsupported Format", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "File too large", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }),

  nationalId: yup
    .mixed()
    .required("A file is required")
    .test("fileFormat", "Unsupported Format", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "File too large", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }),

  medicalLicense: yup
    .mixed()
    .required("A file is required")
    .test("fileFormat", "Unsupported Format", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && SUPPORTED_FORMATS.includes(file.type);
    })
    .test("fileSize", "File too large", (value) => {
      let file = value instanceof FileList ? value[0] : value;
      return file && file.size <= FILE_SIZE;
    }),
});

const initialDoctorValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  hourlyRate: "",
  affiliation: "",
  medicalDegree: null,
  gender: "male",
  mobileNumber: "",
  nationalId: null,
  medicalLicense: null,
  educationalBackground: "",
};

export default RegisterForm;
