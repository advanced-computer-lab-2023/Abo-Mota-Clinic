import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Avatar, Typography, Divider, Input, ListItemContent, ListItem, Badge, Skeleton } from '@mui/joy'
import ListItemButton from '@mui/joy/ListItemButton';

import { useFetchContactsDetailsQuery, useInvalidateMessagesMutation, useReadMessageMutation } from '../../store';
import timeAgo from '../functions/timeAgo';
import { FaStaffSnake } from "react-icons/fa6";

import capitalize from '../functions/capitalize';
import SideChatSkeleton from './SideChatSkeleton';

function SideChat({
  contactsDetails,
  setContactsDetails,
  selectedRecipientId,
  setSelectedRecipientId,
}) {

  const [searchTerm, setSearchTerm] = useState("");

  const { data: fetchedContactsDetails, isLoading: isLoadingContactsDetails, isFetching: isFetchingContactsDetails, isError: isErrorContactsDetails } = useFetchContactsDetailsQuery();
  const [invalidateMessages] = useInvalidateMessagesMutation();
  const [readMessage] = useReadMessageMutation();
  const PHARMA_SERVICE_ID = process.env.REACT_APP_PHARMA_SERVICE_ID;

  useEffect(() => {
    if (!isLoadingContactsDetails) {
      if (fetchedContactsDetails) {
        let toBeSorted = [...fetchedContactsDetails];
        setContactsDetails(toBeSorted.sort((a, b) => new Date(b.message.date) - new Date(a.message.date)));
      }
    }
  }, [isLoadingContactsDetails]);

  const updateTimeAgo = () => {
    setContactsDetails(prevContactsDetails => {
      const updatedContactsDetails = prevContactsDetails.map(contactDetails => {
        const { message } = contactDetails;

        let date = new Date(message.date);
        // Increment the date by one minute
        date.setMinutes(date.getMinutes() - 1);

        const newMessage = { ...message, date };

        return { ...contactDetails, message: newMessage };
      });

      return updatedContactsDetails;
    });
  }

  useEffect(() => {
    // Update time ago every minute
    const interval = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(interval);
  });

  const updateRead = (contactId) => {
    setContactsDetails(prevContactsDetails => {
      const updatedContactsDetails = prevContactsDetails.map(contactDetails => {
        if (contactDetails.message.sender === contactId || contactDetails.message.recipient === contactId) {
          return { ...contactDetails, read: true };
        }

        return contactDetails;
      });

      return updatedContactsDetails.sort((a, b) => new Date(b.message.date) - new Date(a.message.date));
    });
  }


  // if (isLoadingContactsDetails) {
  //   return <div>Loading...</div>;
  // }

  const ContactCard = ({ contact, message, read }) => {
    const text = message.content;

    console.log("Received read value = ", read);

    return (
      <>
        <ListItem>
          <ListItemButton
            // className="flex space-x-5 px-2 py-3 rounded-md"
            // variant={read ? 'plain' : 'soft'}

            onClick={() => {
              setSelectedRecipientId(contact._id);
              updateRead(contact._id);
              readMessage({ contact: contact._id });
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

          >
            {
              contact._id === PHARMA_SERVICE_ID ?
                <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'><FaStaffSnake style={{ fontSize: '2em' }} /> </Avatar>
                :
                <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'>{contact.name[0]}</Avatar>
            }

            <ListItemContent className="w-full space-y-1">
              <Box className="flex w-full justify-between items-center">
                <Box className="flex space-x-1 items-center">
                  <Typography level="body-md" fontWeight={500} textColor={read ? "#555e68" : "black"}>
                    {contact.name}
                  </Typography>

                  <Typography level="body-sm" fontWeight={450}>
                    {`\u2022 ${capitalize(contact.userType)}`}
                  </Typography>
                </Box>

                <Typography color="secondary" level="body-xs">
                  {timeAgo(message.date)}
                </Typography>
              </Box>



              <Box className="flex w-full justify-between items-center pr-2">
                <Typography level="body-sm" noWrap fontWeight={read ? 450 : 600} textColor={read ? "#555e68" : "black"}>
                  {text}
                </Typography>

                <Badge invisible={read} size="lg" />
              </Box>


            </ListItemContent>
          </ListItemButton>
        </ListItem>

      </>
    )
  }

  return (
    isLoadingContactsDetails ? <SideChatSkeleton />
      : <Box className="h-full" sx={{ backgroundColor: '#f9f9f9', px: 2, width: '350px' }}>
        <Typography level="h2" sx={{ p: 1 }}>
          Chats
        </Typography>

        <Input
          value={searchTerm}
          className='mt-2 mb-5'
          placeholder='Search for contacts'
          sx={{ borderRadius: '1.5em' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Box className="">
          {
            contactsDetails
              .filter(contactDetails => contactDetails.contact.name.toLowerCase().includes(searchTerm))
              .map((contactDetails, i) => {
                // const { contact, message, read } = contactDetails;
                return (
                  <>
                    <ContactCard {...contactDetails} />
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
