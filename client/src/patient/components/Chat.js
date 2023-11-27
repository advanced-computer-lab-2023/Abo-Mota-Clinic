import React from 'react'
import { Input, Button } from '@mui/joy'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ socket }) {

  const myName = "Omar Elkord";

  // controlled state
  const [room, setRoom] = useState("");

  // controlled state
  const [message, setMessage] = useState("");

  // to be fetched from the database
  const [messages, setMessages] = useState([
    {
      sender: "Omar Elkord",
      content: "Hi Dr. Alaa. I am writing to inquire about the status of our next appointment."
    },

    {
      sender: "Alaa Tantawy",
      content: "Hi Omar. We are still on for Tuesday."
    }
  ]);

  useEffect(() => {
    socket.emit("join_room", 441);
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data])
    });

  }, [socket])

  // hardcoded sender and recipient IDs
  const senderId = "sara's";

  const recipientId = "654eacecba61ba134d8164a8";

  // const onJoinRoom = () => {
  //   if (room === "")
  //     return;

  //   socket.emit("join_room", room);
  // };

  const onSendMessage = async () => {
    if (message === "")
      return;

    const messageData = {
      room: 441,
      content: message,
      recipientId
    }

    await socket.emit("send_message", messageData);
    await axios.post("http://localhost:5000/api/chat/message", { content: message, recipientId }, {
      withCredentials: true,  // Include credentials in the request
      headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    })
  };


  return (
    <div>
      {
        messages.map(({ sender, content }) => {
          return (
            <div className='mb-10'>
              <div>
                Content: {content}
              </div>

              <div>
                Sender: {sender === myName ? "You" : sender}
              </div>
            </div>
          );
        })
      }
      {/* <Input placeholder='Room Id' onChange={(e) => setRoom(e.target.value)} /> */}
      <Input placeholder='Send a text' onChange={(e) => setMessage(e.target.value)} />
      {/* <Button onClick={onJoinRoom}>Join</Button> */}
      <Button onClick={onSendMessage}>Send</Button>
    </div>
  )
}

export default Chat;