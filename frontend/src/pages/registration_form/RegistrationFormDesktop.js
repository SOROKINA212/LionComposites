import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const PageContainer = styled.div`
  background-color: #1A1A1A;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  flex-shrink: 0;
`;

const RegistrationFormContainer = styled.form`
  background-color: #353333;
  padding: 2%;
  border-radius: 15px;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
  width: 40%;
  margin-left: 27%;
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
  margin-bottom: 1.5%;
`;

const FormLabel = styled.label`
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

const FormError = styled.div`
  color: #ff0000;
  font-size: 0.8vw;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 35%;
  padding: 1%;
  font-size: 0.8vw;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? '#D0D0D0' : '#F0F0F0')};
  color: #1A1A1A;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-left: 34%;
  margin-top: 2%;
`;

const PrivacyPolicyCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
  color: #F0F0F0;
  font-size: 0.8vw;
`;

const PrivacyPolicyLink = styled(Link)`
  color: #F0F0F0;
  text-decoration: underline;
  margin-left: 5px;
`;

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    passwordConfirm: false,
    email: false,
    phoneNumber: false,
  });
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        setErrors({ ...errors, firstName: value.trim() === '' });
        break;
      case 'lastName':
        setErrors({ ...errors, lastName: value.trim() === '' });
        break;
      case 'username':
        setErrors({ ...errors, username: value.trim() === '' });
        break;
      case 'password':
        setErrors({
          ...errors,
          password:
            value.trim() === '' ||
            !/[A-Z]/.test(value) ||
            !/[a-z]/.test(value),
        });
        break;
      case 'passwordConfirm':
        setErrors({
          ...errors,
          passwordConfirm: value !== userData.password,
        });
        break;
      case 'email':
        setErrors({ ...errors, email: value.trim() === '' });
        break;
      case 'phoneNumber':
        setErrors({ ...errors, phoneNumber: value.trim() === '' });
        break;
      default:
        break;
    }
  };

  const handlePrivacyPolicyCheckbox = () => {
    setIsPrivacyPolicyChecked(!isPrivacyPolicyChecked);
  };

  const handleDownloadPdf = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8000/api/privacy-policy/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const { file_url } = response.data;
     window.open(file_url, '_blank');
  } catch (error) {
    console.error('Error downloading privacy policy:', error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid =
      Object.values(userData).every((value) => value.trim() !== '') &&
      isPrivacyPolicyChecked;
    if (isFormValid) {
      try {
        const response = await axios.post(`http://localhost:8000/api/register/`, {
          username: userData.username,
          password: userData.password,
          passwordConfirm: userData.passwordConfirm,
          email: userData.email,
          name: userData.firstName,
          second_name: userData.lastName,
          phone_number: userData.phoneNumber,
        });
        console.log(response.data);
        // Дополнительные действия после успешной регистрации
      } catch (error) {
        console.error(error);
        // Обработка ошибок
      }
    } else {
      console.error('Форма содержит ошибки');
    }
  };

  const isFormValid =
    Object.values(userData).every((value) => value.trim() !== '') &&
    isPrivacyPolicyChecked;

  return (
    <PageContainer>
      <RegistrationContainer>
        <MainContent>
          <FormTitle>Регистрация</FormTitle>
          <RegistrationFormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Имя:</FormLabel>
              <FormInput
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                isInvalid={errors.firstName}
              />
              {errors.firstName && (
                <FormError>Поле "Имя" не может быть пустым.</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Фамилия:</FormLabel>
              <FormInput
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                isInvalid={errors.lastName}
              />
              {errors.lastName && (
                <FormError>Поле "Фамилия" не может быть пустым.</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Логин:</FormLabel>
              <FormInput
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                isInvalid={errors.username}
              />
              {errors.username && (
                <FormError>Поле "Логин" не может быть пустым.</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Пароль:</FormLabel>
              <FormInput
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                isInvalid={errors.password}
              />
              {errors.password && (
                <FormError>
                  Пароль должен содержать хотя бы одну прописную и заглавную
                  букву.
                </FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Подтверждение пароля:</FormLabel>
              <FormInput
                type="password"
                name="passwordConfirm"
                value={userData.passwordConfirm}
                onChange={handleChange}
                isInvalid={errors.passwordConfirm}
              />
              {errors.passwordConfirm && (
                <FormError>Пароли не совпадают.</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Почта:</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                isInvalid={errors.email}
              />
              {errors.email && (
                <FormError>Поле "Почта" не может быть пустым.</FormError>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Номер телефона:</FormLabel>
              <FormInput
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                isInvalid={errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <FormError>Поле "Номер телефона" не может быть пустым.</FormError>
              )}
            </FormGroup>
            <PrivacyPolicyCheckbox>
                <input
                  type="checkbox"
                  checked={isPrivacyPolicyChecked}
                  onChange={handlePrivacyPolicyCheckbox}
                />
                <span>
                  Я ознакомился с{' '}
                  <PrivacyPolicyLink onClick={handleDownloadPdf} target="_blank">
                    политикой конфиденциальности
                  </PrivacyPolicyLink>{' '}
                  и согласен на обработку личных данных
                </span>
            </PrivacyPolicyCheckbox>
            <SubmitButton
              type="submit"
              disabled={
                Object.values(errors).some((error) => error) ||
                userData.password !== userData.passwordConfirm ||
                !isFormValid
              }
            >
              Зарегистрироваться
            </SubmitButton>
          </RegistrationFormContainer>
        </MainContent>
      </RegistrationContainer>
      <Footer />
    </PageContainer>
  );
};

export default RegistrationForm;