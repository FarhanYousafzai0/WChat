import { Message, Settings } from '@mui/icons-material'
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PixIcon from '@mui/icons-material/Pix';

import React from 'react'
import { NewsletterOutlineIcon } from './NewsletterOutlineIcon';
import { Avatar } from '@mui/material';

const Sidebar = () => {
  return (
    <>
      <div className='w-[800px] h-full bg-blue-400 p-2 rounded  '>
<div className='h-full w-[80px] bg-white flex flex-col py-3 rounded-md  items-center justify-between'>
<div className='flex items-center flex-col gap-3'>
<Message className='cursor-pointer text-gray-400' sx={{width:25,height:25}}/>
<Diversity3Icon  className='cursor-pointer text-gray-400' sx={{width:25,height:25}}/>
<TimelapseIcon  className='cursor-pointer text-gray-400' sx={{width:25,height:25}} />
<PixIcon  className='cursor-pointer text-gray-400' sx={{width:25,height:25}} />

</div>


<div className='flex flex-col gap-3 items-center'>
  <Settings sx={{width:25,height:25}} className='cursor-pointer text-gray-400' />

  <Avatar alt='Farhan' sx={{width:40 , height:40}} src=''/>
</div>

</div>


      </div>


    </>
  )
}

export default Sidebar


















