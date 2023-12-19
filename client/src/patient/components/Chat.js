import React from 'react';
import { useState, useEffect } from 'react';
import ChatBox from '../components/ChatBox';
import SideChat from '../components/SideChat';
import { Box, Divider } from '@mui/joy'
import { useParams } from 'react-router-dom';
import { useFetchLoggedInQuery, useReadMessageMutation } from '../../store';
import chatIcons from "../../shared/assets/chat_icons.png"
import { Typography } from '@mui/joy';


function Chat({ socket }) {

  const { contact } = useParams();
  const [selectedRecipientId, setSelectedRecipientId] = useState(contact);
  const [contactsDetails, setContactsDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const { data: loggedInUser, isFetching: isFetchingUser, isError } = useFetchLoggedInQuery();
  const [readMessage] = useReadMessageMutation();

  useEffect(() => {
    if (!isFetchingUser) {
      console.log(`Emitting user connection with id ${loggedInUser._id}`);
      socket.emit("user_connected", loggedInUser._id);
    }
  }, [isFetchingUser]);

  const handleUpdateContactsDetails = (data) => {

    setContactsDetails(prevContactsDetails => {
      const { message, senderData, recipientData } = data;
      const detailsIndex = prevContactsDetails.findIndex(details =>
        details.contact._id === message.sender || details.contact._id === message.recipient
      );

      let newContactsDetails;
      let read;
      // Logged in user is the sender => must be inside the chat box
      if (loggedInUser._id === message.sender) read = true;
      // Logged in user is the recipient, but is on selectedRecipient => must be inside the side chat
      else if (message.sender === selectedRecipientId) {
        read = true;
        setTimeout(() => {
          readMessage({ contact: selectedRecipientId });
        }, 1000);
      }
      else read = false;


      if (detailsIndex !== -1) {
        // Update existing contact details
        newContactsDetails = prevContactsDetails.map((details, index) =>
          index === detailsIndex ? { ...details, message, read } : details
        );

      } else {
        // Add new contact details
        const newDetails = {
          contact: message.sender === loggedInUser._id ? recipientData : senderData,
          message,
          read
        };

        newContactsDetails = [...prevContactsDetails, newDetails];
      }

      // Sort the updated contacts details
      return newContactsDetails.sort((a, b) => new Date(b.message.date) - new Date(a.message.date));
    });
  };

  const handleUpdateMessages = (data) => {
    const { message } = data;

    if (message.sender === selectedRecipientId || message.sender === loggedInUser._id) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        return newMessages;
      });
    }
  };

  useEffect(() => {
    // Define the event handler
    const handleMessageReceive = (data) => {

      console.log("Received message in socket = ", data);

      handleUpdateContactsDetails(data);
      handleUpdateMessages(data);
    };

    // Add the event listener
    socket.on("receive_message", handleMessageReceive);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket, selectedRecipientId]); // Dependencies


  return (
    <Box className="h-full flex" style={{ borderTop: "1.5px solid #cccccc" }}>
      <Box className="h-full bg-blue-100">
        <SideChat
          contactsDetails={contactsDetails}
          setContactsDetails={setContactsDetails}
          selectedRecipientId={selectedRecipientId}
          setSelectedRecipientId={setSelectedRecipientId}
        />
      </Box>

      <Divider orientation='vertical' />

      <Box className="grow h-full flex flex-row justify-center items-center">
        {
          selectedRecipientId
            ? <ChatBox
              socket={socket}
              selectedRecipientId={selectedRecipientId}
              messages={messages}
              setMessages={setMessages}
            />
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
