import React, { useState } from 'react';
import axios from 'axios';
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

const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1A;
`;

const MainContent = styled.div`
  flex-grow: 1;
  flex-direction: column;
`;

const RegistrationFormContainer = styled.form`
  background-color: #353333;
  padding: 2%;
  border-radius: 15px;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
  width: 50%;
  margin-left: 23%;
`;

const FormTitle = styled.h2`
  font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 3vw;
    margin-bottom: 2%;
    text-align: center;
    color: #FFFFFF;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5%;
`;

const FormLabel = styled.label`
  font-size: 1.7vw;
  color: #F0F0F0;
  display: block;
  margin-bottom: 1.5%;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1%;
  border: none;
  border-radius: 5px;
  background-color: #F0F0F0;
`;

const SubmitButton = styled.button`
  width: 45%;
  padding: 1%;
  font-size: 1.9vw;
  border: none;
  border-radius: 5px;
  background-color: #F0F0F0;
  color: #1A1A1A;
  font-weight: bold;
  cursor: pointer;
  margin-left: 30%;
  margin-top: 2%;

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

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/register/`, {
        username: userData.username,
        password: userData.password,
        passwordConfirm: userData.passwordConfirm,
        email: userData.email,
        name: userData.firstName,
        second_name: userData.lastName,
        phone_number: userData.phoneNumber
      });
      console.log(response.data);
      // Дополнительные действия после успешной регистрации
    } catch (error) {
      console.error(error);
      // Обработка ошибок
    }
  };

  return (
  <PageContainer>
    <RegistrationContainer>
    <MainContent>
    <FormTitle>Регистрация</FormTitle>
      <RegistrationFormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Имя:</FormLabel>
          <FormInput type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Фамилия:</FormLabel>
          <FormInput type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Логин:</FormLabel>
          <FormInput type="text" name="username" value={userData.username} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Пароль:</FormLabel>
          <FormInput type="password" name="password" value={userData.password} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Подтверждение пароля:</FormLabel>
          <FormInput type="password" name="passwordConfirm" value={userData.passwordConfirm} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Почта:</FormLabel>
          <FormInput type="email" name="email" value={userData.email} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Номер телефона:</FormLabel>
          <FormInput type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </FormGroup>
        <SubmitButton type="submit">Зарегистрироваться</SubmitButton>
      </RegistrationFormContainer>
      </MainContent>
    </RegistrationContainer>
    <Footer />
    </PageContainer>
  );
};

export default RegistrationForm;