import { motion } from 'framer-motion';
import { Logout, Close, Settings, Notifications, Security } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../features/UserService';
import toast from 'react-hot-toast';

export const SettingsSidebar = ({ isOpen, onClose }) => {



    const {user} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();

    const handleLogout = ()=>{

        dispatch(clearUser());
        
     
    }


  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <motion.div 
        className="relative w-full max-w-xs h-full bg-gradient-to-b from-blue-400 to-indigo-600 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
            >
              <Close sx={{ fontSize: 28 }} className='cursor-pointer' />
            </button>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-white/10 rounded-lg">
            <Avatar 
              alt="User" 
              src={user?.avatar}
              sx={{ width: 56, height: 56 }} 
              className="border-2 border-white"
            />
            <div>
              <h3 className="text-white font-medium">{user?.name || 'Guest'}</h3>
              
            </div>
          </div>
          
          {/* Settings Options */}
          <div className="flex-1 space-y-4">
            <button className="w-full flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-white/10 rounded-lg transition">
              <Settings sx={{ fontSize: 24 }} />
              <span>Account Settings</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-white/10 rounded-lg transition">
              <Notifications sx={{ fontSize: 24 }} />
              <span>Notifications</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-white/10 rounded-lg transition">
              <Security sx={{ fontSize: 24 }} />
              <span>Privacy & Security</span>
            </button>
          </div>
          
          {/* Logout Button */}
          <Link 
            to="/"
            onClick={handleLogout}
            className="mt-auto flex items-center cursor-pointer gap-3 p-3 text-white hover:bg-white hover:text-black rounded-lg transition border border-white/20"
          >
            <Logout sx={{ fontSize: 24 }} />
            <span>Log Out</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};