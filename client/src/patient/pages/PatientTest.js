import { useState } from 'react';
import PrescriptionAccordion from "../components/PrescriptionAccordion";
import { useFetchPrescriptionsQuery } from "../../store";
import { Box } from "@mui/joy";
import MemberCard from '../components/MemberCard';


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

const MyAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

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
    <div>
      {familyMembers.map((familyMember) => (
        <MemberCard key={familyMember.name} {...familyMember} />
      ))}
    </div>
  );
  };
  return (
   
    <MemberCard {...tmp}/>
    
  );
};

export default MyAccordion;
