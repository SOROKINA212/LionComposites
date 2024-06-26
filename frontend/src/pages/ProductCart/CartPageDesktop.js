import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const FixedHeader = styled(Header)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
`;

const PageContainer = styled.div`
  background-color: #1A1A1A;
   min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

const CartContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 2%;
  margin-top: 5%;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #F0F0F0;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const ProductImage = styled.img`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  margin-right: 20px;
`;

const ProductName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #F0F0F0;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #F0F0F0;
`;

const RemoveButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 0.7vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 0.5% 1%;
  cursor: pointer;

   &:hover {
    background-color: #D0D0D0; // Изменяем цвет фона при наведении
    color: #1A1A1A; // Изменяем цвет текста при наведении
  }
`;


const TextBut = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 200;
  font-size: 1.2vw;
  color: #F0F0F0;
  margin-top: 5%;
`;

const TotalPrice = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #F0F0F0;
`;

const Price = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #F0F0F0;
  width: 15%;
  text-align: right;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  border: 1px solid #F0F0F0;
  border-radius: 5px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #1A1A1A;
  text-align: center;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
`;


const OrderButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1.2vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #D0D0D0;
    color: #1A1A1A;
  }
`;

const FixedFooter = styled(Footer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 20%;
    z-index: 999;
`;

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()


 useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/cart/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const cartData = response.data;
      const cartItemsWithProducts = await Promise.all(
        cartData.map(async (item) => {
          const productResponse = await axios.get(`http://localhost:8000/api/products/${item.product}/`, {
            headers: {
              Authorization: `Token ${token}`
            }
          });
          return { ...item, product: productResponse.data };
        })
      );
      setCartItems(cartItemsWithProducts);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  if (user) {
    fetchCartItems();
  }
}, [user]);


  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/cart/${itemId}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:8000/api/cart/${itemId}/`, {
      quantity
    }, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.product.cost), 0);
  };

  const handleOrder = () => {
    navigate("/order")
  };

  return (
    <PageContainer>
      <Header />
      <SubHeader />
       <MainContent>
      <CartContainer>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItem key={item.id}>
              <ProductInfo>
                <ProductImage src={item.product.image} alt={item.product.name} />
                <div>
                  <ProductName>{item.product.name}</ProductName>
                </div>
              </ProductInfo>
              <Quantity>
      <QuantityInput
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => updateCartItem(item.id, e.target.value)}
      />
    </Quantity>
              <Price>Итого: {(item.quantity * item.product.cost).toFixed(2)} руб.</Price>
              <RemoveButton onClick={() => removeFromCart(item.id)}>Удалить</RemoveButton>
            </CartItem>
          ))
        ) : (
          <TextBut>Ваша корзина пуста.</TextBut>
        )}
        <TotalContainer>
          <TotalPrice>Итого: {getTotalPrice().toFixed(2)} руб.</TotalPrice>
          <OrderButton onClick={handleOrder}>Заказать</OrderButton>
        </TotalContainer>
      </CartContainer>
       </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default CartPage;