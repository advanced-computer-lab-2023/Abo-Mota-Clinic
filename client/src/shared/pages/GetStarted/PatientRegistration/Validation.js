import * as yup from "yup";


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

  export default clientSchema;