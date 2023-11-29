import React from 'react'
import { Input, Button, Box, Avatar, Typography, Divider } from '@mui/joy'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import "../assets/styles/chat.css";
import { IoVideocamOutline } from "react-icons/io5";

import { useFetchLoggedInQuery, useSendMessageMutation, useFetchMessagesQuery, useFetchUserQuery } from '../../store';

// bubbles
// letter avatars
// recipient name header

// time

function Chat({ socket }) {

  // controlled state
  // const [room, setRoom] = useState("");
  const malakId = "654eacecba61ba134d8164a8";
  const saraId = "654cff639445f84c04148803";

  const { recipient } = useParams();
  // console.log("recipient:", recipient);
  const { data: recipientData, isFetching: isFetchingRecipient, isError: isErrorRecipient } = useFetchUserQuery(recipient);

  const [messages, setMessages] = useState([]);

  // console.log("Real messages:", messages);

  // controlled state
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setMessages([...messages, data]);

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, data];
        return newMessages;
      });
    });

  }, [socket]);


  const { data: loggedInUser, isFetching: isFetchingUser, isError } = useFetchLoggedInQuery();
  const { data: messagesData, isFetching: isFetchingMessages, isError: isErrorMessages } = useFetchMessagesQuery({ recipient });
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (!isFetchingUser)
      socket.emit("user_connected", loggedInUser._id);
  }, [isFetchingUser]);

  useEffect(() => {
    if (!isFetchingMessages) {
      setMessages(messagesData.messages);
    }
  }, [isFetchingMessages])

  if (isFetchingUser || isFetchingMessages || isFetchingRecipient) {
    return <div>Loading...</div>;
  }

  console.log("RecipientData: ", recipientData);
  const recipientName = recipientData.name;

  // console.log("MessagesData @ Chat.js", messagesData);


  // // hardcoded sender and recipient IDs
  // const senderId = loggedInUser._id;


  // const onJoinRoom = () => {
  //   if (room === "")
  //     return;

  //   socket.emit("join_room", room);
  // };

  const onSendMessage = async () => {
    if (messageContent === "")
      return;

    setMessageContent(() => {
      const newContent = "";
      return newContent;
    });
    // console.log("ID: ", loggedInUser);

    const message = {
      content: messageContent,
      sender: loggedInUser._id,
      recipient
    }

    await socket.emit("send_message", message);

    sendMessage(message);
  };

  const RecipientHeader = () => {
    return (
      <>
        <Box className="flex w-full justify-between items-center">
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
        <Divider sx={{ my: 1 }} />
      </>


    );
  }

  const SideChat = () => {
    return (
      <Box className="flex mt-7 mb-7 space-x-5">
        <Avatar color='primary'>H</Avatar>
        <Box>
          <Typography level="body-md" fontWeight={500}>
            Hardcoded Name
          </Typography>
          <Typography level="body-sm">
            This is a very long hardcoded message ....
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box className="" sx={{ backgroundColor: '#f9f9f9', px: 2, width: '25%' }}>
        <Typography level="h2" sx={{ marginTop: 1, p: 1 }}>
          Chats
        </Typography>

        <Input className='mt-5' placeholder='Search for doctors' sx={{ borderRadius: '1.5em' }}
        />

        <SideChat />
        <SideChat />
        <SideChat />
        <SideChat />
        <SideChat />
      </Box>

      <Box className='bg-white' sx={{ width: '75%', px: '2em', py: '1em' }}>
        <RecipientHeader />
        {
          messages.map(({ sender, content }) => {

            const fromMe = sender === loggedInUser._id;
            const containerClassName = fromMe ? "chat chat-end" : "chat chat-start";
            const messageClassName = fromMe ? "text-white chat-bubble" : "text-black chat-bubble";
            const bgColor = fromMe ? '#248bf5' : '#c7c7cb';

            return (
              <div className={containerClassName}>
                <div style={{ backgroundColor: bgColor }} className={messageClassName}>
                  {content}
                </div>

                {/* <div>
                Sender: {sender === loggedInUser._id ? "You" : "Other"}
              </div> */}
              </div>
            );
          })
        }
        {/* <Input placeholder='Room Id' onChange={(e) => setRoom(e.target.value)} /> */}

        <Input
          value={messageContent}
          className='w-full mt-10 p-1'
          placeholder='Type your message here ...'
          onChange={(e) => setMessageContent(e.target.value)}
          endDecorator={<IconButton onClick={onSendMessage} aria-label="Send message">
            <SendIcon />
          </IconButton>}
          sx={{ borderRadius: '1.5em' }}
        />
      </Box>
    </>
  )
}

export default Chat;