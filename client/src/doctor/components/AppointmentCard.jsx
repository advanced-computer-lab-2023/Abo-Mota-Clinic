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


export default function AppointmentCard({appointment}) {

const colors = {
    "upcoming": "warning",
    "cancelled": "danger",
    "completed": "success",
    "unbooked": "primary",
    "rescheduled": "primary"
    }

  return (
    <Box
      sx={{
        width: '100%',
        // position: 'relative',
        // overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: '1100px',
          flexWrap: 'wrap',
          display: 'flex',
          
          overflow: 'hidden',
        }}
        className="hover:shadow-lg"

      >
            <AspectRatio flex ratio="1" maxHeight={150} sx={{ minWidth: 150 }}>
            <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
            />
            </AspectRatio>
            <CardContent>
                <div >
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
                        <Typography level="body-md"  textColor="text.tertiary"
                        startDecorator={<AccessTimeIcon fontSize='10' />}
                        >
                            {appointment.formattedDate}
                        </Typography>
                        <Typography level="body-md"  textColor="text.tertiary"
                        startDecorator={<MarkunreadIcon fontSize='10' />}
                        >
                            {appointment.patient.email}
                        </Typography>
                        <Typography level="body-md"  textColor="text.tertiary"
                        startDecorator={<PhoneIcon fontSize='10' />}
                        >
                            {appointment.patient.mobile}
                        </Typography>
                    </Box>
                </div>

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
