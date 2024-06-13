import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { useAuth } from '../../AuthProvider';
import { useMediaQuery } from 'react-responsive';

const PageContainer = styled.div`
  background-color: #1A1A1A;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const OrderContainer = styled.div`
  flex-grow: 1;
  width: 80%;
  margin: 0 auto;
  background-color: #00000;
  border-radius: 20px;
  margin-bottom: 10%;
  margin-top: 3%;
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 20px;
`;

const ProductImage = styled.img`
  width: 20%;
  height: 20%;
  border-radius: 10px;
  margin-right: 2%;
`;

const ProductName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #F0F0F0;
`;

const Quantity = styled.div`
  margin-right: 5%;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #F0F0F0;
  margin-top: 1.2%;
`;

const TotalPrice = styled.div`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #F0F0F0;
  margin-top: 1.5%;
  text-align: right;
`;

const DeliveryOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
`;

const DeliveryOption = styled.div`
  display: flex;
  align-items: center;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #F0F0F0;
`;

const DeliveryInput = styled.input`
  margin-right: 10px;
`;

const AddressContainer = styled.div`
  margin-top: 2%;
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #F0F0F0;
  border-radius: 5px;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.8vw;
  color: #1A1A1A;
  margin-bottom: 1.5%;
`;

const PayButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  &:hover {
    background-color: #D0D0D0;
    color: #1A1A1A;
  }
`;



const OrderPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState({
    city: '',
    street: '',
    entrance: '',
    apartment: '',
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/cart/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const cartData = response.data;
        const cartItemsWithProducts = await Promise.all(
          cartData.map(async (item) => {
            const productResponse = await axios.get(`http://localhost:8000/api/products/${item.product}/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
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

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.product.cost), 0);
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/orders/',
        {
          delivery_method: deliveryMethod,
          delivery_address: deliveryAddress,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <PageContainer>
      <Header />
      <SubHeader />
      <OrderContainer>
        {cartItems.map((item) => (
          <CartItemContainer key={item.id}>
            <ProductInfo>
              <ProductImage src={item.product.image} alt={item.product.name} />
              <div>
                <ProductName>{item.product.name}</ProductName>
              </div>
            </ProductInfo>
            <Quantity>{item.quantity}</Quantity>
            <TotalPrice>Итого: {(item.quantity * item.product.cost).toFixed(2)} руб.</TotalPrice>
          </CartItemContainer>
        ))}
        <TotalPrice>Общая сумма: {getTotalPrice().toFixed(2)} руб.</TotalPrice>
        <DeliveryOptions>
          <DeliveryOption>
            <DeliveryInput
              type="radio"
              name="delivery-method"
              checked={deliveryMethod === 'pickup'}
              onChange={() => handleDeliveryMethodChange('pickup')}
            />
            Самовывоз
          </DeliveryOption>
          <DeliveryOption>
            <DeliveryInput
              type="radio"
              name="delivery-method"
              checked={deliveryMethod === 'delivery'}
              onChange={() => handleDeliveryMethodChange('delivery')}
            />
            Доставка
          </DeliveryOption>
        </DeliveryOptions>
        {deliveryMethod === 'delivery' && (
          <AddressContainer>
            <AddressInput
              type="text"
              placeholder="Город"
              value={deliveryAddress.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
            />
            <AddressInput
              type="text"
              placeholder="Улица"
              value={deliveryAddress.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
            />
            <AddressInput
              type="text"
              placeholder="Подъезд"
              value={deliveryAddress.entrance}
              onChange={(e) => handleAddressChange('entrance', e.target.value)}
            />
            <AddressInput
              type="text"
              placeholder="Квартира"
              value={deliveryAddress.apartment}
              onChange={(e) => handleAddressChange('apartment', e.target.value)}
            />
          </AddressContainer>
        )}
        <PayButton onClick={handlePayment}>Оформить заказ</PayButton>
      </OrderContainer>
      <Footer />
    </PageContainer>
  );
};

export default OrderPage;