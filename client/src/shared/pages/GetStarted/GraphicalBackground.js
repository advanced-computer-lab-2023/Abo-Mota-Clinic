import React from 'react';
import doctorImage from '../../assets/loginPic.png'; // Adjust the path as necessary

const GraphicalBackground = () => {

    
  return (
    <div className="flex flex-col h-full justify-between" style={{ background: 'linear-gradient(to bottom, #3B82F6, #60A5FA)' }}>
  {/* Text and Logo at the top */}
  <div className="text-white text-center space-y-3 mt-20 ">
    <p className="text-4xl font-semibold">Continue your health journey</p>
    <p className="text-2xl">Your health is an investment, not an expense.</p>
  </div>
  
    {/* Image anchored to the bottom */}
    <img
      src={doctorImage}
      alt="Doctor"
      className="max-w-lg h-auto object-contain mx-auto " // Adjust margin-bottom as needed
    />
  </div>
  
  );
};

export default GraphicalBackground;
