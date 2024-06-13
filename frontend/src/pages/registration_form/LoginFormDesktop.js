import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const PageContainer = styled.div`
  background-color: #1A1A1A;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 60%;
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
  border: 1px solid ${(props) => (props.isInvalid ? 'red' : 'transparent')};
`;

const FormErrorMessage = styled.div`
  color: red;
  font-size: 0.8vw;
  margin-top: 0.5%;
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

  &:disabled {
    background-color: #D0D0D0;
    cursor: not-allowed;
  }
`;

const CreateAccountLink = styled(Link)`
  color: #F0F0F0;
  text-decoration: none;
  font-size: 0.8vw;
  display: block;
  text-align: center;
  margin-top: 2%;

  &:hover {
    color: #D0D0D0;
  }
`;

const FixedFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1A1A1A;
  z-index: 999;
  max-height: 30%;
`;

const LoginForm = () => {
  const { setUser } = useAuth();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    username: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    setFormErrors({
      ...formErrors,
      [name]: value.trim() === '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/login/`, userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/');
      console.log('Authentication successful');
      console.log('Current user:', user);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const isFormValid = !formErrors.username && !formErrors.password;

  return (
    <PageContainer>
      <LoginContainer>
        <MainContent>
          <FormTitle>Авторизация</FormTitle>
          <LoginFormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Логин:</FormLabel>
              <FormInput
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                isInvalid={formErrors.username}
              />
              {formErrors.username && (
                <FormErrorMessage>Поле логина не может быть пустым</FormErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Пароль:</FormLabel>
              <FormInput
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                isInvalid={formErrors.password}
              />
              {formErrors.password && (
                <FormErrorMessage>Поле пароля не может быть пустым</FormErrorMessage>
              )}
            </FormGroup>
            <SubmitButton type="submit" disabled={!isFormValid}>
              Войти
            </SubmitButton>
            <CreateAccountLink to="/registration">Создать аккаунт</CreateAccountLink>
          </LoginFormContainer>
        </MainContent>
      </LoginContainer>
      <FixedFooter />
    </PageContainer>
  );
};

export default LoginForm;