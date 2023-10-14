import { GoArrowDown } from "react-icons/go";
import { AspectRatio, Card, CardContent, Typography, Button, Chip } from '@mui/joy';
import { Link, Box } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

export default function DoctorCard({ name, specialty, rate, className, discount, index }) {

  // discount = undefined;
  let price;
  const markedUpRate = rate * 1.1;
  const displayedDiscount = discount ? discount * 100 : 0;

  console.log(markedUpRate * (1 - discount))

  if (discount) {
    price = Math.round(markedUpRate * (1 - discount));
  } else {
    price = Math.round(markedUpRate);
  }


  return (
    <Card className={className} sx={{
      width: 300, transition: 'transform 0.2s', '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', transform: 'scale(1.1)' },
    }}>
      <div>
        <Typography level="title-lg">
          Dr. {name}
        </Typography>
        <Typography level="body-md">{specialty}</Typography>
      </div>
      <AspectRatio ratio="1.1">
        <img
          src="https://media.istockphoto.com/id/1161336374/photo/portrait-of-confident-young-medical-doctor-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=cQnG1m5Jobtgd-gO_Zb7XQKO0W7s-AdpWCZJGRP7elg="
          srcSet="https://media.istockphoto.com/id/1161336374/photo/portrait-of-confident-young-medical-doctor-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=cQnG1m5Jobtgd-gO_Zb7XQKO0W7s-AdpWCZJGRP7elg= 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <Box className="flex w-full justify-between">
          <Box>
            <Typography level="body-xs">Rate</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              ${price}
              <Typography fontSize="sm" textColor="text.tertiary">
                / hr
              </Typography>
            </Typography>


            {
              discount &&
              <div className='flex space-x-1 align-center'>
                <Typography level='body-sm' sx={{ textDecoration: "line-through" }}>
                  ${Math.round(markedUpRate)}
                  <Typography fontSize="sm" textColor="text.tertiary">
                    / hr
                  </Typography>
                </Typography>

                <Chip
                  variant="outlined"
                  color="success"
                  startDecorator={<GoArrowDown fontSize="17" style={{ "marginLeft": "-3px", "marginRight": '-4px' }} />}
                >
                  {displayedDiscount}%
                  {/* <Typography color='success' level="body-xs">
                -20%
              </Typography> */}
                </Chip>

              </div>
            }
          </Box>

          <Button variant="plain" component={RouterLink} to={`../info/${index}`}>
            VIEW
          </Button>

        </Box>

      </CardContent>
    </Card>
  );
}



// <Card className={className} onClick={onClick} variant="outlined" sx={{ width: 280 }}>
//   <CardOverflow>
//     <AspectRatio ratio="1.1">
//       <img
//         src="https://media.istockphoto.com/id/1161336374/photo/portrait-of-confident-young-medical-doctor-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=cQnG1m5Jobtgd-gO_Zb7XQKO0W7s-AdpWCZJGRP7elg="
//         srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
//         loading="lazy"
//         alt=""
//       />
//     </AspectRatio>
//   </CardOverflow>

//   <CardContent sx={{ textAlign: 'center' }}>
//     <Typography level="h4">Dr. {doctor_name}</Typography>
//     <Typography level="body-lg">{specialty} </Typography>
//     <Typography level="body-sm">
//       ${price} per session
//     </Typography>
//   </CardContent>

//   {/* <CardOverflow sx={{ bgcolor: 'background.level1' }}> */}
//     <CardActions buttonFlex="1">
//       <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
//         <Button color='primary'>Book Appointment</Button>
//       </ButtonGroup>
//     </CardActions>
//   {/* </CardOverflow> */}
// </Card>