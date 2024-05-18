import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getUserIdFromToken = (token) => {
  const tokenParts = token.split(' ');
  if (tokenParts.length === 2) {
    const tokenValue = tokenParts[1];
    const tokenData = JSON.parse(atob(tokenValue.split('.')[1]));
    return tokenData.userId;
  } else {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = getUserIdFromToken(token);
      setUser({ isAuthenticated: true, id: userId });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('User ID:', user ? user.id : 'Not authenticated');
  }, [user]);

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/logout/`, null, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};