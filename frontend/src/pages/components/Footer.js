import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

const FooterColumn = styled.div`
  display: inline-block;
  margin: 0 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterColumn>
        <p>Номер телефона: +79185757291</p>
      </FooterColumn>
      <FooterColumn>
        <p>Адрес: ул. Вавилова 68/2, г. Ростов-на-Дону (Магазин находится на территории Базы "РОСАВТОМАТИК" Ростовская область, Россия</p>
      </FooterColumn>
      <FooterColumn>
        <p>Почта: info@lionug.ru, lion-td@mail.ru</p>
      </FooterColumn>
    </FooterContainer>
  );
};

export default Footer;