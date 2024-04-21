// registration_form.js

import React, { useState } from 'react';
import axios from 'axios';

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
      passwordConfirm: userData.passwordConfirm, // Добавляем поле для подтверждения пароля
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
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Имя:
            <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Фамилия:
            <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
          </label>
        </div>
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
        <div>
          <label>
            Подтверждение пароля:
            <input type="password" name="passwordConfirm" value={userData.passwordConfirm} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Почта:
            <input type="email" name="email" value={userData.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Номер телефона:
            <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
