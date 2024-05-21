import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const PageContainer = styled.div`
  background-color: #1A1A1A;
  max-height: 100vh; // Уменьшаем высоту на высоту футера
  display: flex;
  flex-direction: column;
  justify-content: center; // Центрируем форму по вертикали
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1A;
`;

const LoginFormContainer = styled.form`
  background-color: #353333;
  padding: 2%;
  border-radius: 15px;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
  width: 60%; // Увеличиваем ширину до 500 пикселей
  margin-left: 18%;
`;

const MainContent = styled.div`
  flex-grow: 1;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 2vw;
    margin-bottom: 2%;
    text-align: center;
    color: #FFFFFF;
`;

const FormGroup = styled.div`
  margin-bottom: 2%;
`;

const FormLabel = styled.label`
  color: #F0F0F0;
  display: block;
  margin-bottom: 1%;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.9%;
  border: none;
  border-radius: 5px;
  background-color: #F0F0F0;
`;

const SubmitButton = styled.button`
  width: 25%;
  padding: 0.8%;
  font-size: 0.8vw;
  border: none;
  border-radius: 5px;
  background-color: #F0F0F0;
  color: #1A1A1A;
  font-weight: bold;
  cursor: pointer;
  margin-left: 37%;

  &:hover {
    background-color: #D0D0D0;
  }
`;

const FixedFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1A1A1A;
  z-index: 999;
  height: 30%; // Устанавливаем высоту футера
`;

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
  <PageContainer>
    <LoginContainer>
    <MainContent>
    <FormTitle>Авторизация</FormTitle>
      <LoginFormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Логин:</FormLabel>
          <FormInput type="text" name="username" value={userData.username} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Пароль:</FormLabel>
          <FormInput type="password" name="password" value={userData.password} onChange={handleChange} />
        </FormGroup>
        <SubmitButton type="submit">Войти</SubmitButton>
      </LoginFormContainer>
      </MainContent>
    </LoginContainer>
     <Footer />
     </PageContainer>
  );
};

export default LoginForm;