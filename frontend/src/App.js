import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Home from './pages/HomePage/Home';
import Admin from './pages/Admin/Admin';
import Register from './pages/Register';

function App() {
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isAdmin, setIsAdmin] = useState(null); 

  
  const checkAdminStatus = async (email) => {
    try {
      if (!email) return false;

      const response = await axios.get("http://192.168.66.59:5000/api/clients");
      const client = response.data.find((c) => c.email === email);
      return client ? client.is_admin : false;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  
  useEffect(() => {
    if (email) {
      checkAdminStatus(email).then(setIsAdmin);
    } else {
      setIsAdmin(false); 
    }
  }, [email]); 

  
  const handleLogin = (email, isAdmin) => {
    setEmail(email);
    setIsAdmin(isAdmin);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('is_admin', isAdmin);
  };

  
  const handleLogout = () => {
    setEmail('');
    setIsAdmin(false);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('is_admin');
  };

  
  const ProtectedRoute = ({ children }) => {
    if (!email) {
      return <Navigate to="/login" />;
    }
    if (email && !isAdmin) {
      return <Navigate to ="/home" />;
    }
    if (email && isAdmin) {
      return <Navigate to = "/admin" />;
    }
    return children;
  };

  
  if (isAdmin === null) {
    return <div>Loading please wait...</div>; 
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={email ? <Home handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        
        <Route 
          path="/admin" 
          element={
            email && isAdmin ? (
              <Admin handleLogout={handleLogout} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route 
          path="/home" 
          element={
            email ? <Home handleLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
