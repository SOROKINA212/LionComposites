import React from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import styled from 'styled-components';
import Footer from '../components/Footer';
import MapComponent from './components/MapMobile';
import { useMediaQuery } from 'react-responsive';



const PageContainer = styled.div`
    background-color: #1A1A1A;

`;

const ContentContainer = styled.div`
    max-width: 70%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start; /* Изменено на flex-start */
    background-color: #1A1A1A;
`;

const Rectangle = styled.div`
    position: relative;
    width: 100%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    margin-top: 7%;
    margin-bottom: 7%;
    padding: 30px;
`;

const SmallRectangleLeft = styled.div`
    width: 80%;
    height: 50%;
    position: relative;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top: 15px;
    left: 0%;
    padding: 30px;
    margin-bo
`;




const Heading = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 7vw;
    color: #F0F0F0;
    margin-bottom: 20px;
    text-align: center; /* Добавлено выравнивание текста по центру */
    width: 100%; /* Добавлено, чтобы текст занимал всю ширину контейнера */
`;

const ContactTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 5vw;
    color: #F0F0F0;
    margin-top: 10%;
    margin-bottom: 2%;
`;
const ContactList = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 3vw;
    color: #F0F0F0;
    list-style-type: disc;
    margin-top: 5%;
`;

const ContactListItem = styled.li`
    margin-bottom: 10px;
`;

const AddressTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 5vw;
    color: #F0F0F0;
    margin-top: 2%;
    margin-bottom: 2%;
    text-align: center;
`;

const AddressText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 3vw;
    color: #F0F0F0;
`;
const InfoRectangle = styled.div`
    width: 80%;
    height: 50%;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 10px 20.3px rgba(0, 0, 0, 0.25);
    margin-top:5%;
    padding: 30px;
    color: #F0F0F0;
`;

const InfoTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Стиль Medium */
    font-size: 5vw;
    color: #F0F0F0;
    margin-bottom: 3%;
`;

const InfoText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300; /* Стиль Lighter */
    font-size: 3vw;
    margin-top: 3%;
    text-align: center;
    margin-bottom: 3%;
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
    position: relative;
`;

const AboutTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Стиль Medium */
    font-size: 5vw;
    margin-bottom: 20px; /* Отступ снизу */
    color: #F0F0F0;
`;

const AboutText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 200; /* Стиль Lighter */
    font-size: 3vw;
    color: #F0F0F0;
    text-align: justify;
    margin-bottom: 1%;
`;

const AdditionalTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 5vw;
    margin-top: 15%;
    position: relative; /* Изменено на absolute */
    left: 0%; /* Выравнивание по верхнему краю */
    color: #F0F0F0;
`;

const AdditionalRectangle = styled.div`
    width: 550px;
    height: 600px;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    position: relative;
    left: 9%;
    margin-top: 5%; /* Размещаем прямоугольник под надписью с дополнительным отступом 30px */
    padding: 30px;
    color: #F0F0F0;
`;

const AdditionalText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 3vw;
    color: #F0F0F0;
`;
const AdditionalLeftRectangle = styled.div`
    width: 550px;
    height: 600px;
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.25);
    position: relative;
    left: 0%;
    margin-top: 5%;
    padding: 30px;
    color: #F0F0F0;
    margin-bottom: 7%;
`;

const AdditionalLeftText = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 3vw;
    color: #F0F0F0;
`;
const CooperationTitle = styled.h3`
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-size: 5vw;
    color: #FFFFFF;
    margin-top: 5%; /* Дополнительный отступ сверху */
`;


const AboutUsMobile = () => {

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
        <MapComponent />
          <ContactTitle>Контакты:</ContactTitle>
          <SmallRectangleLeft>
          <ContactList>
            <ContactListItem>+79185757291</ContactListItem>
            <ContactListItem>lion-td</ContactListItem>
            <ContactListItem>info@lionug.ru</ContactListItem>
            <ContactListItem>lion-td@mail.ru</ContactListItem>
          </ContactList>
          </SmallRectangleLeft>
          <InfoTitle>Режим:</InfoTitle>
        <InfoRectangle>
          <InfoText>Пн-Пт:  09:00-17:00<br/><br/>Сб-Вс:  09:00-15:00</InfoText>
        </InfoRectangle>
          <AboutTitle>О компании</AboutTitle>
           <AboutText>
            Компания «Лион Композит» специализируется на поставках смолы и стекломатериалов.
            Предприятие находится в Ростове-на-Дону, сотрудничает с клиентами по всей России.
            В каталоге помимо прочего представлены колеровочные пигментные пасты,
            полиэфирные основы Гелькоут и Топкоут.
          </AboutText>
        <AdditionalTitle>Область применения <br/> стекломатериалов</AdditionalTitle>
          <AdditionalText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </AdditionalText>
           <CooperationTitle>Сотрудничество с <br/> компанией Лион-Юг </CooperationTitle>
          <AdditionalLeftText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </AdditionalLeftText>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default AboutUsMobile;


