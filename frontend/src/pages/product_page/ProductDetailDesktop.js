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
import { useMediaQuery } from 'react-responsive';

import 'typeface-montserrat';

const PageContainer = styled.div`
    background-color: #1A1A1A; /* Устанавливаем цвет фона для всей страницы */
`;

const Container = styled.div`
    max-width: 70%;
    margin: 0px auto 20px;
    padding: 2%;
    display: flex;
    background-color: #1A1A1A;
`;

const ProductNameContainer = styled.div`
    max-width: 70%;
    margin: 0px auto;
    margin-left: 16%;
`;

const ProductImageContainer = styled.div`
    flex: 1;
    margin-right: 9%; /* Увеличиваем интервал между изображением и характеристиками */
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
    height: 95%; /* Устанавливаем автоматическую высоту */
    width: 90%;
    margin-right: 40px; /* Добавляем отступ справа для создания интервала */
    margin-bottom: 40px; /* Увеличиваем интервал под изображением */
    box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
    border-radius: 47px;
`;

const ProductName = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400; /* Regular */
    font-size: 3.5vw;
    margin-bottom: 2%;
    color: #F0F0F0;
`;


const Characteristics = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Light стиль */
    font-size: 1.7vw;
    list-style-type: disc;
    padding-left: 2%;
    color: #F0F0F0;
`;

const ProductDescription = styled.div`
    margin-top: 4%;
    width: 70%;
    height:auto;
    margin: 0px auto 20px;
    padding: 1.5%;
    background-color: #353333;
    box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
    border-radius: 47px;
    position: relative;
`;


const Description = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 1.4vw;
    margin-bottom: 5%;
    color: #F0F0F0;
`;

const Desc = styled.h3`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 2.5vw;
    color: #F0F0F0;
    margin-top: 1%;
    margin-bottom: 2%; /* Добавляем отступ снизу */
    text-align: center;
`;

const Price = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 2.2vw;
    color: #F0F0F0;
    border-bottom: 1px solid #FFFFFF;
`;

const Button = styled.button`
    font-family: Montserrat, sans-serif;
    font-weight: 600;
    font-size: 1.4vw;
    padding: 0.7% 2%;
    background-color: #F0F0F0;
    color: #1A1A1A;
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 1.4vw;
    border: none;
    cursor: pointer;
    position: absolute; /* Устанавливаем абсолютное позиционирование */
    bottom: 4%; /* Устанавливаем отступ от нижнего края */
    right: 2%; /* Устанавливаем отступ от правого края */
    margin-top: 6%;
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
    font-size: 3.5vw;
    color: #F0F0F0;
    margin-top: 7%;
    margin-bottom: 2%; /* Добавляем отступ снизу */
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
  const { user, setUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const addToCart = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = user.id;
    await axios.post(`http://localhost:8000/api/cart/`, {
      product: product.id,
      quantity: 1,
      user: userId
    }, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    console.log('Product added to cart');
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`http://localhost:8000/api/current_user/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        const user = response.data;
        setUser({ isAuthenticated: true, username: user.username, id: user.id });
        console.log('User ID:', user.id);
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
                 <Button onClick={addToCart}>В корзину</Button>
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
