import LoginForm from '../GetStarted/LoginForm';
import DoctorRegistration from './DoctorRegisration'; 
import PatientRegistration from './PatientRegistration';
import GraphicalBackground from './GraphicalBackground';
import React, { useState } from 'react';
import { Segmented } from 'antd';

export default function GetStarted({ task }) {
  const [value, setValue] = useState(task || 'Sign in');

  return (
    <div className="flex flex-col lg:flex-row bg-blue-100 h-screen">
      <div className="flex-grow-0 lg:flex-grow px-4 py-8 lg:p-20">
        <GraphicalBackground/>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Segmented
            options={['Sign in', 'Sign up', 'Join the team']}
            value={value}
            onChange={setValue}
            className="mb-4" 
          />
          <div>
            {value === 'Sign in' && <LoginForm />}
            {value === 'Sign up' && <PatientRegistration />}
            {value === 'Join the team' && <DoctorRegistration />}
          </div>
        </div>
      </div>
    </div>
  );
}
