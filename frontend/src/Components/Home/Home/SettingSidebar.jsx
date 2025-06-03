import { motion } from 'framer-motion';
import { Logout, Close, Settings, Notifications, Security, Edit, Save } from '@mui/icons-material';
import { Avatar, IconButton, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { clearUser } from '../../../features/UserService';
import { NewUsername } from '../../../features/UserSlice';

export const SettingsSidebar = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.name || '');
  const dispatch = useDispatch();



  
  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleUpdateUsername = () => {
    const newData = {
      userId: user?._id,         
      newUsername: newUsername, 
    };

   
    dispatch(NewUsername(newData));
    setIsEditing(false); 
  };
  


  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative w-full max-w-xs h-full bg-gradient-to-b from-blue-400 to-indigo-600 shadow-xl">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <Close sx={{ fontSize: 28 }} />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-white/10 rounded-lg">
            <Avatar alt="User" src={user?.avatar} sx={{ width: 56, height: 56 }} className="border-2 border-white" />
            <div className="flex flex-col">
              {isEditing ? (
                <>
                  <TextField
                    size="small"
                    variant="outlined"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="bg-white rounded"
                  />
                  <IconButton onClick={handleUpdateUsername} className="text-white  ">
                    <Save className='text-white' />
                  </IconButton>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium">{user?.name}</h3>
                  <IconButton size="small" onClick={() => setIsEditing(true)} className="text-white">
                    <Edit fontSize="small text-white" />
                  </IconButton>
                </div>
              )}
            </div>
          </div>

          {/* Other Settings */}
          <div className="flex-1 space-y-4">
            <button className="w-full flex items-center gap-3 p-3 text-white hover:bg-white/10 rounded-lg">
              <Settings /> <span>Account Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-white hover:bg-white/10 rounded-lg">
              <Notifications /> <span>Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-white hover:bg-white/10 rounded-lg">
              <Security /> <span>Privacy & Security</span>
            </button>
          </div>

          {/* Logout */}
          <Link to="/" onClick={handleLogout} className="mt-auto flex items-center gap-3 p-3 text-white hover:bg-white hover:text-black rounded-lg border border-white/20">
            <Logout /> <span>Log Out</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
