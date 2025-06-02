import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ProtectRoute from './Components/Home/Error/ProtectRoute';
import toast, { Toaster } from 'react-hot-toast';
import NotFound from './Components/Home/Error/NotFound';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Auth Pages */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          <Route
            path="/home"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />

          {/* Fallback for all other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster />
    </>
  );
};

export default App;
