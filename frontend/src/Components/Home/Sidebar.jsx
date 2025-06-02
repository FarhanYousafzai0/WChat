import { useState } from 'react';
import { Message, Settings } from '@mui/icons-material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PixIcon from '@mui/icons-material/Pix';
import { Avatar } from '@mui/material';
import { SettingsSidebar } from './SettingSidebar';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
   const {user} = useSelector((state)=>state.auth);



  return (
    <>
      <div className='w-[800px] h-full bg-gradient-to-b from-blue-400 to-indigo-600 p-2 rounded'>
        <div className='h-full w-[80px] bg-white/10 backdrop-blur-lg flex flex-col py-3 rounded-md items-center justify-between border border-white/20'>
          <div className='flex items-center flex-col gap-3'>
            <Message className='cursor-pointer text-white hover:text-white/80 transition' sx={{width:25,height:25}}/>
            <Diversity3Icon className='cursor-pointer text-white hover:text-white/80 transition' sx={{width:25,height:25}}/>
            <TimelapseIcon className='cursor-pointer text-white hover:text-white/80 transition' sx={{width:25,height:25}} />
            <PixIcon className='cursor-pointer text-white hover:text-white/80 transition' sx={{width:25,height:25}} />
          </div>

          <div className='flex flex-col gap-3 items-center'>
            <Settings 
              sx={{width:25,height:25}} 
              className='cursor-pointer text-white hover:text-white/80 transition'
              onClick={() => setSettingsOpen(true)}
            />
            <Avatar 
              alt={user?.name}
              src={user?.avatar}
              sx={{width:40, height:40}} 
              className='border-2 border-white cursor-pointer'
            />
          </div>
        </div>

        {/* Settings Sidebar */}
        <SettingsSidebar
          isOpen={settingsOpen} 
          onClose={() => setSettingsOpen(false)}
        />
      </div>
    </>
  )
}

export default Sidebar;