import React, { useState, useEffect } from 'react';
import {  message, Steps } from 'antd';
import Button from "../../../Components/Button.js";
import BasicInformation from './BasicInformation.js';
import ProfessionalDetails from './ProfessionalDetails.js';
import Credentials from './Credentials.js';
import AccountSetUp from './AccountSetUp.js';
import Input from "../../../Components/InputField/index.jsx";
import DateInput from "../../../Components/DateInput/index.jsx";
import DoctorSchema from './Validation.js';
import { Formik } from "formik";
import LoadingIndicator from "../../../Components/LoadingIndicator/index.js";
import { useRegisterDoctorMutation } from "../../../../store/index.js";
import { useNavigate } from "react-router-dom";
import FormErrorDialog from "../../../Components/FormErrorDialog/index.js";
import { UserOutlined, SolutionOutlined, FileProtectOutlined, IdcardOutlined } from '@ant-design/icons';


const { Step } = Steps;

export default function DoctorRegistration(){
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [registerDoctor, results] = useRegisterDoctorMutation();
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (values, { resetForm }) => {
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
      medicalLicense: values.medicalLicense
    };
    setIsLoading(true);
    await registerDoctor(doctor);
    navigate('/');
    setIsLoading(false);
    console.log(results);
  };

  useEffect(() => {
    if (results.isError) {
      setIsError(results.error.data.error);
    }
  }, [results]);
    

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  const steps = [
    {
      title: 'Personal Information',
      content: BasicInformation,
      icon: <UserOutlined />,
    },
    {
      title: 'Account',
      content: AccountSetUp,
      icon: <IdcardOutlined />,
    },
    {
      title: 'Professional Details',
      content: ProfessionalDetails,
      icon: <SolutionOutlined />,
    },
    {
      title: 'Credentials',
      content: Credentials,
      icon: <FileProtectOutlined />,
    },
  ];


  return (<>
  <FormErrorDialog
        isError={isError}
        setClose={() => setIsError("")}
        message={isError}
      />
    <Formik
      initialValues={initialDoctorValues}
      validationSchema={DoctorSchema}
      onSubmit={handleSubmit}
    >
      {formik => (
        
          <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
            <Steps current={currentStep} className="mb-6">
            {steps.map((step, index) => (
            <Step key={step.title} title={currentStep === index ? step.title : ''} icon={step.icon} />
              ))}
            </Steps>
  
            <div className="steps-content " style={{ minHeight: '300px' }}> {/* Adjusted margin and min-height */}
              {React.createElement(steps[currentStep].content, { formik })}
            </div>
  
            <div className="flex justify-end space-x-2">
              {currentStep > 0 && (
                <Button onClick={handlePrev} className="bg-gray-300 text-black">
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button onClick={handleNext} className="bg-blue-500 text-white ">
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
      <Button
          type='secondary'
          className={ `bg-green-500 text-white ${!formik.isValid || formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            formik.handleSubmit();}}>
        Submit
      </Button>
  )}
            </div>
          </div>
      )}
    </Formik>
  </>
  );
}
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

