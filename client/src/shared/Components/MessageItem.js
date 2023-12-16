import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../../doctor/components/AppointmentCard';
import { useFetchUserQuery } from '../../store';
import {useNavigate} from "react-router-dom";
import timeAgo from '../../patient/functions/timeAgo';
import { Typography as JoyTypography } from '@mui/joy';


export default function MessageItem({message , key}){

    // const message = {
    //     content: messageContent,
    //     sender: loggedInUser._id,
    //     recipient: selectedRecipientId,
    //     date: new Date(),
    //   }
    console.log("MESSAGE", message.sender);
    const { data, isFetching, error } = useFetchUserQuery(message.sender);
    const navigate = useNavigate();
    if(isFetching) return <div>Loading...</div>;

    console.log("DATA", data);

    return(
        <ListItem alignItems="flex-start" key={key} 
            className='group/item hover:bg-slate-100 cursor-pointer rounded-lg '
            onClick={()=> {navigate(`chat/${message.sender}`)}}>
            <ListItemAvatar> <Avatar size="md"> {capitalizeFirstLetter((data.name).charAt(0))}</Avatar> </ListItemAvatar>
            <ListItemText
              primary={data.name}
              secondary={
                <React.Fragment>
                  {message.content}
                  
                </React.Fragment>
              }
            />

            <JoyTypography level="body-sm" color="neutral">
                {timeAgo(message.date)}
            </JoyTypography>
        
          </ListItem>
    )
}