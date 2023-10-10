import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function DoctorInfo() {
    const location = useLocation();
    const { name, specialty, sessionPrice, education, hospital } = location.state;

    return (
        <div className="doctor-page ml-5">
            {/* <img src={imageSrc} alt={`Dr. ${name}`} className="doctor-image" /> */}
            <h1 className="doctor-name">{name}</h1>
            <p className="doctor-info"><strong>Specialty:</strong> {specialty}</p>
            <p className="doctor-info"><strong>Hospital:</strong> {hospital}</p>
            <p className="doctor-info"><strong>Education:</strong> {education}</p>
            <p className="doctor-price"><strong>Session Price:</strong> ${sessionPrice}</p>
        </div>
    );

};
export default DoctorInfo;