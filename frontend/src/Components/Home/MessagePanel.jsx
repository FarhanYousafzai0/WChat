import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Send, AttachFile, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material';
import { io } from 'socket.io-client';

const MessagePanel = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [sendMessages, setSendMessage] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);

  const SocketRef = useRef();

  useEffect(() => {
    SocketRef.current = io('http://localhost:1576');
    return () => SocketRef.current.disconnect(); // ✅ fixed typo
  }, []); // ✅ added dependency array

  const handleMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sent: true,
        time: Date.now(),
        message,
      };
      SocketRef.current.emit("Sent-Message", newMessage);
      setSendMessage((prev) => [...prev, newMessage]);
      setMessage(""); // ✅ clear input after sending
    }
  };


  // Received-Message:

  useEffect(()=>{
 
    SocketRef.current.on("Received-Message",(data)=>{
      const newMessage = {
        sent:false,
        time:Date.now(),
        message:data?.message
      }
      setSendMessage((prev)=> [...prev,newMessage]);
    })

  })


// Merge both arrays:


const allMessage = [...sendMessages,...receivedMessage].sort((a,b)=>{
  a.time - b.time
})



  return (
    <div className='flex flex-col h-full w-full bg-[#e5ddd5]'>
      {/* Chat header */}
      {selectedUser ? (
        <div className='flex items-center justify-between p-3 bg-[#f0f2f5] border-b border-gray-200'>
          <div className='flex items-center'>
            <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
            <div className='ml-3'>
              <p className='font-semibold'>{selectedUser?.name || 'Select a chat'}</p>
              <p className='text-xs text-gray-500'>
                {selectedUser?.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between p-3 bg-[#f0f2f5] border-b border-gray-200'>
          <p className='font-semibold'>Select a chat to start messaging</p>
        </div>
      )}

      {/* Messages area */}
      <div className='flex-1 p-4 overflow-y-auto bg-[#e5ddd5] bg-opacity-30'>
        {/* Example structure */}



       {allMessage?.map((item,index)=>{
          


        })}
        <div className='flex mb-4 justify-start'>
          <div className='max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-white'>
            <p>Sample received message</p>
            <p className='text-xs text-gray-500 text-right mt-1'>10:30 AM</p>
          </div>
        </div>
        <div className='flex mb-4 justify-end'>
          <div className='max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#d9fdd3]'>
            <p>Sample sent message</p>
            <p className='text-xs text-gray-500 text-right mt-1'>10:32 AM</p>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className='bg-white p-3 flex items-center'>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message'
          className='flex-1 mx-3 p-2 bg-gray-100 rounded-full outline-none px-4'
        />
        <IconButton onClick={handleMessage}>
         <Send /> 
        </IconButton>
      </div>
    </div>
  );
};

export default MessagePanel;
