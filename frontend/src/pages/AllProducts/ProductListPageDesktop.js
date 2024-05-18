import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5%;
  margin-bottom: 5%;
`;

const ProductCard = styled(Link)`
  background-color: #353333;
  height: 320px;
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
  height: 65%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 2%;
`;

const ProductName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.3vw;
  color: #F0F0F0;
  margin-bottom: 0%;
`;

const ProductPrice = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #F0F0F0;
  margin-top: 2%;
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
  background-color: ${({ isActive }) => (isActive ? '#F0F0F0' : '#353333')};
  color: ${({ isActive }) => (isActive ? '#1A1A1A' : '#F0F0F0')};
  border: none;
  border-radius: 5px;
  padding: 0.7% 1.5%;
  margin: 0 1%;
  cursor: pointer;
`;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

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
          <ProductCard key={product.id} to={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>Цена: {product.cost} руб.</ProductPrice>
          </ProductCard>
        ))}
      </ProductListContainer>
      <Footer />
    </PageContainer>
  );
};

export default ProductListPage;