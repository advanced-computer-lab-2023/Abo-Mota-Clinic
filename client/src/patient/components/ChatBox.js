import React from 'react'
import { Input, Box, Avatar, Typography, Divider } from '@mui/joy'
import { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IoVideocamOutline } from "react-icons/io5";

import { useFetchLoggedInQuery, useSendMessageMutation, useFetchMessagesQuery, useFetchRecipientQuery, useFetchContactsQuery } from '../../store';


function ChatBox({ socket, selectedRecipientId }) {

  const ref = useRef(null);

  const [sendMessage] = useSendMessageMutation();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const { data: recipientData, isFetching: isFetchingRecipient, isError: isErrorRecipient } = useFetchRecipientQuery(selectedRecipientId);
  const { data: loggedInUser, isFetching: isFetchingUser, isError } = useFetchLoggedInQuery();
  const { data: messagesData, isFetching: isFetchingMessages, isError: isErrorMessages } = useFetchMessagesQuery(selectedRecipientId);

  useEffect(() => {
    socket.on("receive_message", (data) => {

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, data];
        return newMessages;
      });
    });

  }, [socket]);

  useEffect(() => {
    if (!isFetchingUser)
      socket.emit("user_connected", loggedInUser._id);
  }, [isFetchingUser]);

  useEffect(() => {
    if (!isFetchingMessages) {
      if (messagesData)
        setMessages(messagesData.messages);
    }
  }, [isFetchingMessages, selectedRecipientId])


  if (isFetchingUser || isFetchingMessages || isFetchingRecipient) {
    return <div>Loading...</div>;
  }


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
      recipient: selectedRecipientId
    }

    if (ref.current)
      ref.current.scrollIntoView();

    await socket.emit("send_message", message);

    sendMessage(message);
  };

  const RecipientHeader = ({ recipientName }) => {
    return (
      <Box className="pl-4 pt-2 bg-white">
        <Box className="flex justify-between items-center ">
          <Box className="flex items-center">
            <Avatar color='warning' className="mr-3"> {recipientName[0]} </Avatar>
            <Typography level="body-lg" fontWeight={500}>
              {recipientName}
            </Typography>
          </Box>

          <Box className="">
            <IconButton><IoVideocamOutline /></IconButton>
          </Box>
        </Box>
        <Divider sx={{ marginTop: 1 }} />
      </Box>

    );
  }

  return (
      <>
        <Box className='bg-white'>
          <RecipientHeader recipientName={recipientData.name} />


          <Box sx={{ height: '555px', px: '2em', py: '1em', overflowY: 'scroll' }}>
            {/* <ScrollToBottom style={{ overflowY: 'scroll'}}> */}
            {
              messages.map(({ sender, content }, i) => {

                const fromMe = sender === loggedInUser._id;
                const containerClassName = fromMe ? "chat chat-end" : "chat chat-start";
                const messageClassName = fromMe ? "text-white chat-bubble" : "text-black chat-bubble";
                const bgColor = fromMe ? '#248bf5' : '#c7c7cb';

                return (
                  <div key={i} className={containerClassName} style={{ height: 50 }}>
                    <div style={{ backgroundColor: bgColor, height: 20 }} className={messageClassName}>
                      {content}
                    </div>

                    {/* <div>
          Sender: {sender === loggedInUser._id ? "You" : "Other"}
        </div> */}
                  </div>
                );
              })
            }
            <div ref={ref} style={{ height: 40 }}></div>

          </Box>


          <Box sx={{ px: 3, my: 1 }}>
            <Input
              value={messageContent}
              className='w-full p-1'
              placeholder='Type your message here ...'
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
              onChange={(e) => setMessageContent(e.target.value)}
              endDecorator={<IconButton onClick={onSendMessage} aria-label="Send message">
                <SendIcon />
              </IconButton>}
              sx={{ borderRadius: '1.5em' }}
            />
          </Box>


        </Box>
    </>
  )
}

export default ChatBox;