// Header.js
import React from 'react';
import './Header.css'; // Импортируем CSS файл
import SubHeader from './SubHeader';
import DropdownMenu from './DropdownMenu';

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
        <DropdownMenu />
      </header>
    );
  }
}

export default Header;
