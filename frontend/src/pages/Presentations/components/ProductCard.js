import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductLink = styled(Link)`
    width: 304px;
    height: 350px;
    border-radius: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3%; /* Отступ между ссылками на товары */
    margin-bottom: 2.5%;
    text-decoration: none; /* Убираем подчеркивание */
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-position: center;
    box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8); /* Добавляем тень */
`;

const ProductRow = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5%; /* Отступ между рядами ссылок на товары */
`;

const ProductLinksContainer = styled.div`
    margin-bottom: 2%; /* Отступ между контейнерами ссылок на товары */
`;

function ProductCardList({ categoryId }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!categoryId) return; // Не делаем запрос, если categoryId пуст

        axios.get(`http://localhost:8000/api/products/?category=${categoryId}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(`Error fetching products for category ${categoryId}:`, error);
            });
    }, [categoryId]);

    // Фильтрация товаров по категории
    const filteredProducts = products.filter(product => product.category === categoryId);

    // Ограничение количества ссылок на товары до четырех
    const limitedProducts = filteredProducts.slice(0, 4);

    // Разделение ссылок на товары на два ряда по две ссылки в каждом
    const firstRowProducts = limitedProducts.slice(0, 2);
    const secondRowProducts = limitedProducts.slice(2, 4);

    return (
        <ProductLinksContainer>
            <ProductRow>
                {firstRowProducts.map(product => (
                    <ProductLink
                        key={product.id}
                        to={`/product/${product.id}`}
                        imageUrl={product.image}
                    >
                    </ProductLink>
                ))}
            </ProductRow>
            <ProductRow>
                {secondRowProducts.map(product => (
                    <ProductLink
                        key={product.id}
                        to={`/product/${product.id}`}
                        imageUrl={product.image}
                    >
                    </ProductLink>
                ))}
            </ProductRow>
        </ProductLinksContainer>
    );
}

function ProductCard({ product }) {
    return (
        <div>
            <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        </div>
    );
}

export default ProductCardList;
