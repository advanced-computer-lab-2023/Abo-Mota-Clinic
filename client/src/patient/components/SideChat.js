import React from 'react'
import { useState } from 'react'
import { Box, Avatar, Typography, Divider, Input } from '@mui/joy'
import ListItemButton from '@mui/joy/ListItemButton';

import { useFetchContactsDetailsQuery, useInvalidateMessagesMutation } from '../../store';
import timeAgo from '../functions/timeAgo';


function SideChat({ selectedRecipientId, setSelectedRecipientId }) {

  const [searchTerm, setSearchTerm] = useState("");
  const { data: contactsDetails, isLoading: isLoadingContactsDetails, isFetching: isFetchingContactsDetails, isError: isErrorContactsDetails } = useFetchContactsDetailsQuery();
  const [invalidateMessages] = useInvalidateMessagesMutation();


  if (isLoadingContactsDetails) {
    return <div>Loading...</div>;
  }

  console.log("Contacts Details", contactsDetails);


  const ContactCard = ({ contact, message }) => {
    console.log("Received message is:", message);

    const text = message.content;
    const maxTextLength = 58;

    return (
      <>
        <ListItemButton
          // className="flex space-x-5 px-2 py-3 rounded-md"
          onClick={() => {
            setSelectedRecipientId(contact._id);
            invalidateMessages();
          }}
          
          sx={{
            px: 1,
            py: 1,
            borderRadius: '5px',
            display: 'flex',
            displayDirection: 'row',
            gap: 1.5,
          }}

          selected={contact._id === selectedRecipientId}

          className='bg-blue-300'
        >
          <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'>{contact.name[0]}</Avatar>
          <Box className="w-full space-y-1">
            <Box className="flex w-full justify-between items-center">
              <Typography level="body-md" fontWeight={500}>
                {contact.name}
              </Typography>

              <Typography color="secondary" level="body-xs">
                {timeAgo(message.date)}
              </Typography>
            </Box>
            <Typography level="body-sm">
              {text.length < maxTextLength ? text : text.substring(0, maxTextLength) + "..."}
            </Typography>
          </Box>
        </ListItemButton>

      </>
    )
  }

  return (
    <Box className="h-full" sx={{ backgroundColor: '#f9f9f9', px: 2 }}>
      <Typography level="h2" sx={{ p: 1 }}>
        Chats
      </Typography>

      <Input
        value={searchTerm}
        className='mt-2 mb-5'
        placeholder='Search for doctors'
        sx={{ borderRadius: '1.5em' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box className="">
        {
          contactsDetails
            .filter(contactDetails => contactDetails.contact.name.toLowerCase().includes(searchTerm))
            .map((contactDetails, i) => {
              const { contact, message } = contactDetails;
              return (
                <>
                  <ContactCard contact={contact} message={message} />
                  {(i < contactsDetails.length - 1) && <Divider sx={{ opacity: '50%' }} />}
                </>
              )
            })
        }
      </Box>
    </Box>
  )
}

export default SideChat;
