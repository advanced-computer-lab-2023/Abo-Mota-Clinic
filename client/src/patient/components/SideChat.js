import React from 'react'
import { useState } from 'react'
import { Box, Avatar, Typography, Divider, Input } from '@mui/joy'
import ListItemButton from '@mui/joy/ListItemButton';

import { useFetchContactsQuery } from '../../store';


function SideChat({ selectedRecipientId, setSelectedRecipientId }) {

  const [searchTerm, setSearchTerm] = useState("");
  const { data: contactedUsers, isFetching: isFetchingContactedUsers, isError: isErrorContactedUsers } = useFetchContactsQuery();

  if (isFetchingContactedUsers) {
    return <div>Loading...</div>;
  }

  console.log("Contacted Users: ", contactedUsers);

  const ContactCard = ({ user }) => {
    const text = "This is a very long text that should be truncated at some point.";
    const maxTextLength = 58;
    const hardcodedTime = "11:45 AM"


    return (
      <>
        <ListItemButton
          // className="flex space-x-5 px-2 py-3 rounded-md"
          onClick={() => setSelectedRecipientId(user._id)}
          sx={{
            px: 1,
            py: 1,
            borderRadius: '5px',
            display: 'flex',
            displayDirection: 'row',
            gap: 1.5,
          }}

          selected={user._id === selectedRecipientId}

          className='bg-blue-300'
        >
          <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'>{user.name[0]}</Avatar>
          <Box className="space-y-1">
            <Box className="flex justify-between">
              <Typography level="body-md" fontWeight={500}>
                {user.name}
              </Typography>

              <Typography level="body-xs" color='textTertiary'>
                {hardcodedTime}
              </Typography>
            </Box>
            <Typography level="body-xs">
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
          contactedUsers
            .filter(user => user.name.toLowerCase().includes(searchTerm))
            .map((user, i) => {
            console.log("User Name @ Chat.js: ", user.name);
            return (
              <>
                <ContactCard user={user} />
                {(i < contactedUsers.length - 1) && <Divider sx={{ opacity: '50%' }} />}
              </>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default SideChat;
