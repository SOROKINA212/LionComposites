import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Rectangle43 from "./Rectangle43.png";
import Footer from './components/Footer';

const DeliveryPageContainer = styled.div`
    background-color: #1A1A1A;
    color: #F0F0F0;
    font-family: Montserrat, sans-serif;
`;

const DeliveryPageTitle = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 64px;
    margin-bottom: 7%;
    text-align: center;
    color: #FFFFFF;
`;

const DeliveryPageContent = styled.div`
    max-width: 70%;
    margin: 0 auto;
    padding: 20px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Image = styled.img`
    width: 600px;
    height: 699px;
    border-radius: 55px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Text = styled.p`
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 48px;
    color: #F0F0F0;
    text-align: left;
    margin-left: 3%;
`;
const AdvantagesTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Medium */
    font-size: 48px;
    color: #F0F0F0;
    margin-top: 10%;
    text-align: left;
`;
const AdvantageList = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: lighter;
    font-size: 40px;
    color: #F0F0F0;
    list-style-type: disc;
    margin-left: 40px;
`;

const AdvantageListItem = styled.li`
    margin-bottom: 20px;
`;
const PaymentTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Меняем стиль на Medium */
    font-size: 48px;
    color: #F0F0F0;
    margin-top: 7%; /* Добавляем отступ сверху */
    margin-bottom: 20px; /* Добавляем отступ снизу */
    text-align: right; /* Выравниваем текст по левому краю */
`;

const PaymentMethods = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: lighter; /* Делаем текст тоньше */
    font-size: 40px;
    color: #F0F0F0;
    margin-left: 20px;
    text-align: right;
    margin-bottom: 7%;
`;
const Rectangle = styled.div`
    width: 100%;
    height: 300px; /* Высота прямоугольника */
    background-color: #353333; /* Цвет фона */
    border-radius: 40px; /* Скругление углов */
    box-shadow: 0px 11px 28.7px rgba(0, 0, 0, 0.8); /* Тень со сдвигом по y на 11px и blur 28.7px */
    margin: 50px auto; /* Центрируем прямоугольник по горизонтали */
    margin-bottom: 7%;
`;

const ColumnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px; /* Добавим немного отступа по краям */
`;

const Column = styled.div`
    flex: 1;
`;

const VerticalLine = styled.div`
    border-left: 2px solid #FFFFFF; /* Цвет и толщина вертикальной линии */
    height: 80%; /* Высота линии */
    margin: 0 20px; /* Отступы от текста */
`;

const ColumnText = styled.p`
    font-family: Montserrat, sans-serif; /* Устанавливаем шрифт Montserrat */
    font-weight: 300; /* Устанавливаем стиль Light */
    font-size: 32px; /* Устанавливаем размер 32px */
    color: #FFFFFF; /* Цвет текста */
    margin: 10px 0; /* Отступы от текста */
    text-align: center;
`;



const DeliveryPage = () => {
    return (
        <DeliveryPageContainer>
            <Header />
            <SubHeader />
            <DeliveryPageContent>
                <DeliveryPageTitle>Как мы работаем с клиентами</DeliveryPageTitle>
                <ImageContainer>
                    <Image src={Rectangle43} />
                    <Text>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                    </Text>
                </ImageContainer>
                <AdvantagesTitle>Наши преимущества</AdvantagesTitle>
                <AdvantageList>
                    <AdvantageListItem>Предлагаем множество удобных вариантов доставки: самовывоз, курьер, автобус, почта, ТК на ваш выбор и др.</AdvantageListItem>
                    <AdvantageListItem>Уделяем время тщательной упаковке (в стрейч-пленку), чтобы товары дошли до вас в сохранности</AdvantageListItem>
                    <AdvantageListItem>Если товар не соответствует требованиям качества, гарантируем возврат</AdvantageListItem>
                    <AdvantageListItem>Отправляем покупки в день заказа</AdvantageListItem>
                    <AdvantageListItem>Работаем для вас 24/7 даже в праздники</AdvantageListItem>
                </AdvantageList>
                <PaymentTitle>Как оплатить товары</PaymentTitle>
                <PaymentMethods>Оплату за полимерные материалы, инструменты, тару и другую продукцию мы принимаем наличными и переводом по реквизитам. Также доступна оплата для юридические лиц.
                Подробную информацию о товарном ряде, способах доставки и оплаты, ценах и сроках получения можно получить у менеджера по телефону.</PaymentMethods>
               <Rectangle>
    <ColumnsContainer>
        <Column>
            <ColumnText>Регионы доставки:<br/>• Россия, все регионы</ColumnText>
        </Column>
        <VerticalLine />
        <Column>
            <ColumnText>Способы оплаты:<br/>• Наличный расчет<br/>• Безналичный расчет</ColumnText>
        </Column>
        <VerticalLine />
        <Column>
            <ColumnText>1) Транспортная компания;<br/>2) Почта России;<br/>3) Автобус;<br/>4) Любой другой способ удобный для Вас.</ColumnText>
        </Column>
    </ColumnsContainer>
</Rectangle>
            </DeliveryPageContent>
             <Footer />
        </DeliveryPageContainer>
    );
};

export default DeliveryPage;
