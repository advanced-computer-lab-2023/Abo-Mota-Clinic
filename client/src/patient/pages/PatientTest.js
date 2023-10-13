import { useState } from 'react';
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import { useFetchPrescriptionsQuery } from "../../store";
import { Box } from "@mui/joy";
import MemberCard from '../components/MemberCard';


function PatientTest() {
  const tmp={
    "name":"Sara",
    "nationalId":"12345",
    "age":"22",
    "gender":"Female",
    "relation":"Sister"
  };
  const tmp2={
    "name":"Ahmed",
    "nationalId":"12345",
    "age":"22",
    "gender":"male",
    "relation":"Brother"
  }
  
  
  
    const { data, isFetching, error } = useFetchPrescriptionsQuery(0);
  
    let content;
    if (isFetching) {
      content = <div>Loading...</div>;
    } else if (error) {
      content = <div> Error ... </div>;
    }
    else {
      const familyMembers = [tmp, tmp2];
  
    return (
      <div className='flex space-x-6'>
        {familyMembers.map((familyMember) => (
          <MemberCard key={familyMember.name} {...familyMember} />
        ))}
      </div>
    );
    };
    return (
     
      <MemberCard {...tmp}/>
      
    );
}




export default PatientTest;

// const appointments = ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"]

const appointments = {
  "Thursday, October 12": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Friday, October 13": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Monday October 16": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Tuesday October 17": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
}



// name
// specialty
// sessionPrice
// affiliation
// education

