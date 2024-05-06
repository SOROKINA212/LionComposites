import React from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import styled from 'styled-components';
import Footer from './components/Footer';
import MapComponent from './components/Map';
import { useMediaQuery } from 'react-responsive';



const PageContainer = styled.div`
    background-color: #1A1A1A;

`;

const ContentContainer = styled.div`
    max-width: 70%;
    height: 100%;
    margin: 0 auto;
    padding: 2%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start; /* Изменено на flex-start */
    background-color: #1A1A1A;
`;

const InfoContainer = styled.div`
     max-width: 100%;
     height: 1000px;
    padding: 5%;
    display: flex;
     flex-wrap: wrap;
    background-color: #1A1A1A;
`;

const Rectangle = styled.div`
    position: relative;
    width: 100%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    margin-top: 7%;
    padding: 3%;
`;

const SmallRectangleLeft = styled.div`
    width: 24%;
    height: 41.5%;
    position: relative;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top: 1%;
    left: 0%;
    padding: 2%;
    margin-right: 2.5%;
`;

const Heading = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 4vw;
    color: #F0F0F0;
    margin-bottom: 1%;
    text-align: center; /* Добавлено выравнивание текста по центру */
    width: 100%; /* Добавлено, чтобы текст занимал всю ширину контейнера */
`;

const ContactList = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 1.6vw;
    color: #F0F0F0;
    list-style-type: disc;
`;

const ContactListItem = styled.li`
    margin-bottom: 5%;
`;

const AddressTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 2.5vw;
    color: #F0F0F0;
    margin-bottom: 2%;
`;

const AddressText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 1.6vw;
    color: #F0F0F0;
`;
const InfoRectangle = styled.div`
    width: 24%;
    height: 41%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top: 1%;
    margin-left: 2.5%;
    padding: 2.2%;
    color: #F0F0F0;
`;

const InfoTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 2.5vw;
`;

const InfoText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Стиль Lighter */
    font-size: 1.7vw;
`;

const AboutRectangle = styled.div`
    width: 100%; /* Ширина 70% страницы */
    margin: 0 auto; /* Центрирование по горизонтали */
    margin: 1% auto 0;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25); /* Тень со сдвигом по y на 11px и blur 28.7 */
    padding: 3%;
    color: #F0F0F0;
    position: relative;
`;

const AboutTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Стиль Medium */
    font-size: 2.5vw;
    margin-bottom: 2%; /* Отступ снизу */
`;

const AboutText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Стиль Lighter */
    font-size: 1.7vw;
`;

const AdditionalTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 2.5vw;
    margin-top: 25%;
    position: relative; /* Изменено на absolute */
    margin-left: 8%; /* Выравнивание по левому краю */
    left: -5%; /* Выравнивание по верхнему краю */
    color: #F0F0F0;
`;

const AdditionalRectangle = styled.div`
    width: 45%;
    height: 50%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    position: relative;
    left: 3%;
    margin-top: 5%; /* Размещаем прямоугольник под надписью с дополнительным отступом 30px */
    padding: 2%;
    color: #F0F0F0;
`;

const AdditionalText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 2.3vw;
    color: #F0F0F0;
`;
const AdditionalLeftRectangle = styled.div`
    width: 45%;
    height: 50%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    position: relative;
    left: 0%;
    margin-top: 5%;
    padding: 2%;
    color: #F0F0F0;
    margin-bottom: 7%;
    display: flex;
`;

const AdditionalLeftText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 2.3vw;
    color: #F0F0F0;
`;
const CooperationTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 2.5vw;
    color: #FFFFFF;
    margin-top: 25%; /* Дополнительный отступ сверху */
    margin-left: auto; /* Установлено автоматическое выравнивание слева */
    margin-right: -10%; /* Добавлен отступ справа */
    width: 50%; /* Ширина контейнера установлена на 40% */
    text-align: left; /* Выравнивание текста по правому краю */
`;

const ContentBox = styled.div`
    max-width: 100%;
    padding: 5%;
    display: flex;
    background-color: #1A1A1A;
    margin-top: 15%;
`;

const ContentBoxBot = styled.div`
    max-width: 100%;
    padding: 5%;
    display: flex;
    background-color: #1A1A1A;
`;

const AboutUsDesktop = () => {

  return (
     <PageContainer>
      <Header />
      <SubHeader />
      <ContentContainer>
        <Heading>Где мы находимся?</Heading>
        <InfoContainer>
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
        <MapComponent />
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
        </InfoContainer>
        <ContentBox>
        <AdditionalTitle>Область применения <br/> стекломатериалов</AdditionalTitle>
        <AdditionalRectangle>
          <AdditionalText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </AdditionalText>
        </AdditionalRectangle>
        </ContentBox>
        <ContentBoxBot>
        <AdditionalLeftRectangle>
          <AdditionalLeftText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </AdditionalLeftText>
        </AdditionalLeftRectangle>
        <CooperationTitle>Сотрудничество с <br/> компанией Лион-Юг </CooperationTitle>
        </ContentBoxBot>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default AboutUsDesktop;


