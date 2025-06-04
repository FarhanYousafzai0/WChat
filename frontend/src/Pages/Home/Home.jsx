import React, { useState } from 'react';
import Sidebar from '../../Components/Home/Home/Sidebar';
import MessagePanel from '../../Components/Home/Home/MessagePanel';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='flex  items-center  gap-1 w-screen h-dvh p-3 shadow-lg'>
      <Sidebar onSelectUser={setSelectedUser} />
      <MessagePanel selectedUser={selectedUser} />
    </div>
  );
};

export default Home;
