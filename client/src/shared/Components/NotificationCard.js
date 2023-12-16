import {CircularProgress , Typography, Card, CardContent, Avatar, Box, Divider} from '@mui/joy';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import image from "../../doctor/assets/appointmentAvatar.png";
import { capitalizeFirstLetter } from '../../doctor/components/AppointmentCard';


export default function NotificationCard({content, formattedDate, sender, recipient}){

    let title;

    if(recipient.userType === "patient"){
        if(content.includes("rescheduled")){
            title = <Typography level="title-lg" id="card-description"> Appointment Rescheduled</Typography>
        }else if(content.includes("cancelled")){
            title = <Typography level="title-lg" id="card-description"> Appointment Cancelled</Typography>
        }else
            title = <Typography level="title-lg" id="card-description"> Appointment Confirmation</Typography>

    }else{
        if(content.includes("rescheduled")){
            title = <Typography level="title-lg" id="card-description"> Appointment Rescheduled</Typography>
        }else if(content.includes("cancelled"))
            title = <Typography level="title-lg" id="card-description"> Appointment Cancelled</Typography>
        else
            title = <Typography level="title-lg" id="card-description">{capitalizeFirstLetter(sender.username)}</Typography>
        }

    let avatar;
    if(recipient.userType === "patient" || content.includes("cancelled") || content.includes("rescheduled")){
        avatar = <Avatar src={image} />
    }else {
        avatar = <Avatar size="md"> {capitalizeFirstLetter((sender.username).charAt(0))}</Avatar>

    }


    return (
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: "100%",
            "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" },
            marginTop: 4
        }}
        >
          <CardContent>
            
          <Box className="flex justify-between">
              <Box className="flex space-x-4">
                {avatar}
                
                <Box className="mr-10">
                    
                    {title}
                  <Box className="">
                    <Typography level="body-md" aria-describedby="card-description" mb={1}>
                      {content}
                    </Typography>
                  </Box>
                </Box>
              </Box>
    
            </Box>
    
            <Divider sx={{ marginBottom: 0.5 }} />

            <Box className="w-full flex justify-end">
              <Typography
                level="body-md"
                aria-describedby="card-description"
              >
                {formattedDate.replace(",", " -")}
              </Typography>
            </Box>
    
            
            
    
          </CardContent>
        </Card>
      );
}
