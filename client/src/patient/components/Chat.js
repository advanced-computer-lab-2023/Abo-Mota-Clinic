import React from 'react';
import { useState } from 'react';
import ChatBox from './ChatBox';
import SideChat from './SideChat';
import { Box, Divider } from '@mui/joy'

function Chat({ socket }) {
  const [selectedRecipientId, setSelectedRecipientId] = useState(null);

  return (
    <Box className="flex w-full h-full">
      <Box>
        <SideChat selectedRecipientId={selectedRecipientId} setSelectedRecipientId={setSelectedRecipientId} />
      </Box>

      <Divider orientation='vertical' />

      <Box className="h-full w-full">
        {
          selectedRecipientId
            ? <ChatBox socket={socket} selectedRecipientId={selectedRecipientId} />
            : <div>No chats currently selected!</div>
        }
      </Box>
    </Box>
  )
}

export default Chat;
