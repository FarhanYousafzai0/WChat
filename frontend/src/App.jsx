import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

const App = () => {

  


  return (
    <Router>
      <Routes>
 

   {/* Authecticaion */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />




{/* Pages */}


      
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
