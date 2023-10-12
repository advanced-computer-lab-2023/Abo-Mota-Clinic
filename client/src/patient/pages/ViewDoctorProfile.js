import { useLocation } from "react-router-dom";
import DoctorProfile from "../components/DoctorProfile";


function ViewDoctorProfile() {
  const location = useLocation();
  const { name, specialty, rate, educationalBackground, affiliation } = location.state;

  // const { id } = useParams();

  return (
    <DoctorProfile name={name} specialty={specialty} rate={rate} educationalBackground={educationalBackground} affiliation={affiliation} />
  );

};
export default ViewDoctorProfile;