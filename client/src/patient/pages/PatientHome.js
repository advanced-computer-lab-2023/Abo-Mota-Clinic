import { Box, Divider, Typography } from "@mui/joy";
import { useFetchPatientQuery } from "../../store";
import * as React from 'react';
import { Card } from 'antd';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import backgroundImage from '../../shared/assets/3.png';
function PatientHome() {

  const { data, isFetching, isError } = useFetchPatientQuery();
  let content;

  if (isFetching) {
    content = <div> Loading ... </div>;
  } else if (isError) {
    content = <div> Error ... </div>;
  } else {
    content = (
      <Box className="">
        <Typography level="h2" fontWeight={400} className="mt-3 text-blue-600">
          Welcome, {data.name}!
        </Typography>
        <Divider/>
      </Box>
    );
  };


  return (
    
    <div className="relative h-screen m-0 p-0 border-0 text-center flex flex-row justify-center object-fill" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    
    <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: 'rgba(0, 60, 130, 0.5)' }}></div>
    
    <Box className="absolute font-semibold text-lg text-center text-blue-600">
      {content} 
    </Box>
  <div className="flex flex-row justify-center mt-5">
  <Card
    bordered={false}
    style={{
      width: 300,
    }}
    className="mx-2 items-center hover:shadow-xl shadow-white mt-20 max-h-40"
  >
    <PersonSearchOutlinedIcon />
    <p className="font-bold mt-1 mb-1">BROWSE DOCTORS</p>
    <div className="flex flex-col space-y-0">
    <p className="font-thin mt-2">Cardiology</p>
    <p className="font-thin ">Neurology</p>
    <p className="font-thin mb-2">Orthopedics</p>

    </div>
  </Card>
  
  <Card
    bordered={false}
    style={{
      width: 300,
    }}
    className="mx-2 items-center hover:shadow-xl shadow-white mt-20 max-h-40"
  >
    <CalendarMonthOutlinedIcon />
    <p className="font-bold mt-1 mb-1">BOOK AN APPOINTMENT</p>
    <div className="flex flex-col space-y-0">
    <p className="font-thin mt-2">New Appointment</p>
    <p className="font-thin">Follow-Up Appointment</p>
    <p className="font-thin mb-2">Video Call Appointment</p>
    </div>
  </Card>

  <Card
    bordered={false}
    style={{
      width: 300,
    }}
    className="mx-2 items-center hover:shadow-xl shadow-white mt-20 max-h-40"
  >
    <HealthAndSafetyOutlinedIcon />
    <p className="font-bold mt-1 mb-1">HEALTH PACKAGES</p>
    <div className="flex flex-col space-y-0">
    <p className="font-thin mt-2">Bronze</p>
    <p className="font-thin">Titanium</p>
    <p className="font-thin mb-2">Platinum</p>
    
    </div>
  </Card>
  </div>

    
    </div>

  );
}

export default PatientHome;