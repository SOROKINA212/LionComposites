// Header.js
import React from 'react';
import './Header.css'; // Импортируем CSS файл
import SubHeader from './SubHeader';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="logo">Lion Composites</div>
        <div className="search-bar">
          <input type="text" placeholder="Поиск" />
        </div>
        <div className="icons">
          <span className="icon">🔍</span>
          <span className="icon">⚙️</span>
        </div>
        <button className="account-btn">Личный кабинет</button>
      </header>
    );
  }
}

export default Header;
