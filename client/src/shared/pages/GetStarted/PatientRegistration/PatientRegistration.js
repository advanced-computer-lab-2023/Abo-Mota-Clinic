import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {  message, Steps } from 'antd';
import clientSchema from './Validation';
import BasicInformation from './BasicInformation'; // Your component for step 1
import AccountSetup from './AccountSetup'; // Your component for step 2
import EmergencyContact from './EmergencyContact'; // Your component for step 3
import { useRegisterPatientMutation } from '../../../../store';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Components/Button';
import FormErrorDialog from '../../../Components/FormErrorDialog';
import { UserOutlined, SolutionOutlined, SmileOutlined } from '@ant-design/icons';


const { Step } = Steps;
const PatientRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerPatient, results] = useRegisterPatientMutation();
  const [isError, setIsError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
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
}

  

const steps = [
    {
      title: 'Basic Information',
      content: BasicInformation,
      icon: <UserOutlined />,
    },
    {
      title: 'Account Setup',
      content: AccountSetup,
      icon: <SolutionOutlined />,
    },
    {
      title: 'Emergency Contact',
      content: EmergencyContact,
      icon: <SmileOutlined />,
    },
  ];

  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (<>
    <FormErrorDialog
          isError={isError}
          setClose={() => setIsError("")}
          message={isError}
        />
      <Formik
        initialValues={clientInitialValues}
        validationSchema={clientSchema}
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
};


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

export default PatientRegistration;
