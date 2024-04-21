import React, { useEffect, useState } from 'react';
import ProductCardList from './components/ProductCard';
import axios from 'axios';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';

const PageContainer = styled.div`
    background-color: #1A1A1A; /* Устанавливаем цвет фона для всей страницы */
`;

const ProductContent = styled.div`
    width: 60%; /* Задаем ширину 80% */
    margin: 0 auto; /* Центрируем по горизонтали */
    background-color: #1A1A1A;
`;

const CategoryContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const CategoryTitle = styled.div`
    width: 480px;
    height: 750px;
    background-color: #FFCD6E;
    box-shadow: 0 0 65.1px ${props => (props.even ? '#011627' : '#FFCD6E')};
    border-radius: 31px;
    display: flex;
    background-image: ${props => `url(${props.backgroundImage})`}; /* Добавляем фоновое изображение */
    justify-content: center;
    align-items: center;
    margin-left: ${props => (props.even ? '20px' : '0')}; /* Добавляем отступ слева для четных индексов */
`;

const ProductLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    margin-top: 35px;
`;

function ProductList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categories/`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <PageContainer>
            <Header />
            <SubHeader />
            <ProductContent className="product_content">
                {categories.map((category, index) => (
                    <CategoryContainer key={category.id}>
                        {index % 2 === 0 ? (
                            <>
                                <CategoryTitle backgroundImage={category.image}></CategoryTitle>
                                <ProductLinksContainer>
                                    <ProductCardList categoryId={category.id} />
                                </ProductLinksContainer>
                            </>
                        ) : (
                            <>
                                <ProductLinksContainer>
                                    <ProductCardList categoryId={category.id} />
                                </ProductLinksContainer>
                                <CategoryTitle backgroundImage={category.image} even></CategoryTitle>
                            </>
                        )}
                    </CategoryContainer>
                ))}
            </ProductContent>
            <Footer />
        </PageContainer>
    );
}

export default ProductList;
