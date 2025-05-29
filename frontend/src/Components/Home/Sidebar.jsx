import { Avatar, InputBase, Divider, List, ListItem, ListItemAvatar, ListItemText, Badge, IconButton } from '@mui/material';
import { Search, MoreVert, FiberManualRecord } from '@mui/icons-material';
import React from 'react';

const Sidebar = () => {
  // Dummy data for chat users
  const dummyUsers = [
    {
      id: 1,
      name: 'John Doe',
      avatar: '',
      lastMessage: 'Hey, how are you doing?',
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Smith',
      avatar: '',
      lastMessage: 'Meeting at 3 PM tomorrow',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: '',
      lastMessage: 'Please review the documents',
      time: 'Yesterday',
      unread: 5,
      online: true
    },
    {
      id: 4,
      name: 'Emily Wilson',
      avatar: '',
      lastMessage: 'Thanks for your help!',
      time: 'Monday',
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: 'David Brown',
      avatar: '',
      lastMessage: 'Let me know when you are free',
      time: 'Sunday',
      unread: 0,
      online: true
    },
  ];

  return (
    <div className='w-[300px] h-full flex flex-col bg-[#f8f9fa] border-r border-gray-200'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 bg-white shadow-sm'>
        <div className='flex items-center'>
          <Avatar src='' alt='Farhan' sx={{ width: 45, height: 45 }} className='cursor-pointer' />
          <span className='ml-3 font-semibold text-lg'>Chats</span>
        </div>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>

      {/* Search */}
      <div className='p-3 bg-white'>
        <div className='flex items-center bg-[#f0f2f5] rounded-lg px-3 py-1'>
          <Search fontSize='small' className='text-gray-500' />
          <InputBase
            placeholder='Search or start new chat'
            className='ml-2 w-full'
            inputProps={{ 'aria-label': 'search chats' }}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto'>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {dummyUsers.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem 
                alignItems="flex-start" 
                className='hover:bg-gray-100 cursor-pointer'
                secondaryAction={
                  <div className='flex flex-col items-end'>
                    <span className='text-xs text-gray-500'>{user.time}</span>
                    {user.unread > 0 && (
                      <Badge 
                        badgeContent={user.unread} 
                        color="primary" 
                        className='mt-1'
                      />
                    )}
                  </div>
                }
              >
                <ListItemAvatar>
                  <div className='relative'>
                    <Avatar alt={user.name} src={user.avatar} />
                    {user.online && (
                      <FiberManualRecord 
                        fontSize='small' 
                        color='primary' 
                        className='absolute bottom-0 right-0'
                        sx={{ fontSize: '12px' }}
                      />
                    )}
                  </div>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                  secondary={
                    <span className='truncate text-sm text-gray-600'>
                      {user.lastMessage}
                    </span>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Sidebar;