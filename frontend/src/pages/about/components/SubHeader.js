// SubHeader.js
import React from 'react';
import './SubHeader.css'; // Импортируем CSS файл

class SubHeader extends React.Component {
  render() {
    return (
      <div className="sub-header">
        <nav>
          <ul>
            <li><a href="/">Доставка</a></li>
            <li><a href="/">Презентации и документы</a></li>
            <li><a href="/">О нас</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default SubHeader;
