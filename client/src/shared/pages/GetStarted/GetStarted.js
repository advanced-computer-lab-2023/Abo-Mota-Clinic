import React, { useState } from 'react';
import GraphicalBackground from './GraphicalBackground';
import RightHalf from './RightHalf';
export default function GetStarted({ task }) {

    
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side with background image and graphics */}
      <div className="lg:flex-grow  relative">
        <GraphicalBackground />
      </div>
      
      {/* Right side with form and information */}
      <RightHalf task={task} />
    </div>
  );
}
