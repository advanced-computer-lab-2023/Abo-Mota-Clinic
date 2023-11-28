import React from 'react'
import { Input, Button } from '@mui/joy'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


import { useFetchLoggedInQuery, useSendMessageMutation, useFetchMessagesQuery } from '../../store';

function Chat({ socket }) {

  // controlled state
  // const [room, setRoom] = useState("");
  const malakId = "654eacecba61ba134d8164a8";
  const saraId = "654cff639445f84c04148803";

  const { recipient } = useParams();
  console.log("recipient:", recipient);

  const [messages, setMessages] = useState([]);

  console.log("Real messages:", messages);

  // controlled state
  const [messageContent, setMessageContent] = useState("");


  useEffect(() => {
    socket.emit("join_room", 441);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setMessages([...messages, data])

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
    if (!isFetchingMessages) {
      setMessages(messagesData.messages);
    }
  }, [isFetchingMessages])

  if (isFetchingUser || isFetchingMessages) {
    return <div>Loading...</div>;
  }

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

    // console.log("ID: ", loggedInUser);
    
    const message = {
      content: messageContent,
      sender: loggedInUser._id,
      recipient
    }

    await socket.emit("send_message", { ...message, room: 441 });

    sendMessage(message);
  };


  return (
    <div>
      {
        messages.map(({ sender, content }) => {
          console.log("Sender: ", sender);
          console.log("loggedInUser: ", loggedInUser._id);

          return (
            <div className='mb-10'>
              <div>
                Content: {content}
              </div>

              <div>
                Sender: {sender === loggedInUser._id ? "You" : "Other"}
              </div>
            </div>
          );
        })
      }
      {/* <Input placeholder='Room Id' onChange={(e) => setRoom(e.target.value)} /> */}
      <Input placeholder='Send a text' onChange={(e) => setMessageContent(e.target.value)} />
      {/* <Button onClick={onJoinRoom}>Join</Button> */}
      <Button onClick={onSendMessage}>Send</Button>
    </div>
  )
}

export default Chat;