import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import { useNavigate } from 'react-router-dom';

export default function AppointmentCard({appointment}) {
  
    const navigate = useNavigate(); // Hook to get the navigate function
  
    const navigateToPatientFollowUp = () => {
      navigate(`PatientFollowUp/${appointment.patient.id}`); // Use the patient's ID to navigate
    };
const colors = {
    "upcoming": "warning",
    "cancelled": "danger",
    "completed": "success",
    "unbooked": "primary",
    "rescheduled": "primary"
    }
    return (
      <Box sx={{ width: '100%', marginBottom: '16px' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row', // Align children horizontally
            justifyContent: 'space-between', // Distribute space between image and content
            overflow: 'hidden',
            boxShadow: 'md', // Shadow for the card
            borderRadius: 'sm', // Border radius of the card
          }}
          className="hover:shadow-lg" // Tailwind CSS for hover shadow effect
        >
          <AspectRatio ratio="1" maxHeight={150} sx={{ minWidth: 150 }}>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column', // Stack children vertically inside card content
              justifyContent: 'space-between', // Space between card content children
              flexGrow: 1, // card content will grow to fill container
              minWidth: 0, // Fixes flexbox overflow issues with text
            }}
          >
            <Box className="flex flex-row justify-between mb-2">
              <Typography level='h3' fontWeight="lg">
                {capitalizeFirstLetter(appointment.patient.name)}
              </Typography>
              <Chip color={colors[appointment.status]} variant='soft'>
                <Typography level='title-md'>
                  {capitalizeFirstLetter(appointment.status)}
                </Typography>
              </Chip>
            </Box>
            
            <Divider />
    
            <Box className="flex flex-col space-y-2 mt-3">
              <Typography level="body-md" textColor="text.tertiary" startDecorator={<AccessTimeIcon fontSize='small' />}>
                {appointment.formattedDate}
              </Typography>
              <Typography level="body-md" textColor="text.tertiary" startDecorator={<MarkunreadIcon fontSize='small' />}>
                {appointment.patient.email}
              </Typography>
              <div className="flex justify-between">
              <Typography level="body-md" textColor="text.tertiary" startDecorator={<PhoneIcon fontSize='small' />}>
                {appointment.patient.mobile}
              </Typography>
              <Button onClick={navigateToPatientFollowUp} color="neutral" size="sm"> 
                Follow Up
              </Button>
              </div>
              
              
            </Box>
    
            {/* Button positioned at the bottom left */}
            
          </CardContent>
        </Card>
      </Box>
    );
    
    
    
    
}

function capitalizeFirstLetter(string){
    // Check if the string is empty or null
  if (!string) {
    return string;
  }
  let name = string.split(" ")
  let result = "";

  for( let i=0; i<name.length; i++){
    const string = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    result = result + " " + string;
  }
  
  // Capitalize the first letter and concatenate it with the rest of the string
  return result;
}

export {capitalizeFirstLetter};
