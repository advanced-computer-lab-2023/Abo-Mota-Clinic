import * as React from 'react';
import List from '@mui/material/List';
import { Navigate } from 'react-router-dom';
import { Typography as JoyTypography, Divider } from '@mui/joy';
import MessageItem from './MessageItem';
import Typography from '@mui/material/Typography';
export default function MessagesList({messages}) {
  const navigate = Navigate();
    
  let content = messages.map((message, index) => {
    return  <>
              <MessageItem message={message} key={index}/>
              {messages.length > 1 && <Divider sx={{ opacity: '50%' }} />}
            </>
  });

  if(content.length === 0){
    content = <JoyTypography level="body-sm" >
                No New Messages
              </JoyTypography>
  }
  return (
    <div>
        <JoyTypography level="h4"  >
          Messages 
        </JoyTypography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {content}
        </List>
        <div className="flex justify-end cursor-pointer" onClick={() => {navigate("chat/")}}>
        {messages.length> 0 && <Typography variant="body2" color="text.secondary"> View All Messages</Typography>}
      </div>
    </div>
  );
}