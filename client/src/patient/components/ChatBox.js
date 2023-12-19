import React from 'react'
import { Input, Box, Avatar, Typography, Divider, Skeleton } from '@mui/joy'
import { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IoVideocamOutline } from "react-icons/io5";
import { useFetchLoggedInQuery, useSendMessageMutation, useFetchMessagesQuery, useFetchContactQuery, useInvalidateContactDetailsMutation } from '../../store';
import convertToCairoTime from '../functions/convertToCairoTime';
import { FaStaffSnake } from "react-icons/fa6";

import ChatBoxSkeleton from './ChatBoxSkeleton';


function ChatBox({
  socket,
  selectedRecipientId,
  messages,
  setMessages,
}) {

  const ref = useRef(null);

  const [sendMessage] = useSendMessageMutation();
  // const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const { data: contactData, isFetching: isFetchingContact, isError: isErrorContact } = useFetchContactQuery(selectedRecipientId);
  const { data: loggedInUser, isFetching: isFetchingUser, isError } = useFetchLoggedInQuery();
  const { data: messagesData, isLoading: isLoadingMessages, isFetching: isFetchingMessages, isError: isErrorMessages } = useFetchMessagesQuery(selectedRecipientId);

  const PHARMA_SERVICE_ID = process.env.REACT_APP_PHARMA_SERVICE_ID;


  const scrollToBottom = () => {
    if (ref.current) {
      const container = ref.current.closest('.chatbox'); // Replace with your actual container class or ID

      // Scroll to the bottom of the container
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  // load messages state initially from db
  useEffect(() => {
    if (!isFetchingMessages) {
      if (messagesData) {
        setMessages(messagesData.messages);
      }
    }
  }, [isFetchingMessages, selectedRecipientId]);

  useEffect(() => scrollToBottom());


  const onSendMessage = async () => {
    if (messageContent === "")
      return;

    setMessageContent(() => {
      const newContent = "";
      return newContent;
    });

    const message = {
      content: messageContent,
      sender: loggedInUser._id,
      recipient: selectedRecipientId,
      date: new Date(),
    }

    setTimeout(() => {
      scrollToBottom()
    }, 100);

    console.log(`Contact Data in message emission, ${JSON.stringify(contactData, null, 2)}`);

    await socket.emit(
      "send_message",
      {
        message,
        senderData: loggedInUser,
        recipientData: contactData,
        isRelayToPharmacy: contactData.userType.toLowerCase() === "pharmacist"
      });

    sendMessage(message);
  };

  const RecipientHeader = ({ contact }) => {
    return (
      <Box className="pl-4 py-3 bg-white" sx={{ borderBottom: '1px solid #cccccc' }}>
        <Box className="flex justify-between items-center ">
          <Box className="flex items-center">
            {/* <Avatar color='warning' className="mr-3"> {recipientName[0]} </Avatar> */}

            {
              contact._id === PHARMA_SERVICE_ID ?
                <Avatar color="primary" className="mr-3"><FaStaffSnake style={{ fontSize: '1.5em' }} /> </Avatar>
                :
                <Avatar color="primary" className="mr-3">{contact.name[0]}</Avatar>
            }

            <Typography level="body-lg" fontWeight={500}>
              {contact.name}
            </Typography>
          </Box>

          {/* <Box className="mr-5">
            <IconButton><IoVideocamOutline /></IconButton>
          </Box> */}
        </Box>
      </Box>

    );
  }

  return (
    isFetchingUser || isLoadingMessages || isFetchingContact ? <ChatBoxSkeleton />
      :
      <Box className='grow flex flex-col h-full' sx={{ position: 'relative' }}>
        <RecipientHeader contact={contactData} />

        <Box className="grow chatbox h-full overflow-auto" sx={{ height: '5px', px: '2em' }}>
          {/* <ScrollToBottom style={{ overflowY: 'scroll'}}> */}
          {

            messages.map((message, i) => {
              const { sender, content, date } = message;

              const fromMe = sender === loggedInUser._id;
              const containerClassName = fromMe ? "chat chat-end" : "chat chat-start";
              const messageClassName = fromMe ? "text-white chat-bubble" : "text-black chat-bubble";
              const bgColor = fromMe ? '#248bf5' : '#c7c7cb';
              const timeClassName = "w-full flex px-2 " + (fromMe ? "justify-end" : "justify-start");

              return (
                <div>
                  <div key={i} className={containerClassName} style={{ height: 50 }}>
                    <div style={{ backgroundColor: bgColor, height: 20 }} className={messageClassName}>
                      {content}
                    </div>
                  </div>

                  <div className={timeClassName} ref={ref}
                  >
                    {/* display time on last message  */}
                    {i === messages.length - 1 && <Typography ref={ref}
                      level="body-xs">{convertToCairoTime(date)}</Typography>}
                  </div>
                </div>
              );
            })
          }
        </Box>

        <Box sx={{
          px: 3,
          my: 2,
          position: 'sticky',
          bottom: 0,
        }}>
          <Input
            value={messageContent}
            className='w-full p-1'
            placeholder='Type your message here ...'
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            onChange={(e) => setMessageContent(e.target.value)}
            endDecorator={<IconButton onClick={onSendMessage} aria-label="Send message">
              <SendIcon />
            </IconButton>}
            sx={{
              borderRadius: '1.5em', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' /* Slight drop shadow */
            }}
          />
        </Box>

      </Box >
  )
}

export default ChatBox;