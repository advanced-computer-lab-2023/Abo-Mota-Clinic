import React from 'react'
import { Input, Box, Avatar, Typography, Divider } from '@mui/joy'
import { useState, useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IoVideocamOutline } from "react-icons/io5";
import { useFetchLoggedInQuery, useSendMessageMutation, useFetchMessagesQuery, useFetchRecipientQuery, useFetchContactsQuery } from '../../store';
import convertToCairoTime from '../functions/convertToCairoTime';

function ChatBox({ socket, selectedRecipientId }) {

  const ref = useRef(null);

  const [sendMessage] = useSendMessageMutation();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const { data: recipientData, isFetching: isFetchingRecipient, isError: isErrorRecipient } = useFetchRecipientQuery(selectedRecipientId);
  const { data: loggedInUser, isFetching: isFetchingUser, isError } = useFetchLoggedInQuery();
  const { data: messagesData, isLoading: isLoadingMessages, isFetching: isFetchingMessages, isError: isErrorMessages } = useFetchMessagesQuery(selectedRecipientId);

  const scrollToBottom = () => {
    if (ref.current) {
      const container = ref.current.closest('.chatbox'); // Replace with your actual container class or ID

      // Scroll to the bottom of the container
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {

      setMessages((prevMessages) => {
        // prevMessages[prevMessages.length - 1].showTime = false;
        const newMessages = [...prevMessages, data];
        return newMessages;
      });
    });

  }, [socket]);

  useEffect(() => {
    if (!isFetchingUser) {
      socket.emit("user_connected", loggedInUser._id);
    }
  }, [isFetchingUser]);

  useEffect(() => {
    if (!isFetchingMessages) {
      if (messagesData) {
        setMessages(messagesData.messages);
      }
    }
  }, [isFetchingMessages, selectedRecipientId]);

  useEffect(() => scrollToBottom());

  if (isFetchingUser || isLoadingMessages || isFetchingRecipient) {
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
      recipient: selectedRecipientId,
      date: new Date(),
    }

    // if (ref.current) {
    //   ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   console.log("About to scroll to: ", ref.current);
    // }
    setTimeout(() => {
      scrollToBottom()
    }, 100);

    // scrollToElement();

    await socket.emit(
      "send_message",
      {
        message,
        isRelayToPharmacy: recipientData.recipientType.toLowerCase() === "pharmacist"
      });

    sendMessage(message);
  };

  const RecipientHeader = ({ recipientName }) => {
    return (
      <Box className="pl-4 py-2 bg-white" sx={{ borderBottom: '1px solid #cccccc' }}>
        <Box className="flex justify-between items-center ">
          <Box className="flex items-center">
            <Avatar color='warning' className="mr-3"> {recipientName[0]} </Avatar>
            <Typography level="body-lg" fontWeight={500}>
              {recipientName}
            </Typography>
          </Box>

          <Box className="mr-5">
            <IconButton><IoVideocamOutline /></IconButton>
          </Box>
        </Box>
      </Box>

    );
  }

  return (
    <>
      <Box className='grow flex flex-col h-full' sx={{ position: 'relative' }}>
        <RecipientHeader recipientName={recipientData.name} />

        <Box className="grow chatbox h-full overflow-auto" sx={{ height: '5px', px: '2em' }}>
          {/* <ScrollToBottom style={{ overflowY: 'scroll'}}> */}
          {
            messages.map(({ sender, content, date }, i) => {

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
    </>
  )
}

export default ChatBox;