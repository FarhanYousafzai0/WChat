import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Send, AttachFile, MoreVert, InsertEmoticon, Mic } from '@mui/icons-material';
import { io } from 'socket.io-client';

const MessagePanel = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [sendMessages, setSendMessage] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);
  const messagesEndRef = useRef(null);

  const SocketRef = useRef();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sendMessages, receivedMessage]);

  useEffect(() => {
    SocketRef.current = io('http://localhost:1576');
    return () => SocketRef.current.disconnect();
  }, []);

  const handleMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        sent: true,
        time: Date.now(),
        message,
      };
      SocketRef.current.emit('Sent-Message', newMessage);
      setSendMessage((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  // Receive messages
  useEffect(() => {
    SocketRef.current.on('Received-Message', (data) => {
      const newMessage = {
        sent: false,
        time: Date.now(),
        message: data?.message,
      };
      setReceivedMessage((prev) => [...prev, newMessage]);
    });
  }, []);

  // Merge and sort all messages by time
  const allMessage = [...sendMessages, ...receivedMessage].sort((a, b) => a.time - b.time);

  return (
    <div className='flex flex-col h-full w-full bg-[#f5f7fa] '>
      {/* Chat header */}
      {selectedUser ? (
        <div className='flex items-center justify-between p-4 bg-blue-400'>
          <div className='flex items-center'>
            <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
            <div className='ml-3'>
              <p className='font-semibold text-lg'>{selectedUser?.name || 'Select a chat'}</p>
              <p className='text-xs text-white opacity-80'>
                {selectedUser?.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className='flex space-x-1'>
            <IconButton className='text-white hover:bg-white/10'>
              <AttachFile />
            </IconButton>
            <IconButton className='text-white hover:bg-white/10'>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between p-4 bg-gradient-to-r rounded bg-blue-400 text-white'>
          <p className='font-semibold text-lg'>Select a chat to start messaging</p>
        </div>
      )}

      {/* Messages area */}
      <div className='flex-1 p-4 overflow-y-auto bg-[#f5f7fa] bg-[url("https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e.png")]'>
        {allMessage.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-gray-500'>
            <p>No messages yet</p>
            <p className='text-sm'>Start a conversation!</p>
          </div>
        ) : (
          allMessage.map((item, index) => (
            <div 
              key={index} 
              className={`flex mb-4 ${item.sent ? 'justify-end' : 'justify-start'} transition-all duration-200`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                  item.sent 
                    ? 'bg-[#6C63FF] text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none'
                }`}
              >
                <p className='break-words'>{item.message}</p>
                <p className={`text-xs mt-1 text-right ${
                  item.sent ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className='bg-white p-3 flex items-center border-t border-gray-200'>
        <IconButton className='text-[#6C63FF] hover:bg-[#6C63FF]/10'>
          <InsertEmoticon />
        </IconButton>
        <IconButton className='text-[#6C63FF] hover:bg-[#6C63FF]/10'>
          <AttachFile />
        </IconButton>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleMessage();
          }}
          placeholder='Type a message'
          className='flex-1 mx-3 p-2 bg-gray-100 rounded-full outline-none px-4 focus:bg-gray-200 transition-all duration-200'
        />
        <IconButton 
          onClick={handleMessage}
          className={`text-white ${message.trim() ? 'bg-[#6C63FF] hover:bg-[#5a52e0]' : 'bg-gray-400'}`}
        >
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

export default MessagePanel;