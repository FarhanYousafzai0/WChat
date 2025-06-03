import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Send, AttachFile, MoreVert, InsertEmoticon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { getMessages } from '../../../features/Messages/MessageService';
import { sendNewMessage } from '../../../features/Messages/MessageSlice';

const socket = io('http://localhost:1576');

const MessagePanel = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Scroll chat to bottom when chatHistory updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(user._id, selectedUser._id)
        .then(setChatHistory)
        .catch((err) => console.error('Failed to fetch messages:', err));
    } else {
      setChatHistory([]); // Clear chat when no user is selected
    }
  }, [selectedUser, user._id]);

  // Listen for incoming messages via socket
  useEffect(() => {
    const handleReceivedMessage = (data) => {
      // Only add if message is from currently selected user
      if (data.sender_id === selectedUser?._id) {
        setChatHistory((prev) => [...prev, data]);
      }
    };

    socket.on('Received-Message', handleReceivedMessage);

    return () => {
      socket.off('Received-Message', handleReceivedMessage);
    };
  }, [selectedUser]);

  const handleMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      sender_id: user._id,
      receiver_id: selectedUser._id,
      message,
      time: new Date().toISOString(),
    };

    // Optimistically update UI
    setChatHistory((prev) => [...prev, newMsg]);

    // Send message through socket
    socket.emit('Sent-Message', newMsg);

    // Dispatch Redux action to save to backend
    try {
      await dispatch(sendNewMessage(newMsg)).unwrap();
    } catch (err) {
      console.error('Failed to send message:', err);
      // Optionally remove the message from chatHistory or mark as failed
    }

    setMessage('');
  };

  return (
    <div className='flex flex-col h-full rounded-md w-full bg-gradient-to-br from-blue-400/10 via-purple-500/10 to-indigo-600/10 backdrop-blur-sm'>
      {/* Header */}
      {selectedUser ? (
        <div className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-400 to-indigo-600 border-b border-white/20'>
          <div className='flex items-center'>
            <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
            <div className='ml-3'>
              <p className='font-semibold text-lg text-white'>{selectedUser.name}</p>
              <p className='text-xs text-white/80'>Online</p>
            </div>
          </div>
          <div className='flex gap-1'>
            <IconButton className='text-white hover:bg-white/10'>
              <AttachFile />
            </IconButton>
            <IconButton className='text-white hover:bg-white/10'>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className='p-4 text-white text-lg font-medium'>Select a user to chat</div>
      )}

      {/* Chat messages */}
      <div className='flex-1 overflow-y-auto p-4'>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender_id === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                msg.sender_id === user._id
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-tr-none'
                  : 'bg-white/90 text-gray-800 rounded-tl-none'
              }`}
            >
              <p className='break-words'>{msg.message}</p>
              <p className='text-xs mt-1 text-right text-white/60'>
                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className='bg-white/10 backdrop-blur-lg p-3 flex items-center border-t border-white/20'>
        <IconButton className='text-white hover:bg-white/10'>
          <InsertEmoticon />
        </IconButton>
        <IconButton className='text-white hover:bg-white/10'>
          <AttachFile />
        </IconButton>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleMessage()}
          placeholder='Type a message...'
          className='flex-1 mx-3 p-2 bg-white/20 text-white placeholder-white/50 rounded-full outline-none px-4 focus:bg-white/30 transition'
          autoComplete='off'
        />
        <IconButton
          onClick={handleMessage}
          className='text-white bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'
          aria-label='Send message'
        >
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

export default MessagePanel;
