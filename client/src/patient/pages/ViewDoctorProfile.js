import { useParams, useLocation } from "react-router-dom";
import DoctorProfile from "../components/DoctorProfile";
import { Breadcrumbs, Link, Typography, Box } from "@mui/joy";
import { useFetchDoctorsQuery } from "../../store";


function ViewDoctorProfile() {
  const location = useLocation();
  // const { name, specialty, rate, educationalBackground, affiliation } = location.state;

  const { id } = useParams();

  const { data, isFetching, error } = useFetchDoctorsQuery();
  let content;

  if (isFetching) {
    content = <div> Loading ... </div>;
  } else if (error) {
    content = <div> Error ... </div>;
  } else {
    const doctor = data[id];
    content = <DoctorProfile {...doctor} />;
  }

  // const { id } = useParams();
  return (

    <>
      {content}
      {/* <DoctorProfile name={name} specialty={specialty} rate={rate} educationalBackground={educationalBackground} affiliation={affiliation} /> */}

    </>
  );

};
export default ViewDoctorProfile;