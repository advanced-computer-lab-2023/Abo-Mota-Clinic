import  { useState } from 'react';
import { Segmented } from 'antd';
import LoginForm from '../GetStarted/LoginForm';
import DoctorRegistration from './DoctorRegistration/DoctorRegistration';
import PatientRegistration from './PatientRegistration/PatientRegistration';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';

const RightHalf = ({task}) => {
  // Initialize the state within the RightHalf component
  const [value, setValue] = useState(task||'Sign In');
  console.log(task);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-white rounded-l-xl shadow-lg">
      {/* Increased the max width of the container for forms */}
      <div className="w-full max-w-xl mb-8">
        <Segmented
          options={['Sign In','Sign Up' , 'Join the team']}
          value={value}
          onChange={setValue}
          block
        />
      </div>

      {/* Conditional Form Rendering */}
      <div className="w-full max-w-xl p-8">
        {value === 'Sign In' && <LoginForm />}
        {value === 'Sign Up' && <PatientRegistration />}
        {value === 'Join the team' && <DoctorRegistration />}
      </div>

      {/* Footer with social icons and contact info */}
      <div className="w-full max-w-xl bg-gray-100 p-5 text-sm flex flex-col items-center space-y-4">
  {/* Social media icons */}
  <div className="flex justify-center space-x-6">
    <FaLinkedin className="text-blue-700 hover:text-blue-800 cursor-pointer text-2xl" />
    <FaInstagram className="text-pink-500 hover:text-pink-600 cursor-pointer text-2xl" />
    <FaFacebook className="text-blue-600 hover:text-blue-700 cursor-pointer text-2xl" />
    <FaTwitter className="text-blue-400 hover:text-blue-500 cursor-pointer text-2xl" />
  </div>
  {/* Contact info */}
  <div className="flex justify-center space-x-6 items-center"> {/* Adjust the space-x-* value as needed */}
  <div className="flex items-center space-x-2"> {/* Container for the phone icon and number */}
    <FaPhone className="text-blue-500 text-lg" />
    <p className="text-gray-700">01000981773</p>
  </div>
  <div className="flex items-center space-x-2"> {/* Container for the email icon and address */}
    <FaEnvelope className="text-blue-500 text-lg" />
    <p className="text-gray-700">Abomotaclinic@gmail.com</p>
  </div>
</div>
</div>
    </div>
  );
};

export default RightHalf;
