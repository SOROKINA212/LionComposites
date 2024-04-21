import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Review from './components/Review';
import { useAuth } from '../../AuthProvider';
import ReviewForm from './components/ReviewForm';
import Footer from './components/Footer';

import 'typeface-montserrat';

const PageContainer = styled.div`
    background-color: #1A1A1A; /* Устанавливаем цвет фона для всей страницы */
`;

const Container = styled.div`
    max-width: 70%;
    margin: 0px auto 20px;
    padding: 20px;
    display: flex;
    background-color: #1A1A1A;
`;

const ProductNameContainer = styled.div`
    max-width: 70%;
    margin: 0px auto;
`;

const ProductImageContainer = styled.div`
    flex: 1;
    margin-right: 100px; /* Увеличиваем интервал между изображением и характеристиками */
    width: 100%;
`;

const ProductInfoContainer = styled.div`
    flex: 1;
    display: flex; /* Добавляем flex-свойство для размещения характеристик и описания товара внутри одного контейнера */
    flex-direction: column; /* Устанавливаем направление расположения элементов в колонку */
`;

const ProductInfo = styled.div`
    flex: 1;
    margin-right: 60px; /* Увеличиваем интервал между изображением и характеристиками */
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 700px; /* Увеличиваем максимальную ширину изображения */
    height: 600px; /* Устанавливаем автоматическую высоту */
    width: 500px;
    margin-right: 40px; /* Добавляем отступ справа для создания интервала */
    margin-bottom: 40px; /* Увеличиваем интервал под изображением */
    box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
    border-radius: 47px;
`;

const ProductName = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400; /* Regular */
    font-size: 64px;
    margin-bottom: 20px;
    color: #F0F0F0;
`;


const Characteristics = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Light стиль */
    font-size: 30px;
    list-style-type: disc;
    padding-left: 20px;
    color: #F0F0F0;
`;

const ProductDescription = styled.div`
    margin-top: 40px;
    width: 70%;
    height:auto;
    margin: 0px auto 20px;
    padding: 20px;
    background-color: #353333;
    box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
    border-radius: 47px;
    position: relative;
`;


const Description = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 24px;
    margin-bottom: 5%;
    color: #F0F0F0;
`;

const Desc = styled.h3`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 48px;
    color: #F0F0F0;
    margin-top: 1%;
    margin-bottom: 20px; /* Добавляем отступ снизу */
    text-align: center;
`;

const Price = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 36px;
    color: #F0F0F0;
    border-bottom: 1px solid #FFFFFF;
`;

const Button = styled.button`
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    font-size: 24px;
    padding: 10px 20px;
    background-color: #F0F0F0;
    color: #1A1A1A;
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 30px;
    border: none;
    cursor: pointer;
    position: absolute; /* Устанавливаем абсолютное позиционирование */
    bottom: 20px; /* Устанавливаем отступ от нижнего края */
    right: 20px; /* Устанавливаем отступ от правого края */
    margin-top: 60px;
    box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
    border-radius: 16px
`;

const ButtonContainer = styled.div`
    width: 100%;
    background-color: black;
    margin-top: 8%;
`;


const FixedHeader = styled(Header)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
`;

const Reviews = styled.h3`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 60px;
    color: #F0F0F0;
    margin-top: 7%;
    margin-bottom: 20px; /* Добавляем отступ снизу */
    text-align: center;
`;

const AddReviewButton = styled.button`
    display: ${({ isAuthenticated }) => (isAuthenticated ? 'block' : 'none')};
    /* Отображать кнопку только для авторизованных пользователей */
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    font-size: 24px;
    padding: 10px 20px;
    background-color: #F0F0F0;
    color: #1A1A1A;
    border: none;
    cursor: pointer;
    margin-top: 20px;
`;


const ProductDetail = () => {
  const { id } = useParams();
  const { user, setUser } = useAuth(); // Проверьте, правильно ли используется useAuth
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // Здесь вы можете выполнить запрос на сервер для получения информации о пользователе
    // Если запрос успешен, установите пользователя в состояние
    axios.get(`http://localhost:8000/api/current_user/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      const user = response.data;
      setUser({ isAuthenticated: true, username: user.username, id: user.id }); // Установка пользователя из полученных данных
      console.log('User ID:', user.id); // Вывод id пользователя в консоль
    })
    .catch(error => {
      console.error('Error fetching current user:', error);
      setUser(null);
    });
  } else {
    setUser(null);
  }
}, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Разделение характеристик товара
  const characteristicsList = product.properties.split('|');


    return (
        <PageContainer>
            <Header />
            <SubHeader />
            <ProductNameContainer>
            <ProductName>{product.name}</ProductName>
            </ProductNameContainer>
            <Container>
                <ProductImageContainer>
                    <ProductImage src={product.image} alt={product.name} />
                </ProductImageContainer>
                <ProductInfoContainer>
                    <Characteristics>
                        {characteristicsList.map((characteristic, index) => (
                            <li key={index}>{characteristic}</li>
                        ))}
                    </Characteristics>
                </ProductInfoContainer>

            </Container>
            <ProductDescription>
                 <Desc> Описание </Desc>
                 <Description>{product.description}</Description>
                 <Price>Цена: {product.cost} руб.</Price>
                 <ButtonContainer>
                 <Button>В корзину</Button>
                 </ButtonContainer>
            </ProductDescription>
            <Reviews> Отзывы </Reviews>
            {user && <ReviewForm productId={id} userId={user.id} />} {/* Передаем userId из контекста аутентификации */} {/* Передаем userId из контекста аутентификации */}
            <Review productId={id} />
            <Footer />
            </PageContainer>
    );
}

export default ProductDetail;
