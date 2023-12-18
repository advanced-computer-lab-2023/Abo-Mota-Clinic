import React from 'react';
import { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import SideChat from './SideChat';
import { Box, Divider, Typography } from '@mui/joy'
import { useParams } from 'react-router-dom';
import { useFetchContactsDetailsQuery } from '../../store';
import chatIcons from "../../shared/assets/chat_icons.png"

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
    <Box className="h-full flex flex-row" style={{borderTop: "1.5px solid #cccccc"}}>
      <Box className="flex flex-row h-full">
        <SideChat selectedRecipientId={selectedRecipientId} setSelectedRecipientId={setSelectedRecipientId} />
      </Box>

      <Divider orientation='vertical' />

      <Box className="grow h-full flex flex-row justify-center items-center">
        {
          selectedRecipientId
            ? <ChatBox
              socket={socket}
              selectedRecipientId={selectedRecipientId} />
            : (
              <Box>
                <img style={{ height: '23em', width: '23em' }} src={chatIcons} alt="chat icons" />
                <Box className="text-center">
                  <Typography level='h3' fontWeight={350} textColor="#696969">Select a contact to start chatting</Typography>
                </Box>
              </Box>
            )
        }
      </Box>
    </Box>
  )
}

export default Chat;


// clinic patient -> <- doctor: 10/10
// doctor -> <- pharmacist: 10/10
// pharmacy patient -> <- pharmacist: 10/10

// only show messages for the selected recipient