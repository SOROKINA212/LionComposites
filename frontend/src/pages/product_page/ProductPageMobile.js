import React, { useEffect, useState } from 'react';
import ProductCardList from './components/ProductCardMobile';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/HeaderMobile';
import SubHeader from '../components/SubHeader';
import SliderComponent from '../components/Slider';
import Footer from '../components/Footer';


const PageContainer = styled.div`
    background-color: #1A1A1A;
`;

const ProductContent = styled.div`
    width: 100%;
    margin: 10% auto;
    background-color: #1A1A1A;
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1%;
    width: 100%;
`;

const CategoryTitle = styled.h2`
   font-family: Montserrat, sans-serif;
    font-weight: 600;
    font-size: 4vw;
    display: flex;
    background-repeat: no-repeat;
    justify-content: center;
    text-align: center;
     color: #F0F0F0;
`;

const ProductLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7%;
`;

function ProductPageMobile() {
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
             <SliderComponent />
            <ProductContent className="product_content">
                {categories.map((category, index) => (
                    <CategoryContainer key={category.id}>
                            <>
                                <CategoryTitle>{category.name}</CategoryTitle>
                                 <ProductLinksContainer>
                                    <ProductCardList categoryId={category.id} />
                                </ProductLinksContainer>
                            </>

                    </CategoryContainer>

                ))}
            </ProductContent>
            <Footer />
        </PageContainer>
    );
}

export default ProductPageMobile;