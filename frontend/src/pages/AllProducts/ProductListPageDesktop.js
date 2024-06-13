import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import SliderComponent from '../components/Slider';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const FixedHeader = styled(Header)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
`;

const PageContainer = styled.div`
  background-color: #1A1A1A;
`;

const ProductListContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5%;
  margin-bottom: 5%;
`;

const ProductLink = styled(Link)`
  height: 330px;
  width: 100%;
  padding: 2.2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

const ProductCard = styled.div`
  background-color: #353333;
  height: 420px;
  border-radius: 20px;
  padding: 2.2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
  text-decoration: none;
  color: inherit;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2%;
`;

const ProductName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.3vw;
  color: #F0F0F0;
  margin-bottom: 2%;
`;

const PriceContainer = styled.div`
  margin-top: 0%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ProductPrice = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #F0F0F0;
  position: absolute;
  margin: 0;
  margin-left: 1%;
  margin-top: 1%;
`;

const AddToCartButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.1vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 2% 4%;
  cursor: pointer;
  margin-left: 66%;
  margin-top: 3%;

  &:hover {
    background-color: #D0D0D0;
    color: #1A1A1A;
  }
`;

const CartQuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartQuantity = styled.span`
  font-size: 1.1vw;
  margin: 0 10px;
`;

const DecrementButton = styled.button`
  font-size: 1.1vw;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const IncrementButton = styled.button`
  font-size: 1.1vw;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  max-width: 80%;
  margin: 2% auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 0.9vw;
  background-color: ${({ isActive }) => (isActive ? '#F0F0F0' : '#696969')};
  color: ${({ isActive }) => (isActive ? '#1A1A1A' : '#F0F0F0')};
  border: none;
  border-radius: 5px;
  padding: 0.7% 1.5%;
  margin: 0 1%;
  cursor: pointer;
`;

const CategoryDropdown = styled.div`
  position: absolute;
  background-color: #696969;
  border-radius: 10px;
  padding: 10px;
  z-index: 1;
  width: 200px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [cart, setCart] = useState([]);
  const { user, setUser } = useAuth();
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:8000/api/products/');
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get('http://localhost:8000/api/categories/');
        setCategories(categoriesResponse.data);

        // Получение данных о текущем пользователе
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowCategoryDropdown(false);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const addToCart = async (product) => {
    if (!user || !user.id) {
        navigate('/login');
    }

    try {
      const token = localStorage.getItem('token');
      const userId = user.id;
      const existingCartItem = cartItems.find(item => item.product.id === product.id);

      if (existingCartItem) {
        // Обновление количества существующего элемента в корзине
      } else {
        const response = await axios.post(`http://localhost:8000/api/cart/`, {
          product: product.id,
          quantity: 1,
          user: userId
        }, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setCartItems([...cartItems, { ...response.data, product }]);
      }
      setIsAddToCartClicked(true);
      console.log('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

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

  const incrementCartQuantity = async (item) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/cart/${item.id}/`, {
        quantity: item.quantity + 1
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setCartItems(
        cartItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } catch (error) {
      console.error('Error incrementing cart quantity:', error);
    }
  };

  const decrementCartQuantity = async (item) => {
    try {
      const token = localStorage.getItem('token');
      if (item.quantity > 1) {
        await axios.patch(`http://localhost:8000/api/cart/${item.id}/`, {
          quantity: item.quantity - 1
        }, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setCartItems(
          cartItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
      }
    } catch (error) {
      console.error('Error decrementing cart quantity:', error);
    }
  };

  let filteredProducts = products.filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  if (sortOrder === 'low-to-high') {
    filteredProducts.sort((a, b) => a.cost - b.cost);
  } else if (sortOrder === 'high-to-low') {
    filteredProducts.sort((a, b) => b.cost - a.cost);
  }

  return (
    <PageContainer>
      <Header />
      <SubHeader />
      <SliderComponent />
      <FilterContainer>
        <FilterButton
          onClick={toggleCategoryDropdown}
          isActive={showCategoryDropdown}
        >
          Все категории
        </FilterButton>
        {showCategoryDropdown && (
          <CategoryDropdown>
            <FilterButton
              onClick={() => handleCategoryFilter(null)}
              isActive={selectedCategory === null}
            >
              Все категории
              <hr/>
            </FilterButton>
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                isActive={selectedCategory === category.id}
              >
                {category.name}
                <hr/>
              </FilterButton>
            ))}
          </CategoryDropdown>
        )}
        <FilterButton
          onClick={() => handleSortOrder('low-to-high')}
          isActive={sortOrder === 'low-to-high'}
        >
          Сначала дешевые
        </FilterButton>
        <FilterButton
          onClick={() => handleSortOrder('high-to-low')}
          isActive={sortOrder === 'high-to-low'}
        >
          Сначала дорогие
        </FilterButton>
      </FilterContainer>
      <ProductListContainer>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductLink to={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductName>{product.name}</ProductName>
            </ProductLink>
            <PriceContainer>
              <ProductPrice>Цена: {product.cost} руб.</ProductPrice>
              <AddToCartButton
                onClick={() => {
                  addToCart(product);
                  setIsAddToCartClicked(true);
                }}
              >
                {cartItems.find(item => item.product.id === product.id) ? (
                  <CartQuantityContainer>
                    <DecrementButton onClick={() => decrementCartQuantity(cartItems.find(item => item.product.id === product.id))}>-</DecrementButton>
                    <CartQuantity>{cartItems.find(item => item.product.id === product.id).quantity}</CartQuantity>
                    <IncrementButton onClick={() => incrementCartQuantity(cartItems.find(item => item.product.id === product.id))}>+</IncrementButton>
                  </CartQuantityContainer>
                ) : (
                  'В корзину'
                )}
              </AddToCartButton>
            </PriceContainer>
          </ProductCard>
        ))}
      </ProductListContainer>
      <Footer />
    </PageContainer>
  );
};

export default ProductListPage;