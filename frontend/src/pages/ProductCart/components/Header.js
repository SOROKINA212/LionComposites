import React, { useState } from 'react';
import './Header.css';
import SubHeader from './SubHeader';
import { useAuth } from '../../../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCart = () => {
    navigate('/cart');
  };

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
      <div className="account-btn-container">
        <button className="account-btn" onClick={toggleDropdown}>
          Личный кабинет
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {user ? (
              <>
                <button className="dropdown-item" onClick={handleCart}>Корзина</button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Выйти
                </button>
              </>
            ) : (
              <button className="dropdown-item" onClick={handleLogin}>
                Войти
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;