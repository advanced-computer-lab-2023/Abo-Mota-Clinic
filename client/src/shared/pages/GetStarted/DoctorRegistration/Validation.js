import * as yup from "yup";

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
  const FILE_SIZE = 10000 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

  export default DoctorSchema;