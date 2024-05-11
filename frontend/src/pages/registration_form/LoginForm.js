import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { setUser } = useAuth();
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/login/`, userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Сохраняем токен в localStorage
      setUser(user);
      navigate('/');
      console.log('Authentication successful');
      console.log('Current user:', user);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Логин:
            <input type="text" name="username" value={userData.username} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input type="password" name="password" value={userData.password} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;