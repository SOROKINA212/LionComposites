import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';
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
  margin-bottom: 75%;
`;

const ProductCard = styled(Link)`
  background-color: #1A1A1A;
  height: 200px;
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 5%;
  margin-right: 5%;
`;

const ProductName = styled(Link)`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 3.5vw;
  color: #F0F0F0;
  margin-bottom: 0%;
`;

const PriceContainer = styled.div`
  margin-top: auto; // Это свойство будет "толкать" элемент вниз
  width: 100%;
  display: flex;
  justify-content: flex-start;;

`;

const ProductPrice = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 3vw;
  color: #F0F0F0;
  position: absolute;
  margin: 0;
  margin-left: -45%;
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
  margin-left: 5%; // Добавляем отступ слева от кнопки
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

  const addToCart = (product) => {
  setCart([...cart, product]);
  console.log('Добавлено в корзину:', product);
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
  <PriceContainer>
    <ProductPrice>Цена: {product.cost} руб.</ProductPrice>
    <AddToCartButton onClick={() => addToCart(product)}>
      В корзину
    </AddToCartButton>
  </PriceContainer>
</ProductCard>
      <ProductCardDivider />
    </React.Fragment>
  ))}
</ProductListContainer>
      <Footer />
    </PageContainer>
  );
};

export default ProductListPage;