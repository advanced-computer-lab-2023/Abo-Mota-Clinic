import * as React from 'react';
import List from '@mui/material/List';
import { Typography as JoyTypography, Divider } from '@mui/joy';
import MessageItem from './MessageItem';
import Typography from '@mui/material/Typography';

export default function MessagesList({messages}) {
    
  let content = messages.map((message, index) => {
    return  <>
              <MessageItem message={message} key={index}/>
              {messages.length > 1 && <Divider sx={{ opacity: '50%' }} />}
            </>
  });

  if(content.length === 0){
    content = <Typography level="h4"  >
                No New Messages
                </Typography>
  }
  return (
    <div>
        <JoyTypography level="h4"  >
          Messages 
        </JoyTypography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {content}
        </List>
    </div>
  );
}