import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import styled from 'styled-components';
import MapWithMarker from './components/Map';
import Footer from './components/Footer';

const PageContainer = styled.div`
    background-color: #1A1A1A;
`;

const ContentContainer = styled.div`
    max-width: 70%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #1A1A1A;
`;

const Rectangle = styled.div`
    width: 100%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    margin-top: 7%;
    padding: 30px;
`;

const SmallRectangleLeft = styled.div`
    width: 331px;
    height: 392px;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top: 15px;
    margin-left: -81%; /* Сдвигаем прямоугольник вправо */
    padding: 30px;
`;


const Heading = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 64px;
    color: #F0F0F0;
    margin-bottom: 20px;
`;

const ContactList = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 32px;
    color: #F0F0F0;
    list-style-type: disc; /* Устанавливаем маркер списка в виде точек */
`;

const ContactListItem = styled.li`
    margin-bottom: 10px; /* Добавляем отступ между элементами списка */
`;

const AddressTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 48px;
    color: #F0F0F0;
    margin-bottom: 20px;
`;

const AddressText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 32px;
    color: #F0F0F0;
`;

const AboutUsPage = () => {
    return (
        <PageContainer>
            <Header />
            <SubHeader />
           <ContentContainer>
    <Heading>Где мы находимся?</Heading>
    <Rectangle>
        <AddressTitle>Адрес</AddressTitle>
        <AddressText>ул. Вавилова 68/2, г. Ростов-на-Дону (магазин находится на территории Базы "РОСАВТОМАТИК"), Ростовская область, Россия</AddressText>
    </Rectangle>
        <SmallRectangleLeft>
            <AddressTitle>Контакты:</AddressTitle>
            <ContactList>
                <ContactListItem>+79185757291</ContactListItem>
                <ContactListItem>lion-td</ContactListItem>
                <ContactListItem>info@lionug.ru</ContactListItem>
                <ContactListItem>lion-td@mail.ru</ContactListItem>
            </ContactList>
        </SmallRectangleLeft>
         <MapWithMarker /> {/* Выводим компонент с картой */}
         <Footer />
</ContentContainer>



        </PageContainer>
    );
};

export default AboutUsPage;
