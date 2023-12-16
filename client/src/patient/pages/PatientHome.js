import { Box, Divider, Typography } from "@mui/joy";
import { useFetchPatientQuery } from "../../store";
import * as React from 'react';
import { useState } from 'react';
import { Card } from 'antd';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import backgroundImage from '../../shared/assets/3.png';
import neurologyImage from '../../shared/assets/neurology.jpeg';
import cardiologyImage from '../../shared/assets/cardiology.jpeg';
import orthopedicsImage from '../../shared/assets/orthopedics.jpeg';
import dentistryImage from '../../shared/assets/dentistry.jpeg';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';

const { Meta } = Card;
function PatientHome() {

  const { data, isFetching, isError } = useFetchPatientQuery();
  let content;

  const [isVisible, setIsVisible] = useState(false);

  const handleEnterViewport = () => {
    setIsVisible(true);
  };

  if (isFetching) {
    content = <div> Loading ... </div>;
  } else if (isError) {
    content = <div> Error ... </div>;
  } else {
    content = (
      <Box className="">

        <div className="flex justify-end mb-0">
          <img decoding="async" src="https://doccure-wp.dreamstechnologies.com/elementor/wp-content/themes/doccure/assets/images/header-icon.svg" className="w-10 h-10 object-contain " alt="header-icon" />
        </div>

        <div>
          <Typography level="h2" fontWeight={500} className="mt-0 text-black">
            Welcome, <span style={{ color: 'rgba(248,249,250)' }}>{data.name}</span>
          </Typography>
          <Divider />
        </div>
      </Box>
    );
  };


  return (
    <div className="relative flex flex-col justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: 'rgba(80, 127, 186, 0.5)' }}></div>
      <div className="relative h-screen text-center flex flex-row justify-center object-fill" >
        <Box className="absolute font-semibold text-lg text-center text-blue-600">
          {content}
        </Box>
        <div className="flex flex-row justify-center mt-5">
          <Link to="/patient/doctors">
            <Card
              bordered={false}
              style={{
                width: 300,
              }}
              className="mx-2 items-center hover:shadow-2xl shadow-white mt-20 max-h-40"
            >
              <PersonSearchOutlinedIcon />
              <p className="font-bold mt-1 mb-1">
                <span style={{ color: 'rgba(0,0,0)', cursor: 'pointer' }}>BROWSE DOCTORS</span></p>
              <div className="flex flex-col space-y-0">
                <p className="font-thin mt-2">Cardiology</p>
                <p className="font-thin ">Neurology</p>
                <p className="font-thin mb-2">Orthopedics</p>
              </div>
            </Card>
          </Link>
          <Link to="/patient/doctors">
            <Card
              bordered={false}
              style={{
                width: 300,
              }}
              className="mx-2 items-center hover:shadow-2xl shadow-white mt-20 max-h-40"
            >
              <CalendarMonthOutlinedIcon />
              <p className="font-bold mt-1 mb-1">
                <span style={{ color: 'rgba(0,0,0)', cursor: 'pointer' }}>BOOK AN APPOINTMENT</span>
              </p>
              <div className="flex flex-col space-y-0">
                <p className="font-thin mt-2">New Appointment</p>
                <p className="font-thin">Follow-Up Appointment</p>
                <p className="font-thin mb-2">Video Call Appointment</p>
              </div>
            </Card>
          </Link>

          <Link to="/patient/healthPackages">
            <Card
              bordered={false}
              style={{
                width: 300,
              }}
              className="mx-2 items-center hover:shadow-2xl shadow-white mt-20 max-h-40"
            >
              <HealthAndSafetyOutlinedIcon />
              <p className="font-bold mt-1 mb-1">
                <span style={{ color: 'rgba(0,0,0)', cursor: 'pointer' }}>HEALTH PACKAGES</span>
              </p>
              <div className="flex flex-col space-y-0">
                <p className="font-thin mt-2">Bronze</p>
                <p className="font-thin">Titanium</p>
                <p className="font-thin mb-2">Platinum</p>

              </div>
            </Card>
          </Link>
        </div>

        <div className="absolute bottom-5 flex">
          {/* Speciality */}
          <div className="flex flex-col mb-36">
            <div className="mb-4">
              <Typography level="h2" fontWeight={500} className="mt-0 text-black">
                Specialities<span style={{ color: 'rgba(248,249,250)' }}></span>
              </Typography>
              <Divider />
            </div>
            <div className="flex flex-row gap-10">
              <Card
                style={{
                  width: 300,
                }}
                className="hover:shadow-2xl shadow-white"
                cover={
                  <div>
                    <Avatar alt="Remy Sharp" src={cardiologyImage} size="xl" className="object-contain h-24 w-24 mt-3" />
                  </div>
                }
              >
                <Meta className="font-medium"
                  title="Cardiology"
                />
              </Card>
              <Card
                style={{
                  width: 300,
                }}
                className="hover:shadow-2xl shadow-white"
                cover={
                  <div>
                    <Avatar alt="Remy Sharp" src={orthopedicsImage} size="xl" className="object-contain h-24 w-24 mt-3" />
                  </div>
                }
              >
                <Meta className="font-medium"
                  title="Orthopedics"
                />
              </Card>
              <Card
                style={{
                  width: 300,
                }}
                className="hover:shadow-2xl shadow-white"
                cover={
                  <div>
                    <Avatar alt="Remy Sharp" src={neurologyImage} size="xl" className="object-contain h-24 w-24 mt-3" />
                  </div>
                }
              >
                <Meta className="font-medium"
                  title="Neurology"
                />
              </Card>
              <Card
                style={{
                  width: 300,
                }}
                className="hover:shadow-2xl shadow-white"
                cover={
                  <div>
                    <Avatar alt="Remy Sharp" src={dentistryImage} size="xl" className="object-contain h-24 w-24 mt-3" />
                  </div>
                }
              >
                <Meta className="font-medium"
                  title="Dentistry"
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col text-center" style={{zIndex: 1}}>
        <div className="mb-4">
          <Typography level="h2" fontWeight={500} className="mt-0 text-black">
            Frequently Asked Questions<span style={{ color: 'rgba(248,249,250)' }}></span>
          </Typography>
          <Divider />
        </div>
        <div className="flex flex-row self-center gap-8">
          <div>
            <img decoding="async" src="https://doccure-wp.dreamstechnologies.com/elementor/wp-content/uploads/2023/07/faq-img.png" alt="" className="object-cover w-full h-96" />

          </div>

          <div className="ml-8 mt-5 mb-2 border-1">
            <AccordionGroup
              sx={{
                maxWidth: 700,
                [`& .${accordionSummaryClasses.indicator}`]: {
                  transition: '0.2s',
                },
                [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
                  transform: 'rotate(45deg)',
                },
              }}
            >
              <Accordion sx={{mb:2, p: 4, borderRadius: '8px' }}>
                <AccordionSummary indicator={<AddIcon />}
                 sx={{
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Add a background color on hover
                    borderRadius: '8px', // Optional: Add rounded corners on hover
                  },
                }}
                >Can I make an appointment online?</AccordionSummary>
                <AccordionDetails>
                  Sasso and Boonie are the backbone of this project.
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mb: 2, p: 4, borderRadius: '8px' }}>
                <AccordionSummary indicator={<AddIcon />}>Can I make an appointment online? </AccordionSummary>
                <AccordionDetails>
                Sarsour and Malouka are the backbone of this project.
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mb: 2, p: 4, borderRadius: '8px' }}>
                <AccordionSummary indicator={<AddIcon />}>Can I make an appointment online?</AccordionSummary>
                <AccordionDetails>
                Kord and Leba are the backbone of this project.
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHome;