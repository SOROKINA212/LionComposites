import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Rectangle43 from "./Rectangle43.png";
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const DeliveryPageContainer = styled.div`
    background-color: #1A1A1A;
    color: #F0F0F0;
    font-family: Montserrat, sans-serif;
`;

const DeliveryPageTitle = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 3vw;
    margin-bottom: 7%;
    text-align: center;
    color: #FFFFFF;
`;

const DeliveryPageContent = styled.div`
    max-width: 70%;
    margin: 0 auto;
    padding: 2%;
`;

const ImageContainer = styled.div`
    max-width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
`;

const Image = styled.img`
    width: 70%;
    height: 50%;
    border-radius: 55px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    display:flex;
`;

const Text = styled.p`
    width: 100%;
    font-family: Montserrat, sans-serif;
    font-weight: 300;
    font-size: 1.7vw;
    color: #F0F0F0;
    text-align: left;
    margin-left: 3%;
`;
const AdvantagesTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Medium */
    font-size: 1.7vw;
    color: #F0F0F0;
    margin-top: 10%;
    text-align: left;
`;
const AdvantageList = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: lighter;
    font-size: 1.5vw;
    color: #F0F0F0;
    list-style-type: disc;
    margin-left: 3%;
`;

const AdvantageListItem = styled.li`
    margin-bottom: 2%;
`;
const PaymentTitle = styled.h2`
    font-family: Montserrat, sans-serif;
    font-weight: 500; /* Меняем стиль на Medium */
    font-size: 1.7vw;
    color: #F0F0F0;
    margin-top: 7%; /* Добавляем отступ сверху */
    margin-bottom: 2%; /* Добавляем отступ снизу */
    text-align: right; /* Выравниваем текст по левому краю */
`;

const PaymentMethods = styled.ul`
    font-family: Montserrat, sans-serif;
    font-weight: lighter; /* Делаем текст тоньше */
    font-size: 1.5vw;
    color: #F0F0F0;
    margin-left: 2%;
    text-align: right;
    margin-bottom: 7%;
`;

const InfoContainer = styled.div`
    max-width:100%;
    height: 400px;
`;

const Rectangle = styled.div`
    width: 100%;
    height: 70%; /* Высота прямоугольника */
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
    padding: 0 2%; /* Добавим немного отступа по краям */
`;

const Column = styled.div`
    flex: 1;
`;

const VerticalLine = styled.div`
    border-left: 2px solid #FFFFFF; /* Цвет и толщина вертикальной линии */
    height: 80%; /* Высота линии */
    margin: 0 2%; /* Отступы от текста */
`;

const ColumnText = styled.p`
    font-family: Montserrat, sans-serif; /* Устанавливаем шрифт Montserrat */
    font-weight: 300; /* Устанавливаем стиль Light */
    font-size: 1.5vw; /* Устанавливаем размер 32px */
    color: #FFFFFF; /* Цвет текста */
    margin: 1% 0; /* Отступы от текста */
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
                       Компания «Лион Композит» находится в Ростове-на-Дону и поставляет полиэфирные, эпоксидные смолы, разделительные и армирующие материалы. Также в нашем каталоге можно выбрать и заказать декоративные добавки для полиэфирных и эпоксидных систем, инструменты и тару для работы, стеклопластик. Удобная схема сотрудничества позволяет нашим клиентам экономить время и средства, заказывая у нас в любом регионе РФ.
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
                <InfoContainer>
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
                            <ColumnText>• Транспортная компания;<br/>• Почта России;<br/>• Автобус;<br/>• Любой другой способ удобный для Вас.</ColumnText>
                        </Column>
                    </ColumnsContainer>
                </Rectangle>
                </InfoContainer>
            </DeliveryPageContent>
             <Footer />
        </DeliveryPageContainer>
    );
};

export default DeliveryPage;
