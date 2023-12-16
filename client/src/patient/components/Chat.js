import React from 'react';
import { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import SideChat from './SideChat';
import { Box, Divider } from '@mui/joy'
import { useParams } from 'react-router-dom';
import { useFetchContactsDetailsQuery } from '../../store';

function Chat({ socket }) {

  const { recipient } = useParams();
  const { data: contactsDetails, isLoading: isLoadingContactsDetails, isFetching: isFetchingContactsDetails, isError: isErrorContactsDetails } = useFetchContactsDetailsQuery();
  const [selectedRecipientId, setSelectedRecipientId] = useState(recipient);
  const [isFirstTimeChat, setIsFirstTimeChat] = useState(false);

  useEffect(() => {
    if(contactsDetails)
      setIsFirstTimeChat(contactsDetails.every(contact => contact._id !== recipient));
  }, [isFetchingContactsDetails])

  if (isLoadingContactsDetails) {
    return <div>Loading...</div>;
  }
  
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
