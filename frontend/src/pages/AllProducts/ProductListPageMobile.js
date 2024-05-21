import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
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
  grid-template-columns: repeat 1;
  grid-gap: 1%;
  margin-bottom: 90%;
`;

const ProductCard = styled(Link)`
  background-color: #1A1A1A;
  height: 150px;
  padding: 1%;
  display: flex; // Добавляем flex-свойство
  justify-content: space-between; // Выравниваем элементы по горизонтали
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const ProductImage = styled.img`
  width: 50%;
  height: 95%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1%;

`;

const ProductName = styled(Link)`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 3.5vw;
  color: #F0F0F0;
  margin-right: 15%;
  display: flex;
  margin-bottom: 20%;
`;

const PriceContainer = styled.div`
  margin-top: 0%; // Это свойство будет "толкать" элемент вниз
  width: 100%;
  display: flex;
  justify-content: flex-start;

`;

const ProductPrice = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 3vw;
  color: #F0F0F0;
  position: absolute;
  margin: 0;
  margin-left: 1%;
  margin-top: 1%;
`;

const AddToCartButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 2.5vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 2% 4%;
  cursor: pointer;
  margin-left: 66%; // Добавляем отступ слева от кнопки

   &:hover {
    background-color: #D0D0D0; // Изменяем цвет фона при наведении
    color: #1A1A1A; // Изменяем цвет текста при наведении
  }
`;

const CartQuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartQuantity = styled.span`
  font-size: 2.3vw;
  margin: 0 10px;
`;

const DecrementButton = styled.button`
  font-size: 2.5vw;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const IncrementButton = styled.button`
  font-size: 2.5vw;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  max-width: 80%;
  margin: 4% auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 2vw;
  background-color: ${({ isActive }) => (isActive ? '#F0F0F0' : '#353333')};
  color: ${({ isActive }) => (isActive ? '#1A1A1A' : '#F0F0F0')};
  border: none;
  border-radius: 5px;
  padding: 0.7% 1.5%;
  margin: 0 1%;
  cursor: pointer;
`;

const ProductCardDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #F0F0F0;
  margin: 2% 0;
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:8000/api/products/');
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get('http://localhost:8000/api/categories/');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

const addToCart = async (product) => {
  try {
    const token = localStorage.getItem('token');
    const userId = user.id;
    const existingCartItem = cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      await axios.patch(`http://localhost:8000/api/cart/${existingCartItem.id}/`, {
        quantity: existingCartItem.quantity + 1
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setCartItems(
        cartItems.map(item =>
          item.id === existingCartItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
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
      <FilterContainer>
        <FilterButton
          onClick={() => handleCategoryFilter(null)}
          isActive={selectedCategory === null}
        >
          Все категории
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            onClick={() => handleCategoryFilter(category.id)}
            isActive={selectedCategory === category.id}
          >
            {category.name}
          </FilterButton>
        ))}
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
    <React.Fragment key={product.id} >
     <ProductCard to={`/product/${product.id}`}>
  <ProductImage src={product.image} alt={product.name} />
  <ProductName to={`/product/${product.id}`}>{product.name}</ProductName>
</ProductCard>
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
      <ProductCardDivider />
    </React.Fragment>
  ))}
</ProductListContainer>
      <Footer />
    </PageContainer>
  );
};

export default ProductListPage;