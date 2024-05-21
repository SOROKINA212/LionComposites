import React from 'react';
import './Footer.css'; // Импортируем CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <p>Номер телефона: +79185757291</p>
            </div>
            <div className="footer-column">
                <p>Адрес: ул. Вавилова 68/2, г. Ростов-на-Дону (Магазин находится на территории Базы "РОСАВТОМАТИК) Ростовская область, Россия</p>
            </div>
            <div className="footer-column">
                <p>Почта: info@lionug.ru, lion-td@mail.ru</p>
            </div>
        </footer>
    );
};

export default Footer;
