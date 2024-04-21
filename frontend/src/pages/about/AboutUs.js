import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import styled from 'styled-components';
import Footer from './components/Footer';
import MapComponent from './components/Map';

const PageContainer = styled.div`
    background-color: #1A1A1A;
`;

const ContentContainer = styled.div`
    max-width: 70%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #1A1A1A;
`;

const Rectangle = styled.div`
    position: relative;
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
    position: relative;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top: 15px;
    left: 0%;
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
    list-style-type: disc;
`;

const ContactListItem = styled.li`
    margin-bottom: 10px;
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
const InfoRectangle = styled.div`
    width: 331px;
    height: 392px;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top: 15px;
    margin-left: 20%;
    padding: 30px;
    color: #F0F0F0;
    position: relative;
`;

const InfoTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Стиль Medium */
    font-size: 48px;
`;

const InfoText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Стиль Lighter */
    font-size: 32px;
`;

const AboutRectangle = styled.div`
    width: 100%; /* Ширина 70% страницы */
    margin: 0 auto; /* Центрирование по горизонтали */
    margin: 1% auto 0;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25); /* Тень со сдвигом по y на 11px и blur 28.7 */
    padding: 30px;
    color: #F0F0F0;
`;

const AboutTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Стиль Medium */
    font-size: 48px;
    margin-bottom: 20px; /* Отступ снизу */
`;

const AboutText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Стиль Lighter */
    font-size: 32px;
`;

const AdditionalTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Стиль Medium */
    font-size: 48px;
    margin-top: 50px; /* Отступ сверху */
    text-align: left; /* Выравнивание текста по левому краю */
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
                <MapComponent/>
                 <InfoRectangle>
                        <InfoTitle>Режим:</InfoTitle>
                        <InfoText>Пн-Пт<br/>09:00-17:00<br/>Сб-Вс<br/>09:00-15:00</InfoText>
                    </InfoRectangle>
                    <AboutRectangle>
                        <AboutTitle>О компании</AboutTitle>
                        <AboutText>
                            Компания «Лион Композит» специализируется на поставках смолы и стекломатериалов.
                            Предприятие находится в Ростове-на-Дону, сотрудничает с клиентами по всей России.
                            В каталоге помимо прочего представлены колеровочные пигментные пасты,
                            полиэфирные основы Гелькоут и Топкоут.
                        </AboutText>
                    </AboutRectangle>
                        <AdditionalTitle>Область применения <br/> стекломатериалов</AdditionalTitle>
            </ContentContainer>
            <Footer />
        </PageContainer>
    );
};

export default AboutUsPage;
