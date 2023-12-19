import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../../doctor/components/AppointmentCard';
import {useNavigate} from "react-router-dom";
import timeAgo from '../../patient/functions/timeAgo';
import { Typography as JoyTypography } from '@mui/joy';


export default function MessageItem({message ,sender, key}){

    // const message = {
    //     content: messageContent,
    //     sender: loggedInUser._id,
    //     recipient: selectedRecipientId,
    //     date: new Date(),
    //   }
    console.log("MESSAGE", message.sender);
    const navigate = useNavigate();

    // console.log("DATA", data);
    console.log("SENDER IN MSG ITEM", sender)

    return(
        <ListItem alignItems="flex-start min-w-full" key={key} 
            className='group/item hover:bg-slate-100 cursor-pointer rounded-lg '
            onClick={()=> {navigate(`chat/${message.sender}`)}}>
            <ListItemAvatar> <Avatar size="md"> {capitalizeFirstLetter((sender.name).charAt(0))}</Avatar> </ListItemAvatar>
            <ListItemText
              primary={<div className='flex justify-between'>
                <div className='pr-20'>
                  {sender.name}
                </div>
                <JoyTypography level="body-sm" color="neutral">
                {timeAgo(message.date)}
                </JoyTypography>
              </div>}
              secondary={
                <React.Fragment>
                  {message.content}
                  
                </React.Fragment>
              }
            />

        </ListItem>
    )
}