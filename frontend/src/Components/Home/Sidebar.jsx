import { Avatar, InputBase, Divider, List, ListItem, ListItemAvatar, ListItemText, Badge, IconButton } from '@mui/material';
import { Search, MoreVert, FiberManualRecord } from '@mui/icons-material';
import React from 'react';

const Sidebar = ({ setSelectedUser }) => {
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
    <div className='w-[600px] h-full flex flex-col border-r border-gray-200 bg-white'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 bg-gradient-to-r from-[#6C63FF] to-[#4FC3F7]'>
        <div className='flex items-center'>
          <Avatar 
            src='' 
            alt='User' 
            sx={{ width: 45, height: 45 }} 
            className='cursor-pointer border-2 border-white'
          />
          <span className='ml-3 font-semibold text-lg text-white'>Chats</span>
        </div>
        <IconButton className='text-white hover:bg-white/10'>
          <MoreVert />
        </IconButton>
      </div>

      {/* Search */}
      <div className='p-3 bg-gradient-to-r from-[#6C63FF]/10 to-[#4FC3F7]/10'>
        <div className='flex items-center bg-white rounded-lg px-3 py-2 shadow-sm'>
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
                className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${user.unread > 0 ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedUser(user)}
                secondaryAction={
                  <div className='flex flex-col items-end space-y-1'>
                    <span className={`text-xs ${user.unread > 0 ? 'text-[#6C63FF] font-medium' : 'text-gray-500'}`}>
                      {user.time}
                    </span>
                    {user.unread > 0 && (
                      <Badge 
                        badgeContent={user.unread} 
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: '#6C63FF',
                            color: 'white'
                          }
                        }}
                      />
                    )}
                  </div>
                }
              >
                <ListItemAvatar>
                  <div className='relative'>
                    <Avatar 
                      alt={user.name} 
                      src={user.avatar} 
                      sx={{ width: 48, height: 48 }}
                      className='border-2 border-white'
                    />
                    {user.online && (
                      <FiberManualRecord 
                        fontSize='small' 
                        sx={{ 
                          color: '#4FC3F7',
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          fontSize: '16px',
                          backgroundColor: 'white',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  </div>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span className={`font-medium ${user.unread > 0 ? 'text-[#6C63FF]' : 'text-gray-800'}`}>
                      {user.name}
                    </span>
                  }
                  secondary={
                    <span className={`truncate text-sm ${user.unread > 0 ? 'font-medium' : 'text-gray-600'}`}>
                      {user.lastMessage}
                    </span>
                  }
                  sx={{
                    marginLeft: '12px'
                  }}
                />
              </ListItem>
              <Divider variant="inset" component="li" sx={{ marginLeft: '72px' }} />
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}

export default Sidebar;