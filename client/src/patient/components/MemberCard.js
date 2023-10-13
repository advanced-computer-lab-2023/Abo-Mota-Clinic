import { useLocation } from 'react-router-dom';


import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { CardActions, ButtonGroup } from '@mui/joy';
import CardActionArea from '@mui/material/CardActionArea';
import Link from '@mui/joy/Link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IconButton from '@mui/joy/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import { GoArrowDown } from "react-icons/go";
import capitalize from '../utils/capitalize';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import BadgeIcon from '@mui/icons-material/Badge';
import FemaleAvatar from '../assets/images/female_avatar.png';
import MaleAvatar from '../assets/images/male_avatar.png'

export default function MemberCard({name,nationalId,age,gender,relation,className,onClick}){
  const capitalizedGender = capitalize(gender);
  const capitalizedName=capitalize(name);
  const image = capitalizedGender === 'Female' ? FemaleAvatar:MaleAvatar;


    return (
        <Card  sx={{
          width: 300, transition: 'transform 0.2s', '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder', transform: 'scale(1.1)' },
         backgroundColor: '#F0F4F8'
          // backgroundColor: capitalizedGender === 'Female' ? '#ffdce2' : '#cfe2f3',
          //border: `0.5px solid ${capitalizedGender === 'Female' ? '#ffdce2' : '#cfe2f3'}`
        }}>

          <div>
            <Typography level="title-lg">
              <Link
                overlay
                underline="none"
                
                sx={{ color: 'text.primary' }}
              >
               <BadgeIcon sx={{ fontSize: '1.5em' }}/> 
               {capitalizedName}
              </Link>
            </Typography>
            <Typography level="body-md">{relation}</Typography>
          </div>

          <AspectRatio ratio="1.1" sx={{borderRadius: "100%"}}>
            <img 
              src={image}
              srcSet={image}
              loading="lazy"
              alt=""
            />
          </AspectRatio>  

          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs">Gender</Typography>
              <Typography fontSize="lg" fontWeight="lg">
              {capitalizedGender === 'Female' ? <FemaleIcon /> : <MaleIcon />}{capitalizedGender}
                <Typography fontSize="sm" textColor="text.tertiary">
                </Typography>
              </Typography>

            

              <Typography level="body-xs">National ID</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {nationalId}
                <Typography fontSize="sm" textColor="text.tertiary"> 
                </Typography>
              </Typography>

              <Typography level="body-xs">Age</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {age}
                <Typography fontSize="sm" textColor="text.tertiary"> 
                </Typography>
              </Typography>
    
              {
                {age} && <div className='flex space-x-1 align-center'>
                  <Typography level='body-sm' sx={{ textDecoration: "line-through" }}>
                    
                    <Typography fontSize="sm" textColor="text.tertiary">
                      
                    </Typography>
                  </Typography>
    
                 
                    
                  
    
                </div>
              }
    
            </div>
          
          </CardContent>
        </Card>
      );
}

