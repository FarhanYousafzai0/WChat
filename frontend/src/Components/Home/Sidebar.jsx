import { useEffect, useState } from 'react';
import { Message, Settings, Search, AddBox, MoreVert } from '@mui/icons-material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PixIcon from '@mui/icons-material/Pix';
import { IconButton, InputBase, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AllUserData } from '../../features/UserSlice';
import { SettingsSidebar } from './SettingSidebar';

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const { user, allUsers } = useSelector((state) => state.auth);

  // Fetch users once on mount
  useEffect(() => {
    dispatch(AllUserData());
  }, [dispatch]);

  const filteredUsers = allUsers?.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className='w-[800px] h-full bg-gradient-to-b from-blue-400 to-indigo-600 p-2 rounded flex'>
      {/* Sidebar Icons */}
      <div className='h-full w-[80px] bg-white/10 backdrop-blur-lg flex flex-col py-3 rounded-md items-center justify-between border border-white/20'>
        <div className='flex flex-col gap-3 items-center'>
          <Message className='text-white cursor-pointer hover:text-white/80' sx={{ width: 25, height: 25 }} />
          <Diversity3Icon className='text-white cursor-pointer hover:text-white/80' sx={{ width: 25, height: 25 }} />
          <TimelapseIcon className='text-white cursor-pointer hover:text-white/80' sx={{ width: 25, height: 25 }} />
          <PixIcon className='text-white cursor-pointer hover:text-white/80' sx={{ width: 25, height: 25 }} />
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <Settings
            sx={{ width: 25, height: 25 }}
            className='text-white cursor-pointer hover:text-white/80'
            onClick={() => setSettingsOpen(true)}
          />
          <Avatar
            alt={user?.name}
            src={user?.avatar}
            sx={{ width: 40, height: 40 }}
            className='border-2 border-white cursor-pointer'
          />
        </div>
      </div>

      {/* Chat List Area */}
      <div className='w-full h-full p-2 bg-gradient-to-br from-blue-400/10 via-purple-500/10 to-indigo-600/10 backdrop-blur-sm'>
        {/* Header */}
        <div className='flex items-center justify-between p-2'>
          <h4 className='text-3xl font-semibold text-white'>Chats</h4>
          <div className='flex items-center gap-1'>
            <IconButton className='text-white '>
              <AddBox className='text-white' />
            </IconButton>
            <IconButton className='text-white hover:bg-white/10'>
              <MoreVert className='text-white' />
            </IconButton>
          </div>
        </div>

        {/* Search Bar */}
        <div className='p-2'>
          <div className='flex items-center bg-white/20 rounded-lg px-3 py-1'>
            <Search className='text-white/70 mr-2' />
            <InputBase
              placeholder='Search chats...'
              className='text-white placeholder-white/50 w-full'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User List */}
        <div className='overflow-y-auto h-[calc(100%-120px)]'>
          {filteredUsers.map((u) => (
            <div
              key={u._id}
              className='flex items-center p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors duration-200'
            >
              <Avatar
                alt={u.name}
                src={u.avatar}
                className='border-2 border-white mr-3'
                sx={{ width: 48, height: 48 }}
              >
                {!u.avatar && u.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-center'>
                  <h5 className='text-white font-medium truncate'>{u.name}</h5>
                  <span className='text-xs text-white/50'>Online</span>
                </div>
                <p className='text-white/70 text-sm truncate'>Last message or status</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Sidebar */}
      <SettingsSidebar isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default Sidebar;
