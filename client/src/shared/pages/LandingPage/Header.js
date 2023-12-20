import React from 'react';
import headerImage from '../../assets/landing_page image.png'; // Make sure the path is correct
import logoImage from '../../assets/logo.png'
import sara from '../../assets/sara-amr.PNG';
import kord from '../../assets/omar-elkord.PNG';
import lol from '../../assets/aly-raafat.PNG';
import Button from '../../Components/Button';
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { GiHealthNormal } from "react-icons/gi";
import {useNavigate} from 'react-router-dom';
const Header = ({ onAboutClick, onServicesClick, onTestimonialsClick, onFooterClick }) => {

  const handlePlayVideoClick= ()=>{
    window.open('https://www.youtube.com/watch?v=QoShonI1yq4', '_blank');
  }
  const handleLogInClick=()=>{
    navigate('/login');
  }

  const navigate = useNavigate();
  const handleGetStarted= ()=>{
    navigate('/patientRegistration');
  }

  return (
    <header className="bg-blue-900 text-white relative">
      {/* Container for the top part of the header */}
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center text-3xl font-bold">
          <img src={logoImage} alt="Logo" className="mr-3 h-12 w-12 " /> {/* Adjust size as needed */}
        </div>

        {/* Centered Navigation */}
          <nav className="flex-1">
    <ul className="flex justify-center space-x-4 text-white">
    <li className="hover:text-blue-300 cursor-pointer">Home</li>
      <li onClick={onAboutClick} className="hover:text-blue-300 cursor-pointer">About</li>
      <li onClick={onServicesClick} className="hover:text-blue-300 cursor-pointer">Services</li>
      <li onClick={onTestimonialsClick} className="hover:text-blue-300 cursor-pointer">Blog</li>
      <li onClick={onFooterClick} className="hover:text-blue-300 cursor-pointer">Contact</li>
    </ul>
  </nav>

        {/* Free Consultation Button */}
        <Button type="tertiary" onClick={handleLogInClick}>
          Log in
        </Button>
      </div>

      {/* Container for the bottom part of the header */}
      <div className="container mx-auto px-6 flex justify-between items-center min-h-[700px]">
      <div className="flex-1 mb-20">
        <h1 className="text-6xl font-bold mt-0 mb-4 leading-normal">
            <span>Your Journey to</span><br/>
            <span>Better </span><span className="text-yellow-400">Health</span><span> Starts</span><br/>
            <span>Here</span>
          </h1>
          <p className="mb-4 text-gray-300">At Healthline, we set high standards of quality, research, and <br/> transparency for what we share, ensuring you have access to <br/> nothing but the best.</p>
          <div className="flex justify-start space-x-4">
          <Button type="tertiary" className="text-xl py-3 px-6" onClick={handleGetStarted}> {/* Adjusted padding and text size */}
              Get started
            </Button>
            <span onClick={handlePlayVideoClick} className="cursor-pointer flex items-center space-x-2 text-lg">
              <IoPlayCircleOutline className="text-4xl" /> {/* Adjust icon size as needed */}
              <span>Watch Video</span>
            </span>
          </div>
        </div>
        <div className="flex-1 relative">
          <img src={headerImage} alt="Healthcare Professional" className="w-1/2 h-1/2 mx-48 my-10  top-0 right-0 transform  -translate-y-10" />
          <div className="absolute top-1/2  transform translate-x-12 ">
            <Card />
          </div>
          <div className="absolute top-0 right-0 transform -translate-x-1/2 translate-y-32 flex items-center bg-white rounded-full px-4 py-2">
        <IoIosCheckmarkCircleOutline className="text-blue-600 text-3xl" />
          <span className="text-blue-900 ml-2 font-medium">Regular Checkup</span>
          </div>

          {/* Plus Icon */}
          <div className="absolute bottom-0 right-0  ">
        <GiHealthNormal className="text-9xl" style={{ color: '#2c4a7e' }} /> {/* Adjust the color code to match your desired blue */}
        </div>
        </div>
      </div>
    </header>
  );
};




function Card(){
  const navigate = useNavigate();
  const handleJoinTheTeamClick=()=>{
    navigate('/doctorRegistration');
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg text-blue-900 font-semibold mb-4">Meet Our Doctors</h3>
      <div className="space-y-4">
        {/* Doctor profile example */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Replace with the actual path to your doctor's image */}
            <img className="h-12 w-12 rounded-full" src={sara} alt="Doctor" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-900">Dr. Sara Amr</p>
            <p className="text-sm text-blue-700">Cardiology</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Replace with the actual path to your doctor's image */}
            <img className="h-12 w-12 rounded-full" src={kord} alt="Doctor" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-900">Dr. Omar Elkord</p>
            <p className="text-sm text-blue-700">Cardiology</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* Replace with the actual path to your doctor's image */}
            <img className="h-12 w-12 rounded-full" src={lol} alt="Doctor" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-900">Dr. Aly Raafat</p>
            <p className="text-sm text-blue-700">Dental</p>
          </div>
        </div>
        
      </div>
      
        <Button isFilled={false}  className="mt-6" onClick={handleJoinTheTeamClick} >
          Join the team
        </Button>
      
      
    </div>
  );
};


export default Header;
