import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../../../AuthProvider'; // Импортируем хук useAuth

import '@fontsource/montserrat';

const FormContainer = styled.div`
  width: 70%; /* Занимает 70% ширины страницы */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15%;
`;


const TextArea = styled.textarea`
  width: 100%; /* Занимает 70% ширины контейнера */
  height: 264px;
  background-color: #353333;
  border-radius: 32px;
  box-shadow: 0px 27px 43.4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  font-size: 18px;
  color: #ffffff;
  border: none;
  resize: none;
  font-family: 'Montserrat', sans-serif;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;



const SubmitButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end; /* Выравниваем элементы по правому краю */
  width: 100%; /* Занимает всю доступную ширину */
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  width: 377px; /* Ширина кнопки */
  height: 66px; /* Высота кнопки */
  border-radius: 16px; /* Закругления углов */
  background-color: #F0F0F0;
  color: #000000;
  border: none;
  cursor: pointer;
  font-size: 30px; /* Устанавливаем размер шрифта */
  font-family: 'Montserrat', sans-serif; /* Задаем шрифт Montserrat */
  font-weight: 400; /* Устанавливаем стиль Regular */
  transition: background-color 0.3s ease;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  width: 100%; /* Занимает всю доступную ширину родительского контейнера */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;


const ReviewForm = ({ productId, userId }) => { // Добавляем userId в параметры компонента
  const [content, setContent] = useState('');
  const { user } = useAuth(); // Получаем информацию о пользователе из контекста аутентификации
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Current user id:', userId); // Выводим id текущего пользователя в консоль
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/products/${productId}/reviews/`,
        { user: userId, content }, // Передаем id пользователя и содержимое отзыва
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      console.log('Отзыв успешно отправлен');
      setContent(''); // Очищаем поле ввода после успешной отправки отзыва
      setError(null); // Сбрасываем ошибку, если она была
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
      setError(error.response.data); // Записываем полученные ошибки в состояние
    }
  };

  return (
  <FormContainer>
    <Form onSubmit={handleSubmit}>
        <br />
        <TextArea
              id="reviewContent"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Оставьте свой отзыв..." /* Шаблон текста в поле для ввода */
              required
        />
      {error && (
        <div style={{ color: 'red' }}>
          {Object.entries(error).map(([key, value]) => (
            <div key={key}>{value}</div>
          ))}
        </div>
      )}
     <SubmitButtonContainer>
          <SubmitButton type="submit">Отправить отзыв</SubmitButton>
        </SubmitButtonContainer>
    </Form>
  </FormContainer>
);

};

export default ReviewForm;
