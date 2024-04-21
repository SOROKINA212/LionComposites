import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getUserIdFromToken = (token) => {
  // Допустим, что токен имеет формат "Bearer <токен>". Мы разделаем строку по пробелу и возьмем вторую часть
  const tokenParts = token.split(' ');
  if (tokenParts.length === 2) {
    const tokenValue = tokenParts[1];
    // Допустим, что токен содержит информацию о пользователе в виде JSON объекта
    const tokenData = JSON.parse(atob(tokenValue.split('.')[1]));
    // Предположим, что в токене есть поле "userId", содержащее id пользователя
    return tokenData.userId;
  } else {
    return null; // Возвращаем null, если формат токена неверный
  }
};

export const AuthProvider = ({ children }) => {
    console.log('AuthProvider rendering');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для чтения токена из cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Проверка аутентификации при загрузке страницы
  useEffect(() => {
  const token = getCookie('auth_token');
  if (token) {
    // Здесь вы можете выполнить запрос к серверу для проверки валидности токена
    // Например, вы можете отправить токен на сервер и получить информацию о пользователе
    // Если токен действителен, извлеките id пользователя из токена и установите его в состояние
    const userId = getUserIdFromToken(token); // Функция для извлечения id пользователя из токена
    setUser({ isAuthenticated: true, id: userId });
  }
  setLoading(false);
}, []);

  useEffect(() => {
  console.log('User ID:', user ? user.id : 'Not authenticated');
}, [user]);

  // Обновляем состояние пользователя при изменении
  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
