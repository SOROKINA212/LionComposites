import React, { useEffect, useState } from 'react';
import ProductCardList from './components/ProductCard';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import SliderComponent from '../components/Slider';
import Footer from '../components/Footer';


const PageContainer = styled.div`
    background-color: #1A1A1A;
`;

const ProductContent = styled.div`
    width: 60%;
    margin: 10% auto;
    background-color: #1A1A1A;

    @media (max-width: 1200px) {
        width: 90%;
    }

    @media (max-width: 768px) {
        width: 90%;
    }

    @media (max-width: 480px) {
       width: 90%;
    }
`;

const CategoryContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2%;
    width: 100%;
`;

const CategoryTitle = styled.div`
    width: 35vw;
    height: 78vh;
    border-radius: 31px;
    display: flex;
    background-image: ${props => `url(${props.backgroundImage})`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;

    @media (max-width: 1920px) {
        margin-left: ${props => (props.even ? '20px' : '0')};
    }

    @media (max-width: 1200px) {
        margin-left: ${props => (props.even ? '0' : '0')};
        width: 150vw;
        height: 50vh;
        background-size: fit;
        margin-bottom: 5%;
        box-shadow: 0 0 65.1px ${props => (props.even ? '#000000' : '#000000')};
        background-size: cover;
    }

    @media (max-width: 768px) {
        margin-left: ${props => (props.even ? '0' : '0')};
        width: 100vw;
        height: 50vh;
        background-size: fit;
        margin-bottom: 5%;
        box-shadow: 0 0 65.1px ${props => (props.even ? '#000000' : '#000000')};
        background-size: cover;
    }

    @media (max-width: 480px) {
        margin-left: ${props => (props.even ? '0' : '0')};
        width: 110vw;
        height:50vh;
        background-size: fit;
        margin-bottom: 5%;
        box-shadow: 0 0 65.1px ${props => (props.even ? '#000000' : '#000000')};
        background-size: cover;
    }
`;

const ProductLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 1.5%;
    margin-top: 3%;


    @media (max-width: 1200px) {
        display: none;
    }
`;

function ProductPageDesktop() {
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

export default ProductPageDesktop;